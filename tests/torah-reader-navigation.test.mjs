import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const reader=readFileSync(new URL("../components/interlinear-reader.tsx",import.meta.url),"utf8");

test("saved verse navigation parses ordinary book chapter and verse references",()=>{
 const source=reader.match(/function jumpTo\(ref:string\)\{[^\n]+/);
 assert.ok(source,"jumpTo must exist");
 const regex=/^(Genesis|Exodus|Leviticus|Numbers|Deuteronomy) (\d+):(\d+)$/;
 assert.match("Genesis 1:5",regex);
 assert.match("Deuteronomy 34:12",regex);
 assert.doesNotMatch("Genesis bogus",regex);
 assert.ok(source[0].includes(regex.source),"jumpTo must use a functioning reference pattern");
 assert.match(source[0],/targetChapter>target\.chapters/);
});
test("reader guards chapter transitions while chapter data loads",()=>{
 assert.match(reader,/function nextVerse\(\)\{if\(loading\|\|!chapterData\|\|!count\)return/);
 assert.match(reader,/function previousVerse\(\)\{if\(loading\|\|!chapterData\|\|!count\)return/);
 assert.match(reader,/disabled=\{loading\|\|!chapterData\|\|!count/);
});
test("invalid verse deep links are clamped after chapter loads",()=>{
 assert.match(reader,/verse>chapterData\.verses\.length\)setVerse\(chapterData\.verses\.length\)/);
});
