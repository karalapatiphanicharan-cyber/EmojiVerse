import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmojiOutput = ({ art, isLoading, bgStyle, emojiSize }) => {
  const [displayArt, setDisplayArt] = useState('');

  useEffect(() => {
    if (art && !isLoading) {
      // "One by one" appearance logic
      let currentIdx = 0;
      setDisplayArt('');

      const interval = setInterval(() => {
        if (currentIdx < art.length) {
          // Add next character
          setDisplayArt(prev => prev + art[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 5); // Very fast but visible

      return () => clearInterval(interval);
    } else if (!art) {
      setDisplayArt('');
    }
  }, [art, isLoading]);

  const getBgClass = () => {
    switch (bgStyle) {
      case 'paper': return 'paper-texture bg-white';
      case 'wood': return 'bg-[#deb887] shadow-inner';
      case 'dark': return 'bg-[#1a1a1a] text-white shadow-inner';
      case 'glass': return 'bg-white/30 backdrop-blur-md border border-white/20';
      default: return 'paper-texture bg-white';
    }
  };

  const getFontSize = () => {
    switch (emojiSize) {
      case 'small': return 'text-[8px] md:text-xs leading-[1]';
      case 'medium': return 'text-[12px] md:text-base leading-[1]';
      case 'large': return 'text-[16px] md:text-xl leading-[1]';
      default: return 'text-[12px] md:text-base leading-[1]';
    }
  };

  return (
    <div className={`relative w-full min-h-[400px] rounded-[32px] p-8 md:p-12 transition-all duration-500 overflow-auto ${getBgClass()} shadow-skeuo-inner flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-400 font-medium animate-pulse"
          >
            Magic in progress...
          </motion.div>
        ) : art ? (
          <motion.pre
            id="emoji-canvas"
            key="art"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`font-mono whitespace-pre select-all transition-all duration-300 ${getFontSize()}`}
            style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em'
            }}
          >
            {displayArt}
          </motion.pre>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-6xl">🎨</div>
            <p className="text-gray-400 font-medium">Your emoji masterpiece appears here</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmojiOutput;
