import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Download, Trash2, Zap } from 'lucide-react';
import AnimationPreview from './AnimationPreview';
import AnimationControls from './AnimationControls';
import AnimationTimeline from './AnimationTimeline';
import PresetSelector from './PresetSelector';
import Celebration from '../effects/Celebration';
import EmojiParticles from '../effects/EmojiParticles';
import { useAnimationEngine } from '../../hooks/useAnimationEngine';
import { useTimeline } from '../../hooks/useTimeline';
import { exportToGif, downloadGif } from '../../utils/gifExporter';
import { useToast } from '../../context/ToastContext';

const AnimationStudio = ({ matrix, bgStyle, emojiSize }) => {
  const { showToast } = useToast();
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const engine = useAnimationEngine();
  const timeline = useTimeline(engine.isPlaying);

  const handleExport = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      showToast("🎬 Rolling cameras... Generating GIF");
      const gifUrl = await exportToGif(previewRef.current, {
        duration: 2,
        fps: 10,
        onProgress: (p) => setExportProgress(p)
      });

      downloadGif(gifUrl);
      setShowCelebration(true);
      showToast("✨ GIF Exported Successfully!");
      setTimeout(() => setShowCelebration(false), 3000);
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to export GIF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/50 p-4 rounded-[24px] shadow-skeuo-raised border border-white/50">
        <div className="flex items-center gap-3">
          <button
            onClick={engine.togglePlay}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
              engine.isPlaying
                ? 'bg-amber-100 text-amber-600 shadow-skeuo-pressed'
                : 'bg-green-100 text-green-600 shadow-skeuo-raised hover:translate-y-[-2px]'
            }`}
          >
            {engine.isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>

          <div className="px-4 py-2 bg-gray-100 rounded-xl shadow-inner font-mono text-sm font-bold text-gray-500">
            {timeline.formatTime(timeline.currentTime)}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              isExporting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-inner'
                : 'bg-indigo-600 text-white shadow-skeuo-raised hover:bg-indigo-700 active:shadow-skeuo-pressed'
            }`}
          >
            {isExporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{Math.round(exportProgress * 100)}%</span>
              </div>
            ) : (
              <>
                <Download size={20} />
                <span>Export GIF</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Preview Area */}
        <div className="lg:col-span-8 space-y-6">
          <div ref={previewRef}>
             <AnimationPreview
               matrix={matrix}
               preset={engine.preset}
               isPlaying={engine.isPlaying}
               bgStyle={bgStyle}
               emojiSize={emojiSize}
             />
          </div>

          <AnimationTimeline
            currentTime={timeline.currentTime}
            duration={timeline.duration}
            isPlaying={engine.isPlaying}
          />
        </div>

        {/* Right: Presets & Micro-controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[32px] shadow-skeuo-raised border border-white/50">
             <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
               <Zap size={14} /> Animation Presets
             </h3>
             <PresetSelector
               activePreset={engine.preset}
               onSelect={engine.setPreset}
             />
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[32px] shadow-skeuo-raised border border-white/50">
             <AnimationControls
               speed={engine.speed}
               setSpeed={engine.setSpeed}
               intensity={engine.intensity}
               setIntensity={engine.setIntensity}
             />
          </div>
        </div>
      </div>

      {/* Overlays */}
      <Celebration active={showCelebration} />
      {engine.isPlaying && <EmojiParticles />}
    </div>
  );
};

export default AnimationStudio;
