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
  // Extract display and full string from output object
  const displayEmojis = output?.display || '';
  const fullShareableString = output?.full || '';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-600 block px-1">Message to Hide</label>
        <div className="relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your secret message here..."
            className="w-full h-32 p-4 bg-stone-50 rounded-xl border-2 border-stone-200
                       focus:border-amber-400 focus:ring-0 resize-none transition-all
                       shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] font-mono text-stone-700"
          />
          <div className="absolute top-3 right-3 opacity-20 group-focus-within:opacity-50 transition-opacity">
            <Lock size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-stone-600 block px-1 flex items-center gap-2">
          <Key size={14} /> Secret Key (Optional)
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter a secret key for extra security..."
          className="w-full p-3 bg-stone-50 rounded-xl border-2 border-stone-200
                     focus:border-amber-400 focus:ring-0 transition-all
                     shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] font-mono text-stone-700 text-sm"
        />
      </div>

      <div className="flex gap-4">
        <SkeuoButton
          onClick={onEncode}
          className="flex-1 bg-amber-400 text-amber-900 font-bold py-3"
          disabled={!inputText}
        >
          Generate Secret Emoji
        </SkeuoButton>
        <SkeuoButton
          onClick={onReset}
          className="bg-stone-200 text-stone-600 px-4"
        >
          <RotateCcw size={20} />
        </SkeuoButton>
      </div>

      {displayEmojis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-sm font-bold text-stone-600 block px-1">Hidden Emoji Result</label>
          <div className="p-6 bg-stone-100 rounded-2xl border-4 border-dashed border-stone-300 relative group overflow-hidden">
            <p className="text-2xl break-all tracking-widest">{displayEmojis}</p>

            <div className="mt-6 flex gap-3">
              <SkeuoButton
                onClick={() => onCopy(fullShareableString)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm
                           ${isCopied ? 'bg-green-400 text-green-900' : 'bg-stone-200 text-stone-700'}`}
              >
                <Copy size={16} />
                {isCopied ? 'Copied with Metadata!' : 'Copy Secret'}
              </SkeuoButton>
            </div>
            <p className="mt-2 text-[10px] text-stone-400 font-medium italic text-center">
              Copies emojis + hidden token for decryption 🔑
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmojiEncoder;
