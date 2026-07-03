import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ExternalLink, Play } from 'lucide-react';
import { containerVariants, itemVariants } from '../hooks/useAnimation';
import { getCreations, deleteCreation } from '../utils/saveManager';
import { useToast } from '../context/ToastContext';
import AnimationPreview from '../components/animation/AnimationPreview';

const GalleryCard = ({ id, name, thumbnail, date, emojiData, onDelete }) => {
  const [isPreviewing, setIsPreviewing] = useState(false);

  const isMatrix = Array.isArray(emojiData) && Array.isArray(emojiData[0]);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, rotate: -1 }}
      className="bg-white p-4 pb-12 skeuo-card border-[12px] border-white relative group"
    >
      <div className="aspect-square bg-studio-bg skeuo-inner flex items-center justify-center text-6xl mb-6 overflow-hidden relative">
      {isPreviewing && isMatrix ? (
          <div className="scale-[0.3]">
            <AnimationPreview
              matrix={emojiData}
              preset="bounce"
              isPlaying={true}
              bgStyle="paper"
              emojiSize="medium"
            />
          </div>
        ) : (
          <motion.span
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {thumbnail}
          </motion.span>
        )}

      {isMatrix && (
        <button
          onClick={() => setIsPreviewing(!isPreviewing)}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isPreviewing ? 'bg-amber-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Play size={14} fill={isPreviewing ? "currentColor" : "none"} />
        </button>
      )}
      </div>
      <div className="px-2">
        <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight truncate">{name}</h3>
        <p className="text-xs text-gray-400 font-bold mt-1">{new Date(date).toLocaleDateString()}</p>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(id)}
          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [creations, setCreations] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    setCreations(getCreations());
  }, []);

  const handleDelete = (id) => {
    if (deleteCreation(id)) {
      setCreations(prev => prev.filter(c => c.id !== id));
      showToast("🗑️ Artwork deleted");
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">My Emoji Creations</h2>
        <p className="text-gray-500 font-medium italic underline decoration-blue-200 decoration-4 underline-offset-4">A physical collection of your digital imagination</p>
      </div>

      {creations.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence>
            {creations.map((item) => (
              <GalleryCard key={item.id} {...item} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-32 opacity-20">
          <div className="text-9xl mb-8">🖼️</div>
          <p className="text-2xl font-black uppercase tracking-widest">Your gallery is empty</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
