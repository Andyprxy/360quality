# 360 Quality Solutions — Website

A responsive, GitHub-ready brochure website for **360 Quality Solutions**, a quality and SHEQ consulting agency based in **Hatfield, Pretoria**.

## Included

- `index.html` — public homepage with service pages in an accessible tabbed explorer, consulting approach, standards, statistical-analysis example, FAQ, and enquiry form.
- `assets/css/styles.css` — bespoke light/glass design, mobile responsiveness, reduced-motion support.
- `assets/js/main.js` — mobile menu, service tabs, gentle reveals, FAQ behavior, enquiry handoff, toast notifications.
- `assets/js/config.js` — contact email configuration for the email-client enquiry handoff.
- `assets/images/` — branded logo assets, optimized original hero artwork, secondary photo crop, favicons.
- `admin/index.html` — working **business workspace** with invoice and quotation studios, a live A4 preview, PDF export, saved drafts and editable business settings.
- `assets/css/admin.css` — responsive admin styling.
- `assets/js/admin.js` — document editing, totals, local draft storage and client email handoff.
- `assets/js/admin-pdf.js` — fully local printable, selectable-text A4 PDF generator with embedded business logo.
- `admin/README.md` — full admin usage, security and deployment guidance.

## Local preview

Open `index.html` in a modern browser, or run a local static server from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Publish on GitHub Pages

1. Upload the *contents* of this folder into the GitHub repository root. Keep `index.html` at the root.
2. Commit the files.
3. Under repository **Settings → Pages**, choose the branch and `/ (root)` folder, then save.
4. Check the site on desktop and mobile. The top-right lock icon points to `./admin/index.html`, so it works on both project-subpath and domain-root GitHub Pages deployments. This link now opens the built-in admin workspace.

## IMPORTANT: Contact form configuration

The website uses the company email provided in the brief and does **not** claim that an enquiry was delivered without a backend.

- The contact email is configured as **shibeRR@gmail.com**. The enquiry form opens the visitor's own email application with a prepared message; the visitor must press **Send** there.
- No form data is transmitted or stored by the static website itself.
- To send submissions directly from the website without opening an email client, connect a secure form endpoint (e.g. your own backend or appropriately secured workflow) and update the `main.js` submit handler. Add server-side validation, spam protection and a privacy notice suited to the actual processing.
- Published business details: Ditsela Place, Jan Shoba Street, Hatfield, Pretoria, 0028; +27 76 286 939; Monday–Saturday 09:00–18:00; Sundays closed. **Confirm the telephone number before launch**: the supplied international-format number appears shorter than a typical South African mobile number and has been reproduced exactly as given.

## Important: Admin security

GitHub Pages is a **public static host**. The built-in invoice and quotation editor is **not** a secure admin application or password gate. Drafts are stored only in each browser, not remotely; do not assume browser storage provides account-level security or data backup. Anyone can visit this URL, create their own local documents and download PDFs. Do not store private documents, passwords, API keys, banking secrets or credentials inside the GitHub repository. For production operations, connect secure user authentication, role permissions, server-side unique numbering, and protected document storage. See `admin/README.md`.

## Before public launch

- Confirm the telephone number with the business before public launch (displayed exactly as supplied).
- Confirm the agency's exact ISO standards scope and any credentials/accreditations before making claims.
- Review the privacy language and business particulars with the company.
- Connect a secure backend if web-based lead capture is required.
- Add a real custom domain and update canonical/OG metadata if desired.

## Assets

The hero and supporting visual are **original AI-generated artwork** produced for this website, not photos of the company's employees or actual audit engagements. The brand mark is adapted from the logo provided by the client. Do not use the sample chart as if it represents actual business results; it is labeled illustrative.

## Technical notes

- No JavaScript UI framework or build step is required.
- All images are local so they deploy with the repository.
- Fonts use Google Fonts with native system fallbacks; site remains usable without Google Fonts.
- Keyboard navigation, focus styles and reduced-motion preferences are supported.

## November 2026 visual / local search refinements

- **Hero revised:** On laptop and desktop, all visible heading, summary, buttons and support tags fit entirely in a LEFT text column. The right-hand quality inspection photograph stays free of text and decorative overlays. On phones, the copy sits against a dark lower-image gradient for readability.
- Removed the entire **“THE 360° PERSPECTIVE / Systems. Evidence. Improvement.”** callout and the image-side scroll text.
- Added a clear Hatfield / Pretoria consultancy introduction without repetitive keyword stuffing.
- Added four separate, detailed public service pages with distinctive page titles, descriptions, headings, audit/implementation deliverables, frequently asked questions, and internal links:
  - `services/iso-implementation-pretoria.html`
  - `services/iso-gap-analysis-pretoria.html`
  - `services/sheq-internal-audits-pretoria.html`
  - `services/statistical-analysis-pretoria.html`
- Added `assets/css/services.css` and a scalable `assets/images/favicon.svg`; original PNG favicons remain as fallbacks.
- The homepage and service pages contain location-aware SEO metadata; the homepage includes accurate Schema.org ProfessionalService data for the supplied location, services and operating hours. Each service page includes Service structured data.
- Internal links from service descriptions and footer go to the dedicated pages. **The admin invoice/quotation workspace is unchanged.**

### Important — finish SEO after you know the website URL

A canonical URL and XML sitemap require a REAL public address. Since the final website domain was not provided, no made-up domain has been inserted. The supplied helper can generate these correctly once you know the actual deployed URL:

```bash
python tools/finalize_seo.py --site-url https://YOUR_ACTUAL_DOMAIN.co.za/
```

For GitHub Pages project repositories, include the repo portion of the URL instead:

```bash
python tools/finalize_seo.py --site-url https://YOUR_ACCOUNT.github.io/YOUR_REPOSITORY/
```

Replace these illustrative capitalized tokens with **your genuine address** before running. The script rejects sample domains and writes canonical and social URLs, `sitemap.xml`, and a production `robots.txt`. It is safe to run again if you change domains. Commit the resulting files and confirm the URL works before asking Google to crawl them.

Recommended launch actions: connect the site to your verified Google Business Profile, use identical business name/address/hours there, verify ownership in Google Search Console, submit the produced `sitemap.xml`, and publish helpful original business information. Real rankings depend on relevance, competition, reputation and indexing; code cannot guarantee a first-page ranking. Do not add unverified certifications, awards, fabricated reviews or duplicate local doorway pages.

The number supplied as `+27 76 286 939` has been preserved verbatim, even though it looks shorter than a standard South African mobile number. Confirm it before publishing.
