# Design and implementation research notes

The portfolio is intentionally static and dependency-free so it can be deployed to GitHub Pages or Netlify without a build pipeline.

## Accessibility decisions

- Visible keyboard focus indicators.
- Skip link and semantic landmark elements.
- Pointer controls sized at or above 42 CSS pixels in the primary navigation.
- Keyboard-accessible command palette.
- Motion is removed when the operating system reports `prefers-reduced-motion: reduce`.
- Colour is not the only indicator of state; labels and structure are retained.

References:

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 additions: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Accessible motion: https://web.dev/learn/accessibility/motion

## Performance decisions

- No JavaScript framework or runtime dependency.
- No third-party font download; the site uses a system-font stack.
- SVG project illustrations are local and scalable.
- Images specify intrinsic dimensions to reduce layout movement.
- JavaScript is deferred and progressively enhances the site.

References:

- Web performance: https://web.dev/performance/
- Font best practices: https://web.dev/articles/font-best-practices

## Search and sharing decisions

- Every page has a unique title, description and canonical URL.
- The home page includes `ProfilePage` and `Person` JSON-LD.
- The project includes a sitemap, robots file, favicon, manifest and Open Graph image.
- The public social profiles are connected through `sameAs` in structured data.

References:

- Profile page structured data: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Search appearance: https://developers.google.com/search/docs/appearance

## Deployment decisions

The included GitHub Actions workflow uses the official Pages actions to upload and deploy the complete static directory. A Netlify configuration is also included for no-build deployment.

Reference:

- GitHub Pages custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
