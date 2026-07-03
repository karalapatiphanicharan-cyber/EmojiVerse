import { EMOJI_ALPHABET } from './emojiAlphabet.js';

/**
 * Generates emoji art from text.
 * @param {string} text - The input text to convert.
 * @param {string} emoji - The emoji to use for '1's in the pattern.
 * @param {Object} options - Customization options.
 * @returns {string} - The generated emoji artwork as a string.
 */
export const generateEmojiArt = (text, emoji, options = {}) => {
  const {
    letterSpacing = 1,
    lineHeight = 1,
    density = 'normal'
  } = options;

  if (!text) return "";

  const upperText = text.toUpperCase();
  const characters = upperText.split('').filter(char => EMOJI_ALPHABET[char]);

  if (characters.length === 0) return "";

  const height = 5;
  const result = [];

  const cellSpace = "  ";

  for (let row = 0; row < height; row++) {
    let line = "";
    for (const char of characters) {
      const pattern = EMOJI_ALPHABET[char];
      const patternRow = pattern[row];

      for (let j = 0; j < patternRow.length; j++) {
        const isFilled = patternRow[j] === '1';
        line += isFilled ? emoji : cellSpace;

        if (density === 'wide') {
          line += "  ";
        }
      }

      line += "  ".repeat(letterSpacing);
    }

    result.push(line);

    if (row < height - 1) {
      for (let lh = 0; lh < lineHeight - 1; lh++) {
        result.push("");
      }
    }
  }

  return result.join("\n");
};
