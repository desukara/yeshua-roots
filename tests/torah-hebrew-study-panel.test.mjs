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
 assert.match(reader,/visibleHebrewVerses\.map\(\(\{words,index\}\)/);
 assert.match(reader,/hebrewData\.verses\[index\]/);
 assert.match(reader,/words\.map\(word=>/);
 assert.match(reader,/word\.hebrew/);
 assert.match(reader,/word\.transliteration/);
 assert.match(reader,/word\.gloss/);
 assert.match(reader,/word\.pronunciation/);
 assert.match(reader,/torah-hebrew-word-cards/);
 assert.match(reader,/torah-hebrew-word-card-meaning/);
 assert.doesNotMatch(reader,/Morph: \{word\.morph\}/);
 assert.match(reader,/!loading&&!error&&version==="kjv"/);
 assert.match(reader,/verse\.number===index\+1/);
 assert.match(reader,/KJV \{index\+1\}/);
 assert.match(reader,/hebrewData\.sourceUrl/);
});

test("Hebrew study uses plain, contextual guidance without technical disclaimers",()=>{
 assert.match(reader,/Some Hebrew words are brief, but they carry the heart of the line/);
 assert.doesNotMatch(reader,/not necessarily the spoken form or contextual meaning/);
});

test("Hebrew study guards against showing a previous chapter during navigation",()=>{
 assert.match(reader,/hebrewReference!==book\+":"\+chapter/);
 assert.match(reader,/setHebrewReference\(book\+":"\+chapter\)/);
 assert.match(reader,/hebrewError\?<p role="alert">/);
});

test("Hebrew word study supports lexical search within the chapter",()=>{
 assert.match(reader,/hebrewWordQuery/);
 assert.match(reader,/Find a Hebrew word or its meaning/);
 assert.match(reader,/word\.hebrew,word\.transliteration,word\.gloss,word\.pronunciation/);
 assert.doesNotMatch(reader,/Strong's number/);
 assert.match(reader,/visibleHebrewWordCount/);
 assert.match(reader,/words\.filter\(matchingHebrewWord\)/);
 assert.match(reader,/visibleHebrewVerses\.length===0/);
});

test("Hebrew word search ignores niqqud and cantillation without changing source text",()=>{
 assert.match(reader,/normalizeWordSearch=\(value:string\)=>value\.normalize\("NFD"\)/);
 assert.match(reader,/\\u0591-\\u05BD\\u05BF-\\u05C7/);
 assert.match(reader,/normalizeWordSearch\(hebrewWordQuery\)/);
 assert.match(reader,/normalizeWordSearch\(value\)\.includes\(normalizedHebrewQuery\)/);
 assert.match(reader,/Hebrew searches ignore vowel points and cantillation marks/);
 const normalize=value=>value.normalize("NFD").replace(/[\u0591-\u05BD\u05BF-\u05C7]/g,"").toLocaleLowerCase().trim();
 assert.equal(normalize("בְּרֵאשִׁית"),normalize("בראשית"));
 assert.equal(normalize("בָּרָ֣א"),normalize("ברא"));
 assert.equal(normalize("H7225"),"h7225");
});
