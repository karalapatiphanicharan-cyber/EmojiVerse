import React from 'react';
import { motion } from 'framer-motion';
import { AlignJustify, AlignCenter, Shuffle, Grid, Slash } from 'lucide-react';

const GradientSelector = ({ mode, setMode }) => {
  const modes = [
    { id: 'none', label: 'None', icon: Slash },
    { id: 'vertical', label: 'Vertical', icon: AlignJustify },
    { id: 'horizontal', label: 'Horizontal', icon: AlignCenter },
    { id: 'random', label: 'Random', icon: Shuffle },
    { id: 'pattern', label: 'Pattern', icon: Grid },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Gradient Mode</h3>
      <div className="grid grid-cols-5 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode(m.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                mode === m.id
                  ? 'bg-blue-500 text-white shadow-inner'
                  : 'bg-white text-gray-400 shadow-skeuo-raised hover:text-gray-600'
              }`}
              title={m.label}
            >
              <Icon size={18} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GradientSelector;
