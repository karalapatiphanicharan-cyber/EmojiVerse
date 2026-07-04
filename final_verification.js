
import { encodeMessage, decodeMessage } from './src/utils/emojiCipher.js';
import { generateEmojiPassword, calculateStrength } from './src/utils/passwordGenerator.js';

function finalTests() {
  console.log("--- FINAL VERIFICATION ---");

  // TEST 1
  const msg1 = "hello world";
  const enc1 = encodeMessage(msg1);
  const dec1 = decodeMessage(enc1.emojiString);
  console.log("TEST 1 (hello world):", dec1.text === msg1 ? "✅ PASS" : "❌ FAIL");

  // TEST 2
  const msg2 = "boom bam";
  const enc2 = encodeMessage(msg2);
  const dec2 = decodeMessage(enc2.emojiString);
  console.log("TEST 2 (boom bam):", dec2.text === msg2 ? "✅ PASS" : "❌ FAIL");

  // TEST 3
  const msg3 = "hello";
  const key3 = "123";
  const enc3 = encodeMessage(msg3, 'random', key3);
  const dec3_correct = decodeMessage(enc3.emojiString, key3);
  const dec3_wrong = decodeMessage(enc3.emojiString, "wrong");
  console.log("TEST 3 (Key 123):", dec3_correct.text === msg3 ? "✅ PASS" : "❌ FAIL");
  console.log("TEST 3 (Wrong Key):", (!dec3_wrong.success && dec3_wrong.error === 'WRONG_KEY') ? "✅ PASS" : "❌ FAIL");

  // TEST 4
  const pwd1 = generateEmojiPassword("rocket");
  const pwd2 = generateEmojiPassword("rocket");
  const strength = calculateStrength(pwd1);
  console.log("TEST 4 (Unique Passwords):", pwd1 !== pwd2 ? "✅ PASS" : "❌ FAIL");
  console.log("TEST 4 (Strength Calculation):", strength > 50 ? "✅ PASS" : "❌ FAIL");
  console.log("Sample Password:", pwd1);

  // Capitalization test
  const msg5 = "Capitalized Text";
  const dec5 = decodeMessage(encodeMessage(msg5).emojiString);
  console.log("Capitalization Test:", dec5.text === msg5 ? "✅ PASS" : "❌ FAIL");
}

finalTests();
