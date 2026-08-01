# Ranjith Vutnoor — Portfolio Website

A calm, responsive and dependency-free personal portfolio for an AI / Machine Learning Software Engineer.

## Included

- Production RAG and semantic-search case study
- LLM evaluation / EvalStudio case study
- IIT Bhilai thesis case study covering MSCRED, ConvLSTM, CUDA, im2col, GEMM and a custom PyTorch extension
- NVIDIA Nemotron reasoning challenge case study
- Experience, skills, writing plan and contact sections
- Light and dark themes
- Keyboard-accessible command palette (`Ctrl/⌘ + K`)
- Project filtering, reduced-motion support and responsive navigation
- SEO metadata, `ProfilePage` structured data, sitemap, robots file and social preview card
- GitHub Pages workflow and Netlify configuration

## Preview locally

No package installation is required.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy with GitHub Pages

1. Create a public repository named `portfolio`.
2. Upload every file and folder from this project.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push to `main` or `master`. The included workflow deploys the static site.

Expected URL:

```text
https://ranjithvutnoor.github.io/portfolio/
```

## Deploy with Netlify

Drag the complete folder into Netlify Drop, or connect the repository. No build command is required; the publish directory is `.`.

## Important edits before publishing

The site is already populated with public professional details and known profile links. Review these points:

- Confirm the current résumé in `assets/docs/Ranjith_Vutnoor_Resume.pdf`.
- Confirm the Kaggle score wording and add a leaderboard screenshot only when you are comfortable publishing it.
- Keep employer/client documents, private prompts, proprietary source code and industrial data out of the public repository.
- When a custom domain is added, replace `https://ranjithvutnoor.github.io/portfolio/` in:
  - canonical links inside HTML files
  - Open Graph image URLs
  - `robots.txt`
  - `sitemap.xml`
  - JSON-LD in `index.html`
- Replace the social card if you later add a professional portrait.

## Content strategy

Use this website as the canonical source for articles. Cross-post the same article to DEV Community with the portfolio URL set as the canonical URL, then share a short summary on LinkedIn.

## Design principles

- Calm, low-saturation colour palette
- System fonts for speed and privacy
- Visible keyboard focus states
- Pointer targets designed to meet modern accessibility guidance
- Motion disabled when `prefers-reduced-motion` is enabled
- Static HTML for fast loading and simple hosting

## Licence

Website code may be adapted for your own profile. Written case-study content and personal information remain © Ranjith Vutnoor.
