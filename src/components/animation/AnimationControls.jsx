import React from 'react';
import { motion } from 'framer-motion';
import { FastForward, Zap, RefreshCw } from 'lucide-react';

const AnimationControls = ({
  speed,
  setSpeed,
  intensity,
  setIntensity,
  loop,
  setLoop
}) => {
  return (
    <div className="space-y-8">
      {/* Speed Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest">
          <FastForward size={14} /> Speed
        </div>
        <div className="flex gap-2">
          {['slow', 'medium', 'fast'].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                speed === s ? 'bg-indigo-500 text-white shadow-inner' : 'bg-white text-gray-400 shadow-skeuo-raised'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest">
          <Zap size={14} /> Intensity
        </div>
        <div className="flex gap-2">
          {['low', 'medium', 'high'].map(i => (
            <button
              key={i}
              onClick={() => setIntensity(i)}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                intensity === i ? 'bg-amber-500 text-white shadow-inner' : 'bg-white text-gray-400 shadow-skeuo-raised'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Switches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl shadow-skeuo-inner">
          <div className="flex items-center gap-2">
             <RefreshCw size={14} className="text-gray-400" />
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Loop</span>
          </div>
          <button
            onClick={() => setLoop(!loop)}
            className={`w-10 h-5 rounded-full relative transition-colors ${loop ? 'bg-emerald-400 shadow-inner' : 'bg-gray-300'}`}
          >
            <motion.div
              animate={{ x: loop ? 20 : 2 }}
              className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
