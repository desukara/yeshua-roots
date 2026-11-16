import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const reader=readFileSync(new URL("../components/torah-bible-reader.tsx",import.meta.url),"utf8");

test("Hebrew study is opt-in and limited to the Torah",()=>{
 assert.match(reader,/showHebrewStudy/);
 assert.match(reader,/books\.slice\(0,5\)\.some/);
 assert.match(reader,/Show Hebrew word study/);
 assert.match(reader,/Hide Hebrew word study/);
});

test("Hebrew study aligns numbered words to their verse",()=>{
 assert.match(reader,/hebrewData\.words\.map\(\(words,index\)/);
 assert.match(reader,/hebrewData\.verses\[index\]/);
 assert.match(reader,/words\.map\(word=>/);
 assert.match(reader,/word\.hebrew/);
 assert.match(reader,/word\.transliteration/);
 assert.match(reader,/word\.gloss/);
 assert.match(reader,/word\.pronunciation/);
 assert.match(reader,/Dictionary meaning:/);
 assert.match(reader,/Pronunciation guide:/);
 assert.match(reader,/!loading&&!error&&version==="kjv"/);
 assert.match(reader,/verse\.number===index\+1/);
 assert.match(reader,/KJV \{index\+1\}/);
 assert.match(reader,/hebrewData\.sourceUrl/);
});

test("Hebrew study explicitly does not invent lexical data",()=>{
 assert.match(reader,/Dictionary meanings, transliteration and pronunciation are shown when available/);
});
