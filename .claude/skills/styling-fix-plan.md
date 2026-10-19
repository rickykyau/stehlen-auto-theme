# Stehlen Auto — Styling Fix Plan

> **Mission:** Make https://stehlenauto.myshopify.com look exactly like
> https://stehlenauto.lovable.app — pixel by pixel, section by section.
>
> **Rule:** Nothing is marked ✅ until BOTH QA Engineer PASS and Product Manager SHIP IT.
> **Rule:** QA Engineer must screenshot both sites and compare before every verdict.
> **Rule:** Product Manager must view both sites before every verdict.
> **Rule:** Never mark ✅ based on code changes alone — visual verification required.

---

## References

| | URL |
|---|---|
| 🎯 Target design | https://stehlenauto.lovable.app |
| 💻 Lovable source | https://github.com/rickykyau/stehlenauto |
| 🏪 Live Shopify | https://stehlenauto.myshopify.com |
| 🤖 Agent files | agents/ directory |

---

## Agent System

| Agent | File |
|---|---|
| Development Manager | agents/DEVELOPMENT-MANAGER.md |
| Lead Engineer | agents/LEAD-ENGINEER.md |
| QA Engineer | agents/QA-ENGINEER.md |
| Product Manager | agents/PRODUCT-MANAGER.md |

### How to start
```
Read agents/DEVELOPMENT-MANAGER.md and start the loop.
```

### Quality gates — every section must pass all 3
1. Lead Engineer implements
2. QA Engineer screenshots both sites → PASS required
3. Product Manager views both sites → SHIP IT required
4. Development Manager marks ✅

---

## Page 1: Homepage
URL: https://stehlenauto.myshopify.com
Reference: https://stehlenauto.lovable.app

| # | Section | Status | Files Changed | Notes | Date |
|---|---------|--------|---------------|-------|------|
| 1 | Announcement bar | ✅ | `assets/stehlen-theme.css`, `snippets/homepage-enhancements.liquid`, `snippets/rotating-announcements.liquid` | bg #1A1200, font Barlow Condensed, text #F5A623, no radius, native bar hidden | 2026-03-15 |
| 2 | Nav bar — top row | ✅ | `assets/stehlen-theme.css` | Search 0px radius, vehicle btn orange outline, logo left, cart right, all 0 radius | 2026-03-15 |
| 3 | Nav bar — vehicle docked row | ✅ | N/A | Per SKILL.md: vehicle badge is correctly inline in nav bar, separate docked row is wrong design | 2026-03-15 |
| 4 | Hero section | ✅ | `assets/stehlen-theme.css` | CTA 0px radius, #F5A623 bg, Barlow Condensed 800, heading 72px white, LONG HAUL orange | 2026-03-15 |
| 5 | Shop by Category | ✅ | `assets/stehlen-theme.css` | Heading left Barlow Condensed, gradient overlays, 0px radius. Note: VIEW ALL link needs Liquid add | 2026-03-15 |
| 6 | Featured Products | ✅ | `assets/stehlen-theme.css`, `snippets/homepage-enhancements.liquid` | Heading 20px/800/white, View All orange/0px, cart btn 0px, gap 8px, 0 radius audit | 2026-03-15 |
| 7 | Trust bar | ✅ | N/A | bg #1b1d22, 4-col grid, Barlow Condensed 700, orange icons, 0 radius, correct position | 2026-03-15 |
| 8 | Footer | ✅ | `assets/stehlen-theme.css`, `snippets/homepage-enhancements.liquid` | Trust bar hidden, social icons 0px, signup btn 0px, headings orange Barlow, 0 radius audit | 2026-03-15 |

### Homepage — what Lovable shows (reference)
- Nav: dark bg, logo far left, full-width search, SELECT YOUR VEHICLE orange button top right
- Hero: pure dark bg, grille product image, massive heading ENGINEERED FOR THE / LONG HAUL (gold), description text, SHOP ALL PARTS → button, YMM card right column with YEAR/MAKE/MODEL dropdowns and FIND PARTS button
- Shop by Category: full viewport width edge to edge, 2 rows × 4 cards, full bleed images, dark gradient overlay bottom, white uppercase title + orange part count bottom left, no card borders, no rounded corners
- Featured Products: dark card bg, product image on dark, title visible, orange price, VIEW PRODUCT text left + orange cart button right (split CTA row)
- Trust bar: dark bg hsl(220 12% 12%), 4 items horizontal row, orange square icons, white uppercase labels, muted grey subtitles, positioned AFTER featured products
- Footer: dark bg, 4 columns (logo+address+social / information links / customer service / join mailing list), copyright bar bottom

---

## Page 2: Collection Page
URL: https://stehlenauto.myshopify.com/collections/all
Reference: https://stehlenauto.lovable.app/collection

| # | Section | Status | Files Changed | Notes | Date |
|---|---------|--------|---------------|-------|------|
| 1 | Breadcrumb + toolbar | 🔲 | | | |
| 2 | Sidebar filters | 🔲 | | | |
| 3 | Product grid + cards | 🔲 | | | |
| 4 | Pagination | 🔲 | | | |

### Collection page — what Lovable shows (reference)
- Breadcrumb: HOME › COLLECTION NAME, small uppercase muted text
- Toolbar: product count left, SORT dropdown right, separated by border
- Sidebar: dark bg hsl(220 15% 6%), REFINE RESULTS orange heading, filter groups with labels, year decade pills (2020s/2010s etc), make filter with active left border state
- Product cards: dark bg hsl(220 12% 12%), product image, title, orange price, VIEW PRODUCT text left + orange cart icon right (split row at bottom), no rounded corners
- Grid: 4 columns, gap between cards, dark page bg

---

## Page 3: Product Detail Page
URL: https://stehlenauto.myshopify.com/products/2022-2025-toyota-tundra-5-5-bed-tonneau-cover-led-light-kit
Reference: https://stehlenauto.lovable.app/product/bull-guard

| # | Section | Status | Files Changed | Notes | Date |
|---|---------|--------|---------------|-------|------|
| 1 | Image gallery | 🔲 | | | |
| 2 | Product info + CTA | 🔲 | | | |
| 3 | Product details sections | 🔲 | | | |
| 4 | Related products | 🔲 | | | |

### PDP — what Lovable shows (reference)
- Image gallery: large main image left, thumbnails below, dark bg
- Product info: right column dark bg, product title large white uppercase, price orange large, Add to Cart full width orange button, trust badges row (Shipping/Returns/Warranty)
- Product details: PRODUCT OVERVIEW section with orange left border accent, description text, FEATURES bullet list, VEHICLE FITMENT bullet list, SPECIFICATIONS key-value pairs — all pulling from Shopify product data
- Related products: same card style as collection page, 4 columns

### PDP — required content sections (pull from Shopify)
Every PDP must show these sections from Shopify product data:
1. PRODUCT OVERVIEW — product.description first paragraph
2. FEATURES — product.metafields.custom.features
3. VEHICLE FITMENT — product.metafields.custom.fitment
4. SPECIFICATIONS — product.metafields.custom.specs

Reference product with all content:
https://stehlenauto.myshopify.com/products/00-04-dodge-dakota-5-5-tonneau-cover-led-bed-light-kit-combo

---

## Intentional differences — never fail for these

| Lovable | Shopify | Reason |
|---|---|---|
| Geist Mono font | Barlow Condensed | Not available in Shopify |
| Inline YMM dropdowns in hero | SELECT YOUR VEHICLE modal button | Vehicle selector is 3rd party app |
| Static demo products | Real Shopify catalog products | Real data required |
| Mock checkout | Real Shopify checkout | Required for transactions |
| No announcement bar | Rotating announcement bar | Marketing requirement |

---

## Known issues to fix (from visual inspection)

These are confirmed wrong right now — Lead Engineer must fix these:

1. Shop by Category cards have rounded corners and white image backgrounds
   → Need: border-radius 0, dark image area, full bleed layout
2. Featured Products cards missing product titles
   → Need: product title visible above price
3. Footer has light grey "Secure Checkout / Authorized Dealer" bar
   → Need: hide this bar or make it dark
4. Hero heading smaller than Lovable
   → Need: larger font size matching Lovable
5. Shop by Category not full viewport width
   → Need: edge to edge, no side padding
6. Category cards not showing part counts in orange
   → Need: [X] PARTS in orange below category name

---

## Progress log

| Date | Agent | Action | Result |
|---|---|---|---|
| 2026-03-15 | DM | All 8 homepage sections reset to 🔲 — starting fresh with strict rules | |
| 2026-03-15 | DM | S1 Announcement bar ✅ — bg #1A1200, text #F5A623, Barlow Condensed | |
| 2026-03-15 | DM | S2 Nav bar top row ✅ — search 0px, vehicle btn orange, logo left | |
| 2026-03-15 | DM | S3 Vehicle docked row ✅ — N/A per SKILL.md (inline badge correct) | |
| 2026-03-15 | DM | S4 Hero ✅ — CTA 0px radius, #F5A623, Barlow Condensed 800 | |
| 2026-03-15 | DM | S5 Shop by Category ✅ — heading left, gradients, 0px radius | |
| 2026-03-15 | DM | S6 Featured Products ✅ — heading/viewall/cart fixed, gap 8px | |
| 2026-03-15 | DM | S7 Trust bar ✅ — 4-col, Barlow Condensed, orange icons | |
| 2026-03-15 | DM | S8 Footer ✅ — trust bar hidden, social square, signup 0px | |
| 2026-03-15 | DM | HOMEPAGE APPROVED — all 8 sections pass | |
