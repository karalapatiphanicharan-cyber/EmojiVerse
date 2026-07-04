/**
 * Secret Storage Utility
 * Handles persistence of secret messages in the new format.
 */

const STORAGE_KEY = 'emoji_secret_messages';

/**
 * Saves a secret message to localStorage.
 * Messages are indexed by ID, but we can also look them up by emoji string.
 */
export const saveSecretMessage = (encodedObj) => {
  const { emojiString, data, theme, encrypted } = encodedObj;

  const id = crypto.randomUUID();
  const secretData = {
    id,
    emojiString,
    encodedData: data,
    theme,
    hasKey: encrypted,
    date: new Date().toISOString()
  };

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  stored[id] = secretData;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return id;
};

/**
 * Retrieves a secret message by its ID.
 */
export const getSecretMessage = (id) => {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return stored[id] || null;
};

/**
 * Generates a share link for a secret message.
 * (Future proofing, not strictly required for current logic)
 */
export const generateShareLink = (id) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/secret/message/${id}`;
};
