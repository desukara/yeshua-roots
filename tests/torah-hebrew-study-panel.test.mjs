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
 assert.match(reader,/hebrewData\.sourceUrl/);
});

test("Hebrew study explicitly does not invent lexical data",()=>{
 assert.match(reader,/Verified dictionary glosses, morphology, and transliteration are not yet available/);
});
