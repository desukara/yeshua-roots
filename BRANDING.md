# Yeshua Roots brand system

## Symbol and wordmark

- Standalone icons and shortcuts: `/brand/favicon.svg` or `/brand/app-icon.svg` (olive tree only; no lettering).
- Website header and light backgrounds: `/brand/wordmark.svg`.
- Footer and dark backgrounds: `/brand/wordmark-dark.svg`.
- Large branded splash/social compositions: `/brand/splash-light.svg` and `/brand/splash-dark.svg`.
- Full rooted tree artwork: `/brand/olive-tree.svg`.

The required lettering reads **YESHUA ROOTS** in the **Latin/English alphabet**. Its visual inspiration is restrained ancient Hebrew inscriptional structure: clear proportions, stable strokes and quiet, squared terminals. **Never** use German Gothic, Fraktur, blackletter, rune-like cuts or actual Hebrew letters as a substitute for the English name. The current placeholder vectors are **not approved final artwork**; replace and visually review them before production.

## Colors

| Token | Hex | Use |
| --- | --- | --- |
| Deep olive | `#24311F` | Dark backgrounds |
| Olive | `#2E3D23` | Primary tree and text |
| Earth brown | `#7A5B32` | Trunk and supporting text |
| Cream | `#F5EEDD` | Light background |
| Light gold | `#E8D5A6` | Dark-background tree and text |
| Accent | `#B89B52` | Restrained separators |

## Mission line

**Rooted in Yeshua. Grafted together. One olive tree.**

This line is the guiding brand message, not lettering that belongs inside a tiny icon.

## Usage rules

No Star of David in branded graphics. No gradients, glows, shadows, or transparent low-contrast overlays on the symbol. Icons must contain **no words**. Use full wordmark on site branding and splash screens. Verify SVGs at 16px, 32px, 180px, and 512px, and review English and Hebrew layouts before production merge.

## Visual acceptance criteria

- Natural, mature Mediterranean olive tree, not a geometric or stick-figure tree; visible organic trunk and exposed roots.
- Full logo legible in both light header and dark footer, including narrow mobile widths and Hebrew RTL navigation.
- Splash screens may include the Latin wordmark; browser favicons, mobile shortcuts, app icons and other tiny emblems must show the tree **without any writing**.
- Verify at 16, 32, 48, 180 and 512 pixels; inspect actual rasterized output, not just SVG source.
- No Germanic blackletter letterforms, religious ornaments, glow, gradients, or shadows in the brand assets.
- A passing CI run is necessary but does **not** mean the artwork is visually approved.
- Publish a fresh preview from the latest commit, verify that exact deployment, and keep production unchanged until review.

## Release verification

Run `npm install`, `npm run lint`, and `npm run build`. Check the responsive header, footer, homepage, favicon, PWA icon, and preview assets. Some social platforms require PNG/JPEG preview files; the SVG splash art is a source master, not a guarantee of rich-preview compatibility.
