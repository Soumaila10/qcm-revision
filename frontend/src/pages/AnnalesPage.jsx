import React, { useEffect, useState } from 'react';
import { questionService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Percent, Sparkles, Star, ChevronDown, 
  ChevronUp, Play, BookOpen, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AnnalesPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [recurrentOnly, setRecurrentOnly] = useState(false);
  const [selectedSubcat, setSelectedSubcat] = useState('');
  
  // Data state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Load questions and subcategories
  const loadData = async () => {
    setLoading(true);
    try {
      const params = {
        category: 'Annales'
      };
      if (selectedYear) params.year = selectedYear;
      if (recurrentOnly) params.isRecurrent = 'true';
      if (selectedSubcat) params.subcategory = selectedSubcat;
      if (searchTerm) params.search = searchTerm;

      const data = await questionService.getAll(params);
      setQuestions(data);

      // Extract unique subcategories from all Annales questions once on start
      if (subcategories.length === 0) {
        const allAnnales = await questionService.getAll({ category: 'Annales' });
        const subcats = [...new Set(allAnnales.map(q => q.subcategory))].filter(Boolean);
        setSubcategories(subcats);
      }
    } catch (e) {
      console.error('Erreur de chargement des annales:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (user && user.favorites) {
      setFavorites(user.favorites);
    }
  }, [selectedYear, recurrentOnly, selectedSubcat, user]);

  // Handle search with button click or enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
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

  const startPractice = () => {
    // Generate navigation path to QCM engine with selected filters
    let url = `/qcm?type=Entraînement&category=Annales`;
    if (selectedYear) url += `&year=${selectedYear}`;
    if (recurrentOnly) url += `&isRecurrent=true`;
    if (selectedSubcat) url += `&subcategory=${encodeURIComponent(selectedSubcat)}`;
    navigate(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Annales FEDE</h1>
          <p className="text-slate-400 text-sm mt-1">
            Naviguez dans les questions des examens précédents et analysez les probabilités de réoccurrence.
          </p>
        </div>
        <div>
          <button
            onClick={startPractice}
            disabled={questions.length === 0}
            className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-40 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 transition-all"
          >
            <Play className="h-4 w-4 fill-white" />
            S'entraîner sur cette sélection ({questions.length})
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Rechercher par mot-clé, tag, protocole..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 rounded-xl text-sm text-slate-100 placeholder-slate-600 transition-colors"
            />
          </div>

          {/* Year filter */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 rounded-xl text-sm text-slate-300 transition-colors"
            >
              <option value="">Toutes les années</option>
              <option value="2025">Session 2025</option>
              <option value="2024">Session 2024</option>
              <option value="2023">Session 2023</option>
              <option value="2022">Session 2022</option>
              <option value="2021">Session 2021</option>
            </select>
          </div>

          {/* Subcategory filter */}
          <div>
            <select
              value={selectedSubcat}
              onChange={(e) => setSelectedSubcat(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 rounded-xl text-sm text-slate-300 transition-colors"
            >
              <option value="">Tous les thèmes</option>
              {subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

        </form>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/60">
          {/* Recurrent Only checkbox */}
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-400 select-none">
            <input
              type="checkbox"
              checked={recurrentOnly}
              onChange={(e) => setRecurrentOnly(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-orange-500 focus:ring-orange-500/20"
            />
            <span>Afficher uniquement les questions récurrentes</span>
          </label>

          <button 
            onClick={loadData}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Actualiser
          </button>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="h-10 w-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider animate-pulse">Chargement des questions d'annales...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-800 text-slate-500 space-y-3">
          <AlertCircle className="h-10 w-10 mx-auto text-slate-600" />
          <h3 className="font-bold text-white text-base">Aucun résultat</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Aucune question ne correspond à vos critères de filtrage. Essayez de désélectionner certains filtres ou de modifier votre terme de recherche.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => {
            const isExpanded = expandedQuestionId === q._id;
            return (
              <div 
                key={q._id}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700/80 transition-colors duration-200"
              >
                {/* Header panel */}
                <div 
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q._id)}
                  className="p-5 flex justify-between items-start gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="px-2.5 py-0.5 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400 font-bold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        FEDE {q.year || 'Annale'}
                      </span>
                      <span className="text-slate-400 font-bold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                        {q.subcategory}
                      </span>
                      <span className={`px-2 py-0.5 rounded border font-semibold ${
                        q.difficulty === 'Facile' ? 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5' :
                        q.difficulty === 'Moyen' ? 'text-cyan-400 border-cyan-500/10 bg-cyan-500/5' :
                        'text-rose-400 border-rose-500/10 bg-rose-500/5'
                      }`}>
                        {q.difficulty}
                      </span>
                      {q.isRecurrent && (
                        <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 font-black flex items-center gap-0.5 badge-glow">
                          <Sparkles className="h-2.5 w-2.5" />
                          Récurrent ({q.reoccurrenceProbability || 80}%)
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-white leading-normal pr-4">
                      {q.question}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(q._id);
                      }}
                      className="text-slate-600 hover:text-yellow-500 transition-colors p-1"
                    >
                      <Star className={`h-5 w-5 ${favorites.includes(q._id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    </button>
                    <div className="text-slate-500 hover:text-slate-300">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="border-t border-slate-900 bg-slate-950/40 overflow-hidden"
                    >
                      <div className="p-5 space-y-4 text-xs">
                        
                        {/* Options */}
                        <div className="space-y-2">
                          <span className="font-semibold text-slate-400 block mb-1">Choix possibles :</span>
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = optIdx === q.correctAnswer;
                            return (
                              <div 
                                key={optIdx} 
                                className={`p-3 rounded-xl border flex items-center justify-between ${
                                  isCorrect 
                                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 font-semibold' 
                                    : 'bg-slate-900/40 border-slate-800 text-slate-400'
                                }`}
                              >
                                <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                                {isCorrect && <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Correct</span>}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                          <span className="font-bold text-violet-400 block">Explication pédagogique :</span>
                          <p className="text-slate-300 leading-relaxed font-medium">{q.explanation}</p>
                        </div>

                        {/* Tags list */}
                        {q.tags && q.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {q.tags.map(t => (
                              <span key={t} className="bg-slate-900 text-slate-500 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
