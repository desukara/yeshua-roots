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
  assert.equal(slugs.length, 7);
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

test('passage reference input reflects server limits with accessible guidance', () => {
 const hall=read('components/beit-midrash.tsx');
 const api=read('app/api/library/text/route.ts');
 assert.match(hall, /maxLength=\{110\}/);
 assert.match(hall, /aria-describedby="bm-ref-hint"/);
 assert.match(hall, /id="bm-ref-hint"/);
 assert.match(hall, /Enter a passage reference up to 110 characters/);
 assert.match(api, /ref\.length>110/);
});

test('study reader distinguishes invalid references from temporary source errors', () => {
 const hall=read('components/beit-midrash.tsx');
 assert.match(hall, /r\.status===400\?"Invalid text reference"/);
 assert.match(hall, /"invalid-reference":"load-failed"/);
 assert.match(hall, /This passage reference is invalid/);
 assert.match(hall, /מראה המקום אינו תקין/);
 assert.match(hall, /Retry loading/);
});

test('about page presents bilingual ministry identity without publishing unapproved doctrine', () => {
 const section=read('components/section-client.tsx');
 assert.match(section, /function MinistryIdentity/);
 assert.match(section, /Yeshua is alive and active/);
 assert.match(section, /Torah and the Prophets/);
 assert.match(section, /Israel and the nations/);
 assert.match(section, /Statement of Faith — founder review pending/);
 assert.match(section, /only after founder review and approval/);
 assert.match(section, /not finalized approved ministry doctrine/);
 assert.match(section, /slug==="about"&&<MinistryIdentity/);
});

test('teaching page offers bilingual learning routes without overstating editorial approval', () => {
 const section=read('components/section-client.tsx');
 assert.match(section, /function TeachingPathways/);
 assert.match(section, /Choose a place to begin/);
 assert.match(section, /Introductory studies/);
 assert.match(section, /Read Scripture/);
 assert.match(section, /Explore Biblical Hebrew/);
 assert.match(section, /remain under editorial review/);
 assert.match(section, /slug==="teachings"&&<TeachingPathways/);
});

test('official ministry motto replaces the former three-part slogan in both languages', () => {
 const copy=read('lib/translations.ts');
 const home=read('app/page.tsx');
 assert.match(copy, /Rooted in Yeshua\. Growing in Faith\./);
 assert.match(copy, /מושרשים בישוע\. צומחים באמונה\./);
 assert.doesNotMatch(copy, /One Messiah\. One Torah\. One Family\./);
 assert.doesNotMatch(copy, /משיח אחד\. תורה אחת\. משפחה אחת\./);
 assert.match(home, /c\.mottoLines\[1\]/);
 assert.doesNotMatch(home, /c\.mottoLines\[2\]/);
});

test('all starter studies remain drafts and review requires founder approval', () => {
 const content=read('lib/content.ts');
 const reader=read('components/study-reader.tsx');
 const workflow=read('docs/EDITORIAL_REVIEW.md');
 assert.match(content, /export type EditorialStatus = "draft" \| "founder-approved"/);
 assert.equal((content.match(/editorialStatus:"draft"/g)||[]).length,7);
 assert.match(reader, /study\.editorialStatus==="draft"/);
 assert.match(workflow, /explicit founder approval/);
 assert.match(workflow, /Statement of Faith is \*\*not approved or published\*\*/);
});

test('guided bilingual curriculum links the four existing draft studies', () => {
 const paths=read('lib/learning-paths.ts');
 const content=read('lib/content.ts');
 const page=read('components/section-client.tsx');
 const stepSlugs=[...paths.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
 assert.equal(stepSlugs.length,7);
 assert.equal(new Set(stepSlugs).size,7);
 for(const slug of stepSlugs) assert.ok(content.includes('slug:"'+slug+'"'));
 assert.match(paths, /titleHe:/);
 assert.match(paths, /titleEn:/);
 assert.match(page, /function GuidedCurriculum/);
 assert.match(page, /awaiting founder approval/);
 assert.match(page, /slug==="teachings"&&<GuidedCurriculum/);
});

test('library filters by guided pathway and clearly labels unapproved lessons', () => {
 const library=read('components/study-library.tsx');
 assert.match(library, /learningPaths\.find/);
 assert.match(library, /setPathway\("All"\)/);
 assert.match(library, /editorialStatus==="draft"/);
 assert.match(library, /awaiting founder approval/);
 assert.match(library, /ממתין לאישור המייסד/);
});

test('guided learning keeps Yeshua central while honoring original Scripture context', () => {
 const paths=read('lib/learning-paths.ts');
 const section=read('components/section-client.tsx');
 assert.equal((paths.match(/messiahFocusEn:"/g)||[]).length,3);
 assert.equal((paths.match(/messiahFocusHe:"/g)||[]).length,3);
 assert.match(paths,/Read Genesis in its own context first/);
 assert.match(paths,/preserving God’s faithfulness to Israel/);
 assert.match(section,/Yeshua at the center:/);
 assert.match(section,/ישוע במרכז הלימוד/);
});

test('teachings explain a Yeshua-centered reading method in both languages', () => {
 const page=read('components/section-client.tsx');
 assert.match(page,/function ScriptureReadingMethod/);
 assert.match(page,/Read Scripture with Yeshua at the center/);
 assert.match(page,/לקרוא את הכתובים כשישוע במרכז/);
 assert.match(page,/Distinguish direct quotations, patterns, and interpretations/);
 assert.match(page,/slug==="teachings"&&<ScriptureReadingMethod/);
});

test('all starter studies have bilingual discussion questions', () => {
 const guides=read('lib/study-guides.ts');
 const reader=read('components/study-reader.tsx');
 const slugs=[...guides.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
 assert.equal(slugs.length,7);
 assert.equal(new Set(slugs).size,7);
 assert.equal((guides.match(/questionsEn:/g)||[]).length,8);
 assert.equal((guides.match(/questionsHe:/g)||[]).length,8);
 assert.match(reader,/studyGuides\.find/);
 assert.match(reader,/Questions for study and discussion/);
});

test('new Jewish Messiah study is bilingual, contextual, and still draft', () => {
 const content=read('lib/content.ts');
 const translations=read('lib/study-translations.ts');
 const paths=read('lib/learning-paths.ts');
 const guides=read('lib/study-guides.ts');
 assert.match(content,/slug:"yeshua-jewish-messiah"/);
 assert.match(content,/Deuteronomy 18:15–19/);
 assert.match(content,/Read the psalms in their own settings/);
 assert.match(translations,/"yeshua-jewish-messiah":/);
 assert.match(paths,/id:"meet-yeshua"/);
 assert.match(guides,/slug:"yeshua-jewish-messiah"/);
});

test('every study has a unique translation, discussion guide, and learning-path entry', () => {
 const content=read('lib/content.ts');
 const translations=read('lib/study-translations.ts');
 const guides=read('lib/study-guides.ts');
 const paths=read('lib/learning-paths.ts');
 const studySlugs=[...content.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
 const translatedSlugs=[...translations.matchAll(/"([^"]+)":\{title:/g)].map(m=>m[1]);
 const guideSlugs=[...guides.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
 const pathSlugs=[...paths.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
 for(const [name,slugs] of [['studies',studySlugs],['translations',translatedSlugs],['discussion guides',guideSlugs],['learning path steps',pathSlugs]]){
   assert.equal(new Set(slugs).size,slugs.length,name+' must have unique slugs');
   assert.deepEqual([...slugs].sort(),[...studySlugs].sort(),name+' must cover exactly the published study identifiers');
 }
 const pathIds=[...paths.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(pathIds).size,pathIds.length,'learning pathway identifiers must be unique');
});

test('Yeshua and Torah fulfillment study is bilingual and retains Israel in context', () => {
 const content=read('lib/content.ts');
 const translations=read('lib/study-translations.ts');
 const paths=read('lib/learning-paths.ts');
 const guides=read('lib/study-guides.ts');
 assert.match(content,/slug:"yeshua-torah-and-prophets"/);
 assert.match(content,/Jeremiah 31:31–34/);
 assert.match(content,/promise does not erase Israel/);
 assert.match(translations,/"yeshua-torah-and-prophets":/);
 assert.match(paths,/slug:"yeshua-torah-and-prophets"/);
 assert.match(guides,/slug:"yeshua-torah-and-prophets"/);
});

test('resurrection study centers the living Yeshua and includes Hebrew and discussion questions', () => {
 const content=read('lib/content.ts');
 const translations=read('lib/study-translations.ts');
 const paths=read('lib/learning-paths.ts');
 const guides=read('lib/study-guides.ts');
 assert.match(content,/slug:"yeshua-is-alive"/);
 assert.match(content,/Psalm 16:8–11/);
 assert.match(content,/present invitation/);
 assert.match(content,/editorialStatus:"draft",slug:"yeshua-is-alive"/);
 assert.match(translations,/"yeshua-is-alive":/);
 assert.match(paths,/slug:"yeshua-is-alive"/);
 assert.match(guides,/slug:"yeshua-is-alive"/);
});
