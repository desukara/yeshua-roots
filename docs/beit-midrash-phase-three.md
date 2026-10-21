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

### Increment 3 — Verse bookmarks and private notes
- Start with local-only storage, clear device-only privacy messaging, export/delete controls, versioned data format, and safe failure handling for disabled storage.
- Stable canonical verse IDs; prevent note content from being rendered as HTML. No server syncing or implied account privacy until authenticated storage/RLS are reviewed.

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
Page sequence: Royal Jerusalem hero; bilingual Start Here choices; Scripture reading desk with search, notes, comparison; clearly sourced Jewish commentary; separately labeled founder-approved Messianic reflection; weekly parashah; guided reading collections and private notebook. Keep existing reader functional throughout. Prioritize compact navigation and usable mobile/RTL layout.

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
