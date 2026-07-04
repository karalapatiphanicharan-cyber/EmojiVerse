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

    // Encode
    encodeInput, setEncodeInput,
    encodeKey, setEncodeKey,
    encodeOutput,
    handleEncode,

    // Decode
    decodeInput, setDecodeInput,
    decodeKey, setDecodeKey,
    decodeOutput,
    handleDecode,

    // Password
    pwdBase, setPwdBase,
    pwdOutput,
    pwdStrength,
    handleGeneratePassword,

    reset,
    copyToClipboard,
    isCopied,
    themes
  } = useSecretMessage();

  const renderModeContent = () => {
    switch (mode) {
      case 'encode':
        return (
          <EmojiEncoder
            key="encoder"
            inputText={encodeInput}
            setInputText={setEncodeInput}
            secretKey={encodeKey}
            setSecretKey={setEncodeKey}
            output={encodeOutput}
            onEncode={handleEncode}
            onReset={reset}
            onCopy={copyToClipboard}
            isCopied={isCopied}
          />
        );
      case 'decode':
        return (
          <EmojiDecoder
            key="decoder"
            inputText={decodeInput}
            setInputText={setDecodeInput}
            secretKey={decodeKey}
            setSecretKey={setDecodeKey}
            output={decodeOutput}
            onDecode={handleDecode}
            onReset={reset}
          />
        );
      case 'password':
        return (
          <EmojiPasswordGenerator
            key="password"
            name={pwdBase}
            setName={setPwdBase}
            onGenerate={handleGeneratePassword}
            output={pwdOutput}
            strength={pwdStrength}
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
          className="inline-block p-6 bg-stone-100 rounded-full shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1)] border-8 border-white mb-6"
        >
          <ShieldCheck size={56} className="text-amber-500" />
        </motion.div>
        <h2 className="text-4xl font-black text-stone-800 uppercase tracking-tighter mb-3">
          The Secret Emoji Lab
        </h2>
        <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px] opacity-60">
          Professional Grade Emoji Encryption & Security
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-4 mb-12 p-3 bg-stone-100 rounded-[2.5rem] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.05)] border-2 border-stone-200">
        {[
          { id: 'encode', label: 'Encode', icon: Lock, color: 'bg-amber-400' },
          { id: 'decode', label: 'Decode', icon: Unlock, color: 'bg-indigo-400' },
          { id: 'password', label: 'Password', icon: ShieldCheck, color: 'bg-emerald-400' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id);
              // reset() removed here to allow switching without losing data unless requested
            }}
            className={`relative flex flex-col items-center gap-2 py-5 rounded-[2rem] transition-all duration-300
                       ${mode === m.id
                         ? `${m.color} text-stone-900 shadow-xl scale-[1.02] z-10 font-black`
                         : 'text-stone-400 hover:text-stone-600 font-bold'}`}
          >
            <m.icon size={20} />
            <span className="text-[10px] uppercase tracking-widest leading-none mt-1">{m.label}</span>
            {mode === m.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white/10 rounded-[2rem] pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>

      {/* Theme Selector (only for encode/decode) */}
      {mode !== 'password' && (
        <div className="mb-10">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] mb-4 block text-center opacity-60">
            Encryption Theme
          </label>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(themes).map(([id, t]) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-4 transition-all
                           ${theme === id
                             ? 'bg-white border-amber-400 shadow-lg scale-105 z-10'
                             : 'bg-stone-50 border-white text-stone-400 hover:border-stone-100'}`}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative border-8 border-stone-50">
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

      <div className="mt-12 p-8 bg-stone-800 rounded-[2.5rem] text-stone-400 text-[11px] leading-relaxed border-b-8 border-stone-950 shadow-2xl">
        <div className="flex items-center gap-2 text-stone-100 font-black mb-3 uppercase tracking-widest">
          <Info size={14} className="text-amber-400" /> Security Protocol
        </div>
        Our lab utilizes a proprietary 100% reversible Base-16 emoji cipher. Each message is transformed into high-entropy byte sequences before being mapped to themed emoji pairs. Optional keys utilize XOR-based derivation for military-grade playful protection.
      </div>
    </div>
  );
};

export default SecretLab;
