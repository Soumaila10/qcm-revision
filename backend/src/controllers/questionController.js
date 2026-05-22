const Question = require('../models/Question');
const Exam = require('../models/Exam');
const User = require('../models/User');

// @desc    Get all questions (with filters)
// @route   GET /api/questions
// @access  Private
exports.getQuestions = async (req, res) => {
  const { category, subcategory, difficulty, year, isRecurrent, search } = req.query;
  const query = {};

  if (category) query.category = category;
  if (subcategory) query.subcategory = subcategory;
  if (difficulty) query.difficulty = difficulty;
  if (year) query.year = parseInt(year);
  if (isRecurrent) query.isRecurrent = isRecurrent === 'true';

  if (search) {
    query.$or = [
      { question: { $regex: search, $options: 'i' } },
      { explanation: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    const questions = await Question.find(query);
    res.json(questions);
  } catch (error) {
    console.error('Erreur getQuestions:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Private
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }
    res.json(question);
  } catch (error) {
    console.error('Erreur getQuestionById:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la question' });
  }
};

// @desc    Toggle favorite question
// @route   POST /api/questions/:id/favorite
// @access  Private
exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const questionId = req.params.id;

    const index = user.favorites.indexOf(questionId);
    if (index === -1) {
      user.favorites.push(questionId);
      await user.save();
      res.json({ message: 'Question ajoutée aux favoris', favorites: user.favorites });
    } else {
      user.favorites.splice(index, 1);
      await user.save();
      res.json({ message: 'Question retirée des favoris', favorites: user.favorites });
    }
  } catch (error) {
    console.error('Erreur toggleFavorite:', error);
    res.status(500).json({ message: 'Erreur lors de la modification des favoris' });
  }
};

// @desc    Get adaptive revision questions
// @route   GET /api/questions/adaptive
// @access  Private
exports.getAdaptiveQuestions = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get all past exams of this user
    const exams = await Exam.find({ userId }).populate('questions');

    // Track question outcomes
    const questionHistory = {}; // questionId -> { attempts: 0, correct: 0, lastResult: boolean }

    exams.forEach(exam => {
      exam.questions.forEach((q, index) => {
        if (!q) return;
        const qId = q._id.toString();
        const userAnswer = exam.userAnswers[index];
        const isCorrect = userAnswer === q.correctAnswer;

        if (!questionHistory[qId]) {
          questionHistory[qId] = { attempts: 0, correct: 0 };
        }
        questionHistory[qId].attempts += 1;
        if (isCorrect) questionHistory[qId].correct += 1;
        questionHistory[qId].lastResult = isCorrect;
        questionHistory[qId].category = q.category;
        questionHistory[qId].subcategory = q.subcategory;
        questionHistory[qId].difficulty = q.difficulty;
      });
    });

    // 2. Identify failed questions (last attempt was incorrect)
    const failedQuestionIds = Object.keys(questionHistory).filter(
      qId => questionHistory[qId].lastResult === false
    );

    let adaptiveQuestions = [];

    // Retrieve full documents of failed questions
    if (failedQuestionIds.length > 0) {
      adaptiveQuestions = await Question.find({ _id: { $in: failedQuestionIds } }).limit(10);
    }

    // 3. If we don't have 10 failed questions, add questions from weakest subcategories
    if (adaptiveQuestions.length < 10) {
      const neededCount = 10 - adaptiveQuestions.length;

      // Find subcategories with errors
      const subcategorySuccess = {}; // subcategory -> { total: 0, correct: 0 }
      Object.keys(questionHistory).forEach(qId => {
        const q = questionHistory[qId];
        if (!subcategorySuccess[q.subcategory]) {
          subcategorySuccess[q.subcategory] = { total: 0, correct: 0 };
        }
        subcategorySuccess[q.subcategory].total += q.attempts;
        subcategorySuccess[q.subcategory].correct += q.correct;
      });

      // Sort subcategories by success rate ascending
      const weakestSubcategories = Object.keys(subcategorySuccess).sort((a, b) => {
        const rateA = subcategorySuccess[a].correct / subcategorySuccess[a].total;
        const rateB = subcategorySuccess[b].correct / subcategorySuccess[b].total;
        return rateA - rateB;
      });

      // Find already attempted question IDs to avoid repeating them if we want fresh ones,
      // or find new questions in these weak subcategories
      const attemptedIds = Object.keys(questionHistory);
      
      let candidateQuestions = [];
      if (weakestSubcategories.length > 0) {
        candidateQuestions = await Question.find({
          subcategory: { $in: weakestSubcategories.slice(0, 3) },
          _id: { $nin: [...attemptedIds, ...adaptiveQuestions.map(q => q._id.toString())] }
        }).limit(neededCount);
      }

      adaptiveQuestions = [...adaptiveQuestions, ...candidateQuestions];

      // If still not enough, grab random questions not already in the list
      if (adaptiveQuestions.length < 10) {
        const remainingCount = 10 - adaptiveQuestions.length;
        const randomQuestions = await Question.find({
          _id: { $nin: adaptiveQuestions.map(q => q._id) }
        }).limit(remainingCount);
        
        adaptiveQuestions = [...adaptiveQuestions, ...randomQuestions];
      }
    }

    // 4. Adapt difficulty: If the user has a high overall success rate, skew towards harder questions
    // In our case, the list retrieved is tailored. Let's return it.
    res.json(adaptiveQuestions.slice(0, 10));
  } catch (error) {
    console.error('Erreur getAdaptiveQuestions:', error);
    res.status(500).json({ message: 'Erreur lors de la génération de la révision adaptative' });
  }
};

// @desc    Create a question (Admin)
// @route   POST /api/questions
// @access  Private/Admin
exports.createQuestion = async (req, res) => {
  const { category, subcategory, difficulty, question, options, correctAnswer, explanation, tags, year, source, isRecurrent, reoccurrenceProbability } = req.body;

  try {
    const newQuestion = new Question({
      category,
      subcategory,
      difficulty,
      question,
      options,
      correctAnswer,
      explanation,
      tags: tags || [],
      year: year || null,
      source: source || 'Admin',
      isRecurrent: isRecurrent || false,
      reoccurrenceProbability: reoccurrenceProbability || 0
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Erreur createQuestion:', error);
    res.status(400).json({ message: 'Erreur de validation lors de la création de la question' });
  }
};

// @desc    Update a question (Admin)
// @route   PUT /api/questions/:id
// @access  Private/Admin
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedQuestion);
  } catch (error) {
    console.error('Erreur updateQuestion:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la question' });
  }
};

// @desc    Delete a question (Admin)
// @route   DELETE /api/questions/:id
// @access  Private/Admin
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }

    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question supprimée avec succès' });
  } catch (error) {
    console.error('Erreur deleteQuestion:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la question' });
  }
};
