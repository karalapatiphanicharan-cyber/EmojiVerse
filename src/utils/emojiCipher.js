/**
 * Emoji Cipher Utility
 * Handles encoding and decoding of text messages using emoji themes.
 */

export const CIPHER_THEMES = {
  space: {
    icon: '🚀',
    label: 'Space',
    map: '🚀🌙⭐🪐👽🛸🌠☄️🔭🛰️🌌👾🤖🦾🔋📡🌍☀️🌚🔥🧊💎🧿🌀🧨'
  },
  nature: {
    icon: '🌱',
    label: 'Nature',
    map: '🌱🌳🌸🍄🍃🌵🌻🌞🌿🍂🍏🦋🍄🍄🍀🍁🌼🌵🌴🪴🎋🌲🌴🌵🍄🐚'
  },
  food: {
    icon: '🍕',
    label: 'Food',
    map: '🍕🍔🍟🌭🍦🍩🍪🍰🍫🍧🍡🥣🥪🍱🍛🍙🍝🌮🌯🥘🥧🧁🍯🍳🥓'
  },
  animals: {
    icon: '🐱',
    label: 'Animals',
    map: '🐱🐶🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🦆🦅🦉🦇🐺🐴🐆🐅🐃🐘'
  },
  random: {
    icon: '🎲',
    label: 'Random',
    map: '🔥🌙🐱🚀🍕🎮⭐🌊🌱💜🐻🌸😊🙂😄🌑☁️❤️🟪🟫🟧🟨🟩🟦🟥⬜⬛'
  }
};

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?@#$%^&*()-_=+[]{}|;:\'"<>`~';

/**
 * Encodes text to emojis using a theme and optional key.
 */
export const encodeMessage = (text, themeId = 'random', key = '') => {
  const theme = CIPHER_THEMES[themeId] || CIPHER_THEMES.random;
  const emojiMap = Array.from(theme.map);

  return text.split('').map((char, index) => {
    let charIndex = CHAR_SET.indexOf(char);
    if (charIndex === -1) return char; // Keep unknown chars as is

    // Simple XOR-style shift with key
    if (key) {
      const keyShift = key.charCodeAt(index % key.length);
      charIndex = (charIndex + keyShift) % CHAR_SET.length;
    }

    // Map char index to emoji map index
    const emojiIndex = charIndex % emojiMap.length;
    return emojiMap[emojiIndex];
  }).join('');
};

/**
 * Decodes emojis back to text using a theme and optional key.
 * NOTE: Since multiple chars can map to the same emoji in small themes,
 * this is a fun "cipher" rather than a mathematically perfect one.
 * To improve accuracy, we'd need a 1:1 mapping.
 */
export const decodeMessage = (emojiText, themeId = 'random', key = '') => {
  const theme = CIPHER_THEMES[themeId] || CIPHER_THEMES.random;
  const emojiMap = Array.from(theme.map);
  const emojis = Array.from(emojiText);

  return emojis.map((emoji, index) => {
    const emojiIndex = emojiMap.indexOf(emoji);
    if (emojiIndex === -1) return emoji;

    // We can't perfectly reverse the modulo without more info,
    // but for this "fun" version, we'll use the first occurrence.
    let charIndex = emojiIndex;

    if (key) {
      const keyShift = key.charCodeAt(index % key.length);
      charIndex = (charIndex - keyShift) % CHAR_SET.length;
      if (charIndex < 0) charIndex += CHAR_SET.length;
    }

    return CHAR_SET[charIndex] || '?';
  }).join('');
};
