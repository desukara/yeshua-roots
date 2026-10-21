import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const reader=readFileSync(new URL("../components/torah-bible-reader.tsx",import.meta.url),"utf8");

test("Scripture reference pattern supports English, Hebrew and numbered books",()=>{
 const pattern=/^(.+?)\s+(\d{1,3})(?:\s*:\s*(\d{1,3}))?$/;
 for(const [input,book,chapter,verse] of [
  ["Genesis 1:3","Genesis","1","3"],
  ["בראשית 1:3","בראשית","1","3"],
  ["1 Corinthians 13:4","1 Corinthians","13","4"],
  ["John 3","John","3",undefined],
 ]){const m=pattern.exec(input);assert.ok(m,input);assert.deepEqual(m.slice(1),[book,chapter,verse]);}
 for(const input of ["Genesis","John 3:","John abc",""]){assert.equal(pattern.test(input),false,input);}
 assert.ok(reader.includes(pattern.toString()),"reader must use the tested reference pattern");
});

test("reader preserves primary Scripture when optional comparison fails",()=>{
 assert.match(reader,/Promise\.allSettled\(/);
 assert.match(reader,/primary\.status==="fulfilled"/);
 assert.match(reader,/comparison\.status==="fulfilled"/);
 assert.match(reader,/setCompareError\(/);
});

test("reader rejects empty and malformed verse payloads",()=>{
 assert.match(reader,/!Array\.isArray\(d\.verses\)/);
 assert.match(reader,/d\.verses\.length===0/);
 assert.match(reader,/Number\.isInteger\(v\.number\)/);
 assert.match(reader,/typeof v\.text==="string"/);
 assert.match(reader,/v\.text\.trim\(\)\.length>0/);
});

test("verse existence is checked against the fetched chapter",()=>{
 assert.match(reader,/data\.verses\.some\(v=>v\.number===selectedVerse\)/);
 assert.match(reader,/missingSelectedVerse&&<p role="alert">/);
});

const api=readFileSync(new URL("../app/api/bible/route.ts",import.meta.url),"utf8");
test("server rejects empty or malformed upstream Scripture responses",()=>{
 assert.match(api,/Array\.isArray\(data\.verses\)/);
 assert.match(api,/data\.verses\.length===0/);
 assert.match(api,/Number\.isInteger\(v\.verse\)/);
 assert.match(api,/v\.text\.trim\(\)\.length>0/);
 assert.match(api,/status:502/);
});

test("missing verse message offers recovery without misleading search result",()=>{
 assert.match(reader,/missingSelectedVerse\?<p>/);
 assert.match(reader,/Choose another verse or show the full chapter/);
 assert.match(reader,/בחרו פסוק אחר או הציגו את כל הפרק/);
});

test("missing verse does not announce misleading chapter search counts",()=>{
 assert.match(reader,/!loading&&!error&&!missingSelectedVerse&&data\?\.verses&&normalizedQuery\?/);
});
