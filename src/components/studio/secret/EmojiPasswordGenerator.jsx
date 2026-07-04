import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkeuoButton from '../../common/SkeuoButton';
import { ShieldCheck, RefreshCw, Copy, User } from 'lucide-react';

const EmojiPasswordGenerator = ({
  onGenerate,
  output,
  strength,
  onCopy,
  isCopied
}) => {
  const [name, setName] = useState('');

  const getStrengthColor = () => {
    if (strength > 80) return 'bg-green-400';
    if (strength > 50) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const getStrengthText = () => {
    if (strength > 80) return 'Unbreakable';
    if (strength > 50) return 'Solid';
    if (strength > 0) return 'Weak Sauce';
    return 'Not Generated';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-600 block px-1 flex items-center gap-2">
          <User size={14} /> Custom Username / Base
        </label>
        <div className="relative group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. EmojiLover2024"
            className="w-full p-4 bg-stone-50 rounded-2xl border-2 border-stone-200
                       focus:border-emerald-400 focus:ring-0 transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] text-lg text-stone-700"
          />
        </div>
        <p className="text-[10px] text-stone-400 font-bold uppercase px-1 tracking-tighter">
          We use this to anchor your emoji password
        </p>
      </div>

      <SkeuoButton
        onClick={() => onGenerate(name)}
        className="w-full bg-emerald-400 text-emerald-900 font-black py-4 text-lg uppercase tracking-widest"
      >
        <span className="flex items-center justify-center gap-2">
          <RefreshCw size={20} /> Forge Emoji Password
        </span>
      </SkeuoButton>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-stone-800 rounded-3xl p-8 relative overflow-hidden border-8 border-stone-700 shadow-2xl">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="text-[10px] font-black text-emerald-400/50 mb-2 tracking-[0.5em] uppercase">
                Secure Sequence
              </div>
              <div className="text-3xl font-mono text-white break-all text-center mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                {output}
              </div>

              <SkeuoButton
                onClick={() => onCopy(output)}
                className={`w-full py-3 font-bold flex items-center justify-center gap-2
                           ${isCopied ? 'bg-emerald-500 text-white' : 'bg-stone-600 text-stone-200'}`}
              >
                <Copy size={18} />
                {isCopied ? 'Locked & Copied!' : 'Copy to Clipboard'}
              </SkeuoButton>
            </div>
          </div>

          <div className="px-2 space-y-2">
            <div className="flex justify-between items-center text-xs font-black text-stone-500 uppercase tracking-widest">
              <span>Security Level</span>
              <span className={strength > 50 ? 'text-emerald-600' : 'text-red-500'}>
                {getStrengthText()}
              </span>
            </div>
            <div className="h-4 bg-stone-200 rounded-full overflow-hidden shadow-inner border border-stone-300">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strength}%` }}
                className={`h-full ${getStrengthColor()} transition-colors duration-500`}
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-stone-400 font-medium italic">
              <ShieldCheck size={12} />
              Encryption standard: AES-Emoji-v1 (Playful Edition)
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiPasswordGenerator;
