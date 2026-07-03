import { EMOJI_ALPHABET } from './emojiAlphabet';

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
    density = 'normal' // normal, compact, wide
  } = options;

  const upperText = text.toUpperCase();
  const characters = upperText.split('');

  // Height is always 5 for our patterns
  const height = 5;
  let result = [];

  for (let row = 0; row < height; row++) {
    let line = "";
    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const pattern = EMOJI_ALPHABET[char] || EMOJI_ALPHABET[' '];
      const patternRow = pattern[row];

      for (let j = 0; j < patternRow.length; j++) {
        const isFilled = patternRow[j] === '1';

        if (isFilled) {
          line += emoji;
          if (density === 'wide') line += "  ";
        } else {
          // Use appropriate number of spaces to match emoji width (approx 2 spaces)
          const space = "  ";
          line += space;
          if (density === 'wide') line += "  ";
        }

        if (density === 'compact' && j < patternRow.length - 1) {
          // No extra space between emoji blocks in compact mode
        }
      }

      // Add letter spacing
      line += " ".repeat(letterSpacing * 2);
    }
    result.push(line);

    // Add vertical spacing
    for (let lh = 0; lh < lineHeight - 1; lh++) {
      result.push("");
    }
  }

  return result.join("\n");
};
