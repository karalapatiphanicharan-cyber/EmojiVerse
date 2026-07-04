import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const MoodAnalyzer = ({ results, isProcessing, onApplyStyle }) => {
  if (!results && !isProcessing) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative">
           <motion.div
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-24 h-24 bg-stone-700/50 rounded-full flex items-center justify-center border-2 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
           >
             <span className="text-5xl">{results?.emoji || '😐'}</span>
           </motion.div>
           <div className="absolute -bottom-2 -right-2 bg-rose-500 p-1.5 rounded-lg shadow-lg border border-stone-800">
             <Heart size={14} className="text-white fill-white" />
           </div>
        </div>

        <div className="text-center space-y-2">
           <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
             {results?.label || 'Neutral'}
           </h3>
           <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Sentiment Detected</p>
        </div>

        <div className="w-full max-w-[300px] space-y-6">
          <div className="space-y-3">
            <div className="text-[9px] font-black text-stone-400 uppercase tracking-widest text-center">Neural Suggestions</div>
            <div className="flex justify-center gap-4 p-4 bg-stone-900/50 rounded-2xl border border-stone-700 shadow-inner">
              {results?.suggestions?.map((emoji, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl cursor-pointer hover:scale-125 transition-transform"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>

          {results?.style && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Recommended Style</span>
                <Sparkles size={10} className="text-indigo-400" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-stone-800 p-2 rounded-lg text-center border border-stone-700">
                  <div className="text-[7px] text-stone-500 uppercase font-bold mb-1">Font</div>
                  <div className="text-[10px] text-white font-black uppercase">{results.style}</div>
                </div>
                <div className="flex-1 bg-stone-800 p-2 rounded-lg text-center border border-stone-700">
                  <div className="text-[7px] text-stone-500 uppercase font-bold mb-1">Anim</div>
                  <div className="text-[10px] text-white font-black uppercase">{results.animation}</div>
                </div>
              </div>
              <button
                onClick={() => onApplyStyle(results)}
                className="w-full py-2 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-indigo-600 transition-all active:scale-95"
              >
                Apply to Studio
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodAnalyzer;
