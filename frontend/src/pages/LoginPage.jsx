import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Shield, Award, CheckCircle, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login, register, oauthLogin, demoMode } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
        setSuccess('Inscription réussie ! Connexion en cours...');
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    setError('');
    setSuccess('');

    if (demoMode) {
      setLoading(true);
      setTimeout(async () => {
        try {
          await oauthLogin(provider);
          setSuccess(`Connexion réussie avec ${provider === 'google' ? 'Google' : 'GitHub'} (Mode Démo) !`);
        } catch (err) {
          setError(err.message || `Une erreur est survenue lors de la connexion ${provider}`);
        } finally {
          setLoading(false);
        }
      }, 800);
      return;
    }

    const width = 600;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const baseUrl = API_BASE_URL.startsWith('http') ? API_BASE_URL : '';
    const url = `${baseUrl}/api/auth/${provider}`;
    const popup = window.open(
      url,
      `Connexion avec ${provider}`,
      `width=${width},height=${height},top=${top},left=${left},status=no,resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      setError('Veuillez autoriser les fenêtres contextuelles (popups) pour vous connecter avec Google ou GitHub.');
      return;
    }

    const messageListener = async (event) => {
      if (event.data && (event.data.token || event.data.error)) {
        window.removeEventListener('message', messageListener);
        popup.close();

        if (event.data.error) {
          setError(event.data.error);
        } else if (event.data.token) {
          setLoading(true);
          try {
            await oauthLogin(provider, event.data.token);
            setSuccess('Connexion réussie !');
          } catch (err) {
            setError(err.message || 'Impossible de charger votre profil.');
          } finally {
            setLoading(false);
          }
        }
      }
    };

    window.addEventListener('message', messageListener);

    const popupTimer = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupTimer);
        window.removeEventListener('message', messageListener);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center items-center gap-3">
          <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/20">
            <Award className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            FEDE MASTER
          </span>
        </div>
        <h2 className="mt-6 text-center text-sm font-medium text-slate-400">
          Mastère Manager de Projet Informatique (5e année)
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="glass-card py-8 px-4 sm:px-10 rounded-2xl shadow-2xl relative border border-slate-800">
          
          {/* Header Toggle */}
          <div className="flex border-b border-slate-800 mb-6 pb-2">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 text-center font-semibold text-sm pb-2.5 transition-colors ${
                isLogin ? 'text-violet-400 border-b-2 border-violet-500' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Se Connecter
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 text-center font-semibold text-sm pb-2.5 transition-colors ${
                !isLogin ? 'text-violet-400 border-b-2 border-violet-500' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Créer un Compte
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-950/40 border border-red-800/60 text-red-300 rounded-lg text-xs flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-950/40 border border-green-800/60 text-green-300 rounded-lg text-xs flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Adresse Email
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm text-slate-100 placeholder-slate-600 transition-colors"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm text-slate-100 placeholder-slate-600 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-violet-500/10"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isLogin ? (
                  'Se connecter'
                ) : (
                  'S\'inscrire'
                )}
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-500 text-[10px] uppercase tracking-wider font-bold">ou</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900 transition-all hover:text-white disabled:opacity-50"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-900 transition-all hover:text-white disabled:opacity-50"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
