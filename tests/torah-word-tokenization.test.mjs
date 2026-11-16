import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const api=readFileSync(new URL("../app/api/torah/[book]/[chapter]/route.ts",import.meta.url),"utf8");
const books=[["genesis",50],["exodus",40],["leviticus",27],["numbers",36],["deuteronomy",34]];
test("all 187 Torah chapters have Hebrew words with lemma and morphology",()=>{
 let chapters=0,verses=0,words=0;
 for(const [book,expected] of books){
  const data=JSON.parse(readFileSync(new URL("../data/torah/"+book+".json",import.meta.url),"utf8"));
  assert.equal(data.chapters.length,expected,book);
  for(const chapter of data.chapters){
   assert.ok(chapter.length>0,book);
   for(const verse of chapter){
    assert.ok(verse.length>0,book);
    for(const entry of verse){
     assert.equal(entry.length,3);
     assert.ok(entry.every(value=>typeof value==="string"));
     assert.ok(entry.every(value=>value.trim().length>0));
     words++;
    }
    verses++;
   }
   chapters++;
  }
 }
 assert.equal(chapters,187);
 assert.equal(verses,5853);
 assert.equal(words,80052);
});
test("API serves local corpus without relying on Sefaria uptime",()=>{
 assert.match(api,/from "\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/data\/torah\/genesis\.json"/);
 assert.doesNotMatch(api,/fetch\(/);
 assert.match(api,/lemma,morph/);
 assert.match(api,/sourceAttribution/);
});
