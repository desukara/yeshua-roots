import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const study = readFileSync(new URL("../lib/genesis-messianic-study.ts", import.meta.url), "utf8");
const reader = readFileSync(new URL("../components/interlinear-reader.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const chapterStart = study.indexOf('1:{title:"Creation through Yeshua"');
const chapterEnd = study.indexOf('\n2:genesisTwoMessianicStudy', chapterStart);
const genesisOne = study.slice(chapterStart, chapterEnd);

test("Genesis 1 Messianic notes cover each verse with distinct wording", () => {
  const verses = [...genesisOne.matchAll(/^(\d+):\{context:/gm)].map((match) => Number(match[1]));
  assert.deepEqual(verses, Array.from({ length: 31 }, (_, index) => index + 1));
  const connections = [...genesisOne.matchAll(/connection:"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(connections.length, 31);
  assert.equal(new Set(connections).size, 31);
  assert.doesNotMatch(genesisOne, /foundation for Messianic reflection|Apostolic Scriptures, \.?/);
});

test("Genesis 1 shows the chapter connection and the selected verse's supporting Scripture in place", () => {
  assert.match(genesisOne, /overviewPassages:\[\{reference:"John 1:1–3"/);
  assert.match(reader, /className="messianic-chapter-overview"/);
  assert.match(reader, /className="messianic-verse-study"/);
  assert.match(reader, /King James Version/);
  assert.match(reader, /loadStudyPassages\(sources,controller\.signal\)/);
  assert.doesNotMatch(reader, /messianic-passage[^\n]*<a\s/);
});

test("Genesis 1 study cards adapt to mobile widths", () => {
  assert.match(css, /\.interlinear-reader \.messianic-passage-list\{[^}]*grid-template-columns:repeat\(auto-fit/);
  assert.match(css, /@media\(max-width:600px\)\{[\s\S]*?\.interlinear-reader \.messianic-passage-list\{grid-template-columns:minmax\(0,1fr\)/);
});
