import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  getCreations,
  getAchievements
} from '../utils/storageManager';
import { ACHIEVEMENTS } from '../utils/achievementEngine';
import StatCard from '../components/dashboard/StatCard';
import AchievementCard from '../components/dashboard/AchievementCard';
import {
  Palette,
  Zap,
  Shield,
  Bot,
  Trophy,
  Clock,
  Heart,
  Layout
} from 'lucide-react';

const Dashboard = () => {
  const creations = useMemo(() => getCreations(), []);
  const unlockedSlugs = useMemo(() => getAchievements(), []);

  const stats = useMemo(() => {
    const total = creations.length;
    const types = {
      text: creations.filter(c => c.type === 'art' || !c.type).length,
      painter: creations.filter(c => c.type === 'painter').length,
      animation: creations.filter(c => c.type === 'animation').length,
      secret: creations.filter(c => c.type === 'secret').length,
      ai: creations.filter(c => c.type === 'ai').length,
    };

    // Calculate most used emoji (if possible from thumbnails)
    const emojiCounts = {};
    creations.forEach(c => {
      if (c.thumbnail && typeof c.thumbnail === 'string') {
        emojiCounts[c.thumbnail] = (emojiCounts[c.thumbnail] || 0) + 1;
      }
    });

    const favoriteEmoji = Object.entries(emojiCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || '✨';

    return { total, ...types, favoriteEmoji };
  }, [creations]);

  const recentCreations = creations.slice(0, 4);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter uppercase">
            Creative Hub
          </h2>
          <p className="text-gray-500 font-bold italic border-l-4 border-amber-400 pl-4">
            Monitoring your emoji universe expansion
          </p>
        </div>
        <div className="bg-white px-8 py-4 rounded-3xl shadow-skeuo-raised flex items-center gap-4 border-2 border-white">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard
          title="Total Creations"
          value={stats.total}
          icon={Layout}
          color="bg-blue-500"
        />
        <StatCard
          title="Most Used Tool"
          value={stats.text > stats.painter ? 'Text' : 'Paint'}
          icon={Palette}
          color="bg-purple-500"
        />
        <StatCard
          title="Favorite Emoji"
          value={stats.favoriteEmoji}
          icon={Heart}
          color="bg-pink-500"
        />
        <StatCard
          title="Achievements"
          value={`${unlockedSlugs.length}/${ACHIEVEMENTS.length}`}
          icon={Trophy}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Stats Detail */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-stone-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden text-white border-b-8 border-black">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Clock size={14} /> Production Stats
              </h3>

              <div className="space-y-6">
                {[
                  { label: 'Text Artworks', count: stats.text, color: 'bg-indigo-400' },
                  { label: 'Manual Drawings', count: stats.painter, color: 'bg-emerald-400' },
                  { label: 'Animations', count: stats.animation, color: 'bg-pink-400' },
                  { label: 'Secret Files', count: stats.secret, color: 'bg-amber-400' },
                  { label: 'AI Operations', count: stats.ai, color: 'bg-blue-400' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/50">
                      <span>{item.label}</span>
                      <span className="text-white">{item.count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / (stats.total || 1)) * 100}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] shadow-skeuo-raised border-2 border-white">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Zap size={14} /> System Health
              </h3>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                <Shield className="text-emerald-500" size={24} />
                <div className="text-[10px] font-bold text-emerald-700 leading-tight">
                  Local storage optimized. <br/>
                  All 3D engines are operational.
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Achievements */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Trophy size={16} className="text-amber-500" /> Hall of Fame
              </h3>
              <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">
                Level {Math.floor(unlockedSlugs.length / 2) + 1} Creator
              </span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((ach) => (
                <AchievementCard
                  key={ach.slug}
                  title={ach.title}
                  description={ach.description}
                  icon={ach.icon}
                  isUnlocked={unlockedSlugs.includes(ach.slug)}
                />
              ))}
           </div>

           <div className="bg-indigo-50/50 p-8 rounded-[3rem] border-2 border-indigo-100 border-dashed text-center">
              <Bot className="text-indigo-400 mx-auto mb-4" size={48} />
              <h4 className="font-black text-indigo-900 uppercase tracking-tighter text-xl mb-2">
                AI Assistant Insight
              </h4>
              <p className="text-xs text-indigo-600 font-medium italic">
                "Your creativity density is increasing. Try experimenting with <br/>
                Animations to reach your next achievement level."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
