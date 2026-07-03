import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  rainVariants,
  explosionVariants,
  typewriterVariants,
  waveVariants,
  bounceVariants
} from '../../animations';
import { getVisibleEmojis, getEmojiIndex } from '../../utils/animationHelpers';

const AnimationPreview = ({ matrix, preset, isPlaying, bgStyle, emojiSize }) => {
  const visibleEmojis = React.useMemo(() => getVisibleEmojis(matrix), [matrix]);

  const getVariants = () => {
    switch (preset) {
      case 'rain': return rainVariants;
      case 'explosion': return explosionVariants;
      case 'typewriter': return typewriterVariants;
      case 'wave': return waveVariants;
      case 'bounce': return bounceVariants;
      default: return rainVariants;
    }
  };

  const variants = getVariants();

  const getCellSize = () => {
    switch (emojiSize) {
      case 'small': return 16;
      case 'medium': return 24;
      case 'large': return 32;
      default: return 24;
    }
  };

  const cellSize = getCellSize();

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
    <div className={`relative w-full aspect-video rounded-[40px] shadow-skeuo-inner overflow-hidden border-[12px] border-[#333] ${getBgClass()} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {visibleEmojis.length === 0 ? (
        <div className="text-gray-400 font-bold uppercase tracking-widest animate-pulse">
          No Signal - Create Art First
        </div>
      ) : (
        <div
          className="relative"
          style={{
            height: matrix.length * cellSize,
            width: matrix[0].length * cellSize
          }}
        >
          <AnimatePresence mode="wait">
            {isPlaying && visibleEmojis.map(({ emoji, r, c }, index) => (
              <motion.div
                key={`${r}-${c}-${preset}`}
                custom={index}
                variants={variants}
                initial="hidden"
                animate={preset === 'wave' || preset === 'bounce' ? "animate" : "visible"}
                className="absolute flex items-center justify-center select-none"
                style={{
                  top: r * cellSize,
                  left: c * cellSize,
                  width: cellSize,
                  height: cellSize,
                  fontSize: cellSize * 0.8
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Screen Reflection Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
    </div>
  );
};

export default AnimationPreview;
