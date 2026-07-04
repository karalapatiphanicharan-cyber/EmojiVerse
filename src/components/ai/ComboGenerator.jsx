import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ComboGenerator = ({ results, isProcessing, onProcess }) => {
  const [selectedCategory, setSelectedCategory] = useState('Developer');

  const categories = ['Developer', 'Gym', 'Study', 'Travel', 'Gaming', 'Food'];

  if (!results && !isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-6">Select Neural Domain</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                onProcess(cat);
              }}
              className="px-4 py-3 bg-stone-700/50 rounded-xl border border-stone-600 hover:border-cyan-500 hover:bg-stone-700 transition-all text-[10px] font-black text-stone-300 uppercase tracking-widest"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-6">Combo Sequences: {selectedCategory}</div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-[300px]">
        {results?.map((combo, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-stone-900/80 rounded-[32px] border-2 border-stone-700 shadow-xl flex items-center justify-center text-3xl tracking-[0.5em] hover:scale-105 transition-transform cursor-pointer group"
          >
            <span className="group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">
              {combo}
            </span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => onProcess(selectedCategory)}
        className="mt-8 text-[10px] font-black text-stone-500 uppercase tracking-widest hover:text-cyan-400 transition-colors"
      >
        Re-scan {selectedCategory} domain
      </button>
    </div>
  );
};

export default ComboGenerator;
