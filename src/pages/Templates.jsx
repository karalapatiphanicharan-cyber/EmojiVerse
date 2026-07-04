import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Layout, Flame, Heart, Rocket, Skull, Cake } from 'lucide-react';
import TemplateCard from '../components/templates/TemplateCard';

const TEMPLATES = [
  {
    id: 'fire-name',
    title: 'Fire Name Banner',
    emoji: '🔥',
    tool: 'text',
    toolLabel: 'Text Painter',
    bgColor: 'bg-orange-500',
    data: { text: 'HOT ART', emoji: '🔥', style: 'block' }
  },
  {
    id: 'love-card',
    title: 'Love Greeting',
    emoji: '❤️',
    tool: 'text',
    toolLabel: 'Text Painter',
    bgColor: 'bg-rose-500',
    data: { text: 'LOVE', emoji: '❤️', style: 'outline' }
  },
  {
    id: 'space-logo',
    title: 'Interstellar Logo',
    emoji: '🚀',
    tool: 'painter',
    toolLabel: 'Manual Painter',
    bgColor: 'bg-indigo-600',
    data: { emoji: '🚀' }
  },
  {
    id: 'hacker-vault',
    title: 'Hacker Sequence',
    emoji: '💀',
    tool: 'secret',
    toolLabel: 'Secret Lab',
    bgColor: 'bg-stone-800',
    data: { theme: 'hacker' }
  },
  {
    id: 'birthday-bash',
    title: 'Birthday Surprise',
    emoji: '🎂',
    tool: 'animator',
    toolLabel: 'Animation Studio',
    bgColor: 'bg-amber-400',
    data: { preset: 'bounce' }
  },
  {
    id: 'nature-flow',
    title: 'Nature Zen',
    emoji: '🌱',
    tool: 'ai',
    toolLabel: 'AI Lab',
    bgColor: 'bg-emerald-500',
    data: { type: 'mood' }
  }
];

const Templates = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    // We pass the template data via state to the Studio page
    navigate('/studio', { state: { template: template } });
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter uppercase">
            Template <span className="text-amber-500">Library</span>
          </h2>
          <p className="text-gray-500 font-bold italic border-l-4 border-amber-400 pl-4">
            Professional blueprints for your next masterpiece
          </p>
        </div>
        <div className="flex items-center gap-2 text-amber-500 font-black uppercase text-[10px] tracking-widest bg-amber-50 px-6 py-3 rounded-full border border-amber-100 shadow-sm">
           <Sparkles size={16} /> 6 Ready Blueprints
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUse={handleUseTemplate}
          />
        ))}
      </div>

      <div className="mt-24 p-12 bg-white rounded-[4rem] shadow-skeuo-raised border-2 border-white flex flex-col md:flex-row items-center gap-12">
         <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner border border-white">
            🏗️
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
               Custom Blueprints Coming Soon
            </h3>
            <p className="text-sm font-bold text-gray-400">
               Soon you'll be able to save your own creations as templates for your future self.
            </p>
         </div>
         <button className="px-8 py-4 bg-gray-100 text-gray-400 rounded-3xl font-black uppercase text-[10px] tracking-widest cursor-not-allowed">
            Request Feature
         </button>
      </div>
    </div>
  );
};

export default Templates;
