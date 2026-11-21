# Yeshua Roots

**One Messiah. One Torah. One Family.**

A worldwide Messianic teaching ministry centered on Yeshua, the living Jewish Messiah of Israel, headquartered in Tokyo, Japan.

## Mission and editorial standard

**Yeshua is alive, present, aware, and active now.** He is the living Jewish Messiah of Israel. His Jewish identity, Messiahship, authority, and presence are enduring realities, never merely historical descriptions.

- Teach that Yeshua fulfills the Torah and the Prophets without abolishing them (Matthew 5:17–19).
- Read Yeshua and His earliest disciples within the Jewish setting of Israel's Scriptures.
- Teach the ministry's One-Israel Messianic conviction: everyone who belongs to Yeshua is Abraham's seed and an heir according to the promise (Galatians 3:26–29), a Jew inwardly through circumcision of the heart by the Spirit (Romans 2:28–29), grafted into the one cultivated olive tree (Romans 11:16–24), and no longer a stranger or foreigner to Israel's commonwealth (Ephesians 2:11–19). Present these as the ministry's interpretation, with the passages read in context.
- Explicitly reject separate redeemed covenant identities called “Gentiles,” “Gentile believers,” “Messianic Gentiles,” “righteous Gentiles,” “Noahides,” “Noahide believers,” “God-fearing Gentiles,” “Christian Gentiles,” “Gentile Christians,” “spiritual Gentiles,” or a separate “Gentile church” / “new spiritual family.” These names may be mentioned when directly identifying and rejecting the doctrine, but must never be presented as legitimate parallel redeemed identities. National origin and ancestry can be discussed as historical facts; they do not define a second covenant people in Yeshua.
- Explicitly reject the claim that Yeshua commissioned anyone to found a new religion, replace Judaism with Christianity, split Israel into Jewish and Gentile spiritual families, or multiply independent denominational brands as separate covenant bodies. Yeshua is the Jewish Messiah who fulfills Israel's Scriptures and the promises to David (Matthew 5:17–20; Luke 1:32–33; Acts 2:29–36), not the founder of a religion severed from Israel. Explain that the later historical proliferation of Christian denominations is not a command from Yeshua. Do not confuse the historical development of Christianity with what the ministry teaches Yeshua commanded.
- Teach one Messiah, one covenant household, one olive tree, one body, and one inheritance; avoid language suggesting parallel redeemed peoples or separate salvific paths (John 10:16; Romans 11; Ephesians 2; Galatians 3).
- Teach that we are justified through the blood of Yeshua, the worthy Lamb of God, and saved by grace through faith—not through the Law of Moses or keeping mitzvot (Ephesians 2:8–10; Romans 3:20–24).
- Teach that the indwelling Spirit leads believers to love and walk in God's Torah from the heart, never to earn salvation and never as permission for lawlessness (Matthew 5:17–19; Romans 3:31; Jeremiah 31:33). Do not claim that Yeshua Roots follows kashrut or require dietary observance; respect individual conscience.
- Past tense may describe particular events of His earthly ministry, **never** imply that Yeshua is absent, dead, or no longer Jewish.
- Distinguish the ministry's theological convictions from historically contested interpretations; source historical claims carefully.
- Keep the motto: **One Messiah. One Torah. One Family.**
- Apply these principles to English, Hebrew, metadata, navigation, studies, and all future content.
- New doctrinal statements require editorial review; introductory articles are not automatically approved teaching.

## Languages

**English (US)** and **modern Israeli Hebrew** are the only supported languages. Every site page has a header and footer language toggle. Language selection persists in the browser. Hebrew uses right-to-left page direction and translated navigation, homepage, section content, and starter study articles. No Japanese language UI is planned at this stage.

The language provider is in `components/language-provider.tsx`, the switcher in `components/language-switcher.tsx`, UI copy in `lib/translations.ts`, and study translations in `lib/study-translations.ts`.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

`npm run check` runs the type check, repository smoke tests, and production build together. The legacy `lint` command currently aliases TypeScript checking; a dedicated ESLint setup is a follow-up task. CI runs these checks on pull requests and pushes to `main` using Node.js 22. Because no lockfile is committed yet, CI uses `npm install`; adding a committed lockfile and switching to `npm ci` is recommended for reproducible builds.

Visit http://localhost:3000.

## Content review

The seven introductory study articles and their Hebrew translations are editorial starter material for review, not automatically approved ministry teaching. The Statement of Faith is still under founder review and intentionally unpublished. News, congregation directory, and contact inbox are planned, not live. Do not present placeholders as operational services.

## Launch checklist

- Confirm automated build and type checks
- Review translations with fluent modern Hebrew speakers, especially theological terminology
- Add editorial publishing workflow and verified directory
- Deploy a Vercel preview and check RTL on real devices
- Connect yeshuaroots.com only after preview approval
