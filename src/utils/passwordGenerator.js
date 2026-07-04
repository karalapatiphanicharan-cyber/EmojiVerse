/**
 * Emoji Password Generator
 * Generates secure(ish) emoji-based passwords.
 */

const EMOJI_POOLS = {
  cute: ['🌸', '🐱', '🍡', '🍦', '🎀', '🍭', '🧸', '☁️', '🦄', '🌈'],
  hacker: ['💀', '🔥', '💻', '⚡', '⛓️', '🛰️', '🕵️', '🔐', '🔋', '🔋'],
  space: ['🚀', '🌙', '⭐', '🪐', '👽', '🛸', '🌠', '☄️', '🌌', '🔭'],
  royal: ['👑', '💎', '🏰', '🛡️', '⚔️', '🏛️', '💍', '⚜️', '🍷', '🦄']
};

export const generateEmojiPassword = (name = '', mode = 'hacker') => {
  const pool = EMOJI_POOLS[mode] || EMOJI_POOLS.hacker;
  const getRandomEmoji = () => pool[Math.floor(Math.random() * pool.length)];

  const base = name.replace(/\s+/g, '');
  const transformedBase = base.split('').map(char => {
    // Random leet-speak or capitalization
    if (Math.random() > 0.7) return char.toUpperCase();
    if (char.toLowerCase() === 'a') return '@';
    if (char.toLowerCase() === 'i') return '1';
    if (char.toLowerCase() === 'o') return '0';
    if (char.toLowerCase() === 's') return '$';
    return char.toLowerCase();
  }).join('');

  const prefix = getRandomEmoji();
  const suffix = getRandomEmoji() + Math.floor(Math.random() * 1000);
  const middle = getRandomEmoji();

  return `${prefix}${transformedBase}${middle}${suffix}`;
};

export const calculateStrength = (password) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length > 8) strength += 30;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(password)) strength += 30;
  return Math.min(strength, 100);
};
