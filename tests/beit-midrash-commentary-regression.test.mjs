import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
test("legacy rabbinic catalogue contains no text or fetch implementation",()=>{
 const module=read("components/beit-midrash.tsx");
 assert.doesNotMatch(module,/Rashi|Mishnah|Talmud|Kuzari|Maimonides|fetch\(/i);
 assert.match(module,/export \{\}/);
});
test("unapproved commentary drafts have been purged",()=>{
 const drafts=read("lib/beit-midrash-commentary-drafts.ts");
 assert.doesNotMatch(drafts,/Rashi|Mishnah|Talmud|sefaria\.org/i);
 assert.match(drafts,/commentaryDrafts:Record<string,never>=\{\}/);
});
test("public interlinear reader never imports draft commentary",()=>{
 const reader=read("components/interlinear-reader.tsx");
 assert.doesNotMatch(reader,/commentaryDrafts|NEXT_PUBLIC_BEIT_MIDRASH_DRAFT_PREVIEW/);
});
