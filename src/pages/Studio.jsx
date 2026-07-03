import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import ToolPanel from '../components/studio/ToolPanel';
import SettingsPanel from '../components/studio/SettingsPanel';
import EmojiPicker from '../components/studio/EmojiPicker';
import TextInputPanel from '../components/studio/TextInputPanel';
import EmojiOutput from '../components/studio/EmojiOutput';
import ExportControls from '../components/studio/ExportControls';
import StyleControls from '../components/studio/StyleControls';
import { generateEmojiArt } from '../utils/emojiGenerator';

const Studio = () => {
  // Main State
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');
  const [art, setArt] = useState([]); // Now a matrix
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // Settings State
  const [settings, setSettings] = useState({
    emojiSize: 'medium',
    letterSpacing: 1, // Note: Generator now uses fixed 1-cell spacing between letters
    lineHeight: 1,
    bgStyle: 'paper',
    density: 'normal'
  });

  // Generator Logic
  const handleGenerate = useCallback(() => {
    if (!text || !text.trim()) {
      showToast("✏️ Enter text to create art");
      return;
    }
    if (!selectedEmoji) {
      showToast("✨ Choose your emoji magic");
      return;
    }

    setIsLoading(true);

    // Simulate generation delay for "magic" feeling
    setTimeout(() => {
      const generatedArt = generateEmojiArt(text, selectedEmoji, {
        letterSpacing: settings.letterSpacing,
        lineHeight: settings.lineHeight
      });
      setArt(generatedArt);
      setIsLoading(false);

      // Celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#f43f5e', '#fbbf24']
      });
    }, 400); // Faster generation since it's just matrix creation
  }, [text, selectedEmoji, settings.letterSpacing, settings.lineHeight, showToast]);

  const handleClear = () => {
    setText('');
    setArt([]);
  };

  const handleRandomize = () => {
    const emojis = ['😀', '🔥', '🚀', '🌈', '💎', '🌸', '🤖', '🐱', '⭐'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const bgStyles = ['paper', 'wood', 'dark', 'glass'];
    const randomBg = bgStyles[Math.floor(Math.random() * bgStyles.length)];

    setSelectedEmoji(randomEmoji);
    setSettings(prev => ({ ...prev, bgStyle: randomBg }));

    if (text) {
      handleGenerate();
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 lg:pt-24 min-h-screen flex flex-col lg:flex-row bg-[#fdfbf7]"
    >
      <div className="order-1 lg:order-1">
        <ToolPanel>
          <EmojiPicker
            selectedEmoji={selectedEmoji}
            onSelect={setSelectedEmoji}
          />
        </ToolPanel>
      </div>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden order-2 lg:order-2">
        <div className="max-w-4xl mx-auto space-y-8">
          <TextInputPanel
            text={text}
            setText={setText}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          <EmojiOutput
            art={art}
            isLoading={isLoading}
            bgStyle={settings.bgStyle}
            emojiSize={settings.emojiSize}
            density={settings.density}
          />

          <ExportControls
            art={art}
            onClear={handleClear}
            onRandomize={handleRandomize}
          />
        </div>
      </main>

      <div className="order-3 lg:order-3">
        <SettingsPanel>
          <StyleControls
            settings={settings}
            setSettings={setSettings}
          />
        </SettingsPanel>
      </div>
    </motion.div>
  );
};

export default Studio;
