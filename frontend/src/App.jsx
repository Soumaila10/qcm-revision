import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import QCMEnginePage from './pages/QCMEnginePage';
import AnnalesPage from './pages/AnnalesPage';
import AdminPage from './pages/AdminPage';
import CoursesPage from './pages/CoursesPage';
import { 
  Award, BookOpen, Calendar, HelpCircle, LogOut, Menu, X, 
  LayoutDashboard, ShieldAlert, Sparkles, User, AlertCircle 
} from 'lucide-react';

// Wrapper for checking Authentication
const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider animate-pulse">Chargement de la session...</span>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return children;
};

// Navigation layout shell
const AppLayout = ({ children }) => {
  const { user, logout, demoMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cours & Fiches', path: '/cours', icon: BookOpen },
    { name: 'Annales FEDE', path: '/annales', icon: Calendar },
  ];

  if (user?.isAdmin) {
    navLinks.push({ name: 'Administration', path: '/admin', icon: ShieldAlert });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* MOBILE HEADER */}
      <header className="md:hidden w-full bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-4 py-4 flex justify-between items-center z-40 relative">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-1.5 rounded-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            FEDE MASTER
          </span>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* SIDEBAR SIDEBAR (Desktop) */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 glass-card border-r border-slate-850 shrink-0 flex flex-col justify-between py-6 px-4 z-40 transition-transform duration-300 md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2.5 px-2">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-xl shadow-md shadow-violet-500/10">
              <Award className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              FEDE MASTER
            </span>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/10' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile section at the bottom */}
        <div className="space-y-4 pt-4 border-t border-slate-850">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-violet-400 shrink-0">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-200 truncate">{user?.email?.split('@')[0]}</div>
              <div className="text-[10px] text-slate-500 truncate">{user?.email}</div>
            </div>
          </div>

          {demoMode && (
            <div className="mx-2 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-1.5 text-amber-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Mode Démo actif</span>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Se déconnecter</span>
          </button>
        </div>

      </aside>

      {/* Main Content Workspace Wrapper */}
      <main className="flex-1 px-4 md:px-8 py-8 overflow-y-auto z-10 relative">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main layout routing */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <AuthGuard>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </AuthGuard>
          } />
          <Route path="/qcm" element={
            <AuthGuard>
              <AppLayout>
                <QCMEnginePage />
              </AppLayout>
            </AuthGuard>
          } />
          <Route path="/annales" element={
            <AuthGuard>
              <AppLayout>
                <AnnalesPage />
              </AppLayout>
            </AuthGuard>
          } />
          <Route path="/cours" element={
            <AuthGuard>
              <AppLayout>
                <CoursesPage />
              </AppLayout>
            </AuthGuard>
          } />
          <Route path="/admin" element={
            <AuthGuard>
              <AppLayout>
                <AdminPage />
              </AppLayout>
            </AuthGuard>
          } />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
