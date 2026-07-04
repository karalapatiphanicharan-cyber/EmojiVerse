
import { encodeMessage, decodeMessage, getKeyValue } from './src/utils/emojiCipher.js';

// Mock localStorage
global.localStorage = {
    getItem: () => null,
    setItem: () => null
};

function testCipher() {
    console.log("--- Starting Cipher Tests ---");

    const testCases = [
        { name: "TEST 1: phani charan (No key)", input: "phani charan", key: "" },
        { name: "TEST 2: hello123 (Key 321)", input: "hello123", key: "321" },
        { name: "TEST 5: Capital letters (Hello World)", input: "Hello World", key: "secret" }
    ];

    testCases.forEach(tc => {
        console.log(`Running ${tc.name}`);
        const encoded = encodeMessage(tc.input, 'random', tc.key);
        console.log(`  Encoded: ${encoded.emojiString}`);

        const decoded = decodeMessage(encoded.fullString, tc.key);
        if (decoded.success && decoded.text === tc.input) {
            console.log(`  ✅ Passed: ${decoded.text}`);
        } else {
            console.log(`  ❌ Failed: expected "${tc.input}", got "${decoded.text}"`);
            process.exit(1);
        }
    });

    console.log("Running TEST 3: Wrong key handling");
    const input3 = "Secret Info";
    const key3 = "right-key";
    const wrongKey3 = "wrong-key";
    const encoded3 = encodeMessage(input3, 'random', key3);
    const decoded3 = decodeMessage(encoded3.fullString, wrongKey3);
    if (!decoded3.success && decoded3.error === 'WRONG_KEY') {
        console.log("  ✅ Passed: Correctly identified wrong key");
    } else {
        console.log("  ❌ Failed: Should have returned WRONG_KEY error");
        process.exit(1);
    }

    console.log("Running TEST 4: Theme independence");
    const input4 = "Theme Test";
    const encoded4 = encodeMessage(input4, 'food', "");
    const decoded4 = decodeMessage(encoded4.fullString, ""); // theme not passed to decode
    if (decoded4.success && decoded4.text === input4) {
        console.log("  ✅ Passed: Theme doesn't affect decoding");
    } else {
        console.log("  ❌ Failed: Theme affected decoding");
        process.exit(1);
    }

    console.log("\n🎉 ALL CIPHER TESTS PASSED!");
}

testCipher();
