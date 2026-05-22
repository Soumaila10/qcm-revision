import React, { useEffect, useState } from 'react';
import { questionService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Download, Upload, ShieldAlert, 
  Search, Check, X, AlertTriangle, BookOpen, RefreshCw 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { user, demoMode } = useAuth();
  const navigate = useNavigate();

  // Authentication check
  if (user && !user.isAdmin) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <ShieldAlert className="h-16 w-16 text-rose-500 mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-white">Accès Réservé</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Désolé, cet espace est strictement réservé aux administrateurs de la plateforme FEDE Master.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 transition-all text-sm font-semibold"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  // Lists & Filters state
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null); // If null, we are creating
  const [formData, setFormData] = useState({
    category: 'Management de Projet',
    subcategory: '',
    difficulty: 'Moyen',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    tags: '',
    year: '',
    source: '',
    isRecurrent: false,
    reoccurrenceProbability: 80
  });

  // Notification state
  const [notification, setNotification] = useState(null);

  // Bulk Import state
  const [importJson, setImportJson] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterCategory) params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;
      const data = await questionService.getAll(params);
      setQuestions(data);
    } catch (e) {
      showNotif('Erreur de récupération des questions.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filterCategory]);

  const showNotif = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreateModal = () => {
    setEditingQuestion(null);
    setFormData({
      category: 'Management de Projet',
      subcategory: '',
      difficulty: 'Moyen',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      tags: '',
      year: '',
      source: '',
      isRecurrent: false,
      reoccurrenceProbability: 80
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    setEditingQuestion(q);
    setFormData({
      category: q.category,
      subcategory: q.subcategory || '',
      difficulty: q.difficulty || 'Moyen',
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
      tags: q.tags ? q.tags.join(', ') : '',
      year: q.year || '',
      source: q.source || '',
      isRecurrent: q.isRecurrent || false,
      reoccurrenceProbability: q.reoccurrenceProbability || 80
    });
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) return;
    try {
      if (demoMode) {
        // Mock delete in Local Session
        setQuestions(prev => prev.filter(item => item._id !== id));
        showNotif('Question supprimée (Simulé en mode Démo).');
      } else {
        await questionService.delete(id);
        fetchQuestions();
        showNotif('Question supprimée avec succès.');
      }
    } catch (e) {
      showNotif('Échec de la suppression.', 'error');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.question.trim()) return showNotif('La question est obligatoire.', 'error');
    if (formData.options.some(opt => !opt.trim())) return showNotif('Les 4 options sont obligatoires.', 'error');
    if (!formData.explanation.trim()) return showNotif('L\'explication pédagogique est requise.', 'error');

    const formattedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      year: formData.year ? parseInt(formData.year) : undefined,
      correctAnswer: parseInt(formData.correctAnswer),
      reoccurrenceProbability: parseInt(formData.reoccurrenceProbability),
      tags: formattedTags
    };

    try {
      if (editingQuestion) {
        if (demoMode) {
          // Mock update
          setQuestions(prev => prev.map(item => item._id === editingQuestion._id ? { ...item, ...payload } : item));
          showNotif('Question mise à jour (Simulé en mode Démo).');
        } else {
          await questionService.update(editingQuestion._id, payload);
          fetchQuestions();
          showNotif('Question mise à jour avec succès.');
        }
      } else {
        if (demoMode) {
          // Mock create
          const newQ = { _id: 'mock_' + Date.now(), ...payload };
          setQuestions(prev => [newQ, ...prev]);
          showNotif('Question créée (Simulé en mode Démo).');
        } else {
          await questionService.create(payload);
          fetchQuestions();
          showNotif('Question créée avec succès.');
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      showNotif('Erreur lors de la sauvegarde.', 'error');
    }
  };

  // Bulk Import handler
  const handleBulkImport = async () => {
    if (!importJson.trim()) return showNotif('Veuillez entrer du code JSON valide.', 'error');
    
    setIsImporting(true);
    try {
      const parsed = JSON.parse(importJson);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      
      let importedCount = 0;
      for (const item of items) {
        if (!item.question || !item.options || item.options.length !== 4) continue;
        
        const payload = {
          category: item.category || 'Management de Projet',
          subcategory: item.subcategory || 'Divers',
          difficulty: item.difficulty || 'Moyen',
          question: item.question,
          options: item.options,
          correctAnswer: parseInt(item.correctAnswer || 0),
          explanation: item.explanation || 'Pas d\'explication fournie.',
          tags: item.tags || [],
          year: item.year ? parseInt(item.year) : undefined,
          source: item.source || '',
          isRecurrent: item.isRecurrent || false,
          reoccurrenceProbability: parseInt(item.reoccurrenceProbability || 80)
        };

        if (demoMode) {
          const newQ = { _id: 'mock_' + Math.random(), ...payload };
          setQuestions(prev => [newQ, ...prev]);
        } else {
          await questionService.create(payload);
        }
        importedCount++;
      }
      
      showNotif(`${importedCount} questions importées avec succès !`);
      setImportJson('');
      if (!demoMode) fetchQuestions();
    } catch (e) {
      showNotif('JSON invalide ou mal structuré.', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  // Export questions to JSON file
  const handleExportData = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'fede_master_questions.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showNotif('Fichier JSON téléchargé.');
  };

  return (
    <div className="space-y-8">
      {/* Notifications bar */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 border ${
              notification.type === 'error' 
                ? 'bg-red-950/80 border-red-800 text-red-200' 
                : 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
            }`}
          >
            {notification.type === 'error' ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
            <span className="text-xs font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Panel Administrateur
            {demoMode && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                Mode Démo local
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gérez la base de données des questions (QCM) de préparation aux examens FEDE.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="h-4 w-4" />
            Exporter JSON
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-violet-500/10 transition-all"
          >
            <Plus className="h-4 w-4" />
            Créer un QCM
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left side: Table / CRUD List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            
            {/* Filter controls */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 rounded-xl text-sm text-slate-100 placeholder-slate-600"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950/60 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 rounded-xl text-sm text-slate-300"
              >
                <option value="">Toutes catégories</option>
                <option value="Management de Projet">Management Projet</option>
                <option value="IT & Cybersécurité">IT & Cybersécurité</option>
                <option value="Annales">Annales</option>
              </select>

              <button
                onClick={fetchQuestions}
                className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="h-8 w-8 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                Aucune question trouvée.
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[550px]">
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-900">
                    <tr>
                      <th className="px-4 py-3">Question</th>
                      <th className="px-4 py-3">Catégorie</th>
                      <th className="px-4 py-3">Thème</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {questions.slice(0, 100).map(q => (
                      <tr key={q._id} className="hover:bg-slate-900/35 transition-colors">
                        <td className="px-4 py-3.5 max-w-xs truncate font-medium text-slate-200">
                          {q.question}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {q.category}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-medium">
                          {q.subcategory}
                        </td>
                        <td className="px-4 py-3.5 text-right space-x-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditModal(q)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-violet-400 border border-slate-800 rounded-lg inline-flex items-center"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q._id)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 rounded-lg inline-flex items-center"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {questions.length > 100 && (
                  <div className="p-3 text-center text-[10px] text-slate-500">
                    Affichage des 100 premières questions sur {questions.length} au total.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right side: Bulk Import panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="h-4.5 w-4.5 text-violet-400" />
              Import de Questions (JSON)
            </h2>
            <p className="text-[11px] text-slate-400 leading-normal">
              Collez un tableau JSON de questions structurées de manière identique au schéma (contenant les attributs <code>question</code>, <code>options</code>, <code>correctAnswer</code>, <code>explanation</code>).
            </p>

            <textarea
              rows={12}
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder={`[\n  {\n    "category": "Management de Projet",\n    "subcategory": "Scrum",\n    "difficulty": "Moyen",\n    "question": "Quelle est la durée d'un sprint ?",\n    "options": ["1-4 semaines", "6 mois", "1 jour", "Libre"],\n    "correctAnswer": 0,\n    "explanation": "La durée standard d'un sprint est de 1 à 4 semaines."\n  }\n]`}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-slate-300 placeholder-slate-700"
            />

            <button
              onClick={handleBulkImport}
              disabled={isImporting}
              className="w-full py-2.5 bg-slate-900 border border-slate-800 text-violet-400 hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              {isImporting ? 'Importation en cours...' : 'Lancer l\'importation'}
            </button>
          </div>
        </div>

      </div>

      {/* CRUD MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-2xl rounded-2xl border border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="p-5 border-b border-slate-900 flex justify-between items-center bg-slate-900/20">
                <h3 className="font-bold text-white text-base">
                  {editingQuestion ? 'Modifier le QCM' : 'Créer un nouveau QCM'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    >
                      <option value="Management de Projet">Management de Projet</option>
                      <option value="IT & Cybersécurité">IT & Cybersécurité</option>
                      <option value="Annales">Annales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Thème / Sous-catégorie</label>
                    <input
                      type="text"
                      placeholder="Ex: Scrum, Zero Trust, Gantt..."
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Difficulté</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    >
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Année (Annales)</label>
                    <input
                      type="number"
                      placeholder="Ex: 2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Source / Session</label>
                    <input
                      type="text"
                      placeholder="Ex: FEDE 2024"
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1 font-bold">Énoncé de la question</label>
                  <textarea
                    rows={3}
                    placeholder="Saisissez l'énoncé complet..."
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    required
                  />
                </div>

                {/* 4 Options */}
                <div className="space-y-2">
                  <label className="block text-slate-400 font-semibold">Options de réponses (4 obligatoires)</label>
                  {formData.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <span className="w-6 font-bold text-slate-500 text-center">{String.fromCharCode(65 + optIdx)}</span>
                      <input
                        type="text"
                        placeholder={`Option de réponse ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...formData.options];
                          updated[optIdx] = e.target.value;
                          setFormData({ ...formData, options: updated });
                        }}
                        className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Index de la bonne réponse</label>
                    <select
                      value={formData.correctAnswer}
                      onChange={(e) => setFormData({ ...formData, correctAnswer: parseInt(e.target.value) })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    >
                      <option value={0}>A</option>
                      <option value={1}>B</option>
                      <option value={2}>C</option>
                      <option value={3}>D</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-slate-400 font-bold">
                      <input
                        type="checkbox"
                        checked={formData.isRecurrent}
                        onChange={(e) => setFormData({ ...formData, isRecurrent: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-800 text-violet-500 focus:ring-violet-500/20"
                      />
                      <span>Question Récurrente</span>
                    </label>
                    
                    {formData.isRecurrent && (
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Probabilité (0-100)"
                          value={formData.reoccurrenceProbability}
                          onChange={(e) => setFormData({ ...formData, reoccurrenceProbability: e.target.value })}
                          className="w-full p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                          min="0"
                          max="100"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Explication pédagogique (Sert de révision)</label>
                  <textarea
                    rows={3}
                    placeholder="Détaillez la correction pour aider l'étudiant à comprendre la bonne réponse..."
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tags (Séparés par des virgules)</label>
                  <input
                    type="text"
                    placeholder="Ex: agile, scrum, planification, reseau, tcp"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-900">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-semibold hover:bg-slate-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-500 hover:to-indigo-500 font-semibold text-white"
                  >
                    Enregistrer
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
