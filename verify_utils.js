
import { encodeMessage, decodeMessage, CIPHER_THEMES } from './src/utils/emojiCipher.js';
import { generateEmojiPassword, calculateStrength } from './src/utils/passwordGenerator.js';

function testCipher() {
    console.log("--- Testing Cipher ---");
    const originalText = "HELLO";
    const theme = "space";
    const key = "key";

    const encoded = encodeMessage(originalText, theme, key);
    console.log(`Original: ${originalText}`);
    console.log(`Encoded:  ${encoded}`);

    const decoded = decodeMessage(encoded, theme, key);
    console.log(`Decoded:  ${decoded}`);

    console.log("Cipher execution completed.");
}

function testPasswordGenerator() {
    console.log("\n--- Testing Password Generator ---");
    const password = generateEmojiPassword("EmojiUser", 'hacker');
    console.log(`Generated Password (hacker): ${password}`);

    const strength = calculateStrength(password);
    console.log(`Strength: ${strength}/100`);

    if (password.length >= 8) {
        console.log("✅ Password generator test passed!");
    } else {
        console.log("❌ Password generator test failed!");
    }
}

testCipher();
testPasswordGenerator();
