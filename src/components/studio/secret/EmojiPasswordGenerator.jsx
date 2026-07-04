import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkeuoButton from '../../common/SkeuoButton';
import { ShieldCheck, RefreshCw, Copy, User } from 'lucide-react';

const EmojiPasswordGenerator = ({
  name,
  setName,
  onGenerate,
  output,
  strength,
  onCopy,
  isCopied
}) => {
  const getStrengthColor = () => {
    if (strength >= 80) return 'bg-emerald-400';
    if (strength >= 50) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const getStrengthText = () => {
    if (strength >= 80) return 'Solid / Unbreakable';
    if (strength >= 50) return 'Medium / Balanced';
    if (strength > 0) return 'Weak / Simple';
    return 'Not Generated';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-black text-stone-500 uppercase tracking-widest block px-1 flex items-center gap-2">
          <User size={14} /> Custom Base Word
        </label>
        <div className="relative group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. rocket (Optional)"
            className="w-full p-5 bg-stone-50 rounded-[2rem] border-2 border-stone-200
                       focus:border-emerald-400 focus:ring-0 transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] text-lg text-stone-700
                       placeholder:text-stone-300"
          />
        </div>
      </div>

      <SkeuoButton
        onClick={onGenerate}
        className="w-full bg-emerald-400 text-emerald-950 font-black py-5 text-lg uppercase tracking-widest"
      >
        <span className="flex items-center justify-center gap-3">
          <RefreshCw size={22} /> Forge Emoji Password
        </span>
      </SkeuoButton>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-stone-900 rounded-[2.5rem] p-10 relative overflow-hidden border-8 border-stone-800 shadow-2xl">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="text-[10px] font-black text-emerald-400/40 mb-4 tracking-[0.5em] uppercase">
                Secure Sequence
              </div>
              <div className="text-2xl font-mono text-white break-all text-center mb-8 px-4 leading-relaxed">
                {output}
              </div>

              <SkeuoButton
                onClick={() => onCopy(output)}
                className={`w-full py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3
                           ${isCopied ? 'bg-emerald-500 text-white' : 'bg-white text-stone-900'}`}
              >
                <Copy size={18} />
                {isCopied ? 'Copied Successfully' : 'Copy Password'}
              </SkeuoButton>
            </div>
          </div>

          <div className="px-4 space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">
              <span>Security Level</span>
              <span className={strength >= 50 ? 'text-emerald-600' : 'text-red-500'}>
                {getStrengthText()}
              </span>
            </div>
            <div className="h-4 bg-stone-100 rounded-full overflow-hidden shadow-inner border-2 border-stone-200 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                className={`h-full ${getStrengthColor()} rounded-full transition-all duration-700 ease-out`}
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest opacity-60">
              <ShieldCheck size={12} />
              High Entropy AES-Emoji-V2
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiPasswordGenerator;
