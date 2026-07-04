/**
 * Achievement Engine
 * Logic for tracking and unlocking EmojiVerse achievements.
 */

import { unlockAchievement, getCreations, getAchievements } from './storageManager';
import { soundManager } from './soundManager';

export const ACHIEVEMENTS = [
  {
    slug: 'first-creation',
    title: 'Emoji Beginner',
    description: 'Create and save your first masterpiece',
    icon: '🏆',
    requirement: (stats) => stats.totalCreations >= 1
  },
  {
    slug: 'emoji-artist',
    title: 'Emoji Artist',
    description: 'Create 10 emoji artworks',
    icon: '🎨',
    requirement: (stats) => stats.totalCreations >= 10
  },
  {
    slug: 'motion-master',
    title: 'Motion Master',
    description: 'Create an animated creation',
    icon: '✨',
    requirement: (stats) => stats.totalAnimations >= 1
  },
  {
    slug: 'emoji-spy',
    title: 'Emoji Spy',
    description: 'Encode a secret message',
    icon: '🔐',
    requirement: (stats) => stats.totalSecrets >= 1
  },
  {
    slug: 'ai-explorer',
    title: 'AI Explorer',
    description: 'Generate an AI-powered creation',
    icon: '🤖',
    requirement: (stats) => stats.totalAI >= 1
  },
  {
    slug: 'pixel-perfectionist',
    title: 'Pixel Perfectionist',
    description: 'Save a manual painting',
    icon: '🖌️',
    requirement: (stats) => stats.totalPaintings >= 1
  }
];

export const checkAchievements = () => {
  const creations = getCreations();
  const stats = {
    totalCreations: creations.length,
    totalAnimations: creations.filter(c => c.type === 'animation').length,
    totalSecrets: creations.filter(c => c.type === 'secret').length,
    totalAI: creations.filter(c => c.type === 'ai').length,
    totalPaintings: creations.filter(c => c.type === 'painter').length,
  };

  const unlockedNow = [];

  ACHIEVEMENTS.forEach(ach => {
    if (ach.requirement(stats)) {
      const unlocked = unlockAchievement(ach.slug);
      if (unlocked) {
        unlockedNow.push(ach);
      }
    }
  });

  if (unlockedNow.length > 0) {
    soundManager.play('achievement');
  }

  return unlockedNow;
};

export const getAchievementProgress = () => {
  const unlockedSlugs = getAchievements();
  return ACHIEVEMENTS.map(ach => ({
    ...ach,
    isUnlocked: unlockedSlugs.includes(ach.slug)
  }));
};
