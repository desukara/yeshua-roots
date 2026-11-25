import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const reader=readFileSync(new URL("../components/interlinear-reader.tsx",import.meta.url),"utf8");
const genesisTwoStudy=JSON.parse(readFileSync(new URL("../data/torah/genesis2-verse-study.json",import.meta.url),"utf8"));
const genesisThreeStudy=JSON.parse(readFileSync(new URL("../data/torah/genesis3-verse-study.json",import.meta.url),"utf8"));
const chapterCounts=[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,54,33,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26];
const names=["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty","TwentyOne","TwentyTwo","TwentyThree","TwentyFour","TwentyFive","TwentySix","TwentySeven","TwentyEight","TwentyNine","Thirty","ThirtyOne","ThirtyTwo","ThirtyThree","ThirtyFour","ThirtyFive","ThirtySix","ThirtySeven","ThirtyEight","ThirtyNine","Forty","FortyOne","FortyTwo","FortyThree","FortyFour","FortyFive","FortySix","FortySeven","FortyEight","FortyNine","Fifty"];

test("all 1,533 original Genesis verse breakdowns are connected",()=>{
 let total=0;
 for(let chapter=1;chapter<=50;chapter++){
  const begin=reader.indexOf("const plainGenesis"+names[chapter-1]+":Record<number,PlainVerseStudy>=");
  assert.ok(begin>=0,"Missing chapter "+chapter);
  let verses;
  if(chapter===2||chapter===3){
   const chapterStudy=chapter===2?genesisTwoStudy:genesisThreeStudy;
   verses=Object.keys(chapterStudy).map(Number).sort((a,b)=>a-b);
   for(const [verse,study] of Object.entries(chapterStudy))assert.ok(study.scene&&study.breakdown&&study.takeaway,"Incomplete Genesis "+chapter+":"+verse);
  }else{
   const end=reader.indexOf("\n};",begin);
   assert.ok(end>begin,"Unterminated chapter "+chapter);
   const body=reader.slice(begin,end);
   verses=[...body.matchAll(/^\s*"?([0-9]+)"?:\s*\{/gm)].map(match=>Number(match[1]));
  }
  assert.deepEqual(verses,Array.from({length:chapterCounts[chapter-1]},(_,i)=>i+1),"Incorrect verses in Genesis "+chapter);
  total+=verses.length;
  assert.match(reader,new RegExp(chapter+":plainGenesis"+names[chapter-1]+"(?=,|})"));
 }
 assert.equal(total,1533);
 assert.match(reader,/Break It Down for Me/);
 assert.match(reader,/aria-label="Complete Scripture verse"/);
});
