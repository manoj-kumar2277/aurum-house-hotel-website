# Aurum House Hotel — Website

A responsive, multi-page boutique hotel website built for the MANTRA 2026 Frontend Assignment.

**Topic:** Hotel Website

## Pages
- `index.html` — Home (hero with interactive 3D signature ring, philosophy, room preview, amenities, stats, testimonial)
- `about.html` — About the hotel
- `rooms.html` — Rooms & Suites, plus FAQ accordion
- `gallery.html` — Image gallery with lightbox
- `contact.html` — Contact details + validated booking request form

## Tech
- HTML5, CSS3 (custom properties, Grid/Flexbox, media queries for mobile/tablet/desktop)
- Vanilla JavaScript: mobile nav toggle, sticky header, FAQ accordion, gallery lightbox, booking form validation
- Three.js (r128, via CDN) for the homepage hero 3D animation — a slowly rotating gold ring, mouse-reactive, with `prefers-reduced-motion` support
- No build step — pure static files, drag-and-drop ready for Netlify

## SEO
Every page has a unique `<title>`, meta description, meta keywords, a single `<h1>`, semantic `<h2>`/`<h3>` structure, descriptive internal links, and alt text on all illustrative graphics.

## Deployment
1. Push this folder to a public GitHub repository.
2. Deploy via [Netlify Drop](https://app.netlify.com/drop) or connect the GitHub repo in Netlify for continuous deployment.
3. Copy the live `.netlify.app` URL into your assignment submission alongside the GitHub repo link.

## Folder Structure
```
/
├── index.html
├── about.html
├── rooms.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── hero3d.js
└── README.md
```
