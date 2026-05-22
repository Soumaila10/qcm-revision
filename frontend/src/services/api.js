import { frontendQuestionsList } from './questionsData';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';


// Determine if we should use mock mode (fallback when backend is down)
let useMockMode = localStorage.getItem('fede_master_demo_mode') === 'true';

// Helper to get auth headers
const getHeaders = () => {
  const token = localStorage.getItem('fede_master_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// Check backend health on startup
export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (res.ok) {
      const data = await res.json();
      if (data.database === 'connected') {
        console.log('Backend et MongoDB détectés. Mode API actif.');
        useMockMode = false;
        localStorage.setItem('fede_master_demo_mode', 'false');
        return { online: true, database: true };
      } else {
        console.warn('Backend en ligne mais MongoDB déconnecté. Passage en mode Démo local.');
        useMockMode = true;
        localStorage.setItem('fede_master_demo_mode', 'true');
        return { online: true, database: false };
      }
    }
  } catch (e) {
    console.warn('Serveur backend injoignable. Passage en mode Démo local.');
    useMockMode = true;
    localStorage.setItem('fede_master_demo_mode', 'true');
  }
  return { online: false, database: false };
};

// ==========================================
// MOCK IMPLEMENTATION (LOCAL STORAGE)
// ==========================================
const mockDb = {
  getUsers: () => JSON.parse(localStorage.getItem('mock_users') || '[]'),
  saveUsers: (users) => localStorage.setItem('mock_users', JSON.stringify(users)),
  
  getCurrentUser: () => {
    const email = localStorage.getItem('mock_current_user_email');
    if (!email) return null;
    const users = mockDb.getUsers();
    return users.find(u => u.email === email) || null;
  },
  
  saveCurrentUser: (user) => {
    const users = mockDb.getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
      mockDb.saveUsers(users);
    }
  },

  getExams: () => {
    const user = mockDb.getCurrentUser();
    if (!user) return [];
    const allExams = JSON.parse(localStorage.getItem('mock_exams') || '[]');
    return allExams.filter(e => e.userId === user.email);
  },

  saveExam: (exam) => {
    const allExams = JSON.parse(localStorage.getItem('mock_exams') || '[]');
    allExams.push(exam);
    localStorage.setItem('mock_exams', JSON.stringify(allExams));
  }
};


const updateLocalStreak = (user) => {
  const now = new Date();
  const lastActive = new Date(user.lastActive);
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
  
  const diffTime = Math.abs(today - lastActiveDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    user.streak += 1;
  } else if (diffDays > 1) {
    user.streak = 1;
  } else if (user.streak === 0) {
    user.streak = 1;
  }
  
  if (user.streak >= 3 && !user.badges.includes('streak_3')) {
    user.badges.push('streak_3');
  }
  if (user.streak >= 7 && !user.badges.includes('streak_7')) {
    user.badges.push('streak_7');
  }

  user.lastActive = now.toISOString();
  mockDb.saveCurrentUser(user);
  return user;
};

const mockAuthService = {
  register: async (email, password) => {
    const users = mockDb.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Cet email est déjà utilisé');
    }
    const newUser = {
      email,
      password,
      isAdmin: false,
      streak: 1,
      lastActive: new Date().toISOString(),
      badges: ['pionnier'],
      favorites: [],
      categoryPerformance: {}
    };
    users.push(newUser);
    mockDb.saveUsers(users);
    localStorage.setItem('mock_current_user_email', email);
    localStorage.setItem('fede_master_token', 'mock_token_' + email);
    return newUser;
  },

  login: async (email, password) => {
    const users = mockDb.getUsers();
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      throw new Error('Identifiants invalides');
    }
    localStorage.setItem('mock_current_user_email', email);
    localStorage.setItem('fede_master_token', 'mock_token_' + email);
    const updated = updateLocalStreak(user);
    return updated;
  },

  getMe: async () => {
    const user = mockDb.getCurrentUser();
    if (!user) throw new Error('Non authentifié');
    return updateLocalStreak(user);
  },

  loginOAuthMock: async (provider) => {
    const email = `${provider}.eleve@fede.fr`;
    const users = mockDb.getUsers();
    let user = users.find(u => u.email === email);
    if (!user) {
      user = {
        email,
        password: 'oauth_dummy_password',
        isAdmin: false,
        streak: 1,
        lastActive: new Date().toISOString(),
        badges: ['pionnier'],
        favorites: [],
        categoryPerformance: {}
      };
      users.push(user);
      mockDb.saveUsers(users);
    }
    localStorage.setItem('mock_current_user_email', email);
    localStorage.setItem('fede_master_token', 'mock_token_' + email);
    const updated = updateLocalStreak(user);
    return updated;
  }
};

const mockQuestionService = {
  getAll: async (params = {}) => {
    let list = [...frontendQuestionsList];
    if (params.category) list = list.filter(q => q.category === params.category);
    if (params.subcategory) list = list.filter(q => q.subcategory === params.subcategory);
    if (params.difficulty) list = list.filter(q => q.difficulty === params.difficulty);
    if (params.year) list = list.filter(q => q.year === parseInt(params.year));
    if (params.isRecurrent) list = list.filter(q => q.isRecurrent === (params.isRecurrent === 'true'));
    
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter(q => 
        q.question.toLowerCase().includes(s) || 
        q.explanation.toLowerCase().includes(s) ||
        q.tags.some(t => t.toLowerCase().includes(s))
      );
    }
    return list;
  },

  getById: async (id) => {
    const q = frontendQuestionsList.find(q => q._id === id);
    if (!q) throw new Error('Question non trouvée');
    return q;
  },

  toggleFavorite: async (id) => {
    const user = mockDb.getCurrentUser();
    if (!user) throw new Error('Non authentifié');
    if (!user.favorites) user.favorites = [];
    
    const idx = user.favorites.indexOf(id);
    if (idx === -1) {
      user.favorites.push(id);
    } else {
      user.favorites.splice(idx, 1);
    }
    mockDb.saveCurrentUser(user);
    return { favorites: user.favorites };
  },

  getAdaptive: async () => {
    const exams = mockDb.getExams();
    const user = mockDb.getCurrentUser();
    
    const questionHistory = {};
    exams.forEach(exam => {
      exam.questions.forEach((qId, idx) => {
        const q = frontendQuestionsList.find(item => item._id === qId);
        if (!q) return;
        const isCorrect = exam.userAnswers[idx] === q.correctAnswer;
        
        if (!questionHistory[qId]) {
          questionHistory[qId] = { attempts: 0, correct: 0 };
        }
        questionHistory[qId].attempts += 1;
        if (isCorrect) questionHistory[qId].correct += 1;
        questionHistory[qId].lastResult = isCorrect;
        questionHistory[qId].subcategory = q.subcategory;
      });
    });

    const failedIds = Object.keys(questionHistory).filter(id => !questionHistory[id].lastResult);
    let adaptive = frontendQuestionsList.filter(q => failedIds.includes(q._id));

    if (adaptive.length < 10) {
      const needed = 10 - adaptive.length;
      const attempted = Object.keys(questionHistory);
      const remaining = frontendQuestionsList.filter(
        q => !attempted.includes(q._id) && !adaptive.some(a => a._id === q._id)
      );
      adaptive = [...adaptive, ...remaining.slice(0, needed)];
      
      if (adaptive.length < 10) {
        const stillNeeded = 10 - adaptive.length;
        const randoms = frontendQuestionsList.filter(q => !adaptive.some(a => a._id === q._id));
        adaptive = [...adaptive, ...randoms.slice(0, stillNeeded)];
      }
    }

    return adaptive.slice(0, 10);
  }
};

const mockExamService = {
  generate: async ({ count = 20, category, type = 'Entraînement' }) => {
    let list = [...frontendQuestionsList];
    if (category) {
      list = list.filter(q => q.category === category);
    }
    
    // Shuffle and sample
    const shuffled = list.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, parseInt(count));
  },

  submit: async ({ questionIds, userAnswers, timeSpent, type }) => {
    const user = mockDb.getCurrentUser();
    if (!user) throw new Error('Non authentifié');

    let score = 0;
    const performanceDelta = {};

    questionIds.forEach((qId, index) => {
      const q = frontendQuestionsList.find(item => item._id === qId);
      if (!q) return;
      const isCorrect = userAnswers[index] === q.correctAnswer;
      if (isCorrect) score += 1;

      const cat = q.category;
      if (!performanceDelta[cat]) {
        performanceDelta[cat] = { attempts: 0, correct: 0 };
      }
      performanceDelta[cat].attempts += 1;
      if (isCorrect) performanceDelta[cat].correct += 1;
    });

    const exam = {
      _id: 'mock_exam_' + Date.now(),
      userId: user.email,
      questions: questionIds,
      userAnswers,
      score,
      timeSpent,
      totalQuestions: questionIds.length,
      type,
      createdAt: new Date().toISOString()
    };

    mockDb.saveExam(exam);

    // Update user stats
    if (!user.categoryPerformance) user.categoryPerformance = {};
    
    Object.keys(performanceDelta).forEach(cat => {
      if (!user.categoryPerformance[cat]) {
        user.categoryPerformance[cat] = { attempts: 0, correct: 0 };
      }
      user.categoryPerformance[cat].attempts += performanceDelta[cat].attempts;
      user.categoryPerformance[cat].correct += performanceDelta[cat].correct;
    });

    const newBadges = [];
    if (!user.badges.includes('premier_pas')) {
      user.badges.push('premier_pas');
      newBadges.push('premier_pas');
    }
    if (score === questionIds.length && questionIds.length >= 10 && !user.badges.includes('sans_faute')) {
      user.badges.push('sans_faute');
      newBadges.push('sans_faute');
    }
    if (questionIds.length === 60 && !user.badges.includes('survivor')) {
      user.badges.push('survivor');
      newBadges.push('survivor');
    }

    let totalAttempts = 0;
    let totalCorrect = 0;
    Object.keys(user.categoryPerformance).forEach(cat => {
      totalAttempts += user.categoryPerformance[cat].attempts;
      totalCorrect += user.categoryPerformance[cat].correct;
    });

    if (totalAttempts >= 30 && (totalCorrect / totalAttempts) >= 0.8 && !user.badges.includes('fede_expert')) {
      user.badges.push('fede_expert');
      newBadges.push('fede_expert');
    }

    mockDb.saveCurrentUser(user);

    return {
      exam,
      newBadges
    };
  },

  getHistory: async () => {
    const exams = mockDb.getExams();
    // Populate questions list
    return exams.map(e => ({
      ...e,
      questions: e.questions.map(qId => frontendQuestionsList.find(q => q._id === qId)).filter(Boolean)
    })).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getStats: async () => {
    const exams = mockDb.getExams();
    const user = mockDb.getCurrentUser();

    if (exams.length === 0) {
      return {
        hasData: false,
        globalAccuracy: 0,
        totalQuestionsAnswered: 0,
        totalExamsCount: 0,
        averageTimePerQuestion: 0,
        streak: user?.streak || 0,
        badges: user?.badges || [],
        recentExams: [],
        categoryAccuracy: []
      };
    }

    let totalQuestionsAnswered = 0;
    let totalCorrectAnswers = 0;
    let totalTimeSpent = 0;

    const categoryStats = {
      'Management de Projet': { total: 0, correct: 0 },
      'IT & Cybersécurité': { total: 0, correct: 0 },
      'Annales': { total: 0, correct: 0 }
    };

    const subcategoryStats = {};

    exams.forEach(exam => {
      totalQuestionsAnswered += exam.totalQuestions;
      totalTimeSpent += exam.timeSpent;

      exam.questions.forEach((qId, index) => {
        const q = frontendQuestionsList.find(item => item._id === qId);
        if (!q) return;
        const isCorrect = exam.userAnswers[index] === q.correctAnswer;
        if (isCorrect) totalCorrectAnswers += 1;

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

    const globalAccuracy = Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100);
    const averageTimePerQuestion = Math.round(totalTimeSpent / totalQuestionsAnswered);

    const categoryAccuracyData = Object.keys(categoryStats).map(cat => ({
      name: cat,
      accuracy: categoryStats[cat].total > 0 
        ? Math.round((categoryStats[cat].correct / categoryStats[cat].total) * 100) 
        : 0,
      total: categoryStats[cat].total
    })).filter(c => c.total > 0);

    const recentExamsData = exams.slice(-10).map((exam, index) => ({
      name: `Examen ${index + 1}`,
      score: Math.round((exam.score / exam.totalQuestions) * 20),
      accuracy: Math.round((exam.score / exam.totalQuestions) * 100),
      date: new Date(exam.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      type: exam.type
    }));

    const weeklyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
      const dayDateString = d.toDateString();

      const dailyCount = exams
        .filter(exam => new Date(exam.createdAt).toDateString() === dayDateString)
        .reduce((sum, exam) => sum + exam.totalQuestions, 0);

      weeklyActivity.push({
        day: dayName,
        count: dailyCount
      });
    }

    const subList = Object.keys(subcategoryStats).map(sub => ({
      name: sub,
      accuracy: Math.round((subcategoryStats[sub].correct / subcategoryStats[sub].attempts) * 100),
      attempts: subcategoryStats[sub].attempts
    })).filter(s => s.attempts >= 1);

    const strengths = [...subList].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
    const weaknesses = [...subList].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);

    return {
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
    };
  }
};

// ==========================================
// UNIFIED EXPORTS (DYNAMIC DISPATCH)
// ==========================================
export const authService = {
  register: async (email, password) => {
    if (useMockMode) return mockAuthService.register(email, password);
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de l\'inscription');
    }
    const data = await res.json();
    localStorage.setItem('fede_master_token', data.token);
    return data;
  },

  login: async (email, password) => {
    if (useMockMode) return mockAuthService.login(email, password);
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la connexion');
    }
    const data = await res.json();
    localStorage.setItem('fede_master_token', data.token);
    return data;
  },

  getMe: async () => {
    if (useMockMode) return mockAuthService.getMe();
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: getHeaders()
    });
    if (!res.ok) {
      throw new Error('Non authentifié');
    }
    return res.json();
  },

  logout: () => {
    localStorage.removeItem('fede_master_token');
    localStorage.removeItem('mock_current_user_email');
  },

  loginOAuthMock: async (provider) => {
    if (useMockMode) return mockAuthService.loginOAuthMock(provider);
    throw new Error('Non disponible en mode en ligne');
  },

  isDemoMode: () => useMockMode
};

export const questionService = {
  getAll: async (params) => {
    if (useMockMode) return mockQuestionService.getAll(params);
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/api/questions?${query}`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur de récupération des questions');
    return res.json();
  },

  getById: async (id) => {
    if (useMockMode) return mockQuestionService.getById(id);
    const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Question non trouvée');
    return res.json();
  },

  toggleFavorite: async (id) => {
    if (useMockMode) return mockQuestionService.toggleFavorite(id);
    const res = await fetch(`${API_BASE_URL}/api/questions/${id}/favorite`, {
      method: 'POST',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur lors du changement des favoris');
    return res.json();
  },

  getAdaptive: async () => {
    if (useMockMode) return mockQuestionService.getAdaptive();
    const res = await fetch(`${API_BASE_URL}/api/questions/adaptive`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur de révision adaptative');
    return res.json();
  },

  // Admin CRUD operations
  create: async (questionData) => {
    const res = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(questionData)
    });
    if (!res.ok) throw new Error('Erreur création de question');
    return res.json();
  },

  update: async (id, questionData) => {
    const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(questionData)
    });
    if (!res.ok) throw new Error('Erreur modification de question');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur suppression de question');
    return res.json();
  }
};

export const examService = {
  generate: async ({ count, category, type }) => {
    if (useMockMode) return mockExamService.generate({ count, category, type });
    const res = await fetch(`${API_BASE_URL}/api/exams/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ count, category, type })
    });
    if (!res.ok) throw new Error('Erreur de génération de l\'examen');
    return res.json();
  },

  submit: async ({ questionIds, userAnswers, timeSpent, type }) => {
    if (useMockMode) return mockExamService.submit({ questionIds, userAnswers, timeSpent, type });
    const res = await fetch(`${API_BASE_URL}/api/exams/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ questionIds, userAnswers, timeSpent, type })
    });
    if (!res.ok) throw new Error('Erreur de soumission de l\'examen');
    return res.json();
  },

  getHistory: async () => {
    if (useMockMode) return mockExamService.getHistory();
    const res = await fetch(`${API_BASE_URL}/api/exams/history`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur de récupération de l\'historique');
    return res.json();
  },

  getStats: async () => {
    if (useMockMode) return mockExamService.getStats();
    const res = await fetch(`${API_BASE_URL}/api/exams/stats`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erreur de récupération des statistiques');
    return res.json();
  }
};
