const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fede_master';

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examRoutes);

// Health check endpoint
app.use('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erreur Serveur:', err.stack);
  res.status(500).json({
    message: 'Une erreur interne est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Connect to MongoDB & Start Server
const startServer = async () => {
  console.log('Connexion à la base de données...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion MongoDB établie.');
  } catch (error) {
    console.error('Attention: Impossible de se connecter à MongoDB. Le serveur tourne sans base de données (Mode Démo local actif sur le front). Erreur:', error.message);
  }
  
  app.listen(PORT, () => {
    console.log(`Serveur FEDE Master démarré sur le port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
  });
};

startServer();
