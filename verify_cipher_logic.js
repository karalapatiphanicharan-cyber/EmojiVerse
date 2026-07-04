
import { encodeMessage, decodeMessage } from './src/utils/emojiCipher.js';
import { generateEmojiPassword, calculateStrength, calculateStrengthScore } from './src/utils/passwordGenerator.js';

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
global.localStorage = localStorageMock;

// Mock btoa and atob if not available (Node.js environments)
if (typeof btoa === 'undefined') {
  global.btoa = (str) => Buffer.from(str).toString('base64');
}
if (typeof atob === 'undefined') {
  global.atob = (str) => Buffer.from(str, 'base64').toString('utf8');
}

console.log('--- TEST 1: Encode/Decode ---');
const msg1 = "boom bam";
const encoded1 = encodeMessage(msg1);
console.log('Encoded Emojis:', encoded1.emojiString);

// Simulate saving to storage as it would happen in the hook
const STORAGE_KEY = 'emoji_secret_store';
const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
stored[encoded1.emojiString] = {
  encryptedData: encoded1.data,
  theme: encoded1.theme,
  hasKey: encoded1.encrypted
};
localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

const decoded1 = decodeMessage(encoded1.emojiString);
console.log('Decoded:', decoded1.text);
if (decoded1.text === msg1) console.log('✅ TEST 1 PASSED');
else console.log('❌ TEST 1 FAILED');

console.log('\n--- TEST 2: Preservation of case and numbers ---');
const msg2 = "Hello Phani 123";
const encoded2 = encodeMessage(msg2);
stored[encoded2.emojiString] = {
  encryptedData: encoded2.data,
  theme: encoded2.theme,
  hasKey: encoded2.encrypted
};
localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
const decoded2 = decodeMessage(encoded2.emojiString);
console.log('Decoded:', decoded2.text);
if (decoded2.text === msg2) console.log('✅ TEST 2 PASSED');
else console.log('❌ TEST 2 FAILED');

console.log('\n--- TEST 3: Password Generation Rules ---');
const pwd = generateEmojiPassword('Phani');
console.log('Generated Password:', pwd);
const hasUpper = /[A-Z]/.test(pwd);
const hasLower = /[a-z]/.test(pwd);
const hasNumber = /[0-9]/.test(pwd);
const hasSymbol = /[!@#$%^&*_+~]/.test(pwd);
const emojis = pwd.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu) || [];
console.log(`Upper: ${hasUpper}, Lower: ${hasLower}, Num: ${hasNumber}, Sym: ${hasSymbol}, Emojis: ${emojis.length}`);
if (hasUpper && hasLower && hasNumber && hasSymbol && emojis.length >= 2) {
  console.log('✅ TEST 3 PASSED');
} else {
  console.log('❌ TEST 3 FAILED');
}

console.log('\n--- TEST 4: Strength Calculation ---');
const strengthLabel = calculateStrength(pwd);
const strengthScore = calculateStrengthScore(pwd);
console.log(`Label: ${strengthLabel}, Score: ${strengthScore}`);
if (strengthLabel !== 'Weak' && strengthScore > 50) {
    console.log('✅ TEST 4 PASSED');
} else {
    console.log('❌ TEST 4 FAILED');
}

console.log('\n--- TEST 5: Metadata Export Decode ---');
const encoded3 = encodeMessage("Secret Mission");
const decoded3 = decodeMessage(encoded3.fullString);
console.log('Decoded from Full String:', decoded3.text);
if (decoded3.text === "Secret Mission") console.log('✅ TEST 5 PASSED');
else console.log('❌ TEST 5 FAILED');
