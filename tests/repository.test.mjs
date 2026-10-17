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

test('homepage centers living Messiah and Scripture without routing visitors to unfinished community features', () => {
  const homepage = read('app/page.tsx');
  const copy = read('lib/translations.ts');
  assert.match(copy, /The Living Jewish Messiah/);
  assert.match(copy, /המשיח היהודי החי/);
  assert.match(copy, /Yeshua is alive, present, and active/);
  assert.match(homepage, /MATTHEW 5:17–19/);
  assert.match(homepage, /Not Abolished\. Fulfilled in Messiah/);
  assert.match(homepage, /href="\/study\/one-olive-tree"/);
  assert.match(homepage, /href="\/library">{c\.findPlace}/);
  assert.match(copy, /In Development/);
  assert.match(copy, /בפיתוח/);
});

test('homepage distinguishes planned services and supports flexible hero lines', () => {
  const homepage = read('app/page.tsx');
  const styles = read('app/globals.css');
  assert.match(homepage, /hero-title-line/);
  assert.match(homepage, /developing\.has\(hrefs\[i\]\)/);
  assert.match(homepage, /See what is planned/);
  assert.match(styles, /\.room-card\.is-developing/);
  assert.match(homepage, /welcome-visual" aria-hidden="true"/);
});

test('saved Hebrew locale is restored before persisting the language preference', () => {
  const provider = read('components/language-provider.tsx');
  assert.match(provider, /setRestored\(true\)/);
  assert.match(provider, /if\(!restored\)return/);
  assert.match(provider, /\[locale,restored\]/);
});

test('introductory study shelf discloses its editorial status', () => {
  const homepage = read('app/page.tsx');
  assert.match(homepage, /introductory study materials/);
  assert.match(homepage, /לימודי מבוא ראשוניים/);
  assert.match(homepage, /home-studies-heading/);
});

test('mission framing stays consistent across metadata, About and editorial policy', () => {
  const metadata = read('app/layout.tsx');
  const translations = read('lib/translations.ts');
  const readme = read('README.md');
  assert.match(metadata, /living Jewish Messiah of Israel/);
  assert.match(translations, /Yeshua, the living Jewish Messiah of Israel/);
  assert.match(translations, /המשיח היהודי החי של ישראל/);
  assert.match(readme, /alive, present, aware, and active now/);
  assert.match(readme, /Gentile believers are grafted into Israel's olive tree/);
});

test('section metadata does not misrepresent unfinished services as live', () => {
  const section = read('app/[slug]/page.tsx');
  assert.match(section, /export async function generateMetadata/);
  assert.match(section, /News — In Development/);
  assert.match(section, /Community — In Development/);
  assert.match(section, /Contact — In Development/);
  assert.match(section, /active contact inbox is not yet available/);
  assert.match(section, /living Jewish Messiah of Israel/);
});

test('study pages use article-specific metadata and library copy describes real content', () => {
  const studyPage = read('app/study/[slug]/page.tsx');
  const library = read('app/library/page.tsx');
  assert.match(studyPage, /generateMetadata/);
  assert.match(studyPage, /study\.subtitle/);
  assert.match(studyPage, /type:"article"/);
  assert.match(library, /introductory Torah and Messianic studies/);
  assert.doesNotMatch(library, /Mishnah, Talmud, Midrash/);
});

test('study reader provides a main landmark, bilingual editorial notice and library return', () => {
  const reader = read('components/study-reader.tsx');
  assert.match(reader, /id="main-content" tabIndex=\{-1\}/);
  assert.match(reader, /reading-editorial-note/);
  assert.match(reader, /לימוד מבוא ראשוני/);
  assert.match(reader, /Introductory study for reflection and discussion/);
  assert.match(reader, /href="\/library"/);
});

test('study hall preserves Torah terminology and labels source language honestly', () => {
  const hall = read('components/beit-midrash.tsx');
  assert.match(hall, /We study the Torah in its Jewish context/);
  assert.doesNotMatch(hall, /Torah means all Scripture/);
  assert.match(hall, /source\?\.language/);
  assert.match(hall, /Source text/);
});

test('study hall identifies external Sefaria source and loading state', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /Texts are retrieved from Sefaria/);
 assert.match(hall, /aria-busy=\{loading\}/);
 assert.match(hall, /חמשת חומשי תורה/);
});

test('study hall search supports Hebrew collection names and an accessible label', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /hebrewGroups\[w\.group\]/);
 assert.match(hall, /Search books or topics/);
 assert.match(hall, /חיפוש ספר או נושא/);
});

test('library text proxy rejects malformed or empty upstream responses', () => {
 const api=read('app/api/library/text/route.ts');
 assert.match(api, /const data:unknown=await response\.json\(\)/);
 assert.match(api, /Array\.isArray\(data\.versions\)/);
 assert.match(api, /Text source returned an invalid response/);
 assert.match(api, /No readable text available for this reference/);
 assert.match(api, /typeof payload\.ref==="string"/);
});

test('study hall offers bilingual retry after failed text fetch', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /setRetryCount\(n=>n\+1\)/);
 assert.match(hall, /\[activeRef,retryCount\]/);
 assert.match(hall, /Retry loading/);
 assert.match(hall, /נסו שוב/);
});

test('study hall avoids invented verse numbers and respects Aramaic direction', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.doesNotMatch(hall, /<sup>\{i\+1\}<\/sup>/);
 assert.match(hall, /numbering varies by work and edition/);
 assert.match(hall, /aramaic/i);
 assert.match(hall, /sourceLanguage==="he"\|\|sourceLanguage==="arc"/);
});

test('study hall identifies edition licenses and links to the source passage', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /Source edition:/);
 assert.match(hall, /Translation edition:/);
 assert.match(hall, /source\.license/);
 assert.match(hall, /translation\.license/);
 assert.match(hall, /https:\/\/www\.sefaria\.org\//);
 assert.match(hall, /noopener noreferrer/);
 assert.match(hall, /View this passage on Sefaria/);
});

test('study hall clears stale text and discloses its display limit', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /setLoading\(true\);setError\(""\);setData\(null\)/);
 assert.match(hall, /Showing up to 120 segments per edition/);
 assert.match(hall, /flatten\(source\?\.text\)\.length>120/);
});
