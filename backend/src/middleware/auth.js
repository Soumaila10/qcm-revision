const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyfedemaster2026premium');

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé, accès refusé' });
      }
      return next();
    } catch (error) {
      console.error('Erreur auth middleware:', error);
      return res.status(401).json({ message: 'Token invalide ou expiré, accès refusé' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Aucun token fourni, accès refusé' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit - Droits administrateur requis' });
  }
};

module.exports = { protect, admin };
