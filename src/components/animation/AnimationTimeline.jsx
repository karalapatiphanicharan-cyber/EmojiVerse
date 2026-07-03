import React from 'react';
import { motion } from 'framer-motion';

const AnimationTimeline = ({ currentTime, duration }) => {
  const containerRef = React.useRef(null);

  return (
    <div className="w-full bg-[#222] p-6 rounded-[32px] shadow-skeuo-inner border-[8px] border-[#333]">
      <div className="flex justify-between mb-3 text-[#666] font-mono text-[10px] tracking-widest uppercase">
        <span>00:00:00</span>
        <span className="text-emerald-500/50">Playback Console</span>
        <span>00:00:0{Math.floor(duration)}</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-10 bg-black/40 rounded-xl overflow-hidden border border-white/5"
      >
        {/* Timeline Grid Markers */}
        <div className="absolute inset-0 flex justify-between px-4 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`w-px h-full bg-white ${i % 5 === 0 ? 'opacity-50' : 'opacity-20'}`} />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-500/10"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />

        {/* Playhead */}
        <motion.div
          animate={{ left: `${(currentTime / duration) * 100}%` }}
          transition={{ type: "tween", ease: "linear", duration: 0.05 }}
          className="absolute top-0 bottom-0 w-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10"
        >
          <div className="absolute -top-1 -left-1.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#222]" />
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between items-center px-2">
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#444] shadow-inner" />
          ))}
        </div>
        <div className="text-emerald-400/70 font-mono text-sm tracking-tighter">
          SEC: {currentTime.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default AnimationTimeline;
