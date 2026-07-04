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
        <label className="text-sm font-bold text-stone-600 block px-1">Paste Secret Emojis</label>
        <div className="relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the hidden emoji message here..."
            className="w-full h-32 p-4 bg-stone-50 rounded-xl border-2 border-stone-200
                       focus:border-indigo-400 focus:ring-0 resize-none transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] text-2xl tracking-widest text-stone-700"
          />
          <div className="absolute top-3 right-3 opacity-20 group-focus-within:opacity-50 transition-opacity">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-600 block px-1 flex items-center gap-2">
          <Key size={14} /> Secret Key (If used)
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter the secret key used for encoding..."
          className="w-full p-3 bg-stone-50 rounded-xl border-2 border-stone-200
                     focus:border-indigo-400 focus:ring-0 transition-all
                     shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] font-mono text-stone-700 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <SkeuoButton
          onClick={onDecode}
          className="flex-1 bg-indigo-400 text-indigo-900 font-bold py-3"
          disabled={!inputText}
        >
          Reveal Secret Message
        </SkeuoButton>
        <SkeuoButton
          onClick={onReset}
          className="bg-stone-200 text-stone-600 px-4"
        >
          <RotateCcw size={20} />
        </SkeuoButton>
      </div>

      {output && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-2"
        >
          <label className="text-sm font-bold text-stone-600 block px-1">Decoded Result</label>
          <div className="p-6 bg-white rounded-2xl border-2 border-indigo-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400" />
            <p className="text-xl font-medium text-indigo-900 break-all font-mono italic">
              "{output}"
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Unlock size={12} />
              Message Deciphered
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiDecoder;
