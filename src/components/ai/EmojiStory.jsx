import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmojiStory = ({ results, isProcessing, onProcess }) => {
  const [selectedStyle, setSelectedStyle] = useState('adventure');

  const styles = [
    { id: 'funny', label: 'Funny', icon: '😂' },
    { id: 'adventure', label: 'Adventure', icon: '🚀' },
    { id: 'romantic', label: 'Romantic', icon: '❤️' },
    { id: 'dark', label: 'Dark', icon: '💀' },
    { id: 'fantasy', label: 'Fantasy', icon: '🧙' },
  ];

  if (!results && !isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">Select Story Style</div>
        <div className="flex flex-wrap justify-center gap-3">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setSelectedStyle(style.id);
                onProcess(style.id);
              }}
              className="flex flex-col items-center gap-2 p-4 bg-stone-700/50 rounded-2xl border border-stone-600 hover:border-indigo-500 hover:bg-stone-700 transition-all min-w-[80px]"
            >
              <span className="text-2xl">{style.icon}</span>
              <span className="text-[9px] font-black text-stone-300 uppercase">{style.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">Visual Story Path</div>
      <div className="p-8 bg-stone-900/80 rounded-[40px] border-4 border-stone-700 shadow-2xl w-full">
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-3xl md:text-4xl text-center leading-loose break-all"
         >
           {results}
         </motion.div>
      </div>

      <button
        onClick={() => onProcess(selectedStyle)}
        className="mt-8 text-[10px] font-black text-stone-500 uppercase tracking-widest hover:text-indigo-400 transition-colors"
      >
        Regenerate in {selectedStyle} mode
      </button>
    </div>
  );
};

export default EmojiStory;
