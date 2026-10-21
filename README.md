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
- `dist/assets/`: original SVG landscape and brand mark.
- `.openai/hosting.json`: private Sites hosting identity and static directory.

## Content and contact

The copy uses non-graphic mature fantasy language. Existing systems and planned features are distinguished; no release date or finished game is implied. The artwork is labeled as illustration, not gameplay.

The collaboration form prepares a local text-file download. It does **not** transmit or store submissions. Add your real contact, community, and support links when available. No invented social links, payment links, signup backend, or email addresses are included.

## Accessibility

Semantic landmarks, skip link, native form validation, keyboard-operated tabs, visible focus indicators, reduced-motion support, native FAQ disclosures, and a modal dialog with native focus containment and Escape dismissal.
