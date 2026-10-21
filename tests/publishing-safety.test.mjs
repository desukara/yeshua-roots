import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const read = file => fs.readFileSync(path.join(process.cwd(), file), "utf8");

test("public study routes, sitemap and library use founder-approved collection", () => {
  for (const file of ["app/study/[slug]/page.tsx", "app/sitemap.ts", "components/library-client.tsx", "app/page.tsx", "components/section-client.tsx"]) {
    assert.match(read(file), /publishedStudies/, file + " must use approved studies");
  }
  assert.match(read("lib/content.ts"), /publishedStudies\s*=\s*studies\.filter\(study\s*=>\s*study\.editorialStatus\s*===\s*"founder-approved"\)/);
  assert.match(read("app/study/[slug]/page.tsx"), /if\(!study\)notFound\(\)/);
});

test("the published historical study is discoverable", () => {
  assert.match(read("app/sitemap.ts"), /\/history\/jewish-roots/);
  assert.match(read("components/site-footer.tsx"), /\/history\/jewish-roots/);
});

test("visitor-facing TSX contains no hardcoded outbound links", () => {
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
      const file=path.join(dir,entry.name);
      if(entry.isDirectory()) visit(file);
      else if(file.endsWith(".tsx")) {
        const source=fs.readFileSync(file,"utf8");
        assert.doesNotMatch(source, /\bhref\s*=\s*["'{]\s*https?:\/\//i, file + " has an external href");
      }
    }
  }
  visit("app");visit("components");
});

test("Torah reader normalizes actual whitespace rather than a literal backslash-s", () => {
  const api=read("app/api/torah/[book]/[chapter]/route.ts");
  assert.ok(api.includes(String.raw\`replace(/\s+/g," ")\`), "Torah API must normalize whitespace");
  assert.ok(!api.includes(String.raw\`replace(/\\s+/g," ")\`), "Do not match literal slash-s");
});

test("unfinished services are not advertised to search engines as completed sitemap destinations", () => {
  const sitemap=read("app/sitemap.ts");
  for(const route of ["/news","/community","/contact","/outreach","/support","/prayer"]) {
    assert.ok(!sitemap.includes(`"${route}"`), route+" is still in development");
  }
});
