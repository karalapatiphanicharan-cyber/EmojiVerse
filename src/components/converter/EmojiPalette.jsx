import React from 'react';
import { motion } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const EmojiPalette = ({ currentPalette, onSelect }) => {
  const themes = [
    { name: 'Default', colors: null },
    { name: 'Nature', colors: ['🌱', '🌊', '🌸', '🌞', '🌳', '🍂', '🍄', '🌕'] },
    { name: 'Fire & Ice', colors: ['🔥', '❄️', '🌋', '🌊', '🧊', '🧨', '💎', '🌑'] },
    { name: 'Cyber', colors: ['🤖', '🧬', '🛸', '🛰️', '📡', '💾', '🔋', '🌑'] },
    { name: 'Kawaii', colors: ['🐱', '🦄', '🍡', '🍦', '🎀', '🍭', '🧸', '☁️'] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest">
          <Palette size={14} /> Custom Palette
        </div>
        {currentPalette && (
          <button
            onClick={() => onSelect(null)}
            className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1"
          >
            <X size={10} /> Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onSelect(theme.colors)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              (currentPalette === theme.colors || (theme.colors === null && currentPalette === null))
                ? 'bg-indigo-600 text-white shadow-skeuo-pressed'
                : 'bg-white text-gray-500 shadow-skeuo-raised hover:bg-gray-50'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      {currentPalette && (
        <div className="flex gap-1 p-2 bg-gray-50 rounded-xl shadow-inner overflow-x-auto no-scrollbar">
          {currentPalette.map((emoji, i) => (
            <span key={i} className="text-lg">{emoji}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPalette;
