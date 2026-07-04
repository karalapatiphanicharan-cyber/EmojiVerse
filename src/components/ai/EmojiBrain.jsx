import React from 'react';
import { motion } from 'framer-motion';

const EmojiBrain = ({ results, isProcessing }) => {
  if (!results && !isProcessing) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Output Sequence</div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-8 bg-stone-900/80 rounded-[40px] border-4 border-stone-700 shadow-2xl flex items-center justify-center min-w-[200px]"
      >
        <span className="text-5xl md:text-6xl tracking-widest drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          {results || "???"}
        </span>
      </motion.div>
      <p className="mt-6 text-[10px] text-stone-500 font-mono text-center max-w-[250px]">
        Translated using Neural Keyword Mapping Protocol v1.
      </p>
    </div>
  );
};

export default EmojiBrain;
