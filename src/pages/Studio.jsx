import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';
import ToolPanel from '../components/studio/ToolPanel';
import SettingsPanel from '../components/studio/SettingsPanel';
import EmojiPicker from '../components/studio/EmojiPicker';
import TextInputPanel from '../components/studio/TextInputPanel';
import EmojiOutput from '../components/studio/EmojiOutput';
import ExportControls from '../components/studio/ExportControls';
import StyleControls from '../components/studio/StyleControls';
import MultiEmojiTray from '../components/gradient/MultiEmojiTray';
import GradientSelector from '../components/gradient/GradientSelector';
import EmojiPaintCanvas from '../components/painter/EmojiPaintCanvas';
import BrushToolbar from '../components/painter/BrushToolbar';
import PaintControls from '../components/painter/PaintControls';

import { generateMultiEmojiArt } from '../utils/multiEmojiGenerator';
import { applyFontStyle } from '../utils/fontStyles';
import { useHistory } from '../hooks/useHistory';
import { useEmojiPainter } from '../hooks/useEmojiPainter';
import { saveCreation } from '../utils/saveManager';

const Studio = () => {
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'painter'
  const { showToast } = useToast();

  // Settings State
  const [settings, setSettings] = useState({
    emojiSize: 'medium',
    letterSpacing: 1,
    lineHeight: 1,
    bgStyle: 'paper',
    density: 'normal',
    gradientMode: 'none',
    fontStyle: 'block'
  });

  // Text Painter States
  const [text, setText] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState(['🔥']);
  const textHistory = useHistory([]);
  const [isLoading, setIsLoading] = useState(false);

  // Manual Painter States
  const emptyGrid = useMemo(() => Array.from({ length: 30 }, () => Array(50).fill("")), []);
  const paintHistory = useHistory(emptyGrid);
  const painter = useEmojiPainter(emptyGrid, paintHistory);

  // Computed art for Text Painter
  const art = textHistory.state;

  // Generator Logic
  const handleGenerate = useCallback(() => {
    if (!text || !text.trim()) {
      showToast("✏️ Enter text to create art");
      return;
    }
    if (selectedEmojis.length === 0) {
      showToast("✨ Pick your emoji brush 🎨");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      let generatedArt = generateMultiEmojiArt(text, selectedEmojis, {
        letterSpacing: settings.letterSpacing,
        lineHeight: settings.lineHeight,
        gradientMode: settings.gradientMode
      });

      generatedArt = applyFontStyle(generatedArt, settings.fontStyle);

      textHistory.setState(generatedArt);
      setIsLoading(false);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#f43f5e', '#fbbf24']
      });
    }, 400);
  }, [text, selectedEmojis, settings, textHistory, showToast]);

  const handleSave = async () => {
    const currentArt = activeTab === 'text' ? textHistory.state : paintHistory.state;
    if (!currentArt || (activeTab === 'painter' && currentArt.every(row => row.every(cell => cell === "")))) {
      showToast("Create something first ✨");
      return;
    }

    const name = activeTab === 'text' ? `Text: ${text}` : `Drawing ${new Date().toLocaleTimeString()}`;
    const success = saveCreation(name, currentArt, activeTab === 'text' ? '🎨' : '🖌️');

    if (success) {
      showToast("💾 Saved to Gallery!");
      confetti({ particleCount: 40, spread: 50 });
    } else {
      showToast("Gallery storage full");
    }
  };

  const handleRandomize = () => {
    const emojis = ['😀', '🔥', '🚀', '🌈', '💎', '🌸', '🤖', '🐱', '⭐'];
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...emojis].sort(() => 0.5 - Math.random());
    const randomSelected = shuffled.slice(0, randomCount);

    const bgStyles = ['paper', 'wood', 'dark', 'glass'];
    const randomBg = bgStyles[Math.floor(Math.random() * bgStyles.length)];

    const gradientModes = ['none', 'vertical', 'horizontal', 'random', 'pattern'];
    const randomGradient = gradientModes[Math.floor(Math.random() * gradientModes.length)];

    setSelectedEmojis(randomSelected);
    setSettings(prev => ({
      ...prev,
      bgStyle: randomBg,
      gradientMode: activeTab === 'text' ? randomGradient : 'none'
    }));

    if (activeTab === 'text' && text) {
      setTimeout(handleGenerate, 0);
    }
  };

  const handleRemoveEmoji = (index) => {
    setSelectedEmojis(prev => prev.filter((_, i) => i !== index));
  };

  const onEmojiSelect = (emoji) => {
    if (activeTab === 'text') {
      if (selectedEmojis.length < 10) {
        setSelectedEmojis(prev => [...prev, emoji]);
      } else {
        showToast("Maximum 10 emojis allowed");
      }
    } else {
      setSelectedEmojis([emoji]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 lg:pt-24 min-h-screen flex flex-col lg:flex-row bg-[#fdfbf7]"
    >
      <div className="order-1 lg:order-1 px-4 lg:px-0">
        <ToolPanel>
          <div className="space-y-8">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl shadow-inner">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'text' ? 'bg-white shadow-skeuo-raised' : 'text-gray-400'}`}
              >
                Text
              </button>
              <button
                onClick={() => setActiveTab('painter')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'painter' ? 'bg-white shadow-skeuo-raised' : 'text-gray-400'}`}
              >
                Painter
              </button>
            </div>

            {activeTab === 'painter' && (
              <BrushToolbar activeTool={painter.tool} setTool={painter.setTool} />
            )}

            <EmojiPicker
              selectedEmoji={selectedEmojis[selectedEmojis.length - 1]}
              onSelect={onEmojiSelect}
            />

            {activeTab === 'text' && (
              <MultiEmojiTray
                selectedEmojis={selectedEmojis}
                onRemove={handleRemoveEmoji}
                onAdd={() => {}}
              />
            )}
          </div>
        </ToolPanel>
      </div>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden order-2 lg:order-2">
        <div className="max-w-4xl mx-auto space-y-8">
          {activeTab === 'text' ? (
            <>
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
            </>
          ) : (
            <div className="space-y-4">
               <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl shadow-skeuo-raised">
                  <div className="flex gap-2">
                    <button
                      onClick={() => paintHistory.undo()}
                      disabled={!paintHistory.canUndo}
                      className="px-4 py-2 bg-white rounded-xl shadow-skeuo-raised disabled:opacity-30 font-bold"
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => paintHistory.redo()}
                      disabled={!paintHistory.canRedo}
                      className="px-4 py-2 bg-white rounded-xl shadow-skeuo-raised disabled:opacity-30 font-bold"
                    >
                      Redo
                    </button>
                  </div>
                  <button
                    onClick={() => paintHistory.reset(emptyGrid)}
                    className="px-4 py-2 bg-red-50 text-red-500 rounded-xl shadow-skeuo-raised font-bold"
                  >
                    Clear Canvas
                  </button>
               </div>
               <EmojiPaintCanvas
                 grid={paintHistory.state}
                 onPaint={painter.paintCell}
                 isPainting={painter.isPainting}
                 setIsPainting={painter.setIsPainting}
                 selectedEmoji={selectedEmojis[0]}
               />
            </div>
          )}

          <ExportControls
            art={activeTab === 'text' ? textHistory.state : paintHistory.state}
            onClear={activeTab === 'text' ? () => textHistory.reset([]) : () => paintHistory.reset(emptyGrid)}
            onRandomize={handleRandomize}
            onSave={handleSave}
          />
        </div>
      </main>

      <div className="order-3 lg:order-3 px-4 lg:px-0">
        <SettingsPanel>
          <div className="space-y-8">
            {activeTab === 'text' && (
              <>
                <GradientSelector mode={settings.gradientMode} setMode={(m) => setSettings(s => ({...s, gradientMode: m}))} />
                <div className="h-px bg-gray-100" />
              </>
            )}

            {activeTab === 'painter' && (
              <PaintControls brushSize={painter.brushSize} setBrushSize={painter.setBrushSize} />
            )}

            <StyleControls
              settings={settings}
              setSettings={setSettings}
              isPainter={activeTab === 'painter'}
            />
          </div>
        </SettingsPanel>
      </div>
    </motion.div>
  );
};

export default Studio;
