import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const drafts = readFileSync(new URL("../lib/beit-midrash-commentary-drafts.ts", import.meta.url), "utf8");
const reader = readFileSync(new URL("../components/interlinear-reader.tsx", import.meta.url), "utf8");
const contract = readFileSync(new URL("../docs/beit-midrash-commentary-editorial-contract.md", import.meta.url), "utf8");

test("commentary stays behind an explicit unpublished preview flag", () => {
  assert.match(reader, /NEXT_PUBLIC_BEIT_MIDRASH_DRAFT_PREVIEW==="true"/);
  assert.match(reader, /commentaryDrafts\[/);
  assert.match(reader, /\{commentary&&<article/);
  assert.match(drafts, /founder-review-required/g);
});

test("Jewish commentary and Messianic interpretation are distinctly labeled", () => {
  assert.match(reader, /Jewish Commentary · Historical Source/);
  assert.match(reader, /Messianic Reflection · Our Editorial Reading/);
  assert.match(drafts, /Rashi on Genesis 1:1/);
  assert.match(drafts, /Mishnah Chullin 3:7/);
  assert.match(drafts, /sefaria\.org\/Rashi_on_Genesis\.1\.1/);
  assert.match(drafts, /sefaria\.org\/Mishnah_Chullin\.3\.7/);
});

test("kosher identity and Messiah affirmation are mandatory editorial policy", () => {
  assert.match(contract, /kosher, Torah-honoring, Yeshua-centered/);
  assert.match(contract, /No published teaching may deny His Messiahship/);
  assert.match(contract, /following Yeshua requires abandoning kosher practice/);
  assert.match(drafts, /Keeping kosher is not wrong, inferior, or incompatible/);
  assert.match(drafts, /אין להציג שמירת כשרות/);
});

test("both draft passages provide Hebrew and English sections", () => {
  for (const reference of ["Genesis 1:1", "Leviticus 11:10"]) {
    assert.ok(drafts.includes('"'+reference+'"'));
  }
  assert.equal((drafts.match(/jewish: \{/g)||[]).length, 2);
  assert.equal((drafts.match(/messianic: \{/g)||[]).length, 2);
  assert.equal((drafts.match(/scriptures: \[/g)||[]).length, 2);
});
