# 360 Quality Solutions — Business Workspace

Open `admin/index.html` from the website's **top-right lock icon**.

## What works

- **Overview:** saved-document count and combined nominal values of saved invoices and quotations.
- **Invoice studio:** A4 live preview, editable customer and project details, issue/due dates, sequential suggested document number, multiple service lines, quantities and unit prices, optional discount and VAT, terms, payment information, business logo, PDF download, browser print, and prepared client email.
- **Quotation studio:** matching branded A4 stationery with validity date, quoted value, scope, terms, and client acceptance space.
- **Saved documents:** manually save, reopen, duplicate, filter and delete documents in *this browser*.
- **Business settings:** update business name, email, phone, address, VAT registration number and optional bank details.
- **Responsive:** works on desktop, tablet and phone, with adjustable document preview zoom.

PDF files use a self-contained PDF generator in `assets/js/admin-pdf.js`. They are real, selectable-text **A4 PDFs**, include the supplied company logo, and automatically paginate additional service items and extensive notes. Export does not need a network connection, server or third-party script.

## Important behavior

- **Save document** stores records in browser `localStorage` at the website's origin. It does not upload records, sync across devices, create an account, send an invoice or backup data. Clearing site data may delete those drafts.
- **Download PDF** creates a PDF directly in the browser. Download a copy for your own records.
- **Print** opens the browser print dialog; choose an A4 printer or **Save as PDF**. For documents with many items, use **Download PDF** for explicit multi-page formatting.
- **Prepare client email** opens the device's default email application with subject/body. **Attach the downloaded PDF manually**; this workspace does not send messages or attach files automatically.
- New document numbers are suggested from the documents saved in *that browser*; they are **not globally unique** across staff or devices. Verify numbering before issuing to clients.
- VAT is **off by default**. Enter a VAT rate only if the company is registered and entitled to charge it; also enter the registration number where appropriate.
- Banking details are intentionally blank. Do not enter invented payment information.

## Company details configured from the provided brief

- **Name:** 360 Quality Solutions
- **Address:** Ditsela Place, Jan Shoba Street, Hatfield, Pretoria, 0028
- **Email:** shibeRR@gmail.com
- **Phone:** +27 76 286 939 — please verify; this appears shorter than the usual SA mobile format
- **Public-site hours:** Monday–Saturday 09:00–18:00; Sunday closed

## Security — read before live client use

**This is a static, unauthenticated admin interface.** GitHub Pages does not provide private admin authentication or server-side user permissions. Anyone who knows the URL can open a fresh copy of the tool. Documents entered by visitors stay in their respective browsers, but this does **not** make the page an authenticated administrative application.

For real multi-user business operations, add identity management, per-user permissions, secure backend document storage, server-side invoice numbering and reliable audit histories. Do not commit client documents, bank secrets, credentials, access tokens or API keys to GitHub.

## Deployment paths

Keep these files at their exact locations relative to repository root:

```
index.html                    # Existing website, links to ./admin/index.html
admin/index.html              # Workspace UI
admin/README.md               # This file
assets/css/admin.css          # Admin styles
assets/js/admin.js            # Admin interactions, calculations, draft management
assets/js/admin-pdf.js        # Embedded-logo PDF engine
assets/images/brand-symbol.png # Visible logo on screen
assets/images/favicon-48.png   # Browser favicon
```

The admin interface uses no dependencies, build pipeline, external scripts or framework. Upload the folder tree to GitHub Pages unchanged.
