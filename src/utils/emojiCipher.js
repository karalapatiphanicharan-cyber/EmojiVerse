import { themes, getThemeEmoji, getEmojiIndex } from './emojiThemes.js';

/**
 * Emoji Cipher Utility
 * A professional-grade, 100% reversible emoji encryption engine.
 */

// Magic bytes to verify correct decryption
const MAGIC_HEADER = [0xEE, 0x55];

/**
 * Derives a byte sequence from a key for XOR encryption.
 */
const getKeyBytes = (key, length) => {
  if (!key) return null;
  const keyEncoder = new TextEncoder();
  const kBytes = keyEncoder.encode(key);
  const result = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    // Better key derivation: use a combination of charCodeAt and salt
    let sum = 0;
    for(let j=0; j < kBytes.length; j++) sum += kBytes[j];

    result[i] = kBytes[i % kBytes.length] ^ (sum % 256) ^ i;
  }
  return result;
};

/**
 * Encodes text into a pure emoji string.
 */
export const encodeMessage = (text, themeId = 'random', key = '') => {
  if (!text) return null;

  const encoder = new TextEncoder();
  const textBytes = encoder.encode(text);

  // Combine magic header and text bytes
  const payload = new Uint8Array(MAGIC_HEADER.length + textBytes.length);
  payload.set(MAGIC_HEADER);
  payload.set(textBytes, MAGIC_HEADER.length);

  // Apply XOR encryption if key is provided
  if (key) {
    const kBytes = getKeyBytes(key, payload.length);
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= kBytes[i];
    }
  }

  // Convert bytes to emojis (2 emojis per byte)
  let emojiString = '';
  for (let i = 0; i < payload.length; i++) {
    const byte = payload[i];
    const high = (byte >> 4) & 0x0F;
    const low = byte & 0x0F;
    emojiString += getThemeEmoji(themeId, high);
    emojiString += getThemeEmoji(themeId, low);
  }

  return {
    emojiString,
    fullString: emojiString,
    theme: themeId,
    encrypted: !!key
  };
};

/**
 * Decodes an emoji string back to original text.
 */
export const decodeMessage = (emojiString, key = '') => {
  if (!emojiString) return { success: false, error: 'EMPTY' };

  // Clean input: remove spaces, line breaks, etc.
  const inputString = emojiString.trim().replace(/\s/g, '');
  const cleanInput = Array.from(inputString);

  if (cleanInput.length % 2 !== 0 || cleanInput.length < 4) {
    return { success: false, error: 'INVALID_FORMAT' };
  }

  // Try each theme to see which one was used
  const themeIds = Object.keys(themes);

  for (const themeId of themeIds) {
    const bytes = new Uint8Array(cleanInput.length / 2);
    let validForTheme = true;

    for (let i = 0; i < cleanInput.length; i += 2) {
      const high = getEmojiIndex(themeId, cleanInput[i]);
      const low = getEmojiIndex(themeId, cleanInput[i+1]);

      if (high === -1 || low === -1) {
        validForTheme = false;
        break;
      }
      bytes[i/2] = (high << 4) | low;
    }

    if (!validForTheme) continue;

    // Apply reverse XOR if key is provided
    const workingBytes = new Uint8Array(bytes);
    if (key) {
      const kBytes = getKeyBytes(key, workingBytes.length);
      for (let i = 0; i < workingBytes.length; i++) {
        workingBytes[i] ^= kBytes[i];
      }
    }

    // Verify magic header
    if (workingBytes[0] === MAGIC_HEADER[0] && workingBytes[1] === MAGIC_HEADER[1]) {
      try {
        const decoder = new TextDecoder();
        const text = decoder.decode(workingBytes.slice(MAGIC_HEADER.length));
        return { success: true, text };
      } catch (e) {
        // This theme/key combination resulted in the magic header but invalid UTF-8
        continue;
      }
    }
  }

  // If we tested a key and none of the themes resulted in magic header, return WRONG_KEY
  if (key) {
    return { success: false, error: 'WRONG_KEY' };
  }

  return { success: false, error: 'INVALID_DATA' };
};
