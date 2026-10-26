import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("unapproved research pages are inaccessible by direct URL",()=>{
 const route=read("app/teachings/[study]/page.tsx");
 assert.match(route,/FOUNDER_APPROVED_STUDIES=new Set<string>\(\)/);
 assert.match(route,/!FOUNDER_APPROVED_STUDIES\.has\(study\)\)notFound\(\)/);
 assert.match(route,/generateStaticParams\(\)\{return \[\];\}/);
});
test("public teaching discovery never links to unapproved research",()=>{
 const context=read("components/teachings-context-page.tsx");
 const catalogue=read("components/teachings-catalogue.tsx");
 assert.doesNotMatch(context,/href="\/teachings\/(?:the-lost-son|the-good-samaritan|blessed-are-the-meek|yeshua-and-torah|the-greatest-commandments)/);
 assert.match(catalogue,/const published:Record<string,string>=\{\}/);
});
test("rabbinic API restores public source lookup",()=>{ const api=read("app/api/library/text/route.ts"); assert.match(api,/sefaria.org\/api\/texts/); assert.match(api,/encodeURIComponent\(ref\)/); });

test("curated rabbinic material stays gated pending individual review",()=>{
 const contract=read("docs/beit-midrash-commentary-editorial-contract.md");
 const api=read("app/api/library/text/route.ts");
 const library=read("components/library-client.tsx");
 assert.match(contract,/Retain Jewish rabbinic scholarship/);
 assert.match(contract,/future millennial reign from Jerusalem/);
 assert.match(api,/await fetch/);
 assert.match(library,/Jewish rabbinic scholarship is welcome/);
});
