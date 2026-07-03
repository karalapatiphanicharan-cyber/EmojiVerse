/**
 * Flood fill algorithm for the emoji painter.
 * @param {Array<Array<string>>} grid - The current 2D grid.
 * @param {number} x - Target column index.
 * @param {number} y - Target row index.
 * @param {string} newEmoji - The emoji to fill with.
 * @returns {Array<Array<string>>} - The updated grid.
 */
export const floodFill = (grid, x, y, newEmoji) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const targetEmoji = grid[y][x];

  if (targetEmoji === newEmoji) return grid;

  const newGrid = grid.map(row => [...row]);
  const queue = [[x, y]];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) continue;
    if (newGrid[cy][cx] !== targetEmoji) continue;

    newGrid[cy][cx] = newEmoji;

    queue.push([cx + 1, cy]);
    queue.push([cx - 1, cy]);
    queue.push([cx, cy + 1]);
    queue.push([cx, cy - 1]);
  }

  return newGrid;
};

/**
 * Apply brush painting to the grid.
 * @param {Array<Array<string>>} grid - The current grid.
 * @param {number} x - Center X.
 * @param {number} y - Center Y.
 * @param {string} emoji - Emoji to paint.
 * @param {string} size - Brush size ('small', 'medium', 'large').
 * @returns {Array<Array<string>>} - The updated grid.
 */
export const applyBrush = (grid, x, y, emoji, size) => {
  const newGrid = grid.map(row => [...row]);
  const rows = grid.length;
  const cols = grid[0].length;

  let radius = 0;
  if (size === 'medium') radius = 1;
  if (size === 'large') radius = 2;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        newGrid[ny][nx] = emoji;
      }
    }
  }

  return newGrid;
};
