#!/usr/bin/env python3
"""Set production canonical URLs, Open Graph URLs and an absolute sitemap.
Run from any directory:
  python tools/finalize_seo.py --site-url https://your-domain.co.za/
or, on a project GitHub Pages site:
  python tools/finalize_seo.py --site-url https://account.github.io/repository/
No hosting URL is guessed or inserted until you supply the actual public URL.
"""
import argparse
from datetime import date
from html import escape
from pathlib import Path
import re
from urllib.parse import urlsplit, urljoin

ROOT = Path(__file__).resolve().parents[1]
PAGES = ['index.html','services/iso-implementation-pretoria.html',
         'services/iso-gap-analysis-pretoria.html','services/sheq-internal-audits-pretoria.html',
         'services/statistical-analysis-pretoria.html']

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--site-url', required=True, help='Public homepage URL including the correct project subpath, if any')
args = parser.parse_args()
base = args.site_url.strip().rstrip('/') + '/'
parsed = urlsplit(base)
if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password or parsed.query or parsed.fragment:
    parser.error('Use a full public HTTPS homepage URL, e.g. https://yourdomain.co.za/')
if any(x in parsed.netloc.lower() for x in ('example.com', 'your-domain', 'your_', 'localhost', 'placeholder')):
    parser.error('Supply the real production host, not a sample domain or localhost')

for relative in PAGES:
    page=ROOT/relative
    if not page.exists(): raise SystemExit(f'Missing file: {page}')
    source=page.read_text(encoding='utf8')
    url=urljoin(base, relative)
    # Remove prior generated URL tags, safe to rerun when domain changes.
    source=re.sub(r'\s*<link rel="canonical"[^>]*>','',source)
    source=re.sub(r'\s*<meta property="og:url"[^>]*>','',source)
    source=re.sub(r'\s*<meta name="twitter:image"[^>]*>','',source)
    image=urljoin(base,'assets/images/hero-quality-inspection.webp')
    source=re.sub(r'(<meta property="og:image" content=")[^"]*(">)',lambda m:m.group(1)+escape(image,quote=True)+m.group(2),source)
    insert=(f'  <link rel="canonical" href="{escape(url,quote=True)}">\n'
            f'  <meta property="og:url" content="{escape(url,quote=True)}">\n'
            f'  <meta name="twitter:image" content="{escape(image,quote=True)}">\n')
    source=source.replace('</head>',insert+'</head>',1)
    page.write_text(source,encoding='utf8')

sitemap='''<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'''
for relative in PAGES:
    sitemap+=f'  <url><loc>{escape(urljoin(base,relative),quote=False)}</loc><lastmod>{date.today().isoformat()}</lastmod></url>\n'
sitemap+='</urlset>\n'
(ROOT/'sitemap.xml').write_text(sitemap,encoding='utf8')
# Scope robots rules to the actual site path; admin excluded from search but remains publicly accessible.
path=parsed.path.rstrip('/')
(ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nDisallow: {path}/admin/\nSitemap: {urljoin(base,"sitemap.xml")}\n',encoding='utf8')
print(f'Updated {len(PAGES)} public pages, sitemap.xml and robots.txt for {base}')
print('Verify canonical URLs and sitemap.xml after deployment, then submit in Google Search Console.')
