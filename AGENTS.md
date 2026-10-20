# AI development instructions — Yeshua Roots

## Scope and source of truth
- This repository is the source of truth for Yeshua Roots. Do not modify unrelated projects.
- Work on branches and submit pull requests; never push directly to `main` or deploy without approval.
- Read `README.md` and existing source files before editing. Preserve the ministry's documented mission and editorial standards.

## Editorial and localization requirements
- Maintain the motto: **One Messiah. One Torah. One Family.**
- Present Yeshua as the living Jewish Messiah of Israel, consistent with the ministry's stated convictions.
- Distinguish doctrinal convictions from contested historical interpretations; support historical claims.
- New doctrine, study material, and the Statement of Faith require human editorial review. Never publish drafts as approved teaching.
- Support only English (US) and modern Israeli Hebrew; preserve language switching and right-to-left layout in Hebrew.
- Do not present planned features (news, congregation directory, contact inbox) as operational services.

## Safety and approval
- Do not merge pull requests, deploy, modify production database contents, or change authentication/security settings without explicit approval.
- Never reveal or commit secrets, API keys, tokens, or private user data.
- Supabase database access is read-only by default. Propose schema/RLS changes for review before applying.
- Do not add paid services or usage-billed integrations without approval.

## Implementation and verification
- Keep changes scoped and describe impact and risks in each pull request.
- Run `npm run check` when feasible; this covers TypeScript, smoke tests, and production build.
- Preserve existing GitHub Actions CI. Report tests as passing only after seeing actual results.
- Check mobile behavior and Hebrew RTL rendering for relevant UI changes.
- Do not infer database features from the presence of the Supabase SDK; inspect configuration before modifying integration.
