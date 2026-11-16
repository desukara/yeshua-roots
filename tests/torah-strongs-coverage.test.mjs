import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const route=readFileSync(new URL("../app/api/torah/[book]/[chapter]/route.ts",import.meta.url),"utf8");
const dictionary=JSON.parse(readFileSync(new URL("../data/torah/strongs-hebrew.json",import.meta.url),"utf8")).entries;

function strongFor(lemma){
 const parts=lemma.split("/");
 const lexicalPart=parts[parts.length-1]||"";
 const numeric=/^(\d{1,5})(?:\s+[a-z])?$/i.exec(lexicalPart);
 return numeric?"H"+Number(numeric[1]):null;
}

test("prefixed and variant lemmas resolve to Strong's dictionary entries",()=>{
 assert.equal(strongFor("b/7225"),"H7225");
 assert.equal(strongFor("c/d/776"),"H776");
 assert.equal(strongFor("1254 a"),"H1254");
 assert.equal(strongFor("430"),"H430");
 assert.equal(strongFor("invalid"),null);
 assert.ok(dictionary.H7225[0].length>0);
 assert.ok(dictionary.H7225[1].length>0);
});

test("every Torah book has dictionary coverage",()=>{
 let total=0,matched=0;
 for(const book of ["genesis","exodus","leviticus","numbers","deuteronomy"]){
  const corpus=JSON.parse(readFileSync(new URL("../data/torah/"+book+".json",import.meta.url),"utf8"));
  let bookMatched=0,bookTotal=0;
  for(const chapter of corpus.chapters)for(const verse of chapter)for(const word of verse){
   total++;bookTotal++;
   if(dictionary[strongFor(word[1])]){matched++;bookMatched++;}
  }
  assert.ok(bookMatched>bookTotal*0.95,book+" dictionary coverage should exceed 95%");
 }
 assert.ok(total>79000);
 assert.ok(matched>total*0.97,"Expected dictionary coverage above 97%");
});

test("API resolves Strong's from final lexical lemma component",()=>{
 assert.match(route,/lemma\.split\("\/"\)/);
 assert.match(route,/numericLemma/);
 assert.match(route,/dictionary\[strong\]/);
});
