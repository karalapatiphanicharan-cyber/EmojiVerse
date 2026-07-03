import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Loader2 } from 'lucide-react';

const ImagePreview = ({ isProcessing, progress, matrix, bgStyle }) => {
  const getBgClass = () => {
    switch (bgStyle) {
      case 'paper': return 'bg-[#f0f0f0]';
      case 'wood': return 'bg-[#5c4033]';
      case 'dark': return 'bg-[#1a1a1a]';
      case 'glass': return 'bg-blue-100/30';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div id="emoji-conversion-output" className={`relative w-full min-h-[400px] rounded-[40px] shadow-skeuo-inner overflow-hidden border-[12px] border-[#333] ${getBgClass()} flex items-center justify-center p-8`}>
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-md px-10">
              {/* Scanner Line */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-40"
              />

              <div className="bg-white/90 p-8 rounded-[32px] shadow-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 animate-pulse">
                  <Scan size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Analyzing Pixels...</h3>
                <p className="text-sm text-gray-500 font-bold mb-6">Finding the perfect emojis for your photo</p>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    className="h-full bg-blue-600 shadow-lg"
                  />
                </div>
                <div className="mt-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                  {Math.round(progress * 100)}% Complete
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!matrix && !isProcessing && (
        <div className="text-center space-y-4 opacity-30">
          <Scan size={64} className="mx-auto text-gray-400" />
          <p className="text-xl font-black uppercase tracking-widest text-gray-500">Scanner Standby</p>
        </div>
      )}

      {matrix && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col leading-none select-none"
          style={{ fontSize: 'min(1.2vw, 10px)' }}
        >
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <span key={j}>{cell}</span>
              ))}
            </div>
          ))}
        </motion.div>
      )}

      {/* Screen Effects */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
    </div>
  );
};

export default ImagePreview;
