import { getThemeEmoji } from './emojiThemes.js';

/**
 * Emoji Cipher Utility
 * Handles 100% reversible encoding and decoding of messages.
 */

const METADATA_PREFIX = '#EV:';
const VALIDATION_MARKER = '✅';

/**
 * Calculates a numeric value from a secret key.
 * Sums all character codes of the key.
 */
export const getKeyValue = (key) => {
  if (!key) return 0;
  return Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

/**
 * Encodes text to emojis and generates a shareable token.
 */
export const encodeMessage = (text, themeId = 'random', key = '') => {
  const keyVal = getKeyValue(key);
  // Add validation marker to the beginning of the text to detect correct key on decode
  const textWithMarker = VALIDATION_MARKER + text;
  const data = Array.from(textWithMarker).map(char => char.charCodeAt(0) + keyVal);

  // Create emoji string for display (base it on the data length)
  const emojiString = data.map((_, i) => getThemeEmoji(themeId, i)).join('');

  // Create the shareable token (base64 encoded data)
  const payload = {
    d: data,
    t: themeId,
    k: !!key
  };
  const token = btoa(JSON.stringify(payload));
  const fullString = `${emojiString} ${METADATA_PREFIX}${token}`;

  return {
    emojiString,
    fullString,
    data,
    theme: themeId,
    encrypted: !!key
  };
};

/**
 * Decodes emojis or tokens back to original text.
 * Returns { success: true, text: ... } or { success: false, error: 'WRONG_KEY' }
 */
export const decodeMessage = (input, key = '') => {
  let data = null;
  const keyVal = getKeyValue(key);

  // 1. Check for metadata token
  if (input.includes(METADATA_PREFIX)) {
    try {
      const token = input.split(METADATA_PREFIX)[1].trim();
      const payload = JSON.parse(atob(token));
      data = payload.d;
    } catch (e) {
      console.error("Failed to parse metadata token", e);
    }
  }

  // 2. Fallback: Search in localStorage if token not found or failed
  if (!data) {
    try {
      const stored = JSON.parse(localStorage.getItem('emoji_secret_messages') || '{}');
      const emojiPart = input.split(METADATA_PREFIX)[0].trim();
      const entry = Object.values(stored).find(v => v.emojiString === emojiPart);
      if (entry) {
        data = entry.encodedData;
      }
    } catch (e) {
      // localStorage might not be available in all contexts
    }
  }

  if (!data) return { success: false, error: 'NOT_FOUND' };

  // 3. Reverse the cipher
  try {
    const decodedWithMarker = data.map(val => String.fromCharCode(val - keyVal)).join('');

    // Check for validation marker
    if (decodedWithMarker.startsWith(VALIDATION_MARKER)) {
      return {
        success: true,
        text: decodedWithMarker.slice(VALIDATION_MARKER.length)
      };
    } else {
      return { success: false, error: 'WRONG_KEY' };
    }
  } catch (e) {
    return { success: false, error: 'DECODE_ERROR' };
  }
};
