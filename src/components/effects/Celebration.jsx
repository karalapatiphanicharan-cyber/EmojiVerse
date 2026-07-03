import React from 'react';
import confetti from 'canvas-confetti';

const Celebration = () => {
  const fire = React.useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#6366f1', '#f43f5e', '#fbbf24', '#10b981']
    });
  }, []);

  React.useEffect(() => {
    fire();
  }, [fire]);

  return null;
};

export default Celebration;
