import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { examService } from '../services/api';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Award, Flame, Calendar, Clock, CheckCircle2, BookOpen, ChevronRight, Play, AlertTriangle, ShieldCheck, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_BADGES = [
  { id: 'pionnier', name: 'Pionnier', desc: 'Création de compte sur FEDE Master', icon: ShieldCheck, color: 'from-blue-500 to-indigo-500' },
  { id: 'streak_3', name: 'Série de 3 jours', desc: 'Révisez 3 jours d\'affilée', icon: Flame, color: 'from-orange-500 to-red-500' },
  { id: 'streak_7', name: 'Série de 7 jours', desc: 'Révisez 7 jours d\'affilée', icon: Flame, color: 'from-amber-500 to-red-600' },
  { id: 'premier_pas', name: 'Premier Pas', desc: 'Premier examen blanc ou entraînement soumis', icon: CheckCircle2, color: 'from-emerald-500 to-teal-500' },
  { id: 'sans_faute', name: 'Sans Faute', desc: 'Score parfait de 100% sur au moins 10 questions', icon: Award, color: 'from-yellow-400 to-amber-600' },
  { id: 'survivor', name: 'Survivant', desc: 'Compléter un examen blanc complet de 60 questions', icon: Zap, color: 'from-purple-500 to-pink-500' },
  { id: 'fede_expert', name: 'Expert FEDE', desc: 'Plus de 30 questions répondues avec >80% de réussite', icon: Award, color: 'from-cyan-400 to-blue-600' }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await examService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="h-10 w-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const startExam = (type, category = null, count = 20) => {
    const url = `/qcm?type=${type}${category ? `&category=${encodeURIComponent(category)}` : ''}&count=${count}`;
    navigate(url);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Tableau de bord</h1>
          <p className="text-slate-400 text-sm mt-1">
            Préparez-vous efficacement à l'examen de Manager de Projet Informatique.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <Flame className={`h-5 w-5 ${stats?.streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-500'}`} />
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Streak Actuel</div>
              <div className="text-sm font-bold text-white">{stats?.streak || 0} Jour{stats?.streak > 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 glow-purple relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Taux de réussite</span>
            <Award className="h-5 w-5 text-violet-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">{stats?.globalAccuracy || 0}%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Moyenne générale sur tous les examens</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 glow-cyan relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Questions répondues</span>
            <BookOpen className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">{stats?.totalQuestionsAnswered || 0}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Questions validées en base</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 glow-amber relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Temps moyen</span>
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">{stats?.averageTimePerQuestion || 0}s</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Temps moyen par question QCM</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Examens blancs</span>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">{stats?.totalExamsCount || 0}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Sessions terminées et enregistrées</p>
        </div>
      </motion.div>

      {/* Main Grid for charts & actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Quick start & Streaks / Badges */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Quick Revision Modules */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Play className="h-4 w-4 text-violet-400 fill-violet-400" />
              Entraînements Rapides
            </h2>
            
            <div className="space-y-3">
              <button 
                onClick={() => startExam('Blanc', null, 60)}
                className="w-full text-left p-3.5 bg-gradient-to-r from-violet-950/40 to-indigo-950/20 hover:from-violet-900/40 hover:to-indigo-900/30 border border-violet-800/40 hover:border-violet-600/60 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-violet-200">Examen Blanc Complet</div>
                  <div className="text-xs text-violet-400/80 mt-0.5">60 questions • 60 minutes • Aléatoire</div>
                </div>
                <ChevronRight className="h-4 w-4 text-violet-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => startExam('Entraînement', 'Management de Projet', 20)}
                className="w-full text-left p-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-200">Management de Projet</div>
                  <div className="text-xs text-slate-400 mt-0.5">20 questions • Agile, Prince2, PERT, Budget</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => startExam('Entraînement', 'IT & Cybersécurité', 20)}
                className="w-full text-left p-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-200">IT & Cybersécurité</div>
                  <div className="text-xs text-slate-400 mt-0.5">20 questions • Docker, Zero Trust, OSPF, NoSQL</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => navigate('/annales')}
                className="w-full text-left p-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-200">Annales Officielles FEDE</div>
                  <div className="text-xs text-slate-400 mt-0.5">Filtres par année (2021-2025) & Récurrence</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => startExam('Adaptatif', null, 15)}
                className="w-full text-left p-3.5 bg-gradient-to-r from-cyan-950/40 to-blue-950/20 hover:from-cyan-900/40 hover:to-blue-900/30 border border-cyan-800/40 hover:border-cyan-600/60 rounded-xl flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-semibold text-sm text-cyan-200 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
                    Révision Adaptative
                  </div>
                  <div className="text-xs text-cyan-400/80 mt-0.5">Focus sur vos erreurs et lacunes passées</div>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Badges Collection */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              Badges débloqués ({stats?.badges?.length || 0} / {ALL_BADGES.length})
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {ALL_BADGES.map(badge => {
                const isUnlocked = stats?.badges?.includes(badge.id);
                const BadgeIcon = badge.icon;
                return (
                  <div key={badge.id} className="relative group flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-all ${
                      isUnlocked 
                        ? `bg-gradient-to-tr ${badge.color} border-transparent text-white shadow-lg badge-glow` 
                        : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}>
                      <BadgeIcon className="h-6 w-6" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center w-40 z-50">
                      <div className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded-lg p-2 text-center shadow-xl">
                        <p className="font-bold text-white">{badge.name}</p>
                        <p className="text-slate-400 text-[9px] mt-0.5">{badge.desc}</p>
                        {!isUnlocked && <p className="text-amber-500 font-semibold mt-1">🔒 Verrouillé</p>}
                      </div>
                      <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-800 transform rotate-45 -mt-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Right columns: Graphs and Performance breakdown */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Row */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-6">Progression Récente (en base 20)</h2>
            
            {stats?.recentExams?.length > 0 ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.recentExams} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" domain={[0, 20]} ticks={[0, 4, 8, 12, 16, 20]} fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      itemStyle={{ color: '#8b5cf6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8b5cf6" 
                      strokeWidth={3} 
                      activeDot={{ r: 6 }} 
                      name="Score final"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
                <AlertTriangle className="h-8 w-8 text-slate-600 mb-2" />
                Aucun examen passé pour le moment.
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category accuracy chart */}
            <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-white mb-4">Réussite par Catégorie</h2>
              {stats?.categoryAccuracy?.length > 0 ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.categoryAccuracy} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={9} />
                      <YAxis stroke="#64748b" domain={[0, 100]} fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                        itemStyle={{ color: '#06b6d4' }}
                      />
                      <Bar dataKey="accuracy" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Taux %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center text-slate-500 text-xs">
                  Données insuffisantes
                </div>
              )}
            </motion.div>

            {/* Strengths and Weaknesses */}
            <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white">Analyse Thématique</h2>
              
              {stats?.hasData ? (
                <div className="space-y-4 text-xs">
                  {/* Forces */}
                  <div>
                    <h3 className="text-slate-400 font-semibold mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Points forts
                    </h3>
                    <div className="space-y-2">
                      {stats.strengths && stats.strengths.length > 0 ? stats.strengths.map(s => (
                        <div key={s.name} className="flex justify-between items-center bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                          <span className="text-slate-300 font-medium">{s.name}</span>
                          <span className="text-emerald-400 font-bold">{s.accuracy}%</span>
                        </div>
                      )) : (
                        <p className="text-slate-500 italic">Pas assez de données</p>
                      )}
                    </div>
                  </div>

                  {/* Faiblesses */}
                  <div>
                    <h3 className="text-slate-400 font-semibold mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                      Points à travailler
                    </h3>
                    <div className="space-y-2">
                      {stats.weaknesses && stats.weaknesses.length > 0 ? stats.weaknesses.map(w => (
                        <div key={w.name} className="flex justify-between items-center bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                          <span className="text-slate-300 font-medium">{w.name}</span>
                          <span className="text-red-400 font-bold">{w.accuracy}%</span>
                        </div>
                      )) : (
                        <p className="text-slate-500 italic">Pas assez de données</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center text-slate-500 text-xs">
                  Passez un examen pour voir vos forces et faiblesses.
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
