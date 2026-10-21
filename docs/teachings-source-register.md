# Teachings: source register and editorial gates

**Status:** internal research notes; not approved public ministry copy. No third-party commentary imported.

## Source candidates

| Work | Historical author | Passage relevance | Digital edition | Reuse position | Editorial caution |
|---|---|---|---|---|---|
| *A Commentary on the New Testament from the Talmud and Hebraica* | John Lightfoot (1602–1675) | Gospel commentary, including Matthew 5 | https://www.ccel.org/ccel/lightfoot/talmud.html ; https://www.stepbible.org/version.jsp?version=Lightfoot | Historical underlying text is public domain by age in many jurisdictions. Check transcription/module terms and provenance before copying a digital edition. | Seventeenth-century Christian writer; rabbinic texts are often later than Yeshua; not direct evidence of first-century beliefs. |
| *The Life and Times of Jesus the Messiah* | Alfred Edersheim (1825–1889) | Gospel historical context, index of passages | https://www.lutheranlibrary.org/132-edersheim-jesus-the-messiah-complete/ | Lutheran Library lists its 2023 edition as CC BY 4.0; attribute author, edition, source, license, and changes if used. | Nineteenth-century reconstruction, with assumptions requiring modern corroboration. |
| *Jewish New Testament Commentary* | David H. Stern | Contemporary Messianic interpretation | Publisher edition; no licensed API verified | Copyrighted. Research reference only unless written redistribution permission is secured. | Distinguish Stern's interpretations from Scripture and founder-approved Yeshua Roots interpretation. |
| *The Jewish Annotated New Testament* | Edited by Amy-Jill Levine and Marc Zvi Brettler | Jewish scholarly perspectives | Publisher edition; no licensed API verified | Copyrighted. Research reference only unless permission secured. | Multiple contributors and interpretations, not a single consensus. |

## Editorial requirements for every published teaching

1. Quote the **complete relevant KJV passage** where a passage is featured, not a detached proof text. Check text against a reliable KJV edition.
2. Identify Tanakh quotation versus plausible echo versus thematic parallel. Include original-language excerpts only after checking spelling, niqqud, and context.
3. Date Jewish sources; **Mishnah/Talmud and medieval commentators are not automatically first-century witnesses**.
4. Quote or reproduce third-party commentary only where legally permitted and edition provenance is documented. Cite original author, work, chapter/section, edition, and source.
5. Label historical source statements, scholarly inferences, and Messianic interpretations separately.
6. Avoid generalizations that all Christians misread a verse or that Jewish traditions are uniform.
7. Never imply Mark 7 or Acts 10 abolishes kosher observance; Acts 10:28 addresses people.
8. Founder must approve final public copy and design before merge or production release.

## Matthew 5 pilot

**Pilot unit:** Matthew 5:1–12, the Beatitudes as one coherent passage.

**First deep-dive:** Matthew 5:5 and Psalm 37:11, ideally Psalm 37:1–11 in context.

**Verification questions:**
- How does Matthew's Greek *praeis* relate to Psalm 37's Hebrew *anavim* and the Septuagint?
- How should *eretz* / *gē* be interpreted in the immediate contexts: land, earth, or a deliberately wider promise?
- Does Lightfoot comment directly on Matthew 5:5? Locate the exact passage before claiming he does.
- What does Edersheim say about the Sermon on the Mount and its audience? Record page/section before excerpting.
- What counter-readings are represented by current Jewish and NT scholarship?

**No automatic AI-generated final commentary:** all source notes require human editorial review.

## Technical plan

- Import licensed/public-domain commentary into versioned **local** structured text, not runtime third-party calls.
- Schema: `workId`, `editionId`, `license`, `attribution`, `book`, `chapter`, `verseStart`, `verseEnd`, `section`, `text`, `reviewed`.
- Link by passage range, not brittle string matching; mark uncertain associations for review.
- Keep source texts separate from original Yeshua Roots commentary; avoid duplicate Sefaria integrations.
- For the prototype, only show source metadata and editorially verified excerpts. No fabricated quotations.
