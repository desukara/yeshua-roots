import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const readJson=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),"utf8"));
const corpus=readJson("../data/torah/genesis.json").chapters[2];
const wordNotes=readJson("../data/torah/genesis3-verse-notes.json").entries;
const glosses=readJson("../data/torah/genesis3-real-talk.json").entries;
const explanations=readJson("../data/torah/genesis3-verse-study.json");
const messianic=readJson("../data/torah/genesis3-messianic-study.json");
const reader=readFileSync(new URL("../components/interlinear-reader.tsx",import.meta.url),"utf8");

test("Genesis 3 has complete explanations and unique Hebrew word notes for all 24 verses",()=>{
 assert.equal(corpus.length,24);
 assert.deepEqual(Object.keys(explanations).map(Number).sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i+1));
 assert.deepEqual(Object.keys(wordNotes).map(Number).sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i+1));
 assert.deepEqual(Object.keys(messianic.notes).map(Number).sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i+1));
 const allNotes=[];
 for(const [i,verse] of corpus.entries()){
  const number=i+1;
  assert.equal(wordNotes[number].length,verse.length,"Word notes must match Hebrew token order at Genesis 3:"+number);
  assert.ok(explanations[number].scene&&explanations[number].breakdown&&explanations[number].takeaway,"Plain-language study missing at Genesis 3:"+number);
  const note=messianic.notes[number];
  assert.ok(note.context&&note.connection&&note.references,"Messianic study missing at Genesis 3:"+number);
  assert.ok(note.supportingPassages?.length,"Supporting Scripture missing at Genesis 3:"+number);
  for(const passage of note.supportingPassages)assert.ok(passage.reference&&passage.book&&passage.chapter&&passage.firstVerse&&passage.lastVerse,"Incomplete supporting passage at Genesis 3:"+number);
  allNotes.push(...wordNotes[number]);
  for(const [,lemma] of verse){
   const lexical=lemma.split("/").at(-1)?.split(/\s+/)[0]||"";
   if(/^\d/.test(lexical))assert.ok(glosses["H"+Number.parseInt(lexical,10)],"Missing plain gloss for "+lexical);
  }
 }
 assert.equal(new Set(allNotes).size,allNotes.length,"Word notes should be written for their specific verse and word");
});

test("Genesis 3 uses the same Messianic section structure as Genesis 1",()=>{
 assert.match(reader,/study&&\(chapter===1\|\|chapter===3\)&&messianicNote&&<section className="messianic-verse-study"/);
 assert.match(reader,/study&&\(chapter===1\|\|chapter===3\)&&<section className="messianic-chapter-overview"/);
 assert.match(reader,/chapter>3&&<article className="torah-verse-panel"/);
});
