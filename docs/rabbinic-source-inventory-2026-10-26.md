# Rabbinic source inventory and first excerpt review — 2026-10-26

This is an evidence-based inventory of the **repository**, not a claim to have reviewed the entire Talmud, all of Sefaria, or every external linked work. No rabbinic source is approved for public publication by this file.

## Actual delivery surfaces audited

| Surface | Finding | Publication disposition |
| --- | --- | --- |
| `app/api/library/text/route.ts` | Always responds 410; no arbitrary Sefaria commentary proxy | Keep closed until an allowlisted reviewed collection exists |
| `app/api/torah/[book]/[chapter]/route.ts` | Fetches Hebrew **biblical Torah** (Genesis–Deuteronomy) from Sefaria with `commentary=0` | Retain: biblical text is not a rabbinic commentary feed |
| `app/api/bible/route.ts` | Fetches selected Bible translation chapters; no rabbinic commentary | Retain; verify upstream terms separately |
| `components/beit-midrash.tsx` | Empty deprecated component | No rabbinic excerpts currently rendered |
| `lib/beit-midrash-commentary-drafts.ts` | Empty drafts object | No existing excerpt catalogue to filter or approve |
| `components/library-client.tsx` | Explains source review, does not mount a rabbinic reader | Keep explanation truthful |
| `components/interlinear-reader.tsx` | No commentary drafts imported | No draft leak |
| `docs/beit-midrash-initial-source-verification.md` | Records two source-location checks, neither approved | Review below |
| `docs/beit-midrash-phase-three.md` | Lists potential Rashi, Ibn Ezra, Ramban, Sforno, Midrash, Mishnah and Talmud material | **Proposals, not imported texts** |
| `docs/teachings-source-register.md` | Lists Lightfoot, Edersheim, Stern and scholarly source leads | References are not an imported public rabbinic corpus |
| `app/history/jewish-roots/page.tsx` and historical drafts | Historical discussion of Jewish–Messianic separation | Contextual history, not a live rabbinic text API |

## Source-by-source candidate review

### Rashi on Genesis 1:1:1

- Reference: https://www.sefaria.org/Rashi_on_Genesis.1.1.1
- Repository's earlier verification describes Rabbi Isaac's question about beginning Torah with creation rather than Exodus 12:2; Psalm 111:6 and the Creator's authority over the land.
- **Screening:** The described excerpt does not explicitly deny or disparage Yeshua. It is suitable for further Jewish historical/contextual review, **not** yet approved for publication. This is a review of the repository's source summary and source location, not a fresh bilingual transcription of the primary text.
- **Distinct Messianic reflection candidate:** Genesis 1:1–5 and John 1:1–5; Colossians 1:15–17 connect creation to Yeshua. This is **Yeshua Roots' interpretation, not Rashi's claim**.
- **Unfinished checks:** Original Hebrew comparison, English translation permissions, independent Hebrew proofread, founder approval.

### Mishnah Chullin 3:7 (fish)

- Reference: https://www.sefaria.org/Mishnah_Chullin.3.7
- Repository's earlier verification describes the fins-and-scales distinction and Rabbi Judah's criterion.
- **Screening:** The described legal discussion does not explicitly deny or disparage Yeshua. It is suitable for further study of kosher practice, **not** yet approved for publication.
- **Distinct Messianic reflection candidate:** Leviticus 11:9–12; Acts 10:28. Do not present Peter's vision as a blanket rejection of kashrut or attribute a Messianic confession to the Mishnah.
- **Unfinished checks:** Exact Hebrew wording and translation provenance, bilingual review, founder approval.

## Future Messiah / Messianic age editorial rule

If a *reviewed excerpt* describes the Messiah as still to come, preserve the author's original historical meaning in the attributed source summary. In a **separate** Messianic reflection, Yeshua Roots affirms Yeshua's first coming and resurrection (Luke 24:44–49; 1 Corinthians 15:3–8), His return and gathering of believers (1 Thessalonians 4:16–17), His present Kingdom through the Spirit (Romans 14:17), and His future reign (Revelation 20:1–6; compare Zechariah 14:4–9 for Jerusalem). Do not misquote a rabbi to manufacture agreement.

## What is *not* finished

- There is **no imported rabbinic corpus in the current repository** to review in bulk. The external Sefaria library contains far more material than this site's repository.
- Neither of the two candidate excerpts has been checked in full against the Hebrew original in this audit; source-page titles alone are not proof of passage text.
- No full-text audit of the Talmud, Mishnah, Midrash, or all named commentators has been performed.
- No translation licensing, bilingual proofreading, individual founder approval, or reader restoration has been completed.
- Public rabbinic commentary must stay disabled until the approved allowlist and source-faithful reader exist.
