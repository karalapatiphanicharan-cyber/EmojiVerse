import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSecretMessage } from '../../../hooks/useSecretMessage';
import EmojiEncoder from './EmojiEncoder';
import EmojiDecoder from './EmojiDecoder';
import EmojiPasswordGenerator from './EmojiPasswordGenerator';
import { ShieldCheck, Info, Lock, Unlock } from 'lucide-react';

const SecretLab = () => {
  const {
    mode,
    setMode,
    theme,
    setTheme,
    inputText,
    setInputText,
    secretKey,
    setSecretKey,
    output,
    handleEncode,
    handleDecode,
    handleGeneratePassword,
    passwordStrength,
    passwordLabel,
    reset,
    copyToClipboard,
    isCopied,
    isExported,
    themes
  } = useSecretMessage();

  const renderModeContent = () => {
    switch (mode) {
      case 'encode':
        return (
          <EmojiEncoder
            key="encoder"
            inputText={inputText}
            setInputText={setInputText}
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            output={output}
            onEncode={handleEncode}
            onReset={reset}
            onCopy={copyToClipboard}
            isCopied={isCopied}
            isExported={isExported}
          />
        );
      case 'decode':
        return (
          <EmojiDecoder
            key="decoder"
            inputText={inputText}
            setInputText={setInputText}
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            output={output}
            onDecode={handleDecode}
            onReset={reset}
          />
        );
      case 'password':
        return (
          <EmojiPasswordGenerator
            key="password"
            onGenerate={handleGeneratePassword}
            output={output}
            strength={passwordStrength}
            label={passwordLabel}
            onCopy={copyToClipboard}
            isCopied={isCopied}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 bg-stone-100 rounded-full shadow-inner border-4 border-stone-200 mb-4"
        >
          <ShieldCheck size={48} className="text-amber-500" />
        </motion.div>
        <h2 className="text-3xl font-black text-stone-800 uppercase tracking-tighter mb-2">
          The Secret Emoji Lab
        </h2>
        <p className="text-stone-500 font-medium">
          Secure your communications with high-fidelity emoji encryption.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-4 mb-10 p-2 bg-stone-100 rounded-3xl shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] border-2 border-stone-200">
        {[
          { id: 'encode', label: 'Encode', icon: Lock, color: 'bg-amber-400' },
          { id: 'decode', label: 'Decode', icon: Unlock, color: 'bg-indigo-400' },
          { id: 'password', label: 'Password', icon: ShieldCheck, color: 'bg-emerald-400' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id);
              reset();
            }}
            className={`relative flex flex-col items-center gap-2 py-4 rounded-2xl transition-all duration-300
                       ${mode === m.id
                         ? `${m.color} text-stone-900 shadow-lg scale-105 z-10 font-bold`
                         : 'text-stone-400 hover:text-stone-600 font-medium'}`}
          >
            <m.icon size={20} />
            <span className="text-xs uppercase tracking-widest">{m.label}</span>
            {mode === m.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>

      {/* Theme Selector (only for encode/decode) */}
      {mode !== 'password' && (
        <div className="mb-8">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3 block text-center">
            Encryption Theme
          </label>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(themes).map(([id, t]) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all
                           ${theme === id
                             ? 'bg-white border-amber-400 shadow-md scale-105'
                             : 'bg-stone-50 border-stone-200 text-stone-400 hover:border-stone-300'}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-xs font-bold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-stone-50/50 rounded-[2.5rem] p-8 border-4 border-white shadow-2xl relative">
        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 opacity-10"><Info size={16} /></div>
        <div className="absolute bottom-6 right-6 opacity-10"><Info size={16} /></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {renderModeContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 p-6 bg-stone-800 rounded-2xl text-stone-300 text-xs leading-relaxed border-b-4 border-stone-950 shadow-xl">
        <div className="flex items-center gap-2 text-stone-100 font-bold mb-2 uppercase tracking-widest">
          <Info size={14} /> Intelligence Briefing
        </div>
        The Secret Lab uses a character-to-emoji mapping system. Clean sharing uses local storage to match emojis with data. Cross-device sharing requires exporting the full secret code. All messages are encrypted locally and never leave your browser.
      </div>
    </div>
  );
};

export default SecretLab;
