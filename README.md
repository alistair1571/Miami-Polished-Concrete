# Miami Polished Concrete, www.YOURDOMAIN.com

Static site, pre-built and ready to publish as-is. Rank-and-rent lead generation site covering polished concrete, epoxy, microcement, terrazzo and resurfacing across Miami-Dade County.

## Deploying, GitHub to Cloudflare Workers

This repo deploys via Cloudflare Workers Builds (connected to this GitHub repo, using `wrangler deploy`), not GitHub Pages. A few things follow from that:

1. `wrangler.jsonc` is committed at the root with an explicit `assets` block. Without it, Wrangler falls back to auto-detected settings during a non-interactive build, which isn't reliable for a multi-page site. The key setting is `"html_handling": "auto-trailing-slash"`, which makes `/areas/homestead/index.html` serve at `/areas/homestead/`, matching every internal link, the sitemap and every canonical tag.
2. `.assetsignore` stops repo-only files (`wrangler.jsonc`, `README.md`, `CNAME`, `.nojekyll`, `.git`) being published as part of the website.
3. **The custom domain isn't set via the `CNAME` file.** That's a GitHub Pages mechanism and does nothing here. It's kept in case the site is ever pointed at GitHub Pages instead. For Cloudflare, add the domain from the Worker's dashboard page (**Workers & Pages -> miami-polished-concrete -> Settings -> Domains & Routes**), then point DNS at Cloudflare as usual.
4. `.nojekyll` is also a GitHub Pages-only file. Harmless here, does nothing.
5. `404.html` is a real custom 404 page (noindex), and `not_found_handling: "404-page"` in `wrangler.jsonc` tells Cloudflare to serve it.

## Structure

- Every page is a folder with its own `index.html` (e.g. `/garage-floors/index.html` serves at `/garage-floors/`).
- `style.css` and `script.js` are external files, shared and cached across every page.
- `images/` holds the logo assets. No job photography yet.
- `areas/` holds the Miami-Dade area pages (17 areas plus the hub at `/areas/`).
- `guides/` holds the cost guide and asbestos guide.
- `cost-calculator/` is a self-contained calculator. Its "Get a free written quote" button passes the estimate to `/contact/` as URL parameters, and `script.js` pre-fills the quote form with it.
- `projects/` is `noindex` until real, verified jobs are added.
- `sitemap.xml` and `robots.txt` reference `https://www.YOURDOMAIN.com`.

## Lead form

Forms post to Formspree at `https://formspree.io/f/YOURFORMID`. Replace `YOURFORMID` in every page with the real form ID. On a fresh Formspree form, the first real submission triggers a one-time confirmation email that needs clicking before submissions arrive. That's a Formspree account step, not a site issue.

## Before going fully live

- **Domain:** replace `YOURDOMAIN.com` everywhere (canonicals, Open Graph tags, schema, `sitemap.xml`, `robots.txt`, `CNAME`).
- **Phone:** `(305) 555-0142` / `tel:+13055550142` is a placeholder. Swap it for the real tracking number throughout.
- **Formspree:** replace `YOURFORMID` (see above).
- **Partner details:** `[Partner name]`, `[Company]`, `[Partner company]` and `[FL licence #]` placeholders appear in the reviewer box and footer lines on every page. Fill them in, or remove the reviewer boxes, before launch.
- **Spanish block:** the homepage `lang="es"` section has a TODO. Keep it only if the partner has Spanish-speaking staff.
- **Reviews and projects:** placeholder sections were removed (left as HTML `TODO` comments). Add real Google reviews and real before/after projects only once they exist.
- **Photos:** the site has no job photography yet. Add real photos with descriptive alt text as soon as possible.
- **Preview indexing:** while the site is on a `workers.dev` preview URL, set `robots.txt` to `Disallow: /`, then restore it at launch.
