const STORAGE_KEY = 'emojiverse_creations';

export const saveCreation = (name, emojiData, thumbnail, type = 'art') => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newCreation = {
      id: Date.now().toString(),
      name: name || 'Untitled Masterpiece',
      date: new Date().toISOString(),
      emojiData,
      thumbnail,
      type
    };

    // Check for storage limits
    const updated = [newCreation, ...existing];
    if (updated.length > 50) updated.pop(); // Keep last 50

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to save creation:', error);
    return false;
  }
};

export const getCreations = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

export const deleteCreation = (id) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = existing.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    return false;
  }
};
