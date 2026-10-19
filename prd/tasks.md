# Stehlen Auto — Implementation Task List

## 1. Header & Navigation
- [x] Add rotating announcement bar with trust messages (4 messages, 4s rotation, dark green bar)
- [x] Implement header layout: Logo | Main Nav | Search | "Add Your Vehicle" button | Cart
- [x] Unify announcement bar + header into single dark (#1a1a1a) block — **Done: CSS in `snippets/homepage-enhancements.liquid`**
- [x] Fix logo duplication (hide --original container, show --inverse only) — **Done: CSS + JS immediate injection in `snippets/homepage-enhancements.liquid`**
- [ ] Build main navigation with categories: Tonneau Covers, Bull Bars & Bumper Guards, Grille Guards, Side Steps & Running Boards, Trailer Hitches & Towing — **BLOCKED: requires Shopify admin menu editor access (GraphQL menus API returned ACCESS_DENIED)**
- [ ] Add secondary nav: Shop by Vehicle (Make > Model > Year) — **BLOCKED: requires Shopify admin menu editor access**
- [ ] Add tertiary nav: Shop by Brand (alphabetical with logos) — **BLOCKED: requires Shopify admin menu editor access**

## 2. YMM Fitment System
- [x] Build prominent YMM search selector in header (Year > Make > Model)
- [x] Make fitment filter persist across entire site once selected (localStorage)
- [x] Add "FITS" / "DOES NOT FIT" indicators on product pages — **Done: fitment badge in `snippets/pdp-enhancements.liquid`**
- [x] ~~Evaluate/integrate Shopify fitment app~~ — Custom-built using metafield filtering
- [x] Implement "My Garage" / saved vehicles feature — **Done: `snippets/my-garage.liquid`**
- [x] Vehicle selector dark-theme popup redesign — **Done: dark dialog, gold accents, labels, contrast**
- [x] Saved vehicle bar with gold accent + vertical alignment — **Done**
- [x] Dropdown pre-population from saved vehicle — **Done: `_restoreSavedVehicle()` in `assets/vehicle-selector.js`**
- [x] Fix localStorage key mismatch — **Done: both `fitment-badge.liquid` and `pdp-enhancements.liquid` now read `stehlen-vehicle` with fallback to `stehlen_vehicle`**
- [ ] Add dynamic product recommendations based on selected vehicle — **Deferred: requires server-side product tag queries**

## 3. Homepage
- [ ] Hero slideshow with lifestyle imagery — **Deferred: no assets; requires Shopify customizer**
- [ ] Prominent YMM search front and center — **Partially done: YMM in header; hero placement blocked by customizer**
- [x] 4-column value props bar: free shipping, fitment assurance, warranty, easy returns
- [x] Featured collections / category cards
- [x] Hero section gradient overlay + typography polish
- [x] Shop by Category section with 20px grid gap, consistent 32px uppercase headings
- [x] Shop by Popular Models section with vehicle images (Ford F-150, Toyota Tundra, Chevy Silverado, Dodge Charger)
- [x] Product card hover effects + sale badge overlays
- [ ] Customer Builds section with real install photos — **Deferred: no photos available**

## 4. Collection / Category Pages
- [x] Faceted filtering (by fitment, price, brand, etc.) — metafield filters live
- [x] Product cards: white background, subtle shadow, rounded corners, sale/sold-out badges
- [x] Vehicle-specific filtering when YMM is set
- [x] Sidebar filter force-show via JS on desktop
- [x] Collection page layout — **Done: flex layout (sidebar 220px + products), 3-column product grid, value props hidden on non-homepage, heading whitespace reduced, sidebar styled with background/border/border-radius, SEE ITEMS button brand-styled, product cards with border + hover effects + gold prices**
- [ ] Category structure per PRD (subcategories) — **Deferred: requires Shopify admin menu/navigation editor**

## 5. Product Detail Pages (PDP)
- [x] Tabbed content layout: Overview / Specs / Shipping & Returns / Warranty — **Done: populated from Liquid-injected product description with smart section parsing**
- [x] Fitment confirmation badge — **Done: in `snippets/pdp-enhancements.liquid`**
- [x] Clear return/warranty policy on every product page — **Done: policy icons injected on PDP**
- [x] Add to Cart button styled with gold (#FFB74F)
- [x] PDP layout fix — **Done: grid 705px/542px (55%/45%), parent containers full-width, 32px gap, 16px top padding**
- [x] PDP tab content population — **Done: Liquid-injected `{{ product.description | json }}` parsed into Overview (with Features, Vehicle Fitment sections), Specs, Shipping, Warranty tabs. Original description hidden to avoid duplication.**
- [x] PDP fitment badge styling — **Done: gold border (#FFB74F), background #f9f3e5, 6px border-radius**
- [x] Tab active indicator updated to gold (#FFB74F)
- [ ] Multiple product angles + installed photos — **Deferred: content/photography task**
- [ ] Explicit compatibility callouts — **Partially done: "Does Not Fit" badge; per-product exclusions need data**
- [ ] Spec comparison tables — **Deferred: no structured spec data in metafields**
- [ ] Incentive-loaded CTA — **Deferred: business decision**
- [ ] Brand authorization badges — **Deferred: no brand logo assets**

## 6. Trust & Social Proof
- [ ] Judge.me reviews integration — **Deferred: requires app installation via Shopify admin**
- [ ] Customer Builds / install photo gallery — **Deferred: no photos**
- [ ] Security badges on checkout — **Deferred: requires Shopify Plus**
- [x] Physical business address and phone number in footer
- [ ] Transparent pricing — **N/A: admin config**

## 7. Vehicle-Specific SEO Landing Pages
- [ ] Vehicle-specific page templates — **Deferred: requires custom templates + content**
- [ ] SEO optimization for vehicle + product queries — **Deferred: depends on above**

## 8. Design System / Theming
- [x] Apply color palette: Primary #1A3F22, Accent #FFB74F, BG #F0F0F0, Text #1A1A1A, Sale #FF4E4E
- [x] Set typography: Oswald (headings, 700), Source Sans Pro (body, 400)
- [x] All color schemes match brand spec
- [x] Unified dark header across all pages
- [x] Unified styling across collection, PDP, and category pages — **Done: consistent padding (40px), max-width (1360px), typography, button styles, card styles, gold accent color**
- [x] Value props bar hidden on non-homepage pages — **Done: CSS in global non-index conditional**

## 9. Performance
- [x] Sub-3-second page load (TTFB 257ms, DOMContentLoaded 668ms)
- [x] Asset optimization (73% lazy-loaded, inline CSS/JS)
- [x] Mobile-first responsive design

## 10. Checkout & Conversion
- [ ] Guest checkout — **N/A: Shopify admin config**
- [ ] Apple Pay / Google Pay / Shop Pay — **N/A: payment config**
- [ ] Installation guides — **Deferred: content creation**

## Completed Infrastructure
- [x] Metafield definitions (custom.make, custom.model, custom.year, custom.category)
- [x] 1,330 products populated with fitment metafields (0 errors)
- [x] Product tags normalized (make:, model:, year:, category:)
- [x] Collection pagination (24/page)
- [x] Vehicle selector component + fitment banner on live theme
- [x] GraphQL themeFilesUpsert workflow (API 2025-01)
- [x] Playwright visual verification workflow

## Files Created/Modified
| File | Status | Description |
|------|--------|-------------|
| `snippets/homepage-enhancements.liquid` | Created | **Master CSS/JS override** (~1100 lines). Header, logo, buttons, hero, vehicle selector, collection cards, popular models, collection page flex layout, PDP grid, responsive breakpoints. |
| `snippets/pdp-enhancements.liquid` | Created | PDP fitment badge, tabbed content with Liquid-injected description parsing, policy icons |
| `snippets/card-enhancements.liquid` | Created | Product card shadows, hover effects, badges |
| `snippets/footer-trust.liquid` | Created | Trust badges + contact info |
| `snippets/my-garage.liquid` | Created | Multi-vehicle garage drawer |
| `snippets/vehicle-selector.liquid` | Existing | VS dialog HTML |
| `assets/vehicle-selector.js` | Modified | Dropdown pre-population from saved vehicle |
| `sections/value-props.liquid` | Created | Section-based value props (hidden on non-homepage via CSS) |
| `config/settings_data.json` | Modified | Fonts, colors, button radius |
| `layout/theme.liquid` | Modified | Render tags for all snippets |

## Cleanup Candidates
- `snippets/fitment-badge.liquid` — Dead code, not rendered anywhere. Superseded by `pdp-enhancements.liquid`.
- `snippets/value-props-bar.liquid` — Superseded by `sections/value-props.liquid`.

## Known Issues
1. **Shopify customizer override**: Pushed JSON templates overridden by customizer database. Hero/section changes require admin UI.
2. **CDN caching**: 30+ second delay. Workaround: preview URL + push layout/theme.liquid.
3. **Navigation menus**: API returns ACCESS_DENIED. Must use Shopify admin.
4. **Collection page heading**: ~68px gap from header (header height + reduced section padding). Could be tighter but requires customizer JSON override.
5. **Product images in collection**: Images appear small in headless browser — may be a lazy-loading/viewport issue in Playwright, not a live site issue.

## Technical Notes
- **Theme ID**: `gid://shopify/OnlineStoreTheme/153227329583` (numeric: `153227329583`)
- **Shop**: `http-stehlenauto-com.myshopify.com`
- **API**: GraphQL `themeFilesUpsert` (2025-01)
- **Snippet in `<head>`**: `homepage-enhancements.liquid` at line 36 of theme.liquid
- **Liquid conditionals**: `{% if template.name == 'collection' %}` / `{% if template.name == 'product' %}`
- **Collection layout**: Uses flexbox (not grid) to override Horizon's complex multi-column subgrid
- **Push scripts**: `tmp/push-all-fixes.js`, `tmp/force-cache-bust.js`
- **Verify scripts**: `tmp/verify-fixes.js`, `tmp/audit-pages.js`, `tmp/final-review.js`
