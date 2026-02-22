# sunilkumardhayal.github.io

Personal website and portfolio for Sunil Kumar.

## How automatic updates work

This repository uses **GitHub Actions** to automatically:

1. Validate HTML whenever code is pushed or a pull request is opened.
2. Deploy the latest site to GitHub Pages on every push to `main`.

Workflow file: `.github/workflows/static.yml`

## Local preview

Run the site locally with:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
