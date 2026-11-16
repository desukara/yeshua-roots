import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("public navigation exposes the current Torah and Start Here routes",()=>{
 const home=read("app/page.tsx");
 assert.match(home,/const hrefs=\["\/torah","\/start-here"\]/);
 assert.match(home,/href="\/torah"|hrefs/);
 const start=read("app/start-here/page.tsx");
 assert.match(start,/Yeshua is alive/);
});

test("legacy library route redirects to the current Torah destination",()=>{
 const library=read("app/library/page.tsx");
 assert.match(library,/permanentRedirect\("\/torah"\)/);
});

test("sitemap advertises actual current public destinations and approved studies only",()=>{
 const sitemap=read("app/sitemap.ts");
 assert.match(sitemap,/"\/torah"/);
 assert.match(sitemap,/"\/start-here"/);
 assert.match(sitemap,/publishedStudies\.map/);
 assert.doesNotMatch(sitemap,/"\/library"/);
});

test("draft studies remain unpublished until founder approval",()=>{
 const content=read("lib/content.ts");
 assert.match(content,/export type EditorialStatus = "draft" \| "founder-approved"/);
 assert.match(content,/export const publishedStudies/);
 assert.match(content,/founder-approved/);
});

test("Torah study remains optional and does not replace the primary reader",()=>{
 const reader=read("components/torah-bible-reader.tsx");
 assert.match(reader,/Hebrew/);
 assert.match(reader,/KJV/);
});
