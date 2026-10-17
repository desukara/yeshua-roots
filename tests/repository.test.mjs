import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('sitemap includes interlinear reader and study routes', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /["']\/interlinear["']/);
  assert.match(sitemap, /studies\.map/);
});

test('all starter study translations have matching slugs', () => {
  const content = read('lib/content.ts');
  const translations = read('lib/study-translations.ts');
  const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map(match => match[1]);
  assert.equal(slugs.length, 4);
  for (const slug of slugs) assert.ok(translations.includes(`"${slug}":`), `Missing Hebrew translation: ${slug}`);
});

test('unpublished ministry services remain identified as unavailable', () => {
  const translations = read('lib/translations.ts');
  assert.match(translations, /not yet live/);
  assert.match(translations, /not yet published/);
});

test('homepage hero identifies an online Messianic synagogue in both languages', () => {
  const translations = read('lib/translations.ts');
  assert.match(translations, /An Online Messianic Synagogue/);
  assert.match(translations, /בית כנסת משיחי מקוון/);
});

test('interlinear promotional kicker is localized', () => {
  const homepage = read('app/page.tsx');
  assert.match(homepage, /לימוד תורה · עיון במילים/);
  assert.match(homepage, /TORAH STUDY · WORD STUDY/);
});
