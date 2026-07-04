
import { encodeMessage, decodeMessage } from './src/utils/emojiCipher.js';

function runTests() {
  console.log("--- TEST 1: Basic Reversibility ---");
  const msg1 = "hello world";
  const enc1 = encodeMessage(msg1, 'food');
  const dec1 = decodeMessage(enc1.emojiString);
  console.log("Input:", msg1);
  console.log("Encoded:", enc1.emojiString);
  console.log("Decoded:", dec1.text);
  if (dec1.text !== msg1) throw new Error("Test 1 failed");

  console.log("\n--- TEST 2: With Secret Key ---");
  const msg2 = "boom bam";
  const key2 = "123";
  const enc2 = encodeMessage(msg2, 'space', key2);
  const dec2 = decodeMessage(enc2.emojiString, key2);
  console.log("Input:", msg2, "Key:", key2);
  console.log("Encoded length:", Array.from(enc2.emojiString).length);
  console.log("Decoded:", dec2.text);
  if (dec2.text !== msg2) throw new Error("Test 2 failed");

  console.log("\n--- TEST 3: Wrong Key ---");
  const dec3 = decodeMessage(enc2.emojiString, "wrong-key");
  console.log("Input:", msg2, "Wrong Key: wrong-key");
  console.log("Result success:", dec3.success, "Error:", dec3.error);
  if (dec3.success || dec3.error !== 'WRONG_KEY') throw new Error("Test 3 failed");

  console.log("\n--- TEST 4: Theme Independence ---");
  const enc4 = encodeMessage("Theme Test", 'animals');
  const dec4 = decodeMessage(enc4.emojiString); // theme not passed
  console.log("Encoded (Animals):", enc4.emojiString);
  console.log("Decoded:", dec4.text);
  if (dec4.text !== "Theme Test") throw new Error("Test 4 failed");

  console.log("\n--- TEST 5: Capitalization & Symbols ---");
  const msg5 = "Hello World! 123 @#$";
  const enc5 = encodeMessage(msg5, 'random', 'key');
  const dec5 = decodeMessage(enc5.emojiString, 'key');
  console.log("Input:", msg5);
  console.log("Decoded:", dec5.text);
  if (dec5.text !== msg5) throw new Error("Test 5 failed");

  console.log("\n✅ ALL CIPHER TESTS PASSED!");
}

try {
    runTests();
} catch (e) {
    console.error("\n❌ TEST FAILED:", e.message);
    process.exit(1);
}
