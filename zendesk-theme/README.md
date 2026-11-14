# Service First Heating & Air — Zendesk Guide Theme

A responsive, accessible Zendesk Help Center theme using Help Center Templating API v4. It uses Service First's navy, orange, silver, and cooling blue palette and includes category, article, section, search, request, contribution, and community templates.

## Install

1. In Zendesk Guide, open **Guide admin → Customize design → Themes**.
2. Choose **Add theme → Import theme** and upload `service-first-zendesk-theme.zip`.
3. Preview it, confirm the logo and article layouts, then publish when ready.
4. Add your Help Center categories and articles; category names and descriptions populate the home page automatically.
5. Before publishing, wire `templates/new_request_page.hbs` to the current v4 request-form module from the Copenhagen theme in your Zendesk account. The v4 request-form UI is account-provided; this starter includes its mount point and safe contact fallbacks.

## Zendesk AI setup

The theme exposes the native Help Center search across the home, search, and article layouts and keeps article text in semantic page structure. The theme cannot enable Zendesk AI by itself; configure the AI agent and its Help Center knowledge source in Admin Center. To enable AI answers, turn on Zendesk's AI agent / generative answers and connect it to the Help Center knowledge source in Admin Center. Add the Zendesk messaging or AI agent Web Widget through Zendesk's Admin Center; this theme intentionally does not hard-code a second widget embed.

For reliable AI answers, write one article per customer question, use the question as the article title, give the direct answer in the first paragraph, and use descriptive headings for steps, eligibility, exceptions, and safety. Keep phone numbers, service-area details, and emergency guidance in searchable text. Avoid putting key answers only in images, PDFs, accordions, or promotional copy. Review the generated answer against the published article and keep the source article current.

## Logo asset

`assets/service-first-horizontal.svg` is a responsive, transparent horizontal lockup drawn to match the horizontal Service First branding. It is used as the hero brand image, header logo, and footer logo. Replace this SVG with the supplied horizontal transparent PNG if exact source-art fidelity is required; keep the same asset filename or update the `asset` references in the templates.
