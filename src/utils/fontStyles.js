/**
 * Apply font styles to the emoji matrix.
 * @param {Array<Array<string>>} matrix - The base emoji matrix (7xN).
 * @param {string} style - Font style ('block', 'outline', 'shadow', 'glitch').
 * @returns {Array<Array<string>>} - The styled matrix.
 */
export const applyFontStyle = (matrix, style) => {
  if (!matrix || matrix.length === 0 || style === 'block') return matrix;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const styled = matrix.map(row => [...row]);

  if (style === 'outline') {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c]) {
          // Check if it's an inner pixel
          const isInner =
            r > 0 && r < rows - 1 &&
            c > 0 && c < cols - 1 &&
            matrix[r-1][c] && matrix[r+1][c] &&
            matrix[r][c-1] && matrix[r][c+1];

          if (isInner) styled[r][c] = "";
        }
      }
    }
  }

  if (style === 'shadow') {
    const shadowMatrix = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(""));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c]) {
          shadowMatrix[r][c] = matrix[r][c];
          shadowMatrix[r+1][c+1] = matrix[r][c]; // Simple shadow
        }
      }
    }
    return shadowMatrix;
  }

  if (style === 'glitch') {
    const glitchEmojis = ['💀', '👾', '⚠️', '⚡', '🚫'];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] && Math.random() < 0.2) {
          styled[r][c] = glitchEmojis[Math.floor(Math.random() * glitchEmojis.length)];
        }
      }
    }
  }

  return styled;
};
