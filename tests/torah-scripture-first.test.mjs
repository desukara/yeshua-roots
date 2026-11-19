import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const reader=readFileSync(new URL("../components/interlinear-reader.tsx",import.meta.url),"utf8");

test("complete Hebrew and KJV Scripture appears before interlinear words and commentary",()=>{
 const header=reader.indexOf('aria-label="Complete Scripture verse"');
 const curated=reader.indexOf('{curated?<><div className="interlinear-word-grid"');
 const corpus=reader.indexOf('<div className="interlinear-word-grid" dir="rtl" lang="he">{corpusWords.map');
 const breakdown=reader.indexOf('{breakdown&&<section className="torah-breakdown"');
 assert.ok(header>0&&curated>header&&corpus>header&&breakdown>header);
 assert.match(reader,/className="torah-hebrew-verse" dir="rtl" lang="he">\{hebrew\}/);
 assert.match(reader,/\{englishVerse\}/);
});

test("KJV is loaded from the existing Bible API for the selected book and chapter",()=>{
 assert.match(reader,/fetch\("\/api\/bible\?book="\+encodeURIComponent\(book\)\+"&chapter="\+chapter\+"&version=kjv"/);
 assert.match(reader,/englishVerses\?\.find\(v=>v\.number===verse\)\?\.text/);
 assert.match(reader,/\[book,chapter\]/);
 assert.match(reader,/controller\.abort\(\)/);
});

test("missing Scripture is never silently replaced by an explanation",()=>{
 assert.match(reader,/Hebrew Scripture is unavailable for this verse/);
 assert.match(reader,/KJV Scripture is temporarily unavailable/);
 assert.match(reader,/explanation below is not a Bible translation/);
 assert.doesNotMatch(reader,/className="interlinear-verse" lang="en" dir="ltr"/);
});
