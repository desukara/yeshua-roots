# Beit Midrash — Phase 3 implementation plan

Status: approved feature scope; implementation in increments. **Do not advertise planned tools as live.**

## Existing architecture and constraints
- Route: `app/[slug]/page.tsx` renders `components/section-client.tsx` for `/torah`.
- Existing Bible reader: `components/torah-bible-reader.tsx`. Preserve book/chapter selection, KJV authoritative default, comparison options, navigation, and existing data loading.
- English and modern Israeli Hebrew via `components/language-provider.tsx` and translated UI. Test RTL, keyboard operation, and mobile layouts.
- Introductory studies are editorial drafts, not approved ministry doctrine. New theological explanations, study questions, parashah reflections, and Hebrew glosses require founder/editorial review before publication.
- Torah proper means Genesis–Deuteronomy; the broader Scripture reader includes the Prophets, Writings, and Apostolic Writings. Do not mislabel the entire Bible as the Five Books of Moses.

## Delivery sequence and acceptance gates

### Increment 1 — safe foundation (this PR)
- Add bilingual, accessible entry points for the existing Scripture reader, existing interlinear Hebrew tool, and existing study library.
- Clarify Torah proper vs. the wider Scriptures; keep editorial-review disclaimer.
- No reader logic, translation authority, Bible text, API, or database changes.
- Gate: typecheck, tests, build, verify English/Hebrew RTL, 375px and desktop, reader chapter navigation.

### Increment 2 — Search Scripture
- Audit available text sources, book metadata, licensing, and local/API performance.
- Implement book/reference lookup first, then keyword search against verified available texts, with source/translation labels.
- Keyboard-accessible search results, empty states, no fabricated verse hits. Add test coverage.

### Increment 3 — Reading experience refinements
- Improve reading comfort, responsive layout, and navigation without personal notes, verse bookmarks, reading-history storage, or a study notebook.
- Keep Scripture selection and KJV default behavior intact; do not add user-data storage.

### Increment 4 — Daily Scripture and study questions
- Deterministic curated passage schedule with citations and correct date behavior, bilingual labels.
- Study questions must be approved editorial content, not AI-generated doctrinal answers. Publish only reviewed content; otherwise show passage-only reading prompts clearly marked as prompts.

### Increment 5 — Side-by-side translations
- Reuse existing comparison logic and supported text sources. Verify each translation's API terms and display permissions before adding it.
- Verse alignment, missing-verse states, Hebrew RTL isolation, and responsive stacked comparison on narrow screens.
- Preserve KJV as the site's authoritative default unless founder explicitly changes that policy.

### Increment 6 — Hebrew word studies
- Integrate with the existing `/interlinear` experience rather than duplicating lexicon logic.
- Curate verifiable Hebrew forms, transliterations, roots, glosses, grammatical notes, and sources; distinguish lexical meaning from theological interpretation.
- Review Hebrew language quality and theological claims before publishing.

### Increment 7 — Weekly parashah
- Verify Jewish calendar/parashah schedule data, Israel vs. diaspora conventions, holidays, timezone and date rollover.
- Show Torah and Haftarah references with source attribution; any Messianic reflections remain drafts until approved.
- Include fallback when the schedule is unavailable rather than guessing a portion.

## Release policy
Each increment gets a focused PR, automated checks, responsive and Hebrew RTL review, and an explicit production deployment verification. Do not merge unfinished features into live navigation or imply unpublished studies are official doctrine.

## Jewish commentary library — approved direction, pending editorial implementation
- Bring substantial Jewish exegetical context into the Beit Midrash: Rashi, Ibn Ezra, Ramban, Sforno, Midrash Rabbah, and relevant Mishnah/Talmud passages; modern scholarship only with appropriate permissions.
- **Non-negotiable publication rule:** Do not publish any passage, quotation, commentary excerpt, summary, or linked featured teaching that denies Yeshua is the Messiah. Review every selected excerpt before publication; reject content containing such denial rather than editing it to reverse or conceal the author's position. The ministry unequivocally teaches Yeshua as Israel's living Jewish Messiah. Never falsely attribute Messianic belief to historical Jewish commentators.
- Organize each passage in clearly labeled layers: biblical text; Jewish commentary (source, author, era, genre, citation, and translation provenance); Messianic reflection (founder-reviewed, with Scripture citations). Distinguish quotation, paraphrase, and editorial interpretation.
- Prefer verified public-domain originals and legally reusable translations, with attribution and source links. Public-domain original text does not automatically make a modern translation reusable. Verify source/API terms and preserve quotation limits.
- Begin with a small curated pilot (e.g. Genesis 1 and Exodus 20) with bilingual English/Hebrew presentation and accessible RTL. No unreviewed doctrinal content or commentary placeholders advertised as live.
- Keep scholarly context honest: a selected Jewish interpretation may address grammar, history, or literary context without discussing Yeshua; such material can be included if it contains no denial of His Messiahship. Do not imply its author affirmed Yeshua. Any selection requires editorial review before publication.

## Finalized page structure and initial reading collections (founder-selected)
Page sequence: Royal Jerusalem hero; bilingual Start Here choices; Scripture reading desk with search and comparison; clearly sourced Jewish commentary; separately labeled founder-approved Messianic reflection; weekly parashah; guided reading collections. Keep existing reader functional throughout. Prioritize compact navigation and usable mobile/RTL layout.

**Five launch collections (editorial outlines, not published studies):**
1. **The Beginning** — Genesis 1–12; John 1; Colossians 1. Creation, Shabbat, image of God, Abraham, the Word.
2. **Covenant and Redemption** — Genesis 12–22; Exodus 12–20; Jeremiah 31; Luke 22. Abraham, Passover, Sinai, new covenant.
3. **The Messiah in the Scriptures** — Deuteronomy 18; Psalms 2 and 110; Isaiah 53; Daniel 7; Luke 24. Examine original context and explicitly labeled Messianic interpretation.
4. **Walking in His Ways** — Leviticus 19; Deuteronomy 6; Matthew 5–7; John 14–15; Romans 11. Holiness, love, grace, obedience, Spirit, Israel.
5. **The Appointed Times** — Leviticus 23; Exodus 12; Numbers 29; John 7; 1 Corinthians 5. Shabbat and appointed times, historical practice, and distinct Messianic readings.

**Commentary order (founder-selected):** (1) biblical passage and its context; (2) **Jewish Commentary**, with author, source, era, citation, original/translation provenance and clear quotation boundaries; (3) **Messianic Reflection**, explicitly distinct, Scripture-cited, and founder-approved; (4) optional study questions and notes. Do not collapse the two layers or attribute Messianic belief to historical Jewish commentators.

**Absolute publication gate:** Publish **no material denying that Yeshua is the Messiah**—including commentary excerpts, quotations, study questions, summaries, or featured outbound teachings. Screen each selected excerpt in both languages; reject disallowed material rather than deceptively editing or reversing its meaning. All doctrinal reflections require founder review. No placeholder is labeled as published content.

**First commentary pilot:** Genesis 1 and Exodus 20, then Genesis 2, Genesis 12, Exodus 12, Deuteronomy 6. Verify permission to reproduce each excerpt/translation and the precise citation before inclusion. Begin with The Beginning collection and progressively release the other four.

**Immediate safe code change:** correct the Scripture reader heading and definition in English and Hebrew without altering Bible API calls, KJV default, comparison, chapter controls, or reader state.

## Founder scope correction — no study notebook
The founder explicitly declined the study notebook. Do **not** implement a personal study notebook, private notes, verse bookmarks, reading-history tracking, or associated storage. Remove these from the page design, feature roadmap, and acceptance criteria. Keep the remaining approved features: Scripture search, daily Scripture, side-by-side translation improvements, Hebrew word studies, weekly parashah, curated study questions, and sourced Jewish commentary followed by separate approved Messianic reflections.

## Implemented safe search increment (pending validation)
The reader now offers bilingual **Find in this chapter** for words or exact verse numbers. It filters only the currently loaded primary translation verses, and the comparison column retains the same verse numbers to avoid mismatched passages. The interface explicitly states this is **not** whole-Bible search. No Bible API changes, external search provider, storage, notes, or doctrinal content were added. Next: validate types/build and English/Hebrew mobile/RTL rendering; then add canonical reference navigation and separately scoped full-corpus search only after a verified text index and licensing review.

### Search usability follow-up (pending validation)
The in-chapter filter now provides a bilingual clear-search action, a polite live-region count of matching verses, and clears the filter when changing books or chapters, preventing stale filtering across passages. Verify keyboard focus, assistive-technology announcements, and RTL layout before merging.

### Reference navigation increment (pending validation)
The bilingual reader accepts an English canonical book name followed by chapter and optional verse (e.g. `Genesis 1:3`, `1 Corinthians 13:4`). It validates the book against the reader's existing list and checks chapter bounds, navigates using existing state, and uses the chapter filter to focus on an optional verse. Invalid references receive a localized error. Known limitation: book names must be entered in English even in Hebrew mode; verse existence is not yet validated against the fetched chapter, and the current chapter filter may return no match. Follow up with localized book aliases, exact verse validation and tests. Do not advertise as full-Bible keyword search.

### Hebrew reference navigation improvement (pending validation)
Common Hebrew book names now map to the reader's canonical English book identifiers (including all five Torah books and selected other books). English book names remain accepted. Hebrew mode shows a Hebrew example and explains that Hebrew aliases are partial, not complete. Verify RTL text entry and references such as `בראשית 1:3`, `יוחנן 3:16`, `1 Corinthians 13:4`, invalid chapters and absent verses. The maximum numeric verse input is a loose input sanity bound, **not** confirmation that a verse exists; fetched verse data remains authoritative.

### Translation comparison resilience (pending validation)
Primary and optional comparison translation requests now settle independently: if comparison fails, primary Scripture remains readable and a localized comparison warning appears. If primary fails, the reader still shows its chapter-loading error. Changing the primary translation clears a now-identical comparison selection. Manual regression cases: primary success/comparison failure; primary failure/comparison success; both success; rapid chapter switching; abort on unmount; switching primary to selected comparison. Verify on mobile and in Hebrew RTL before merge.

### Retry and mixed-direction reference entry (pending validation)
A localized Retry loading action reruns the current primary and comparison requests after a loading failure without changing the selected passage. The reference input uses automatic text direction for mixed Hebrew/English book names and numerals. Verify retry after primary failure and comparison-only failure; ensure no retry appears on a healthy chapter and rapid navigation cancels stale requests.

### Bible API response integrity (pending validation)
The client now rejects empty verse arrays, missing verse arrays and malformed verse records even if the HTTP response is 200. A malformed primary response triggers the localized primary load error; a malformed comparison response preserves valid primary text and offers retry. Regression cases: HTTP 200 with empty verses; missing verses; malformed verse number/text; primary valid and comparison invalid; recovery after retry. No claim of Scripture content verification or source-text proofreading is implied by structural checks.

### Server-side Scripture response validation (pending validation)
The `/api/bible` route now rejects upstream responses with missing or empty verse arrays, non-positive or non-integer verse numbers, or missing/blank verse text. Rejected upstream payloads return the existing 502 error instead of being presented as successful chapter data. This complements, rather than replaces, client-side validation. Verify against upstream source variations and confirm CI before merge.


## Phase 3 preview and release gate (2026-10-21)

- Vercel preview deployment `dpl_Mp1YyHwtqLdjZUg7P96d89GrzYRG` for commit `2379583195926cca6c754b8f64e7488c2a164cd1` reached **READY**. Preview: https://yeshua-roots-kuwo747e6-parakalokyo-7253.vercel.app/torah
- GitHub **CI** and **Build and typecheck** workflows passed for that commit. These results establish compilation and automated-check health, **not** successful browser testing.
- The preview could not be opened by the available web inspection tool. **Do not mark browser, mobile, accessibility, Hebrew RTL, or live Bible API checks complete on the strength of deployment readiness alone.**

### Manual browser release checklist — all unchecked until actually observed

- [ ] Desktop English: /torah loads; Genesis 1 KJV displays correct text and chapter controls; jump to John 3:16 and back.
- [ ] Desktop Hebrew: switch interface language; Hebrew labels and layout are RTL; English Scripture verse articles remain LTR; reference entry supports בראשית 1:3 and יוחנן 3:16.
- [ ] Mobile narrow viewport: no clipped chapter controls, reference input, search feedback, translation selectors or comparison columns; text remains readable.
- [ ] Reference validation: invalid book, invalid chapter and absent verse show localized recovery guidance, not misleading match counts.
- [ ] Chapter search: word search, exact verse search, clear search, and navigation to another chapter reset stale filtering.
- [ ] Comparison: successful side-by-side verse alignment; comparison-only failure keeps primary Scripture visible; retry recovers when upstream is available.
- [ ] Primary failure: visible localized error, retry action, and no stale verses shown while loading or after failure.
- [ ] Keyboard and screen-reader checks: focus order, select/input labels, search result live announcement, and error messaging.
- [ ] Review all findings, fix defects, rerun GitHub checks, and confirm the final preview corresponds to the final PR head SHA.

**Release rule:** keep PR #48 draft and do not merge or promote to production until these checks are observed and recorded. No study notebook, notes, bookmarks or tracking should be added.
