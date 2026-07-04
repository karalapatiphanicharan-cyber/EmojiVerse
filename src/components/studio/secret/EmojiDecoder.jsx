import React from 'react';
import { motion } from 'framer-motion';
import SkeuoButton from '../../common/SkeuoButton';
import { Unlock, Key, RotateCcw, Search } from 'lucide-react';

const EmojiDecoder = ({
  inputText,
  setInputText,
  secretKey,
  setSecretKey,
  output,
  onDecode,
  onReset
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-black text-stone-500 uppercase tracking-widest block px-1">
          Paste Secret Emojis
        </label>
        <div className="relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the emoji sequence here..."
            className="w-full h-32 p-5 bg-stone-50 rounded-[2rem] border-2 border-stone-200
                       focus:border-indigo-400 focus:ring-0 resize-none transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] text-xl tracking-widest text-stone-700
                       placeholder:text-stone-300 placeholder:tracking-normal"
          />
          <div className="absolute top-4 right-5 opacity-10 group-focus-within:opacity-40 transition-opacity">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-stone-500 uppercase tracking-widest block px-1 flex items-center gap-2">
          <Key size={14} /> Secret Key
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter the key (if any)..."
          className="w-full p-4 bg-stone-50 rounded-2xl border-2 border-stone-200
                     focus:border-indigo-400 focus:ring-0 transition-all
                     shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] font-mono text-stone-700 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <SkeuoButton
          onClick={onDecode}
          className="flex-1 bg-indigo-400 text-indigo-950 font-black py-4 uppercase tracking-wider"
        >
          Reveal Secret Message
        </SkeuoButton>
        <SkeuoButton
          onClick={onReset}
          className="bg-stone-200 text-stone-600 px-5"
        >
          <RotateCcw size={20} />
        </SkeuoButton>
      </div>

      {output && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-3 pt-2"
        >
          <div className="p-8 bg-white rounded-[2.5rem] border-4 border-indigo-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-400" />

            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">
              <Unlock size={12} />
              Message Deciphered
            </div>

            <p className="text-2xl font-bold text-stone-800 break-words leading-relaxed">
              {output}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiDecoder;
