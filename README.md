# 360 Quality Solutions · production website & admin · November 2026

This is a complete GitHub Pages compatible **static** website. The root `index.html`, `/admin/index.html` and each `/services/NAME/index.html` are retained on disk but **not exposed in links**. Visit `https://360qualitysolution.co.za/admin/` or `https://360qualitysolution.co.za/services/iso-gap-analysis-pretoria/` to see clean URLs.

## Deploy all files
1. Extract the ZIP and open the inner `360-quality-solutions-premium` folder (or upload its contents to the root of your GitHub Pages repository).
2. Commit **all** its contents (including `CNAME`, `.nojekyll`, `sitemap.xml`, `robots.txt`, `site.webmanifest`, images, assets, services and admin).
3. In GitHub Pages, ensure your custom domain is set to **360qualitysolution.co.za**, with correct DNS and HTTPS. `CNAME` is included for GitHub Pages publishing.
4. Test the homepage, `/admin/`, and all four `/services/.../` URLs after deployment.
5. In Google Search Console, verify the domain, submit `https://360qualitysolution.co.za/sitemap.xml`, and use URL Inspection on the homepage and four service pages. Align Google Business Profile contact information with the website.

## New clean service URLs
- /services/iso-implementation-pretoria/
- /services/iso-gap-analysis-pretoria/
- /services/sheq-internal-audits-pretoria/
- /services/statistical-analysis-pretoria/
- /admin/  (local document editor; **not authenticated**)

## Existing indexed URLs & SEO
Older `.html` URLs are included as small automatic HTML/JavaScript **client-side redirect** pages to minimise broken links. However, **GitHub Pages cannot issue server-side 301/308 redirects** through static HTML; if your domain has a proxy or an HTTP rules provider such as Cloudflare, configure 301 redirects from the four legacy `.html` pages to their clean paths. Google prefers server-side redirects for moves. Preferred clean URLs are supplied through canonical tags and sitemap.

https://360qualitysolution.co.za/services/iso-implementation-pretoria.html  →  https://360qualitysolution.co.za/services/iso-implementation-pretoria/
https://360qualitysolution.co.za/services/iso-gap-analysis-pretoria.html  →  https://360qualitysolution.co.za/services/iso-gap-analysis-pretoria/
https://360qualitysolution.co.za/services/sheq-internal-audits-pretoria.html  →  https://360qualitysolution.co.za/services/sheq-internal-audits-pretoria/
https://360qualitysolution.co.za/services/statistical-analysis-pretoria.html  →  https://360qualitysolution.co.za/services/statistical-analysis-pretoria/

## Images & graphic assets
- `assets/images/hero-quality-inspection.webp` — homepage hero.
- `assets/images/iso-implementation-pretoria.webp` — ISO planning workshop.
- `assets/images/iso-gap-analysis-pretoria.webp` — evidence / readiness review.
- `assets/images/sheq-internal-audits-pretoria.webp` — safety and quality site audit.
- `assets/images/statistical-analysis-pretoria.webp` — analytics / control chart investigation.
- Matching `*-diagram.svg` files show unique editorial diagrams for each service. Diagrams are illustrative, not client records.
- `assets/images/favicon.svg`, PNG favicon and company brand graphics are retained.

## Organic search essentials
- Unique meta titles and descriptions; helpful geographic service content; one H1 per page.
- Absolute canonical and OG URLs, dedicated OG image per service, XML image sitemap, robots.txt, favicon and web manifest.
- Consistent Business and Service JSON-LD, internal links, breadcrumbs, accessible images and mobile layout.
- No ranking or search indexing is guaranteed; improve the verified Google Business Profile, earn credible local references, and publish real case studies/testimonials only with permission.
- `sitemap.xml` lists only public canonical pages. No admin URLs included.

## Important admin security warning
`/admin/` is a static, public, browser-local invoice / quotation tool. It has **no authentication and no secure shared database**. The lock icon is navigation, not access control. `noindex` discourages indexing but **does not secure the page**. Do not store confidential client documents or banking information there unless you add real authentication and private storage.

## Business details provided
360 Quality Solutions — Ditsela Place, Jan Shoba Street, Hatfield, Pretoria, 0028. Contact: shibeRR@gmail.com; +27 76 286 939 (please verify full phone digits before going live); Mon–Sat 09:00–18:00, closed Sunday.
