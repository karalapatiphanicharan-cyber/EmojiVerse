import { useEffect } from 'react';
import { checkAchievements } from '../utils/achievementEngine';
import { useToast } from '../context/ToastContext';

export const useAchievements = () => {
  const { showToast } = useToast();

  const scan = () => {
    const unlocked = checkAchievements();
    unlocked.forEach(ach => {
      showToast(`🏆 Achievement Unlocked: ${ach.title} ${ach.icon}`);
    });
    return unlocked;
  };

  return { scan };
};
