import React from 'react';
import { motion } from 'framer-motion';
import SkeuoButton from '../../common/SkeuoButton';
import { Lock, Key, Copy, RotateCcw } from 'lucide-react';

const EmojiEncoder = ({
  inputText,
  setInputText,
  secretKey,
  setSecretKey,
  output,
  onEncode,
  onReset,
  onCopy,
  isCopied
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-black text-stone-500 uppercase tracking-widest block px-1">
          Message to Hide
        </label>
        <div className="relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your secret message here..."
            className="w-full h-32 p-5 bg-stone-50 rounded-[2rem] border-2 border-stone-200
                       focus:border-amber-400 focus:ring-0 resize-none transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] font-medium text-stone-700
                       placeholder:text-stone-300"
          />
          <div className="absolute top-4 right-5 opacity-10 group-focus-within:opacity-40 transition-opacity">
            <Lock size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-stone-500 uppercase tracking-widest block px-1 flex items-center gap-2">
          <Key size={14} /> Secret Key <span className="text-[10px] lowercase font-bold opacity-40">(Optional)</span>
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter a secret key..."
          className="w-full p-4 bg-stone-50 rounded-2xl border-2 border-stone-200
                     focus:border-amber-400 focus:ring-0 transition-all
                     shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] font-mono text-stone-700 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <SkeuoButton
          onClick={onEncode}
          className="flex-1 bg-amber-400 text-amber-950 font-black py-4 uppercase tracking-wider"
        >
          Generate Secret Emoji
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 pt-2"
        >
          <div className="p-8 bg-stone-100 rounded-[2.5rem] border-4 border-dashed border-stone-200 relative group overflow-hidden">
            <div className="text-center">
               <p className="text-2xl break-all leading-relaxed select-all tracking-[0.2em]">{output}</p>
            </div>

            <div className="mt-8">
              <SkeuoButton
                onClick={() => onCopy(output)}
                className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-black uppercase tracking-widest
                           ${isCopied ? 'bg-green-400 text-green-950' : 'bg-stone-800 text-white'}`}
              >
                <Copy size={18} />
                {isCopied ? 'Copied Successfully' : 'Copy Secret'}
              </SkeuoButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiEncoder;
