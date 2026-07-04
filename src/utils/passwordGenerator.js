/**
 * Emoji Password Generator
 * Generates secure(ish) emoji-based passwords.
 */

const EMOJI_POOLS = {
  cute: ['🌸', '🐱', '🍡', '🍦', '🎀', '🍭', '🧸', '☁️', '🦄', '🌈', '💖', '✨'],
  hacker: ['💀', '🔥', '💻', '⚡', '⛓️', '🛰️', '🕵️', '🔐', '🔋', '💀', '🤖', '👾'],
  space: ['🚀', '🌙', '⭐', '🪐', '👽', '🛸', '🌠', '☄️', '🌌', '🔭', '🛰️', '☄️'],
  royal: ['👑', '💎', '🏰', '🛡️', '⚔️', '🏛️', '💍', '⚜️', '🍷', '🦄', '🦁', '🦅']
};

const RANDOM_WORDS = [
  'Cipher', 'Matrix', 'Nexus', 'Shadow', 'Ghost', 'Zenith', 'Arcane', 'Neon',
  'Pulse', 'Cyber', 'Swift', 'Solar', 'Lunar', 'Alpha', 'Delta', 'Nova'
];

const SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '_', '+'];

export const generateEmojiPassword = (name = '', mode = 'hacker') => {
  const pool = EMOJI_POOLS[mode] || EMOJI_POOLS.hacker;
  const getRandomEmoji = () => pool[Math.floor(Math.random() * pool.length)];

  // 1. Base text
  let baseText = name.trim() || RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];

  // 2. Ensure mixed case and complexity
  let transformedBase = Array.from(baseText).map((char, index) => {
    // Randomly capitalize or lowercase
    let c = index === 0 ? char.toUpperCase() : char.toLowerCase();

    // Transform some letters to special chars (leetspeak)
    if (c.toLowerCase() === 'a') return '@';
    if (c.toLowerCase() === 'i') return '1';
    if (c.toLowerCase() === 's') return '$';
    if (c.toLowerCase() === 'e') return '3';
    if (c.toLowerCase() === 'o') return '0';

    return c;
  }).join('');

  // Ensure at least one uppercase if not already present after transformations
  if (!/[A-Z]/.test(transformedBase)) {
      // Find first alphabetic char and uppercase it
      const chars = Array.from(transformedBase);
      for (let i = 0; i < chars.length; i++) {
          if (/[a-z]/.test(chars[i])) {
              chars[i] = chars[i].toUpperCase();
              break;
          }
      }
      transformedBase = chars.join('');
  }

  // If still no uppercase (e.g. all chars were numbers or replaced by symbols), prepend one from a random word
  if (!/[A-Z]/.test(transformedBase)) {
      transformedBase = 'P' + transformedBase;
  }

  // 3. Add numbers
  const numberPart = Math.floor(Math.random() * 900 + 100); // 100-999

  // 4. Add symbols
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  // 5. Assemble with emojis (2-4 emojis)
  const emojiCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
  const startEmojis = Array.from({ length: Math.ceil(emojiCount / 2) }, getRandomEmoji).join('');
  const endEmojis = Array.from({ length: Math.floor(emojiCount / 2) }, getRandomEmoji).join('');

  return `${startEmojis}${transformedBase}${numberPart}${symbol}${endEmojis}`;
};

export const calculateStrength = (password) => {
  if (!password) return 'Not Generated';

  let score = 0;
  const len = Array.from(password).length;

  if (len >= 8) score += 20;
  if (len >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[!@#$%^&*_+~]/.test(password)) score += 15;

  // Emoji check
  const emojiMatch = password.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu);
  if (emojiMatch && emojiMatch.length >= 2) score += 10;

  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Strong';
  if (score >= 40) return 'Medium';
  return 'Weak';
};

/**
 * Returns a numeric score (0-100) for progress bar
 */
export const calculateStrengthScore = (password) => {
  if (!password) return 0;
  let score = 0;
  const len = Array.from(password).length;

  if (len >= 8) score += 20;
  if (len >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[!@#$%^&*_+~]/.test(password)) score += 15;

  const emojiMatch = password.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu);
  if (emojiMatch && emojiMatch.length >= 2) score += 10;

  return Math.min(score, 100);
};
