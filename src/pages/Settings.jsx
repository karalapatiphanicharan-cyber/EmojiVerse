import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Zap, ZapOff, Palette, Monitor } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import SkeuoButton from '../components/common/SkeuoButton';

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  const themes = [
    { id: 'classic', label: 'Classic Paper', color: 'bg-[#fdfbf7]', border: 'border-[#f0ece2]' },
    { id: 'dark', label: 'Industrial Dark', color: 'bg-stone-900', border: 'border-stone-950' },
    { id: 'candy', label: 'Sweet Candy', color: 'bg-pink-100', border: 'border-pink-200' },
    { id: 'wood', label: 'Mahogany Wood', color: 'bg-[#5d4037]', border: 'border-[#3e2723]' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h2 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          Universe <span className="text-stone-400">Settings</span>
        </h2>
        <p className="text-gray-500 font-bold italic border-l-4 border-stone-200 pl-4 inline-block">
          Calibrate your creative environment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Experience Controls */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[3rem] shadow-skeuo-raised border-2 border-white">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Monitor size={14} /> Experience
              </h3>

              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-sm">Interface Sounds</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Skeuomorphic Audio</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                      className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ${settings.soundEnabled ? 'bg-emerald-400' : 'bg-gray-200'}`}
                    >
                       <motion.div
                         animate={{ x: settings.soundEnabled ? 32 : 0 }}
                         className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400"
                       >
                          {settings.soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                       </motion.div>
                    </button>
                 </div>

                 <div className="h-px bg-gray-100" />

                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-sm">Global Animations</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Framer Motion Effects</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                      className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ${settings.animationsEnabled ? 'bg-amber-400' : 'bg-gray-200'}`}
                    >
                       <motion.div
                         animate={{ x: settings.animationsEnabled ? 32 : 0 }}
                         className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400"
                       >
                          {settings.animationsEnabled ? <Zap size={12} /> : <ZapOff size={12} />}
                       </motion.div>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[3rem] shadow-skeuo-raised border-2 border-white">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Palette size={14} /> Material Theme
              </h3>

              <div className="grid grid-cols-2 gap-4">
                 {themes.map((t) => (
                   <button
                     key={t.id}
                     onClick={() => updateSettings({ theme: t.id })}
                     className={`p-4 rounded-3xl border-4 transition-all duration-300 text-left
                                ${settings.theme === t.id ? 'border-amber-400 ring-4 ring-amber-100' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                   >
                      <div className={`w-full aspect-video rounded-xl mb-3 shadow-inner ${t.color} ${t.border} border-2`} />
                      <span className={`text-[10px] font-black uppercase tracking-tight ${settings.theme === t.id ? 'text-amber-600' : 'text-gray-400'}`}>
                         {t.label}
                      </span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="mt-12 p-8 bg-stone-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between border-b-8 border-black">
         <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">
               📦
            </div>
            <div>
               <h4 className="font-black uppercase tracking-tight">Factory Reset</h4>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Clear all creations and progress</p>
            </div>
         </div>
         <button
           onClick={() => { if(confirm('Erase all memory?')) { localStorage.clear(); window.location.reload(); } }}
           className="px-8 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
         >
            Initiate Purge
         </button>
      </div>
    </div>
  );
};

export default Settings;
