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
import AnimationStudio from '../components/animation/AnimationStudio';

// Phase 4 Components
import ImageUploader from '../components/converter/ImageUploader';
import ImagePreview from '../components/converter/ImagePreview';
import BeforeAfterViewer from '../components/converter/BeforeAfterViewer';
import ConversionControls from '../components/converter/ConversionControls';
import EmojiPalette from '../components/converter/EmojiPalette';
import { useImageConverter } from '../hooks/useImageConverter';
import { downloadConversionAsPng, downloadConversionAsTxt, copyToClipboard } from '../utils/imageExport';

// Phase 5 Components
import SecretLab from '../components/studio/secret/SecretLab';

import { Download, Copy, Save, Trash2, Share2, Sparkles } from 'lucide-react';

import { generateMultiEmojiArt } from '../utils/multiEmojiGenerator';
import { applyFontStyle } from '../utils/fontStyles';
import { useHistory } from '../hooks/useHistory';
import { useEmojiPainter } from '../hooks/useEmojiPainter';
import { saveCreation } from '../utils/saveManager';

const Studio = () => {
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'painter', 'animator', 'converter', 'secret'
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

  // Image Converter Hook
  const converter = useImageConverter();

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
    let currentArt, name, icon;

    if (activeTab === 'text') {
      currentArt = textHistory.state;
      name = `Text: ${text}`;
      icon = '🎨';
    } else if (activeTab === 'painter') {
      currentArt = paintHistory.state;
      name = `Drawing ${new Date().toLocaleTimeString()}`;
      icon = '🖌️';
    } else if (activeTab === 'converter') {
      currentArt = converter.resultMatrix;
      name = "📸 Conversion";
      icon = '📸';
    }

    if (!currentArt || (activeTab === 'painter' && currentArt.every(row => row.every(cell => cell === "")))) {
      showToast("Create something first ✨");
      return;
    }

    const success = saveCreation(name, currentArt, icon);

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

  const handleCopyConversion = async () => {
    if (!converter.resultMatrix) return;
    const success = await copyToClipboard(converter.resultMatrix);
    if (success) showToast("📋 Copied to clipboard!");
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
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-2xl shadow-inner">
              {['text', 'painter', 'animator', 'converter', 'secret'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-1 text-[9px] font-black uppercase rounded-xl transition-all
                             ${activeTab === tab
                               ? 'bg-white shadow-skeuo-raised text-gray-900'
                               : 'text-gray-400 hover:text-gray-500'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'painter' && (
              <BrushToolbar activeTool={painter.tool} setTool={painter.setTool} />
            )}

            {activeTab === 'converter' ? (
              <ImageUploader onUpload={converter.handleUpload} currentImage={converter.originalUrl} />
            ) : activeTab === 'secret' ? (
              <div className="p-6 bg-stone-50 rounded-3xl border-2 border-stone-200 shadow-inner text-center">
                <Sparkles className="text-amber-400 mx-auto mb-3" size={32} />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Secret Mode Active
                </h4>
                <p className="text-[9px] text-stone-400 mt-2 italic">
                  Tools restricted during stealth operation.
                </p>
              </div>
            ) : (
              <EmojiPicker
                selectedEmoji={selectedEmojis[selectedEmojis.length - 1]}
                onSelect={onEmojiSelect}
              />
            )}

            {activeTab === 'text' && (
              <MultiEmojiTray
                selectedEmojis={selectedEmojis}
                onRemove={handleRemoveEmoji}
                onAdd={() => {}}
              />
            )}

            {activeTab === 'converter' && converter.originalUrl && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={converter.clearImage}
                className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 rounded-2xl font-bold shadow-skeuo-raised hover:bg-red-100 transition-all text-sm"
              >
                <Trash2 size={16} /> Eject Photo
              </motion.button>
            )}
          </div>
        </ToolPanel>
      </div>

      <main className={`flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden order-2 lg:order-2 ${activeTab === 'secret' ? 'bg-[#f5f3ef]' : ''}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          {activeTab === 'text' && (
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
          )}

          {activeTab === 'painter' && (
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

          {activeTab === 'animator' && (
            <AnimationStudio
              matrix={paintHistory.state.some(row => row.some(cell => cell !== "")) ? paintHistory.state : textHistory.state}
              bgStyle={settings.bgStyle}
              emojiSize={settings.emojiSize}
            />
          )}

          {activeTab === 'converter' && (
            <div className="space-y-8">
              <div className="bg-white/50 p-4 rounded-[48px] shadow-skeuo-raised border border-white/50">
                <ImagePreview
                  isProcessing={converter.isProcessing}
                  progress={converter.progress}
                  matrix={converter.resultMatrix}
                  bgStyle={settings.bgStyle}
                />
              </div>

              {converter.resultMatrix && !converter.isProcessing && (
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => downloadConversionAsPng('emoji-conversion-output')}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-skeuo-raised hover:bg-indigo-700 active:shadow-skeuo-pressed transition-all"
                  >
                    <Download size={20} /> PNG
                  </button>
                  <button
                    onClick={() => downloadConversionAsTxt(converter.resultMatrix)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-2xl font-bold shadow-skeuo-raised hover:bg-gray-50 active:shadow-skeuo-pressed transition-all"
                  >
                    <Download size={20} /> TXT
                  </button>
                  <button
                    onClick={handleCopyConversion}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-2xl font-bold shadow-skeuo-raised hover:bg-gray-50 active:shadow-skeuo-pressed transition-all"
                  >
                    <Copy size={20} /> Copy
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold shadow-skeuo-raised hover:bg-emerald-600 active:shadow-skeuo-pressed transition-all"
                  >
                    <Save size={20} /> Gallery
                  </button>
                </div>
              )}

              {converter.originalUrl && converter.resultMatrix && !converter.isProcessing && (
                <div className="bg-white/80 p-6 rounded-[32px] shadow-skeuo-raised border border-white/50 space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Share2 size={14} /> Side-by-Side Comparison
                  </h3>
                  <BeforeAfterViewer
                    original={converter.originalUrl}
                    matrix={converter.resultMatrix}
                    bgStyle={settings.bgStyle}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'secret' && (
            <SecretLab />
          )}

          {activeTab !== 'animator' && activeTab !== 'converter' && activeTab !== 'secret' && (
            <ExportControls
              art={activeTab === 'text' ? textHistory.state : paintHistory.state}
              onClear={activeTab === 'text' ? () => textHistory.reset([]) : () => paintHistory.reset(emptyGrid)}
              onRandomize={handleRandomize}
              onSave={handleSave}
            />
          )}
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

            {activeTab === 'converter' && (
              <>
                <ConversionControls settings={converter.settings} setSettings={converter.setSettings} />
                <div className="h-px bg-gray-100" />
                <EmojiPalette
                  currentPalette={converter.settings.palette}
                  onSelect={(p) => converter.setSettings({ ...converter.settings, palette: p })}
                />
              </>
            )}

            {activeTab === 'secret' && (
               <div className="p-6 bg-stone-800 rounded-3xl border-b-8 border-stone-950 shadow-2xl space-y-4">
                  <div className="h-2 w-12 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <h4 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em]">
                    Signal Jammer
                  </h4>
                  <div className="space-y-2">
                    <div className="h-1 bg-stone-700 w-full rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/3 bg-amber-400/30"
                      />
                    </div>
                    <div className="h-1 bg-stone-700 w-full rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: [100, -100] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/4 bg-indigo-400/30"
                      />
                    </div>
                  </div>
                  <p className="text-[8px] text-stone-500 font-bold leading-tight">
                    ENCRYPTION STATUS: <span className="text-emerald-500">ACTIVE</span><br/>
                    LOCATION: <span className="text-amber-500">ENCRYPTED</span>
                  </p>
               </div>
            )}

            {activeTab !== 'converter' && activeTab !== 'secret' && (
              <StyleControls
                settings={settings}
                setSettings={setSettings}
                isPainter={activeTab === 'painter'}
              />
            )}
          </div>
        </SettingsPanel>
      </div>
    </motion.div>
  );
};

export default Studio;
