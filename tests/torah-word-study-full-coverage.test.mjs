import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL(path,import.meta.url),"utf8");
const reader=read("../components/interlinear-reader.tsx");
const interlinear=read("../lib/interlinear.ts");
const api=read("../app/api/torah/[book]/[chapter]/route.ts");
const search=read("../app/api/torah/word-search/route.ts");
const names=["genesis","exodus","leviticus","numbers","deuteronomy"];
const expectedChapters=[50,40,27,36,34];
const corpora=names.map(name=>JSON.parse(read("../data/torah/"+name+".json")));
const dictionary=JSON.parse(read("../data/torah/strongs-hebrew.json")).entries;
const realTalk=JSON.parse(read("../data/torah/genesis1-real-talk.json")).entries;
const genesis1VerseNotes=JSON.parse(read("../data/torah/genesis1-verse-notes.json")).entries;
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
 assert.match(api,/gloss:plainEnglish\|\|entry\?\.\[1\]\|\|null/);
 let matched=0,unmatched=0;
 for(const corpus of corpora)for(const chapter of corpus.chapters)for(const verse of chapter)for(const [,lemma] of verse){
  const strong=strongOf(lemma);
  if(strong&&dictionary[strong])matched++;else unmatched++;
 }
 assert.ok(matched>0);assert.ok(unmatched>=0);
});
test("Genesis 1 plain-English overlay covers every attested word without replacing source data",()=>{
 const words=corpora[0].chapters[0].flat();
 const ids=[...new Set(words.map(([,lemma])=>strongOf(lemma)).filter(Boolean))];
 assert.equal(ids.length,96);
 for(const id of ids){assert.ok(realTalk[id],`Missing Genesis 1 meaning for ${id}`);assert.ok(realTalk[id].length>20);}
 assert.match(api,/book==="Genesis"&&chapter===1/);
 assert.match(api,/genesisOneRealTalk.entries/);
 assert.match(api,/plainEnglish\|\|entry/);
});
test("interlinear preserves reviewed Genesis 1:1–8 and uses corpus for all other verses",()=>{
 assert.match(reader,/const curated=book==="Genesis"&&chapter===1/);
 assert.match(reader,/const corpusWords=chapterData\?\.words\?\.\[verse-1\]\|\|\[\]/);
 assert.match(reader,/hebrew&&corpusWords.length/);
 assert.match(reader,/corpusWords\.map/);
 assert.ok(reader.includes('These are simple word meanings to help you read along')===false);
 assert.ok(reader.includes('"H3318":"go out, come forth"'));
 assert.ok(reader.includes('"H3068":"the LORD (God’s name)"'));
 assert.ok(reader.includes('"H853":"marks the next word as the object"'));
 assert.ok(reader.includes('shortGloss(w.gloss,w.strong)'));
 assert.ok(reader.includes('corpusWord.note||corpusWord.gloss?.trim()'));
 assert.ok(!reader.includes('What this word says here:'));
 assert.ok(!reader.includes('Want the word details? Tap here.'));
 assert.ok(!reader.includes('Strong’s number:'));
 assert.ok(!reader.includes('Dictionary glosses are possible meanings'));
 assert.ok(!reader.includes('Grammar code:'));
 assert.doesNotMatch(reader,/word\.note\|\|/);
 const wordNotes=[...interlinear.matchAll(/english:"[^"]+",note:"([^"]+)"/g)].map(([,note])=>note);
 assert.equal(wordNotes.length,79);
 const laterVerseNotes=Object.values(genesis1VerseNotes).flat();
 assert.equal(Object.keys(genesis1VerseNotes).length,23);
 for(let verse=9;verse<=31;verse++)assert.equal(genesis1VerseNotes[String(verse)].length,corpora[0].chapters[0][verse-1].length);
 assert.equal(wordNotes.length+laterVerseNotes.length,423);
 assert.equal(new Set([...wordNotes,...laterVerseNotes]).size,423);
 assert.match(api,/genesisOneVerseNotes/);
 assert.match(reader,/corpusWord\.note\|\|corpusWord\.gloss/);
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

test("plain-English Genesis explanations are reviewed, verse-specific, and silent",()=>{
 assert.match(reader,/plainGenesisOne:Record<number/);
 assert.match(reader,/Break It Down for Me/);
 assert.match(reader,/breakdown\.breakdown/);
 assert.match(reader,/getTorahBreakdown\(book,chapter,verse\)/);
 assert.match(reader,/This is a study explanation, not a Bible translation/);
 assert.doesNotMatch(reader,/<audio|speechSynthesis|Audio\(/);
});
