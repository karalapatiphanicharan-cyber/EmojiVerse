import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Gallery from './pages/Gallery';
import About from './pages/About';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/common/Toast';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
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
