import { useState, useCallback } from 'react';

export const useAnimationEngine = (initialPreset = 'rain') => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState(initialPreset);
  const [speed, setSpeed] = useState('medium'); // slow, medium, fast
  const [loop, setLoop] = useState(true);
  const [intensity, setIntensity] = useState('medium'); // low, medium, high

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);

  const restart = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10);
  }, []);

  return {
    isPlaying,
    preset,
    setPreset,
    speed,
    setSpeed,
    loop,
    setLoop,
    intensity,
    setIntensity,
    play,
    pause,
    togglePlay,
    restart
  };
};
