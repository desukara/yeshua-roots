# Yeshua Roots

**One Messiah. One Torah. One Family.**

A welcoming worldwide Messianic house of Torah learning, headquartered in Tokyo, Japan.

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
