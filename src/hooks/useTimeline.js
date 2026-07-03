import { useState, useEffect, useCallback } from 'react';

export const useTimeline = (isPlaying, duration = 2) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            return 0; // Loop
          }
          return prev + 0.05;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const seek = useCallback((time) => {
    setCurrentTime(Math.min(Math.max(0, time), duration));
  }, [duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    seek,
    duration,
    formatTime
  };
};
