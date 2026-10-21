# Equestria After Dark

A responsive project website made with plain HTML, CSS, and JavaScript. No build step, runtime dependencies, or external asset requests.

## Preview locally

From this folder, run:

```powershell
python -m http.server 4173 --directory dist --bind 127.0.0.1
```

Visit http://127.0.0.1:4173. You can also open `dist/index.html` directly.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes `dist/` directly. No build or package installation is required. Relative asset paths support a GitHub Pages project URL.

1. Publish this repository to GitHub using GitHub Desktop.
2. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push a change to `dist/` on `main`, or run **Deploy to GitHub Pages** from the **Actions** tab.

After deployment, GitHub lists the live address under **Settings → Pages**. Future website commits pushed from GitHub Desktop deploy automatically.

## Files

- `dist/index.html`: page content, metadata, FAQ, collaboration dialog.
- `dist/styles.css`: responsive layout, colors, and typography.
- `dist/script.js`: navigation, accessible tabs, and collaboration brief download.
- `dist/assets/gallery/`: optimized WebP versions of the five supplied project images, with 840px responsive versions.
- `dist/assets/icon.svg`: editable project icon, with PNG exports at 32, 180, 192, 512, and 1024 pixels.
- `dist/favicon.ico`: multi-resolution browser/Windows icon (16–256px).
- `dist/assets/social-preview-v1.jpg`: 1200 × 630 sharing card.
- `dist/site.webmanifest`: home-screen icon metadata.
- `.openai/hosting.json`: private Sites hosting identity and static directory.

## Content and contact

The copy uses non-graphic mature fantasy language. Existing systems and planned features are distinguished; no release date or finished game is implied. Supplied project images establish the visual direction without claiming that they are captures of a finished game. The latest supplied tavern group image is used in “The seven”; the discarded generated mockups are not included.

## Icons and sharing previews

The PNG and ICO icons are already linked in the document head. Open Graph and Twitter card tags reference the public GitHub Pages URL, so previews can be fetched without a login. The former private Sites address is not suitable for social crawlers that cannot sign in.

For Telegram or another social app, share `https://lednek.github.io/equestria-after-dark/`. Apps can cache old previews; the `social-preview-v1.jpg` filename can be versioned when the artwork changes. Preview appearance and refresh timing are controlled by each app.

The development-only `tools/prepare-assets.cjs` uses `sharp` to resize the supplied images, render the SVG icon, and lay out the sharing card. Run it with the source images folder as its argument; `SHARP_MODULE` may point to a bundled installation. `tools/export-ico.py` uses Pillow to encode the PNG as an ICO. Neither tool is needed to serve or deploy the website.

The collaboration form prepares a local text-file download. It does **not** transmit or store submissions. Add your real contact, community, and support links when available. No invented social links, payment links, signup backend, or email addresses are included.

## Accessibility

Semantic landmarks, skip link, native form validation, keyboard-operated tabs and gallery controls, visible focus indicators, reduced-motion support, native FAQ disclosures, and native modal dialogs with focus containment and Escape dismissal. Gallery images remain regular image links without JavaScript.
