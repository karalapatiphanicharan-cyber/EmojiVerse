import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const EmojiOutput = ({ art, isLoading, bgStyle, emojiSize }) => {
  const [displayArt, setDisplayArt] = useState('');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (art && !isLoading) {
      // Use Array.from to correctly handle emoji surrogate pairs (Bug 2)
      const artArray = Array.from(art);
      let currentIdx = 0;
      setDisplayArt('');

      const interval = setInterval(() => {
        if (currentIdx < artArray.length) {
          setDisplayArt(prev => prev + artArray[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(interval);
        }
      }, 1); // Fast typing

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
    const baseSize = {
      small: 16,
      medium: 24,
      large: 36
    }[emojiSize] || 24;

    return baseSize * zoom;
  };

  return (
    <div className="space-y-4">
      {art && !isLoading && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
            className="p-2 bg-white rounded-full shadow-skeuo-raised hover:bg-gray-50 active:shadow-skeuo-pressed transition-all"
            title="Zoom Out"
          >
            <ZoomOut size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-2 bg-white rounded-full shadow-skeuo-raised hover:bg-gray-50 active:shadow-skeuo-pressed transition-all"
            title="Reset Zoom"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
            className="p-2 bg-white rounded-full shadow-skeuo-raised hover:bg-gray-50 active:shadow-skeuo-pressed transition-all"
            title="Zoom In"
          >
            <ZoomIn size={20} className="text-gray-600" />
          </button>
        </div>
      )}

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
              className="font-mono whitespace-pre select-all transition-all duration-300"
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: `${getFontSize()}px`,
                lineHeight: '1.2',
                textAlign: 'left'
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
    </div>
  );
};

export default EmojiOutput;
