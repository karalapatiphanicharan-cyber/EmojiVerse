import { EMOJI_ALPHABET } from './emojiAlphabet.js';

/**
 * Enhanced emoji generator supporting multiple emojis and gradients.
 */
export const generateMultiEmojiArt = (text, emojis, options = {}) => {
  if (!text || !emojis || emojis.length === 0) return [];

  const {
    letterSpacing = 1,
    lineHeight = 1,
    gradientMode = 'none'
  } = options;

  const upperText = text.toUpperCase();
  const characters = upperText.split('').filter(char => EMOJI_ALPHABET[char]);

  if (characters.length === 0) return [];

  const baseHeight = 7;
  const matrix = [];

  for (let row = 0; row < baseHeight; row++) {
    const matrixRow = [];
    for (let charIndex = 0; charIndex < characters.length; charIndex++) {
      const char = characters[charIndex];
      const pattern = EMOJI_ALPHABET[char];
      const patternRow = pattern[row];

      for (let j = 0; j < patternRow.length; j++) {
        const isFilled = patternRow[j] === '1';

        if (isFilled) {
          let emojiToUse = emojis[0];

          if (gradientMode === 'vertical') {
            emojiToUse = emojis[row % emojis.length];
          } else if (gradientMode === 'horizontal') {
            emojiToUse = emojis[charIndex % emojis.length];
          } else if (gradientMode === 'random') {
            emojiToUse = emojis[Math.floor(Math.random() * emojis.length)];
          } else if (gradientMode === 'pattern') {
            emojiToUse = emojis[(row + charIndex) % emojis.length];
          } else {
            // Default: Row-based cycling for Multi Emoji Mode
            emojiToUse = emojis[row % emojis.length];
          }

          matrixRow.push(emojiToUse);
        } else {
          matrixRow.push("");
        }
      }

      if (charIndex < characters.length - 1) {
        for (let s = 0; s < letterSpacing; s++) {
          matrixRow.push("");
        }
      }
    }
    matrix.push(matrixRow);

    if (row < baseHeight - 1 && lineHeight > 1) {
      for (let l = 0; l < lineHeight - 1; l++) {
        matrix.push(new Array(matrixRow.length).fill(""));
      }
    }
  }

  return matrix;
};
