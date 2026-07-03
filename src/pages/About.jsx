import React from 'react';
import { motion } from 'framer-motion';
import { roadmap } from '../data/roadmap';
import { containerVariants, itemVariants } from '../hooks/useAnimation';

const RoadmapItem = ({ phase, title, description, status, index }) => (
  <motion.div
    variants={itemVariants}
    className="flex gap-8 relative"
  >
    {/* Timeline Line */}
    {index !== roadmap.length - 1 && (
      <div className="absolute left-[39px] top-20 w-1 h-full bg-gray-200/50 rounded-full" />
    )}

    <div className="flex-shrink-0 w-20 h-20 skeuo-raised flex flex-col items-center justify-center bg-white z-10">
      <span className="text-[10px] font-black text-studio-accent uppercase tracking-tighter">Phase</span>
      <span className="text-xl font-bold text-gray-800">{phase.split(' ')[1]}</span>
    </div>

    <div className="flex-1 pb-16">
      <div className="skeuo-card p-8 bg-white/80 backdrop-blur-sm border border-white">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black text-gray-900">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            status === 'upcoming' ? 'bg-studio-accent text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <section className="mb-24 text-center">
        <h2 className="text-6xl font-black text-gray-900 mb-8">What is EmojiVerse?</h2>
        <div className="skeuo-card p-10 paper-texture text-left">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            EmojiVerse is a creative emoji art studio where users can transform text, images, and ideas into interactive emoji artwork. We believe emojis are the universal language of the digital age, and our mission is to provide the ultimate workstation for emoji-based expression.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            Designed with a focus on tactile interaction and physical feedback, EmojiVerse brings the warmth of a real-world art studio to your browser.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-black text-gray-900 mb-16 text-center">Project Roadmap</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {roadmap.map((item, index) => (
            <RoadmapItem key={item.phase} {...item} index={index} />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default About;
