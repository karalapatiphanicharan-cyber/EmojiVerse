import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkeuoButton from '../../common/SkeuoButton';
import { ShieldCheck, RefreshCw, Copy, User, Eye, EyeOff } from 'lucide-react';

const EmojiPasswordGenerator = ({
  onGenerate,
  output,
  strength,
  label,
  onCopy,
  isCopied
}) => {
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const getStrengthColor = () => {
    if (strength > 80) return 'bg-green-400';
    if (strength > 50) return 'bg-amber-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-600 block px-1 flex items-center gap-2">
          <User size={14} /> Enter Name or Word
        </label>
        <div className="relative group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Example: Phani"
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
          <RefreshCw size={20} /> {output ? 'Generate Again 🔄' : 'Forge Emoji Password'}
        </span>
      </SkeuoButton>

      {typeof output === 'string' && output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-stone-800 rounded-3xl p-8 relative overflow-hidden border-8 border-stone-700 shadow-xl">
            {/* Reduced gloss/glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="text-[10px] font-black text-emerald-400/50 mb-4 tracking-[0.5em] uppercase">
                Secure Sequence
              </div>
              <div className="text-3xl font-mono text-white break-all text-center mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] min-h-[1.5em] flex items-center justify-center">
                {showPassword ? output : '••••••••••••'}
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-4">
                <SkeuoButton
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  className="px-4 py-3 flex items-center justify-center gap-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  <span className="sm:hidden lg:inline">{showPassword ? 'Hide' : 'Show'}</span>
                </SkeuoButton>

                <SkeuoButton
                  onClick={() => onCopy(output, "Password copied 🔐")}
                  active={isCopied}
                  aria-label="Copy Password"
                  className="flex-1 py-3 font-bold flex items-center justify-center gap-2"
                >
                  <Copy size={20} />
                  {isCopied ? 'Copied 🔐' : 'Copy Password 📋'}
                </SkeuoButton>
              </div>
            </div>
          </div>

          <div className="px-2 space-y-2">
            <div className="flex justify-between items-center text-xs font-black text-stone-500 uppercase tracking-widest">
              <span>Security Level</span>
              <span className={strength > 70 ? 'text-emerald-600' : strength > 40 ? 'text-amber-600' : 'text-red-500'}>
                {label}
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
              Encryption standard: AES-Emoji-v2 (Strict Edition)
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiPasswordGenerator;
