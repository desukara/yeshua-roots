# Yeshua Roots brand system

## Symbol and wordmark

- Standalone icons and shortcuts: `/brand/favicon.svg` or `/brand/app-icon.svg` (olive tree only; no lettering).
- Website header and light backgrounds: `/brand/wordmark.svg`.
- Footer and dark backgrounds: `/brand/wordmark-dark.svg`.
- Large branded splash/social compositions: `/brand/splash-light.svg` and `/brand/splash-dark.svg`.
- Full rooted tree artwork: `/brand/olive-tree.svg`.

The lettering is hand-drawn angular **Latin alphabet** vector artwork, influenced by ancient inscriptions. It reads YESHUA ROOTS, not Hebrew script. Keep the source SVG vectors to avoid font availability problems.

## Colors

| Token | Hex | Use |
| --- | --- | --- |
| Deep olive | `#24311F` | Dark backgrounds |
| Olive | `#2E3D23` | Primary tree and text |
| Earth brown | `#7A5B32` | Trunk and supporting text |
| Cream | `#F5EEDD` | Light background |
| Light gold | `#E8D5A6` | Dark-background tree and text |
| Accent | `#B89B52` | Restrained separators |

## Usage rules

No Star of David in branded graphics. No gradients, glows, shadows, or transparent low-contrast overlays on the symbol. Icons must contain **no words**. Use full wordmark on site branding and splash screens. Verify SVGs at 16px, 32px, 180px, and 512px, and review English and Hebrew layouts before production merge.

## Release verification

Run `npm install`, `npm run lint`, and `npm run build`. Check the responsive header, footer, homepage, favicon, PWA icon, and preview assets. Some social platforms require PNG/JPEG preview files; the SVG splash art is a source master, not a guarantee of rich-preview compatibility.
