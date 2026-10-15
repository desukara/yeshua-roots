# Yeshua Roots

**One Messiah. One Torah. One Family.**

A welcoming worldwide Messianic house of Torah learning, headquartered in Tokyo, Japan.

## Languages

**English (US)** and **modern Israeli Hebrew** are the only supported languages. Every site page has a header and footer language toggle. Language selection persists in the browser. Hebrew uses right-to-left page direction and translated navigation, homepage, section content, study library, and full starter articles. No Japanese language UI is planned at this stage.

The language provider is in `components/language-provider.tsx`, the switcher in `components/language-switcher.tsx`, UI copy in `lib/translations.ts`, and study translations in `lib/study-translations.ts`.

## Development

```bash
npm install
npm run lint
npm run build
npm run dev
```

Visit http://localhost:3000.

## Content review

The initial four study articles and their Hebrew translations are editorial starter material for review, not automatically approved ministry teaching. The Statement of Faith is still under founder review and intentionally unpublished. News, congregation directory, and contact inbox are planned, not live. Do not present placeholders as operational services.

## Launch checklist

- Confirm automated build and type checks
- Review translations with fluent modern Hebrew speakers, especially theological terminology
- Add editorial publishing workflow and verified directory
- Deploy a Vercel preview and check RTL on real devices
- Connect yeshuaroots.com only after preview approval
