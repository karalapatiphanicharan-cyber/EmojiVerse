/**
 * Storage Manager
 * Unified API for managing EmojiVerse local storage data.
 */

const KEYS = {
  CREATIONS: 'emojiverse_creations',
  FAVORITES: 'emojiverse_favorites',
  ACHIEVEMENTS: 'emojiverse_achievements',
  SETTINGS: 'emojiverse_settings'
};

const INITIAL_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  theme: 'classic' // 'classic', 'dark', 'candy', 'wood'
};

// --- CREATIONS ---

export const getCreations = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.CREATIONS) || '[]');
  } catch (e) {
    return [];
  }
};

export const saveCreation = (creation) => {
  try {
    const creations = getCreations();
    const newCreation = {
      ...creation,
      id: creation.id || Date.now().toString(),
      date: new Date().toISOString()
    };

    // Check if updating or adding new
    const index = creations.findIndex(c => c.id === newCreation.id);
    if (index !== -1) {
      creations[index] = newCreation;
    } else {
      creations.unshift(newCreation);
    }

    // Limit to 100 creations
    const limited = creations.slice(0, 100);
    localStorage.setItem(KEYS.CREATIONS, JSON.stringify(limited));
    return newCreation;
  } catch (e) {
    console.error('Failed to save creation:', e);
    return null;
  }
};

export const deleteCreation = (id) => {
  try {
    const creations = getCreations();
    const filtered = creations.filter(c => c.id !== id);
    localStorage.setItem(KEYS.CREATIONS, JSON.stringify(filtered));

    // Also remove from favorites if present
    removeFavorite(id);
    return true;
  } catch (e) {
    return false;
  }
};

// --- FAVORITES ---

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.FAVORITES) || '[]');
  } catch (e) {
    return [];
  }
};

export const toggleFavorite = (id) => {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(id);
    if (index === -1) {
      favorites.push(id);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    return index === -1; // returns true if added, false if removed
  } catch (e) {
    return false;
  }
};

export const isFavorite = (id) => {
  return getFavorites().includes(id);
};

export const removeFavorite = (id) => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(favId => favId !== id);
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(filtered));
  } catch (e) {}
};

// --- ACHIEVEMENTS ---

export const getAchievements = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ACHIEVEMENTS) || '[]');
  } catch (e) {
    return [];
  }
};

export const unlockAchievement = (slug) => {
  try {
    const achievements = getAchievements();
    if (!achievements.includes(slug)) {
      achievements.push(slug);
      localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

// --- SETTINGS ---

export const getSettings = () => {
  try {
    const saved = localStorage.getItem(KEYS.SETTINGS);
    return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
  } catch (e) {
    return INITIAL_SETTINGS;
  }
};

export const saveSettings = (newSettings) => {
  try {
    const current = getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return INITIAL_SETTINGS;
  }
};
