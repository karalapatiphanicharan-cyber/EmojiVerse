/**
 * Helper functions for Emoji Animation Studio
 */

/**
 * Calculates a unique index for an emoji based on its grid position.
 * Used for staggered animation delays.
 */
export const getEmojiIndex = (rowIndex, colIndex, totalCols) => {
  return rowIndex * totalCols + colIndex;
};

/**
 * Maps speed presets to Framer Motion time scales.
 */
export const getSpeedMultiplier = (speed) => {
  switch (speed) {
    case 'slow': return 0.5;
    case 'fast': return 2;
    default: return 1;
  }
};

/**
 * Filters empty cells from matrix to optimize animation rendering.
 */
export const getVisibleEmojis = (matrix) => {
  if (!matrix) return [];
  const visible = [];
  matrix.forEach((row, r) => {
    row.forEach((emoji, c) => {
      if (emoji) {
        visible.push({ emoji, r, c });
      }
    });
  });
  return visible;
};
