import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('sitemap includes interlinear reader and study routes', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /["']\/interlinear["']/);
  assert.match(sitemap, /publishedStudies\.map/);
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
  assert.match(homepage, /Fulfilled in Messiah/);
  assert.match(homepage, /href="\/history\/jewish-roots"/);
  assert.match(homepage, /href="\/library">{c\.findPlace}/);
  assert.match(copy, /In Development/);
  assert.match(copy, /בפיתוח/);
});

test('homepage prioritizes active learning paths and keeps unfinished services off the featured shelf', () => {
  const homepage = read('app/page.tsx');
  const styles = read('app/home-royal.css');
  assert.match(homepage, /hero-title-line/);
  assert.match(homepage, /c\.rooms\.slice\(0,2\)/);
  assert.match(homepage, /const hrefs=\["\/torah","\/teachings"\]/);
  assert.doesNotMatch(homepage, /developing\.has\(hrefs\[i\]\)/);
  assert.match(homepage, /welcome-visual" aria-hidden="true"/);
  assert.match(styles, /\.home-royal \.room-grid/);
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




test('rabbinic text API and labels are absent from the site', () => {
 const library=read('components/library-client.tsx');
 assert.doesNotMatch(library,/rabbinic|BeitMidrash|Talmud|Mishnah/i);
 assert.match(library,/SCRIPTURE STUDY LIBRARY/);
});





test('removed commentary integrations cannot reappear in application source', () => {
 const root = new URL('../', import.meta.url);
 assert.equal(existsSync(new URL('app/api/library/text/route.ts', root)), false);
 const scan = dir => {
  for (const entry of readdirSync(new URL(dir + '/', root), { withFileTypes: true })) {
   const path = dir + '/' + entry.name;
   if (entry.isDirectory()) { scan(path); continue; }
   if (!/\\.(ts|tsx|js|jsx)$/.test(entry.name)) continue;
   const source = read(path);
   assert.doesNotMatch(source, /\\b(?:Talmud|Mishnah|Midrash|Beit\\s?Midrash)\\b/i, path);
   assert.doesNotMatch(source, /\\/api\\/library\\/text|\\bsefaria\\.org\\/api\\/texts\\//i, path);
  }
 };
 for (const dir of ['app', 'components', 'lib']) scan(dir);
});

test('public library does not expose external passage reference input', () => {
 const library=read('components/library-client.tsx');
 assert.doesNotMatch(library,/bm-ref-form|\/api\/library\/text/);
});


test('about page presents bilingual ministry identity without publishing unapproved doctrine', () => {
 const section=read('components/section-client.tsx');
 assert.match(section, /function MinistryIdentity/);
 assert.match(section, /Yeshua is very much alive/);
 assert.match(section, /aboutPageContent\.map/);
 assert.match(section, /Welcome to Yeshua Roots/);
 assert.match(section, /Rooted in Yeshua\. Growing in Faith\./);
 assert.match(section, /about-editorial-reading/);
 assert.match(section, /aboutPageContent\.map/);
 assert.match(section, /<MinistryIdentity/);
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
