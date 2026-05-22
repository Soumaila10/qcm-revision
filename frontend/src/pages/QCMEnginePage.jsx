import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { examService, questionService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Clock, AlertCircle, CheckCircle2, XCircle, ArrowRight, ArrowLeft, 
  RotateCcw, Home, Sparkles, BookOpen, Star, HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Play sound synth
const playSound = (isSuccess) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (isSuccess) {
      // Success tone: pleasant double beep (C5 to E5)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 0.15);
      
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.4);
    } else {
      // Failure tone: short low buzz (sawtooth sliding down)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.warn('Audio synth failed:', e);
  }
};

export default function QCMEnginePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const type = searchParams.get('type') || 'Entraînement';
  const category = searchParams.get('category') || null;
  const count = parseInt(searchParams.get('count') || '20');

  // State
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: optionIndex }
  const [validatedQuestions, setValidatedQuestions] = useState({}); // { questionIndex: { isCorrect, submittedAnswer } } (Training only)
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const startTime = useRef(Date.now());
  const timerRef = useRef(null);

  // Result state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let data = [];
        if (type === 'Adaptatif') {
          data = await questionService.getAdaptive();
        } else {
          data = await examService.generate({ count, category, type });
        }
        
        if (data.length === 0) {
          throw new Error("Aucune question trouvée pour ces critères.");
        }
        
        setQuestions(data);
        
        // Initialize timer (1 min per question for exam blanc)
        if (type === 'Blanc') {
          setTimeLeft(data.length * 60);
        } else {
          setTimeLeft(0);
        }
      } catch (err) {
        setError(err.message || 'Impossible de charger l\'examen.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();

    if (user && user.favorites) {
      setFavorites(user.favorites);
    }
  }, [type, category, count, user]);

  // Handle Timer for exam blanc
  useEffect(() => {
    if (timeLeft > 0 && type === 'Blanc' && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, type, isSubmitted]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimeUp && !isSubmitted) {
      handleSubmitExam();
    }
  }, [isTimeUp]);

  // Timer format (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    
    // In Training mode, if current question is already validated, prevent changing
    if (type !== 'Blanc' && validatedQuestions[currentIndex]) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIdx
    }));
  };

  const handleValidateAnswer = () => {
    const currentAnswer = selectedAnswers[currentIndex];
    if (currentAnswer === undefined) return;

    const q = questions[currentIndex];
    const isCorrect = currentAnswer === q.correctAnswer;
    
    playSound(isCorrect);

    setValidatedQuestions(prev => ({
      ...prev,
      [currentIndex]: {
        isCorrect,
        submittedAnswer: currentAnswer
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleToggleFavorite = async (questionId) => {
    try {
      const res = await questionService.toggleFavorite(questionId);
      setFavorites(res.favorites);
      refreshUser();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitExam = async () => {
    if (submitting || isSubmitted) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const questionIds = questions.map(q => q._id);
      const userAnswers = questions.map((_, idx) => {
        const ans = selectedAnswers[idx];
        return ans === undefined ? -1 : ans;
      });

      const elapsedSeconds = Math.round((Date.now() - startTime.current) / 1000);
      
      const result = await examService.submit({
        questionIds,
        userAnswers,
        timeSpent: elapsedSeconds,
        type
      });

      setSubmitResult(result);
      setIsSubmitted(true);
      
      // Trigger confetti on good performance!
      const percentage = (result.exam.score / questions.length) * 100;
      if (percentage >= 50) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement des résultats.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <div className="h-10 w-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider animate-pulse">Génération de la session...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Une erreur est survenue</h2>
        <p className="text-slate-400 text-sm">{error}</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          <Home className="h-4 w-4" />
          Retourner au tableau de bord
        </button>
      </div>
    );
  }

  // Current states
  const q = questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const validationInfo = validatedQuestions[currentIndex];
  const isQuestionAnswered = selectedAnswer !== undefined;
  const isQuestionValidated = validationInfo !== undefined;
  const isCategoryAnnales = q.category === 'Annales';

  // Category styling helper
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Management de Projet': return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
      case 'IT & Cybersécurité': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    }
  };

  // RENDER: SCORE / RESULT VIEW
  if (isSubmitted && submitResult) {
    const { exam, newBadges } = submitResult;
    const score = exam.score;
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="max-w-3xl mx-auto space-y-8 py-4">
        {/* Confetti & congrats */}
        <div className="text-center space-y-3">
          <div className="inline-flex bg-gradient-to-tr from-violet-600 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-violet-500/20 mb-2">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Examen Complété !</h1>
          <p className="text-slate-400 text-sm">Votre session a été enregistrée avec succès.</p>
        </div>

        {/* Score cards & Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center flex flex-col justify-center items-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Note Finale</span>
            <div className="relative flex items-center justify-center mt-4">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="56" cy="56" r="48" 
                  stroke={percentage >= 80 ? '#10b981' : percentage >= 50 ? '#3b82f6' : '#ef4444'} 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-2xl font-black text-white">{percentage}%</div>
            </div>
            <p className="text-sm font-semibold text-slate-300 mt-4">{score} / {total} correct</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 md:col-span-2">
            <h2 className="font-bold text-white text-base">Récapitulatif de Performance</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs text-slate-400 block font-medium">Temps écoulé</span>
                <span className="text-lg font-bold text-white mt-1 block">
                  {formatTime(exam.timeSpent)}
                </span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs text-slate-400 block font-medium">Précision par question</span>
                <span className="text-lg font-bold text-white mt-1 block">
                  {Math.round(exam.timeSpent / total)}s / question
                </span>
              </div>
            </div>

            {newBadges && newBadges.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Nouveau Badge Débloqué !
                </div>
                <div className="flex gap-2 mt-2">
                  {newBadges.map(badgeId => (
                    <div key={badgeId} className="bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                      ✨ {badgeId === 'premier_pas' ? 'Premier Pas' : badgeId === 'sans_faute' ? 'Sans Faute' : badgeId === 'survivor' ? 'Survivant' : badgeId}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-sm font-semibold text-slate-200"
          >
            Tableau de bord
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-colors text-sm font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-violet-500/10"
          >
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </button>
        </div>

        {/* Detailed Correction list */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-violet-400" />
            Correction Détaillée ({total} questions)
          </h2>
          
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const uAns = selectedAnswers[idx];
              const isCorrect = uAns === q.correctAnswer;
              
              return (
                <div key={q._id} className={`glass-card p-5 rounded-2xl border ${isCorrect ? 'border-emerald-800/40' : uAns === undefined || uAns === -1 ? 'border-slate-800' : 'border-red-800/40'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded border ${getCategoryColor(q.category)} font-bold`}>
                        {q.category}
                      </span>
                      <span className="text-slate-500 font-semibold">{q.subcategory}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleToggleFavorite(q._id)}
                      className="text-slate-600 hover:text-yellow-500 transition-colors"
                    >
                      <Star className={`h-4.5 w-4.5 ${favorites.includes(q._id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="text-sm font-bold text-slate-100 mt-2">
                    {idx + 1}. {q.question}
                  </h3>
                  
                  <div className="mt-3 space-y-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = uAns === optIdx;
                      const isCorrectChoice = q.correctAnswer === optIdx;
                      
                      let optStyle = 'text-slate-400 bg-slate-950/40 border-slate-900';
                      if (isCorrectChoice) {
                        optStyle = 'text-emerald-300 bg-emerald-950/20 border-emerald-800/60 font-medium';
                      } else if (isUserChoice) {
                        optStyle = 'text-red-300 bg-red-950/20 border-red-800/60 font-medium';
                      }
                      
                      return (
                        <div key={optIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${optStyle}`}>
                          <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                          {isCorrectChoice && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />}
                          {isUserChoice && !isCorrectChoice && <XCircle className="h-4 w-4 text-red-400 shrink-0 ml-2" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-violet-400 block mb-1">Explication :</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RENDER: EXAM ENGINE / QUESTION BOARD
  return (
    <div className="max-w-3xl mx-auto py-2">
      {/* Top Header Card */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full border tracking-widest ${getCategoryColor(q.category)}`}>
            {q.category}
          </span>
          <span className="text-xs text-slate-500 font-semibold">{q.subcategory}</span>
        </div>

        <div className="flex items-center gap-4">
          {type === 'Blanc' && (
            <div className="flex items-center gap-1.5 text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
          
          <button 
            onClick={() => handleToggleFavorite(q._id)}
            className="text-slate-500 hover:text-yellow-500 transition-colors"
          >
            <Star className={`h-5 w-5 ${favorites.includes(q._id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        
        {/* Progress header */}
        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Question {currentIndex + 1} de {questions.length}</span>
          <span>Mode {type}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
          {q.question}
        </h2>

        {/* Options list */}
        <div className="space-y-3 pt-2">
          {q.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = selectedAnswer === optIdx;
            
            // Layout styling depending on state
            let borderStyle = 'border-slate-800/80 bg-slate-900/30 text-slate-300 hover:bg-slate-900/60 hover:border-slate-700';
            let checkIcon = null;

            if (type === 'Blanc') {
              if (isSelected) borderStyle = 'border-violet-500 bg-violet-950/20 text-violet-200 ring-1 ring-violet-500/50';
            } else {
              // Training & Adaptive Mode Validation
              if (isQuestionValidated) {
                const isCorrectOption = q.correctAnswer === optIdx;
                const isSelectedOption = selectedAnswer === optIdx;
                
                if (isCorrectOption) {
                  borderStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-200 ring-1 ring-emerald-500/30';
                  checkIcon = <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />;
                } else if (isSelectedOption) {
                  borderStyle = 'border-red-500 bg-red-950/20 text-red-200 ring-1 ring-red-500/30';
                  checkIcon = <XCircle className="h-5 w-5 text-red-400 shrink-0" />;
                } else {
                  borderStyle = 'border-slate-900 bg-slate-950/20 text-slate-600 opacity-60';
                }
              } else if (isSelected) {
                borderStyle = 'border-violet-500 bg-violet-950/20 text-violet-200 ring-1 ring-violet-500/50';
              }
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                disabled={type !== 'Blanc' && isQuestionValidated}
                className={`w-full text-left p-4 rounded-xl border text-sm flex items-center justify-between transition-all group duration-200 ${borderStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-violet-500 text-white' : 'bg-slate-950 text-slate-500 group-hover:text-slate-300'
                  }`}>
                    {letter}
                  </span>
                  <span>{option}</span>
                </div>
                {checkIcon}
              </button>
            );
          })}
        </div>

        {/* Validation Feedback & Explanations (Training Mode Only) */}
        {type !== 'Blanc' && isQuestionValidated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border text-xs leading-relaxed ${
              validationInfo.isCorrect 
                ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300' 
                : 'bg-red-950/10 border-red-800/40 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1.5">
              {validationInfo.isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Excellent !</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400">Incorrect. La réponse correcte était {String.fromCharCode(65 + q.correctAnswer)}.</span>
                </>
              )}
            </div>
            <p className="mt-1 leading-normal font-medium text-slate-200">
              <span className="font-bold text-violet-400">Explication :</span> {q.explanation}
            </p>
            {q.isRecurrent && q.reoccurrenceProbability && (
              <div className="mt-2.5 inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                <HelpCircle className="h-3 w-3" />
                <span>Question récurrente ({q.reoccurrenceProbability}% de chance de tomber à l'examen)</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 disabled:opacity-30 text-slate-300 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Précédent
        </button>

        {type !== 'Blanc' && !isQuestionValidated ? (
          <button
            onClick={handleValidateAnswer}
            disabled={!isQuestionAnswered}
            className="px-6 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-500 disabled:opacity-40 text-sm font-semibold transition-all shadow-lg shadow-violet-500/10"
          >
            Valider
          </button>
        ) : (
          null
        )}

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            disabled={submitting}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/10"
          >
            {submitting ? 'Enregistrement...' : 'Terminer l\'examen'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={type !== 'Blanc' && !isQuestionValidated}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 disabled:opacity-30 text-slate-300 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
