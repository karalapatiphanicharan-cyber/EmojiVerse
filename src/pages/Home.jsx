import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SkeuoButton from '../components/common/SkeuoButton';
import EmojiCard from '../components/common/EmojiCard';
import { EmojiBackground } from '../components/common/FloatingEmoji';
import { features } from '../data/features';
import { containerVariants, itemVariants } from '../hooks/useAnimation';
import { getCreations } from '../utils/storageManager';

const Home = () => {
  const navigate = useNavigate();
  const recentCreations = getCreations().slice(0, 4);

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6">
      <EmojiBackground />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center relative z-10 mb-32">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-12 inline-block"
        >
          <div className="w-40 h-40 mx-auto skeuo-raised flex items-center justify-center text-7xl bg-white/50 backdrop-blur-md border-4 border-white mb-8">
            🎨
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tight mb-6">
            Emoji<span className="text-studio-accent">Verse</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
            Turn words, images & imagination into living emoji art.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          <div className="flex justify-center gap-6">
            <SkeuoButton
              primary
              size="lg"
              onClick={() => navigate('/studio')}
              className="group"
            >
              <span>Open Studio</span>
              <span className="group-hover:translate-x-1 transition-transform">🚀</span>
            </SkeuoButton>
          </div>

          {recentCreations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl"
            >
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Continue Creating</h3>
               <div className="flex gap-4 justify-center">
                  {recentCreations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigate('/gallery')}
                      className="w-16 h-16 bg-white rounded-2xl shadow-skeuo-raised border-2 border-white flex items-center justify-center text-3xl hover:scale-110 transition-transform active:shadow-skeuo-pressed"
                      title={c.name}
                    >
                      {c.thumbnail}
                    </button>
                  ))}
               </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature) => (
            <EmojiCard
              key={feature.id}
              emoji={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
