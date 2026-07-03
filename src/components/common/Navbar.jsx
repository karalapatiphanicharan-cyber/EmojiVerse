import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, Palette, Image, Info } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Layout size={18} /> },
    { path: '/studio', label: 'Studio', icon: <Palette size={18} /> },
    { path: '/gallery', label: 'Gallery', icon: <Image size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 skeuo-raised flex items-center gap-8 backdrop-blur-sm bg-studio-surface/90">
      <Link to="/" className="flex items-center gap-2 mr-4">
        <div className="w-10 h-10 flex items-center justify-center text-2xl skeuo-inner shadow-inner bg-studio-accent/10">
          🎨
        </div>
        <span className="font-bold text-xl tracking-tight">EmojiVerse</span>
      </Link>

      <div className="flex items-center gap-2">
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
    </nav>
  );
};

export default Navbar;
