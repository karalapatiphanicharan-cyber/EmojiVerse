import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Palette, Image, Info, Zap, Library, Search, Settings } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Layout size={18} /> },
    { path: '/studio', label: 'Studio', icon: <Palette size={18} /> },
    { path: '/gallery', label: 'Gallery', icon: <Image size={18} /> },
    { path: '/templates', label: 'Templates', icon: <Library size={18} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Zap size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
  ];

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 skeuo-raised flex items-center gap-8 backdrop-blur-sm bg-studio-surface/90">
      <Link to="/" className="flex items-center gap-2 mr-4">
        <div className="w-10 h-10 flex items-center justify-center text-2xl skeuo-inner shadow-inner bg-studio-accent/10">
          🎨
        </div>
        <span className="font-bold text-xl tracking-tight">EmojiVerse</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-3 text-gray-400 hover:text-amber-500 transition-colors mr-2"
        >
          <Search size={18} />
        </button>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
              ${isActive
                ? 'skeuo-pressed text-studio-accent'
                : 'hover:bg-black/5 text-gray-600'}
            `}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <Link
        to="/settings"
        className="ml-4 p-3 text-gray-400 hover:text-stone-900 transition-colors"
      >
        <Settings size={18} />
      </Link>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/80 backdrop-blur-md flex items-start justify-center pt-32 p-6"
            onClick={() => setIsSearchOpen(false)}
          >
             <motion.div
               initial={{ y: -20, scale: 0.9 }}
               animate={{ y: 0, scale: 1 }}
               className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-8 relative"
               onClick={e => e.stopPropagation()}
             >
                <div className="relative mb-8">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                   <input
                     autoFocus
                     placeholder="Search tools, templates, creations..."
                     className="w-full pl-16 pr-6 py-6 bg-stone-50 rounded-3xl border-2 border-stone-100 focus:border-amber-400 focus:ring-0 text-xl font-bold transition-all"
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-gray-50">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Quick Navigation</h4>
                      <div className="space-y-2">
                         <Link to="/studio" className="block text-sm font-bold text-gray-600 hover:text-amber-500">Emoji Text Painter</Link>
                         <Link to="/studio" className="block text-sm font-bold text-gray-600 hover:text-amber-500">Manual Canvas</Link>
                         <Link to="/templates" className="block text-sm font-bold text-gray-600 hover:text-amber-500">Browse Blueprints</Link>
                      </div>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Recent Items</h4>
                      <p className="text-xs font-medium text-gray-400 italic">No recent searches</p>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
