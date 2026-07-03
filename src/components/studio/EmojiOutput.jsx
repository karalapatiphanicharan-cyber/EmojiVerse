import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPixel from './EmojiPixel';

const EmojiOutput = ({ art, isLoading, bgStyle, emojiSize, density }) => {

  const getBgClass = () => {
    switch (bgStyle) {
      case 'paper': return 'paper-texture bg-white';
      case 'wood': return 'bg-[#deb887] shadow-inner';
      case 'dark': return 'bg-[#1a1a1a] text-white shadow-inner';
      case 'glass': return 'bg-white/30 backdrop-blur-md border border-white/20';
      default: return 'paper-texture bg-white';
    }
  };

  const getCellSize = () => {
    switch (emojiSize) {
      case 'small': return 20;
      case 'medium': return 32;
      case 'large': return 48;
      default: return 32;
    }
  };

  const getGap = () => {
    switch (density) {
      case 'compact': return 0;
      case 'normal': return 4;
      case 'wide': return 10;
      default: return 4;
    }
  };

  const cellSize = getCellSize();
  const gap = getGap();

  return (
    <div
      id="emoji-canvas"
      className={`relative w-full min-h-[450px] rounded-[32px] p-4 md:p-8 transition-all duration-500 overflow-auto ${getBgClass()} shadow-skeuo-inner flex items-center justify-center`}
    >
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
        ) : art && art.length > 0 ? (
          <motion.div
            key="art"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-grid"
            style={{
              gridTemplateRows: `repeat(${art.length}, ${cellSize}px)`,
              gridTemplateColumns: `repeat(${art[0].length}, ${cellSize}px)`,
              gap: `${gap}px`
            }}
          >
            {art.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <EmojiPixel
                  key={`${rowIndex}-${colIndex}`}
                  emoji={cell}
                  size={cellSize}
                />
              ))
            )}
          </motion.div>
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
