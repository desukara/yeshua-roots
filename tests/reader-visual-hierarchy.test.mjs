import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const reader=readFileSync(new URL("../components/interlinear-reader.tsx",import.meta.url),"utf8");
test("Scripture and explanation remain in order with visible accessible action",()=>{
 const scripture=reader.indexOf('aria-label="Complete Scripture verse"');
 const breakdown=reader.indexOf('<section className="torah-breakdown"');
 const action=reader.indexOf('<summary>Break It Down for Me</summary>');
 const words=reader.indexOf('className="interlinear-word-grid"',action);
 assert.ok(scripture>0&&breakdown>scripture&&action>breakdown&&words>action);
 assert.match(css,/\.interlinear-reader \.torah-breakdown summary\{/);
 assert.match(css,/\.interlinear-reader \.torah-breakdown summary:focus-visible/);
 assert.match(css,/@media\(max-width:600px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(reader,/const \[englishLoading,setEnglishLoading\]=useState\(true\)/);
});
