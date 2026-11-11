# Yeshua Roots publishing gate

## Public content policy

A study in `lib/content.ts` is not public until the founder has explicitly approved its final wording. The `editorialStatus` field defaults to `draft`. The shared `publishedStudies` collection includes only `founder-approved` entries and must be used by all public study routes, navigation, and sitemap generation.

**Changing a status is a publishing action.** Do not change `draft` to `founder-approved` without a recorded founder approval for the exact revision. Do not merge an approval change merely because tests pass.

## Release checklist

1. Preserve the draft and review primary Scripture references, historical sources, Hebrew text, translations, and visitor-facing links.
2. Obtain founder approval of the exact text and its intended public location.
3. Update the status only after approval, in a dedicated pull request that references the approval.
4. Check English/Hebrew content, mobile layout, keyboard navigation, sitemap, canonical URL, and all outbound links in the preview.
5. Run typecheck, tests, and production build. Do not bypass failed checks.
6. Obtain explicit authorization to merge and deploy. Verify live URLs and rollback readiness.
7. Confirm the production deployment commit includes the intended change; check that the actual public domain serves it before reporting completion. A successful GitHub commit alone is not publication.
8. Keep unlaunched membership, contact, prayer submission, and giving services clearly marked unavailable; do not promote them as active actions.

## Sitewide external links

Visitors should remain on Yeshua Roots. Keep scholarly attributions in text and use internal readers where available. The safety test catches common literal external `href` patterns, but it is not a complete dynamic-link crawler; review rendered pages before release.

## Operational controls to configure in GitHub

Require pull requests and successful CI checks for `main`; restrict direct pushes and require founder review before merge. These repository settings cannot be enforced by a markdown policy alone.

## Auth configuration

Enable leaked-password protection in the Supabase dashboard for the Yeshua Roots project, then rerun security advisors. Do not modify production authentication settings without verifying sign-up, sign-in, and password reset.
