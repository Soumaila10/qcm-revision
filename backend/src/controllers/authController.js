const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretjwtkeyfedemaster2026premium', {
    expiresIn: '30d'
  });
};

// Helper to update user streak
const updateStreak = (user) => {
  const now = new Date();
  const lastActive = new Date(user.lastActive);
  
  // Reset hours to compare only days
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
  
  const diffTime = Math.abs(today - lastActiveDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Active yesterday, increment streak
    user.streak += 1;
  } else if (diffDays > 1) {
    // Missed a day or more, reset streak
    user.streak = 1;
  } else if (user.streak === 0) {
    // First time login
    user.streak = 1;
  }
  
  // Award badges based on streak
  if (user.streak >= 3 && !user.badges.includes('streak_3')) {
    user.badges.push('streak_3');
  }
  if (user.streak >= 7 && !user.badges.includes('streak_7')) {
    user.badges.push('streak_7');
  }

  user.lastActive = now;
  return user;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    let user = new User({
      email,
      password: hashedPassword,
      streak: 1,
      lastActive: new Date(),
      badges: ['pionnier']
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      streak: user.streak,
      badges: user.badges,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Update daily activity streak
    user = updateStreak(user);
    await user.save();

    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      streak: user.streak,
      badges: user.badges,
      favorites: user.favorites,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user = updateStreak(user);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Erreur profile:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Initiate Google OAuth Flow
// @route   GET /api/auth/google
// @access  Public
exports.googleAuth = (req, res) => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';
  
  if (!clientID) {
    // Simulation mode
    return res.redirect(`/api/auth/google/callback?code=mock_google_code`);
  }
  
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=profile%20email`;
  res.redirect(googleAuthURL);
};

// @desc    Google OAuth Callback
// @route   GET /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res) => {
  const { code } = req.query;
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

  let email = '';
  
  try {
    if (!clientID || code === 'mock_google_code') {
      // Simulation mode
      email = 'google.eleve@fede.fr';
    } else {
      // Exchange code for token
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uri: callbackURL,
          grant_type: 'authorization_code'
        })
      });
      
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) {
        throw new Error(tokenData.error_description || 'Impossible d\'échanger le code Google');
      }

      // Fetch user profile
      const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      const userData = await userRes.json();
      if (!userRes.ok) {
        throw new Error('Impossible de récupérer le profil Google');
      }
      
      email = userData.email;
    }

    if (!email) {
      throw new Error('Email non fourni par Google');
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
      user = new User({
        email,
        password: hashedPassword,
        streak: 1,
        lastActive: new Date(),
        badges: ['pionnier']
      });
      await user.save();
    } else {
      user = updateStreak(user);
      await user.save();
    }

    const token = generateToken(user._id);

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ token: "${token}" }, "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Erreur Google Callback:', error);
    const errMsg = error.message || "Erreur d'authentification Google";
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ error: "${errMsg}" }, "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
};

// @desc    Initiate GitHub OAuth Flow
// @route   GET /api/auth/github
// @access  Public
exports.githubAuth = (req, res) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const callbackURL = process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback';
  
  if (!clientID) {
    // Simulation mode
    return res.redirect(`/api/auth/github/callback?code=mock_github_code`);
  }
  
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(callbackURL)}&scope=user:email`;
  res.redirect(githubAuthURL);
};

// @desc    GitHub OAuth Callback
// @route   GET /api/auth/github/callback
// @access  Public
exports.githubCallback = async (req, res) => {
  const { code } = req.query;
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
  let email = '';
  
  try {
    if (!clientID || code === 'mock_github_code') {
      // Simulation mode
      email = 'github.eleve@fede.fr';
    } else {
      // Exchange code for token
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: clientID,
          client_secret: clientSecret,
          code
        })
      });
      
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || tokenData.error) {
        throw new Error(tokenData.error_description || 'Impossible d\'échanger le code GitHub');
      }

      // Fetch user profile
      const userRes = await fetch('https://api.github.com/user', {
        headers: { 
          Authorization: `token ${tokenData.access_token}`,
          'User-Agent': 'FEDE-Master-App'
        }
      });
      const userData = await userRes.json();
      
      email = userData.email;

      // Fetch emails if not public
      if (!email) {
        const emailsRes = await fetch('https://api.github.com/user/emails', {
          headers: { 
            Authorization: `token ${tokenData.access_token}`,
            'User-Agent': 'FEDE-Master-App'
          }
        });
        const emailsData = await emailsRes.json();
        const primaryEmail = emailsData.find(e => e.primary && e.verified);
        if (primaryEmail) {
          email = primaryEmail.email;
        } else if (emailsData.length > 0) {
          email = emailsData[0].email;
        }
      }
    }

    if (!email) {
      throw new Error('Email non fourni par GitHub');
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
      user = new User({
        email,
        password: hashedPassword,
        streak: 1,
        lastActive: new Date(),
        badges: ['pionnier']
      });
      await user.save();
    } else {
      user = updateStreak(user);
      await user.save();
    }

    const token = generateToken(user._id);

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ token: "${token}" }, "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Erreur GitHub Callback:', error);
    const errMsg = error.message || "Erreur d'authentification GitHub";
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ error: "${errMsg}" }, "*");
            window.close();
          </script>
        </body>
      </html>
    `);
  }
};
