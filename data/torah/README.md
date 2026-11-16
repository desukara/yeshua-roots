# Torah word-study data provenance

This feature includes five locally bundled Torah books (Genesis, Exodus, Leviticus, Numbers and Deuteronomy) with 187 chapters.

## Hebrew text, lemmas, and morphology
- Source: Open Scriptures Hebrew Bible (OSHB), Westminster Leningrad Codex (WLC).
- Original project: https://github.com/openscriptures/morphhb
- WLC Hebrew text: public domain.
- OSHB lemma and morphology annotations: Creative Commons Attribution 4.0 (CC BY 4.0). Credit: **Open Scriptures Hebrew Bible Project**.
- Local files: `data/torah/{genesis,exodus,leviticus,numbers,deuteronomy}.json`.
- Each word record stores `[hebrew, lemma, morph]`. Hebrew text retains niqqud and cantillation. Editorial word segmentation is retained as a single lexical word; a slash in the source is removed from the displayed Hebrew text.

## Hebrew dictionary
- Source: Open Scriptures' digitization of James Strong, *A Concise Dictionary of the Words in the Hebrew Bible* (1894).
- Project: https://github.com/openscriptures/strongs
- Source file: `hebrew/strongs-hebrew-dictionary.js`.
- The upstream digital edition identifies itself as **CC-BY-SA**; preserve that attribution and applicable share-alike obligations when distributing adaptations.
- Local file: `data/torah/strongs-hebrew.json`.
- Each entry stores `[transliteration, KJV-oriented dictionary definition, pronunciation]`.

## Important accuracy limitations
- A Strong's definition is a **dictionary entry**, not a verified contextual translation of the individual word in a particular verse.
- Dictionary transliteration and pronunciation describe the **lexical entry**; prefixes, suffixes, inflection and pointing can make the pronounced surface form different.
- Lemmas with prefixes are resolved from the final numeric lemma component; nonnumeric or missing lemmas remain unglossed.
- The Bible reader separately fetches KJV verse text; verse-level correspondence is not a validated word-for-word alignment.
- The word counts refer to OSHB lexical word records, not a count of whitespace-separated surface tokens. This explains differences from earlier word-count estimates.

Do not remove source credits, claim contextual word-level translation, or deploy without running the complete test and production-build checks.
