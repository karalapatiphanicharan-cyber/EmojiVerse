import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Brain, Heart, BookOpen, MessageCircle,
  Layout, Sparkles, RefreshCw, Dice5, Save, Send
} from 'lucide-react';
import { useEmojiAI } from '../../hooks/useEmojiAI';
import EmojiBrain from './EmojiBrain';
import MoodAnalyzer from './MoodAnalyzer';
import EmojiStory from './EmojiStory';
import CaptionGenerator from './CaptionGenerator';
import EmojiAssistant from './EmojiAssistant';
import ComboGenerator from './ComboGenerator';

const EmojiAILab = ({ onSave, onApplyStyle }) => {
  const {
    activeTool,
    setActiveTool,
    inputText,
    setInputText,
    isProcessing,
    results,
    handleProcess,
    getInspiration,
    reset
  } = useEmojiAI();

  const tools = [
    { id: 'brain', label: 'Brain', icon: Brain, color: 'text-amber-500' },
    { id: 'mood', label: 'Mood', icon: Heart, color: 'text-rose-500' },
    { id: 'story', label: 'Story', icon: BookOpen, color: 'text-indigo-500' },
    { id: 'caption', label: 'Caption', icon: Layout, color: 'text-emerald-500' },
    { id: 'combo', label: 'Combo', icon: Sparkles, color: 'text-cyan-500' },
    { id: 'assistant', label: 'Assistant', icon: MessageCircle, color: 'text-violet-500' },
  ];

  const renderToolContent = () => {
    switch (activeTool) {
      case 'brain':
        return <EmojiBrain results={results} isProcessing={isProcessing} />;
      case 'mood':
        return <MoodAnalyzer results={results} isProcessing={isProcessing} onApplyStyle={onApplyStyle} />;
      case 'story':
        return <EmojiStory results={results} isProcessing={isProcessing} onProcess={(style) => handleProcess(inputText, 'story', { style })} />;
      case 'caption':
        return <CaptionGenerator results={results} isProcessing={isProcessing} />;
      case 'combo':
        return <ComboGenerator results={results} isProcessing={isProcessing} onProcess={(category) => handleProcess('', 'combo', { category })} />;
      case 'assistant':
        return <EmojiAssistant results={results} isProcessing={isProcessing} onProcess={(text) => handleProcess(text, 'assistant')} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto py-4">
      {/* LEFT: AI Tools Selector */}
      <div className="lg:w-1/4 space-y-4">
        <div className="bg-white/50 p-6 rounded-[32px] shadow-skeuo-raised border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 rounded-2xl shadow-inner border border-indigo-200">
              <Bot size={24} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter">AI Lab Tools</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Select Assistant</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id);
                  reset();
                }}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 group
                           ${activeTool === tool.id
                             ? 'bg-white shadow-skeuo-pressed translate-y-1'
                             : 'hover:bg-white/80 shadow-skeuo-raised hover:translate-y-[-2px]'}`}
              >
                <div className={`p-2 rounded-xl bg-gray-50 shadow-inner group-hover:scale-110 transition-transform ${tool.color}`}>
                  <tool.icon size={18} />
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${activeTool === tool.id ? 'text-gray-900' : 'text-gray-400'}`}>
                  {tool.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={getInspiration}
          className="w-full flex items-center justify-center gap-3 p-5 bg-white text-gray-700 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-skeuo-raised hover:shadow-skeuo-pressed active:translate-y-1 transition-all"
        >
          <Dice5 size={18} className="text-amber-500" /> Inspire Me
        </button>
      </div>

      {/* CENTER: AI Console */}
      <div className="flex-1 space-y-6">
        <div className="bg-stone-800 rounded-[40px] p-8 relative overflow-hidden border-[12px] border-stone-700 shadow-2xl min-h-[500px] flex flex-col">
          {/* Glowing robot screen effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Console Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Emoji_Brain_v1.0.4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'} shadow-[0_0_5px_currentColor]`} />
                <span className="text-[10px] font-mono text-stone-500 uppercase">{isProcessing ? 'Processing' : 'Ready'}</span>
              </div>
            </div>

            {/* AI Assistant Personality */}
            <div className="mb-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-stone-700 rounded-2xl flex items-center justify-center shadow-inner border border-stone-600 relative shrink-0">
                <Bot size={28} className="text-stone-300" />
                {isProcessing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-stone-800 rounded-full flex items-center justify-center border border-stone-600"
                  >
                    <RefreshCw size={10} className="text-amber-400" />
                  </motion.div>
                )}
              </div>
              <div className="bg-stone-700/50 p-4 rounded-2xl rounded-tl-none border border-stone-600/50 max-w-[80%]">
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isProcessing ? "Thinking in emojis..." : "Hello! I am your Emoji AI Assistant. Give me some text, and I will transform it into pure emoji magic."}
                </p>
              </div>
            </div>

            {/* Input Area */}
            {activeTool !== 'combo' && activeTool !== 'assistant' && (
              <div className="mb-8 space-y-4">
                <div className="relative group">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your words here..."
                    className="w-full bg-stone-900/50 text-white p-6 rounded-[32px] border-2 border-stone-700 focus:border-indigo-500 focus:outline-none transition-all resize-none h-32 font-mono text-lg shadow-[inset_4px_4px_12px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute bottom-4 right-4 text-stone-600 text-[10px] font-mono">UTF-8 // MODE: {activeTool.toUpperCase()}</div>
                </div>

                <button
                  onClick={() => handleProcess()}
                  disabled={isProcessing || !inputText}
                  className={`w-full py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all
                             ${isProcessing || !inputText
                               ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                               : 'bg-indigo-500 text-white shadow-[0_8px_0_rgb(67,56,202)] hover:translate-y-[2px] hover:shadow-[0_6px_0_rgb(67,56,202)] active:translate-y-[6px] active:shadow-[0_2px_0_rgb(67,56,202)]'}`}
                >
                  {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  Generate AI Magic
                </button>
              </div>
            )}

            {/* Results Display */}
            <div className="flex-1 flex flex-col">
               <AnimatePresence mode="wait">
                 {isProcessing ? (
                   <motion.div
                     key="loading"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex-1 flex flex-col items-center justify-center space-y-4"
                   >
                     <div className="flex gap-2">
                       {[0, 1, 2].map((i) => (
                         <motion.div
                           key={i}
                           animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                           transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                           className="w-3 h-3 rounded-full bg-indigo-400"
                         />
                       ))}
                     </div>
                     <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest animate-pulse">Processing Sequence...</p>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="content"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex-1"
                   >
                     {renderToolContent()}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Suggestions & Stats */}
      <div className="lg:w-1/4 space-y-6">
        <div className="bg-white/50 p-6 rounded-[32px] shadow-skeuo-raised border border-white/50 h-full">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Neural Suggestions</h4>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
               <div className="text-[8px] font-bold text-indigo-500 uppercase mb-2">Did you know?</div>
               <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic">
                 AI Lab can detect over 7 different moods and suggests styles based on your sentiment.
               </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
               <div className="text-[8px] font-bold text-amber-500 uppercase mb-2">Style Tip</div>
               <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic">
                 Use the Story tool with "Fantasy" style to create magical journey maps!
               </p>
            </div>

            {results && activeTool !== 'assistant' && (
              <button
                onClick={() => onSave(results, activeTool)}
                className="w-full flex items-center justify-center gap-2 p-4 bg-emerald-100 text-emerald-700 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-skeuo-raised hover:shadow-skeuo-pressed transition-all"
              >
                <Save size={16} /> Save Creation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiAILab;
