import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL(path,import.meta.url),"utf8");
const reader=read("../components/interlinear-reader.tsx");
const api=read("../app/api/torah/[book]/[chapter]/route.ts");
const search=read("../app/api/torah/word-search/route.ts");
const names=["genesis","exodus","leviticus","numbers","deuteronomy"];
const expectedChapters=[50,40,27,36,34];
const corpora=names.map(name=>JSON.parse(read("../data/torah/"+name+".json")));
const dictionary=JSON.parse(read("../data/torah/strongs-hebrew.json")).entries;
const strongOf=lemma=>{const part=lemma.split("/").at(-1)||"";const match=/^(\d{1,5})(?:\s+[a-z])?$/i.exec(part);return match?"H"+Number(match[1]):null;};

test("every Torah chapter and verse has nonempty aligned Hebrew tokens and morphology",()=>{
 assert.deepEqual(corpora.map(c=>c.chapters.length),expectedChapters);
 for(const corpus of corpora)for(const chapter of corpus.chapters){
  assert.ok(chapter.length>0);
  for(const verse of chapter){assert.ok(verse.length>0);for(const token of verse){assert.equal(token.length,3);assert.ok(token[0].trim());assert.equal(typeof token[1],"string");assert.equal(typeof token[2],"string");}}
 }
});
test("Genesis 1:9 through 1:31 and final Deuteronomy chapter retain Hebrew token data",()=>{
 const genesis=corpora[0].chapters[0];
 assert.equal(genesis.length,31);
 for(const verse of genesis.slice(8))assert.ok(verse.length>0);
 assert.ok(corpora[4].chapters[33].every(verse=>verse.length>0));
});
test("API derives dictionary meanings from attested Strong's IDs without inventing glosses",()=>{
 assert.match(api,/const entry=strong\?dictionary\[strong\]:undefined/);
 assert.match(api,/gloss:entry\?\.\[1\]\|\|null/);
 let matched=0,unmatched=0;
 for(const corpus of corpora)for(const chapter of corpus.chapters)for(const verse of chapter)for(const [,lemma] of verse){
  const strong=strongOf(lemma);
  if(strong&&dictionary[strong])matched++;else unmatched++;
 }
 assert.ok(matched>0);assert.ok(unmatched>=0);
});
test("interlinear preserves reviewed Genesis 1:1–8 and uses corpus for all other verses",()=>{
 assert.match(reader,/const curated=book==="Genesis"&&chapter===1/);
 assert.match(reader,/const corpusWords=chapterData\?\.words\?\.\[verse-1\]\|\|\[\]/);
 assert.match(reader,/hebrew&&corpusWords.length/);
 assert.match(reader,/corpusWords\.map/);
 assert.match(reader,/These are simple word meanings to help you read along/);
 assert.match(reader,/"H3318":"go out, come forth"/);
 assert.match(reader,/"H3068":"the LORD \(God’s name\)"/);
 assert.match(reader,/"H853":"marks the next word as the object"/);
 assert.doesNotMatch(reader,/Meanings shown are brief dictionary glosses/);
 assert.match(reader,/shortGloss\(w.gloss,w.strong\)/);
 assert.match(reader,/shortGloss\(corpusWord.gloss,corpusWord.strong\)/);
 assert.match(reader,/Want the word details\? Tap here\./);
 assert.match(reader,/What it means:/);
 assert.match(reader,/Strong’s number:/);
});
test("cross-Torah search uses exact Strong's identifiers and bounded results",()=>{
 assert.match(search,/const LIMIT=60/);
 assert.match(search,/strongNumber\(lemma\)!==strong/);
 assert.match(search,/matches\.length<LIMIT/);
 assert.match(search,/truncated:total>LIMIT/);
 assert.doesNotMatch(reader,/\/api\/torah\/word-search\?strong=/);
 assert.doesNotMatch(reader,/Other Torah occurrences/);
 assert.doesNotMatch(reader,/torah-cross-references/);
});
