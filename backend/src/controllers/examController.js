const Exam = require('../models/Exam');
const Question = require('../models/Question');
const User = require('../models/User');

// @desc    Generate a new exam session
// @route   POST /api/exams/generate
// @access  Private
exports.generateExam = async (req, res) => {
  const { count = 20, category, type = 'Entraînement' } = req.body;
  const numQuestions = parseInt(count);

  try {
    let matchQuery = {};
    if (category) {
      matchQuery.category = category;
    }

    // Aggregate random questions
    let questions = [];
    
    if (type === 'Blanc') {
      // Mock Exam: pull proportionally
      // 50% Management de Projet, 50% IT & Cybersécurité
      const halfCount = Math.floor(numQuestions / 2);
      
      const qManagement = await Question.aggregate([
        { $match: { category: 'Management de Projet' } },
        { $sample: { size: halfCount } }
      ]);
      
      const qIT = await Question.aggregate([
        { $match: { category: 'IT & Cybersécurité' } },
        { $sample: { size: numQuestions - halfCount } }
      ]);
      
      questions = [...qManagement, ...qIT];
      // Shuffle combined questions
      questions = questions.sort(() => 0.5 - Math.random());
    } else {
      // Training or Adaptive: standard sample based on filters
      questions = await Question.aggregate([
        { $match: matchQuery },
        { $sample: { size: numQuestions } }
      ]);
    }

    res.json(questions);
  } catch (error) {
    console.error('Erreur generateExam:', error);
    res.status(500).json({ message: 'Erreur lors de la génération de l\'examen' });
  }
};

// @desc    Submit exam answers & calculate score
// @route   POST /api/exams/submit
// @access  Private
exports.submitExam = async (req, res) => {
  const { questionIds, userAnswers, timeSpent, type } = req.body;
  const userId = req.user._id;

  try {
    if (!questionIds || !userAnswers || questionIds.length !== userAnswers.length) {
      return res.status(400).json({ message: 'Données d\'examen incomplètes ou invalides' });
    }

    // 1. Fetch questions to verify correct answers
    const questionsObj = await Question.find({ _id: { $in: questionIds } });
    
    // Create a map for quick access
    const questionMap = {};
    questionsObj.forEach(q => {
      questionMap[q._id.toString()] = q;
    });

    let score = 0;
    const answeredQuestions = [];

    // 2. Compute score and build categories stats for this run
    const performanceDelta = {};

    questionIds.forEach((qId, index) => {
      const question = questionMap[qId];
      if (!question) return;

      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) score += 1;

      // Track performance per category/subcategory
      const cat = question.category;
      if (!performanceDelta[cat]) {
        performanceDelta[cat] = { attempts: 0, correct: 0 };
      }
      performanceDelta[cat].attempts += 1;
      if (isCorrect) performanceDelta[cat].correct += 1;
    });

    // 3. Save Exam session in DB
    const exam = new Exam({
      userId,
      questions: questionIds,
      userAnswers,
      score,
      timeSpent,
      totalQuestions: questionIds.length,
      type
    });

    await exam.save();

    // 4. Update User progression, stats, and check for new badges
    const user = await User.findById(userId);
    
    // Update category performance map in User model
    Object.keys(performanceDelta).forEach(cat => {
      if (!user.categoryPerformance) {
        user.categoryPerformance = {};
      }
      
      const current = user.categoryPerformance.get(cat) || { attempts: 0, correct: 0 };
      user.categoryPerformance.set(cat, {
        attempts: current.attempts + performanceDelta[cat].attempts,
        correct: current.correct + performanceDelta[cat].correct
      });
    });

    // Badge triggers
    const newBadges = [];
    
    // Badge: Premier pas (First exam completed)
    if (!user.badges.includes('premier_pas')) {
      user.badges.push('premier_pas');
      newBadges.push('premier_pas');
    }

    // Badge: Sans faute (100% correct, min 10 questions)
    if (score === questionIds.length && questionIds.length >= 10 && !user.badges.includes('sans_faute')) {
      user.badges.push('sans_faute');
      newBadges.push('sans_faute');
    }

    // Badge: Survivor (Completed 60 questions exam)
    if (questionIds.length === 60 && !user.badges.includes('survivor')) {
      user.badges.push('survivor');
      newBadges.push('survivor');
    }

    // Calculate total questions attempted across all performance
    let totalAttempts = 0;
    let totalCorrect = 0;
    user.categoryPerformance.forEach((value) => {
      totalAttempts += value.attempts;
      totalCorrect += value.correct;
    });

    // Badge: Expert FEDE (>80% accuracy over 50+ questions)
    if (totalAttempts >= 50 && (totalCorrect / totalAttempts) >= 0.8 && !user.badges.includes('fede_expert')) {
      user.badges.push('fede_expert');
      newBadges.push('fede_expert');
    }

    await user.save();

    res.status(201).json({
      exam,
      newBadges,
      totalAttempts,
      totalCorrect
    });
  } catch (error) {
    console.error('Erreur submitExam:', error);
    res.status(500).json({ message: 'Erreur lors de la soumission de l\'examen' });
  }
};

// @desc    Get user's exam history
// @route   GET /api/exams/history
// @access  Private
exports.getExamHistory = async (req, res) => {
  try {
    const history = await Exam.find({ userId: req.user._id })
      .populate({ path: 'questions', select: 'question correctAnswer options category subcategory' })
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('Erreur getExamHistory:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
  }
};

// @desc    Get detailed user statistics for dashboard
// @route   GET /api/stats/dashboard
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch exams
    const exams = await Exam.find({ userId }).populate('questions');
    const user = await User.findById(userId);

    if (exams.length === 0) {
      return res.json({
        hasData: false,
        globalAccuracy: 0,
        totalQuestionsAnswered: 0,
        totalExamsCount: 0,
        averageTimePerQuestion: 0,
        streak: user.streak,
        badges: user.badges,
        recentExams: [],
        categoryAccuracy: []
      });
    }

    // Metrics calculations
    let totalQuestionsAnswered = 0;
    let totalCorrectAnswers = 0;
    let totalTimeSpent = 0;

    const categoryStats = {
      'Management de Projet': { total: 0, correct: 0 },
      'IT & Cybersécurité': { total: 0, correct: 0 },
      'Annales': { total: 0, correct: 0 }
    };

    const subcategoryStats = {}; // sub -> { attempts: 0, correct: 0 }

    exams.forEach(exam => {
      totalQuestionsAnswered += exam.totalQuestions;
      totalTimeSpent += exam.timeSpent;

      exam.questions.forEach((q, index) => {
        if (!q) return;
        const isCorrect = exam.userAnswers[index] === q.correctAnswer;
        if (isCorrect) totalCorrectAnswers += 1;

        // Categorized stats
        const cat = q.category;
        if (categoryStats[cat]) {
          categoryStats[cat].total += 1;
          if (isCorrect) categoryStats[cat].correct += 1;
        }

        const sub = q.subcategory;
        if (!subcategoryStats[sub]) {
          subcategoryStats[sub] = { attempts: 0, correct: 0 };
        }
        subcategoryStats[sub].attempts += 1;
        if (isCorrect) subcategoryStats[sub].correct += 1;
      });
    });

    const globalAccuracy = totalQuestionsAnswered > 0 
      ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
      : 0;

    const averageTimePerQuestion = totalQuestionsAnswered > 0 
      ? Math.round(totalTimeSpent / totalQuestionsAnswered) 
      : 0;

    // Prepare chart data for Recharts: Category accuracy
    const categoryAccuracyData = Object.keys(categoryStats).map(cat => ({
      name: cat,
      accuracy: categoryStats[cat].total > 0 
        ? Math.round((categoryStats[cat].correct / categoryStats[cat].total) * 100) 
        : 0,
      total: categoryStats[cat].total
    })).filter(c => c.total > 0);

    // Prepare chart data for Recharts: Progression curve (last 10 exams)
    const recentExamsData = exams.slice(-10).map((exam, index) => ({
      name: `Examen ${index + 1}`,
      score: Math.round((exam.score / exam.totalQuestions) * 20), // Scale to /20 like FEDE grading
      accuracy: Math.round((exam.score / exam.totalQuestions) * 100),
      date: new Date(exam.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      type: exam.type
    }));

    // Weekly activity heatmap / chart (last 7 days)
    const weeklyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
      const dayDateString = d.toDateString();

      // Count questions answered on this day
      const dailyCount = exams
        .filter(exam => new Date(exam.createdAt).toDateString() === dayDateString)
        .reduce((sum, exam) => sum + exam.totalQuestions, 0);

      weeklyActivity.push({
        day: dayName,
        count: dailyCount
      });
    }

    // Top strengths and weaknesses
    const subList = Object.keys(subcategoryStats).map(sub => ({
      name: sub,
      accuracy: Math.round((subcategoryStats[sub].correct / subcategoryStats[sub].attempts) * 100),
      attempts: subcategoryStats[sub].attempts
    })).filter(s => s.attempts >= 3); // minimum 3 questions to evaluate strength

    const strengths = [...subList].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
    const weaknesses = [...subList].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);

    res.json({
      hasData: true,
      globalAccuracy,
      totalQuestionsAnswered,
      totalExamsCount: exams.length,
      averageTimePerQuestion,
      streak: user.streak,
      badges: user.badges,
      recentExams: recentExamsData,
      categoryAccuracy: categoryAccuracyData,
      weeklyActivity,
      strengths,
      weaknesses
    });
  } catch (error) {
    console.error('Erreur getStats:', error);
    res.status(500).json({ message: 'Erreur lors de la compilation des statistiques' });
  }
};
