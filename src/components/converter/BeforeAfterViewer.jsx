import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterViewer = ({ original, matrix, bgStyle }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX || e.touches[0].clientX) - rect.left) / rect.width;
    setSliderPos(Math.max(0, Math.min(100, x * 100)));
  };

  const getBgClass = () => {
    switch (bgStyle) {
      case 'paper': return 'bg-[#f0f0f0]';
      case 'wood': return 'bg-[#5c4033]';
      case 'dark': return 'bg-[#1a1a1a]';
      case 'glass': return 'bg-blue-100/30';
      default: return 'bg-gray-100';
    }
  };

  if (!original || !matrix) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-[40px] shadow-skeuo-inner overflow-hidden border-[12px] border-[#333] cursor-ew-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Emoji Layer (After) */}
      <div className={`absolute inset-0 flex items-center justify-center p-4 ${getBgClass()}`}>
        <div
          className="flex flex-col leading-none"
          style={{ fontSize: 'min(1vw, 8px)' }}
        >
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <span key={j}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Image Layer (Before) */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={original}
          alt="Original"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Slider Bar */}
      <div
        className="absolute inset-y-0 w-1 bg-white shadow-xl z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
            <div className="w-0.5 h-3 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest z-20">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest z-20">
        Emoji Art
      </div>
    </div>
  );
};

export default BeforeAfterViewer;
