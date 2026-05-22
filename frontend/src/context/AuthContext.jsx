import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, checkBackendHealth } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false, database: false });

  // Check health and load user on startup
  useEffect(() => {
    const initAuth = async () => {
      try {
        const health = await checkBackendHealth();
        setBackendStatus({ checked: true, ...health });
        setDemoMode(authService.isDemoMode());

        const token = localStorage.getItem('fede_master_token');
        if (token) {
          const userData = await authService.getMe();
          setUser(userData);
        }
      } catch (error) {
        console.warn('Initialisation Auth échouée:', error.message);
        // Clean token if invalid
        localStorage.removeItem('fede_master_token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      setDemoMode(authService.isDemoMode());
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.register(email, password);
      setUser(userData);
      setDemoMode(authService.isDemoMode());
      return userData;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = async (provider, token = null) => {
    setLoading(true);
    try {
      let userData;
      if (demoMode) {
        userData = await authService.loginOAuthMock(provider);
      } else if (token) {
        localStorage.setItem('fede_master_token', token);
        userData = await authService.getMe();
      } else {
        throw new Error('Token requis pour la connexion OAuth en ligne');
      }
      setUser(userData);
      setDemoMode(authService.isDemoMode());
      return userData;
    } catch (error) {
      if (!demoMode) {
        localStorage.removeItem('fede_master_token');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (e) {
      console.warn("Échec du rafraîchissement utilisateur", e);
    }
  };

  const value = {
    user,
    loading,
    demoMode,
    backendStatus,
    login,
    register,
    oauthLogin,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
};
