# Yeshua Roots — Editorial and Founder Review

Official motto: **Rooted in Yeshua. Growing in Faith.**

## Authority and publication

The founder retains final approval over official doctrine, the Statement of Faith, and any study described as approved ministry teaching. A successful build, a merged pull request, or publication of a draft for discussion does **not** constitute theological approval.

## Review states

- `draft`: Working or introductory material; may be visible as an explicitly labeled study, but must never be described as approved doctrine.
- `founder-approved`: The founder has explicitly approved the exact reviewed text and its English/Hebrew presentation. Store the approval reference in the associated pull request before changing this status.

All four initial studies in `lib/content.ts` remain `draft`. No approval is implied by the introduction of this workflow.

## Required review before approval

1. Record the study slug, the English and Hebrew text being reviewed, and its cited Scripture passages.
2. Verify Scripture citations and distinguish biblical text, interpretation, historical context, and editorial opinion.
3. Check alignment with Yeshua as the living Jewish Messiah, fulfillment rather than abolition of Torah and Prophets (Matthew 5:17–19), and the olive tree without replacement theology (Romans 11:17–24).
4. Verify Hebrew wording, RTL display, and equivalent meaning across languages.
5. Obtain explicit founder approval for the exact revision; reference that approval in the change record. If approval is absent, keep `draft`.
6. If an approved study changes substantively, return it to `draft` until the revised text is approved.

## Statement of Faith

The Statement of Faith is **not approved or published**. Draft it separately from the public ministry overview. Do not label a page or article as the official Statement of Faith until the founder approves its exact contents.

## Technical safeguards

The `editorialStatus` property on each study records its status. Public presentation must visibly identify draft materials. Do not infer founder approval from GitHub CI, merge status, or an automated test. Review remains a human decision.
