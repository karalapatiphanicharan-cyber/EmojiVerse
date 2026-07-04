import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Studio = lazy(() => import('./pages/Studio'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Templates = lazy(() => import('./pages/Templates'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));
import { ToastProvider } from './context/ToastContext';
import Toast from './components/common/Toast';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-studio-bg selection:bg-studio-accent/30">
          <Navbar />
          <Toast />
          <main>
            <AnimatedRoutes />
          </main>

        {/* Decorative elements */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="skeuo-raised w-14 h-14 flex items-center justify-center text-2xl bg-white cursor-help group">
            ❓
            <div className="absolute bottom-full right-0 mb-4 w-48 p-4 skeuo-card bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-xs font-bold text-gray-600">
              Need help? Reach out to the EmojiVerse team!
            </div>
          </div>
        </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
