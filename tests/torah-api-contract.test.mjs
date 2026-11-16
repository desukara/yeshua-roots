import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const books=[["genesis",50,1533],["exodus",40,1213],["leviticus",27,859],["numbers",36,1289],["deuteronomy",34,959]];
const dictionary=JSON.parse(readFileSync(new URL("../data/torah/strongs-hebrew.json",import.meta.url),"utf8")).entries;
const api=readFileSync(new URL("../app/api/torah/[book]/[chapter]/route.ts",import.meta.url),"utf8");
const reader=readFileSync(new URL("../components/torah-bible-reader.tsx",import.meta.url),"utf8");

function strongFor(lemma){
 const lexical=lemma.split("/").at(-1)||"";
 const match=/^(\d{1,5})(?:\s+[a-z])?$/i.exec(lexical);
 return match?"H"+Number(match[1]):null;
}

test("all five local books retain exact chapter and verse boundaries",()=>{
 let total=0;
 for(const [book,chapterCount,verseCount] of books){
  const corpus=JSON.parse(readFileSync(new URL("../data/torah/"+book+".json",import.meta.url),"utf8"));
  assert.equal(corpus.chapters.length,chapterCount,book+" chapter count");
  const actual=corpus.chapters.reduce((sum,chapter)=>sum+chapter.length,0);
  assert.equal(actual,verseCount,book+" verse count");
  assert.ok(corpus.source,book+" source attribution");
  assert.ok(corpus.license,book+" license");
  total+=actual;
 }
 assert.equal(total,5853);
});

test("every word has a stable positive verse-local index and valid lexical shape",()=>{
 for(const [book] of books){
  const corpus=JSON.parse(readFileSync(new URL("../data/torah/"+book+".json",import.meta.url),"utf8"));
  for(const [chapterIndex,chapter] of corpus.chapters.entries()){
   for(const [verseIndex,verse] of chapter.entries()){
    assert.ok(verse.length>0,`${book} ${chapterIndex+1}:${verseIndex+1} empty`);
    for(const [index,word] of verse.entries()){
     assert.equal(word.length,3,`${book} ${chapterIndex+1}:${verseIndex+1} word ${index+1}`);
     assert.ok(word.every(v=>typeof v==="string"&&v.trim()),`${book} ${chapterIndex+1}:${verseIndex+1} word ${index+1}`);
     const strong=strongFor(word[1]);
     if(strong)assert.match(strong,/^H\d+$/);
    }
   }
  }
 }
});

test("the reader and API agree on word and chapter response fields",()=>{
 for(const field of ["hebrew","lemma","morph","strong","transliteration","gloss","pronunciation"]){
  assert.match(api,new RegExp("\\b"+field+"\\b"));
  assert.match(reader,new RegExp("\\b"+field+"\\b"));
 }
 assert.match(api,/verses,words,source:/);
 assert.match(reader,/payload\.words\.length!==payload\.verses\.length/);
 assert.match(api,/Invalid Torah reference/);
 assert.match(api,/Number\.isInteger\(chapter\)/);
});

test("lexical dictionary values have the expected three-field shape",()=>{
 assert.ok(Object.keys(dictionary).length>8000);
 for(const [strong,entry] of Object.entries(dictionary)){
  assert.match(strong,/^H\d+$/);
  assert.ok(Array.isArray(entry)&&entry.length===3,strong);
  assert.ok(entry.every(value=>typeof value==="string"),strong);
 }
});
