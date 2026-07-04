/**
 * Secret Storage Utility
 * Handles persistence of secret messages.
 */

const SECRET_KEY_PREFIX = 'emojiverse_secret_';

export const saveSecretMessage = (encoded, theme, key = '') => {
  const id = Date.now().toString();
  const secretData = {
    id,
    encoded,
    theme,
    hasKey: !!key,
    date: new Date().toISOString()
  };

  localStorage.setItem(`${SECRET_KEY_PREFIX}${id}`, JSON.stringify(secretData));
  return id;
};

export const getSecretMessage = (id) => {
  const data = localStorage.getItem(`${SECRET_KEY_PREFIX}${id}`);
  return data ? JSON.parse(data) : null;
};

export const generateShareLink = (id) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/secret/message/${id}`;
};
