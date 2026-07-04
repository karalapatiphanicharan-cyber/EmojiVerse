import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ZoomIn, ZoomOut, Heart, Trash2 } from 'lucide-react';
import { exportCreation } from '../../utils/exportManager';
import SkeuoButton from '../common/SkeuoButton';
import AnimationPreview from '../animation/AnimationPreview';

const CreationViewer = ({ item, isFavorite, onClose, onToggleFavorite, onDelete }) => {
  if (!item) return null;

  const isMatrix = Array.isArray(item.emojiData) && Array.isArray(item.emojiData[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-stone-900/90 backdrop-blur-md"
    >
      <motion.button
        whileHover={{ rotate: 90 }}
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white"
      >
        <X size={32} />
      </motion.button>

      <div className="w-full max-w-6xl h-full flex flex-col lg:flex-row gap-12">
        {/* Main Preview Area */}
        <div className="flex-1 bg-white/5 rounded-[4rem] border-2 border-white/10 flex items-center justify-center relative overflow-hidden p-8">
           <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-full h-full flex items-center justify-center"
           >
              {isMatrix ? (
                <div id="viewer-canvas" className="bg-white rounded-3xl p-8 shadow-2xl scale-125">
                   <AnimationPreview
                     matrix={item.emojiData}
                     isPlaying={true}
                     preset="bounce"
                     bgStyle="paper"
                     emojiSize="medium"
                   />
                </div>
              ) : (
                <div className="text-[12rem] filter drop-shadow-2xl animate-bounce-slow">
                  {item.thumbnail}
                </div>
              )}
           </motion.div>

           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <SkeuoButton className="bg-white/10 text-white rounded-full p-4"><ZoomIn size={20} /></SkeuoButton>
              <SkeuoButton className="bg-white/10 text-white rounded-full p-4"><ZoomOut size={20} /></SkeuoButton>
           </div>
        </div>

        {/* Sidebar Info & Controls */}
        <div className="w-full lg:w-96 flex flex-col justify-between py-4">
           <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-2 block">
                  Archive Entry #{item.id.slice(-4)}
                </span>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  {item.name}
                </h2>
                <p className="text-white/40 font-bold mt-4 italic">
                  Created on {new Date(item.date).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                    <span className="text-[9px] font-black text-white/30 uppercase block mb-1">Type</span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.type || 'Standard'}</span>
                 </div>
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                    <span className="text-[9px] font-black text-white/30 uppercase block mb-1">Status</span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Optimized</span>
                 </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-4">
                <SkeuoButton
                   onClick={() => exportCreation({ type: 'png', elementId: 'viewer-canvas', filename: item.name })}
                   className="w-full py-4 bg-white text-stone-900 font-black uppercase text-xs flex items-center justify-center gap-2"
                >
                   <Download size={16} /> Download PNG
                </SkeuoButton>

                <div className="flex gap-4">
                   <SkeuoButton
                     onClick={() => onToggleFavorite(item.id)}
                     className={`flex-1 py-4 flex items-center justify-center gap-2 font-black uppercase text-xs
                                ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/5 text-white/50'}`}
                   >
                     <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                     {isFavorite ? 'Loved' : 'Love'}
                   </SkeuoButton>
                   <SkeuoButton className="flex-1 py-4 bg-white/5 text-white/50 flex items-center justify-center gap-2 font-black uppercase text-xs">
                     <Share2 size={16} /> Share
                   </SkeuoButton>
                </div>
              </div>
           </div>

           <button
             onClick={() => { onDelete(item.id); onClose(); }}
             className="flex items-center justify-center gap-2 text-red-500/50 hover:text-red-500 font-bold uppercase text-[10px] tracking-widest transition-colors py-4 border-2 border-red-500/10 rounded-2xl border-dashed"
           >
              <Trash2 size={14} /> Delete Permanently
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreationViewer;
