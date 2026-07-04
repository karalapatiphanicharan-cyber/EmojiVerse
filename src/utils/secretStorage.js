/**
 * Secret Storage Utility
 * Handles persistence of secret messages in the new format.
 */

const STORAGE_KEY = 'emoji_secret_store';

/**
 * Saves a secret message to localStorage.
 * Messages are indexed by emoji string for easy lookup.
 */
export const saveSecretMessage = (encodedObj) => {
  const { emojiString, data, theme, encrypted } = encodedObj;

  const secretData = {
    encryptedData: data,
    theme,
    hasKey: encrypted,
    date: new Date().toISOString()
  };

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  // Use emoji string as the key for easy lookup during decoding
  stored[emojiString] = secretData;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return emojiString;
};

/**
 * Retrieves a secret message by its emoji string.
 */
export const getSecretMessageByEmoji = (emojiString) => {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return stored[emojiString] || null;
};
