import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const api=readFileSync(new URL("../app/api/torah/[book]/[chapter]/route.ts",import.meta.url),"utf8");

test("Torah API exposes one ordered token list per Hebrew verse",()=>{
 assert.match(api,/const words=verses\.map\(/);
 assert.match(api,/verse\.split\(\/\\s\+\/u\)/);
 assert.match(api,/index:index\+1,hebrew/);
 assert.match(api,/verses,words,source:/);
});

test("Hebrew punctuation and maqqef remain attached to source tokens",()=>{
 const verse="וַיְהִי־אוֹר וַיֹּאמֶר׃";
 assert.deepEqual(verse.split(/\s+/u),["וַיְהִי־אוֹר","וַיֹּאמֶר׃"]);
});
