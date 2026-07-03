import { EMOJI_ALPHABET } from './emojiAlphabet.js';

/**
 * Generates emoji art matrix from text.
 * @param {string} text - The input text to convert.
 * @param {string} emoji - The emoji to use for '1's in the pattern.
 * @param {Object} options - Configuration options for spacing.
 * @returns {Array<Array<string>>} - The generated emoji artwork as a 2D matrix.
 */
export const generateEmojiArt = (text, emoji, options = {}) => {
  if (!text) return [];

  const { letterSpacing = 1, lineHeight = 1 } = options;

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
        matrixRow.push(isFilled ? emoji : "");
      }

      // Add letter spacing columns (except after the last character)
      if (charIndex < characters.length - 1) {
        for (let s = 0; s < letterSpacing; s++) {
          matrixRow.push("");
        }
      }
    }
    matrix.push(matrixRow);

    // Add line height rows (except after the last base row)
    if (row < baseHeight - 1 && lineHeight > 1) {
      for (let l = 0; l < lineHeight - 1; l++) {
        const emptyRow = new Array(matrixRow.length).fill("");
        matrix.push(emptyRow);
      }
    }
  }

  return matrix;
};

/**
 * Converts an emoji matrix to a plain text string.
 * @param {Array<Array<string>>} matrix - The emoji matrix.
 * @returns {string} - The matrix as a text string.
 */
export const matrixToText = (matrix) => {
  if (!matrix || matrix.length === 0) return "";

  return matrix.map(row =>
    row.map(cell => cell === "" ? "  " : cell).join("")
  ).join("\n");
};
