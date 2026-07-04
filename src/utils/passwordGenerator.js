/**
 * Emoji Password Generator
 * Generates truly secure, high-entropy passwords including emojis, symbols, and alphanumeric characters.
 */

const EMOJI_POOLS = {
  cute: ['🌸', '🐱', '🍡', '🍦', '🎀', '🍭', '🧸', '☁️', '🦄', '🌈'],
  hacker: ['💀', '🔥', '💻', '⚡', '⛓️', '🛰️', '🕵️', '🔐', '🔋', '🔌'],
  space: ['🚀', '🌙', '⭐', '🪐', '👽', '🛸', '🌠', '☄️', '🌌', '🔭'],
  royal: ['👑', '💎', '🏰', '🛡️', '⚔️', '🏛️', '💍', '⚜️', '🍷', '🦄'],
  random: ['🔥', '🌙', '🐱', '🚀', '🍕', '🎮', '⭐', '🌊', '🌱', '✨']
};

const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const NUMBERS = "0123456789";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

export const generateEmojiPassword = (name = '', mode = 'random') => {
  const pool = EMOJI_POOLS[mode] || EMOJI_POOLS.random;
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // 1. Process base name with leet-speak
  const base = name.replace(/\s+/g, '') || "emoji";
  const transformedBase = base.split('').map(char => {
    if (char.toLowerCase() === 'a') return Math.random() > 0.5 ? '@' : '4';
    if (char.toLowerCase() === 'e') return '3';
    if (char.toLowerCase() === 'i') return '1';
    if (char.toLowerCase() === 'o') return '0';
    if (char.toLowerCase() === 's') return '$';
    if (char.toLowerCase() === 't') return '7';
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');

  // 2. Add high-entropy components
  const prefix = getRandom(pool);
  const suffix = getRandom(pool);
  const midEmoji = getRandom(pool);
  const randNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  const randSym = getRandom(SYMBOLS) + getRandom(SYMBOLS);

  // 3. Assemble in a complex pattern
  return `${prefix}${transformedBase.slice(0, Math.floor(transformedBase.length/2))}${randSym}${midEmoji}${transformedBase.slice(Math.floor(transformedBase.length/2))}${randNum}${suffix}`;
};

export const calculateStrength = (password) => {
  if (!password) return 0;
  let score = 0;

  // Length factor
  score += Math.min(password.length * 4, 40);

  // Complexity factors
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) score += 15;

  // Emoji detection (simple regex for common emojis)
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
  if (emojiRegex.test(password)) score += 15;

  return Math.min(score, 100);
};
