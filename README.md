# Yeshua Roots

**One Messiah. One Torah. One Family.**

A worldwide Messianic teaching ministry centered on Yeshua, the living Jewish Messiah of Israel, headquartered in Tokyo, Japan.

## Mission and editorial standard

**Yeshua is alive, present, aware, and active now.** He is the living Jewish Messiah of Israel. His Jewish identity, Messiahship, authority, and presence are enduring realities, never merely historical descriptions.

- Teach that Yeshua fulfills the Torah and the Prophets without abolishing them (Matthew 5:17–19).
- Read Yeshua and His earliest disciples within the Jewish setting of Israel's Scriptures.
- Explain that Gentile believers are grafted into Israel's olive tree; they do not replace Israel (Romans 11:17–24).
- Past tense may describe particular events of His earthly ministry, **never** imply that Yeshua is absent, dead, or no longer Jewish.
- Distinguish the ministry's theological convictions from historically contested interpretations; source historical claims carefully.
- Keep the motto: **One Messiah. One Torah. One Family.**
- Apply these principles to English, Hebrew, metadata, navigation, studies, and all future content.
- New doctrinal statements require editorial review; introductory articles are not automatically approved teaching.

## Languages

**English (US)** and **modern Israeli Hebrew** are the only supported languages. Every site page has a header and footer language toggle. Language selection persists in the browser. Hebrew uses right-to-left page direction and translated navigation, homepage, section content, study library, and full starter articles. No Japanese language UI is planned at this stage.

The language provider is in `components/language-provider.tsx`, the switcher in `components/language-switcher.tsx`, UI copy in `lib/translations.ts`, and study translations in `lib/study-translations.ts`.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

`npm run check` runs the type check, repository smoke tests, and production build together. The legacy `lint` command currently aliases TypeScript checking; a dedicated ESLint setup is a follow-up task. CI runs these checks on pull requests and pushes to `main` using Node.js 22. Because no lockfile is committed yet, CI uses `npm install`; adding a committed lockfile and switching to `npm ci` is recommended for reproducible builds.\n\nVisit http://localhost:3000.

## Content review

The initial four study articles and their Hebrew translations are editorial starter material for review, not automatically approved ministry teaching. The Statement of Faith is still under founder review and intentionally unpublished. News, congregation directory, and contact inbox are planned, not live. Do not present placeholders as operational services.

## Launch checklist

- Confirm automated build and type checks
- Review translations with fluent modern Hebrew speakers, especially theological terminology
- Add editorial publishing workflow and verified directory
- Deploy a Vercel preview and check RTL on real devices
- Connect yeshuaroots.com only after preview approval
