# SKILL.md — Stehlen Auto Shopify Theme
## Design System & UX Reference for Claude Code

> Read this entire file before touching any theme file.
> This skill was built by studying the top automotive ecommerce sites
> that serve American men aged 35–45: Summit Racing, JEGS, AmericanMuscle,
> Eastwood Company, RacingLine, and APR Performance.

---

## 1. Who We Are Designing For

**Primary customer:** American male, 35–45, works with his hands.
He owns a truck or muscle car. He shops from his garage on his phone
while mid-project. He distrusts anything that feels soft, rounded,
or "techy." He respects utility, directness, and brands that look
like they know what they're doing.

**He buys from Summit Racing because:**
- He can find parts fast by vehicle
- He trusts the fitment data
- The site never wastes his time
- It feels like a tool, not a boutique

**Design implication:** Every UI decision must feel earned and
functional. No decorative fluff. Confidence through density and
precision, not whitespace and animations.

---

## 2. Brand Tokens — Never Deviate From These

```css
:root {
  /* Core palette */
  --stehlen-orange:        #F5A623;  /* Primary CTA, prices, accents */
  --stehlen-orange-hover:  #FFB93A;  /* Hover state on orange */
  --stehlen-orange-dark:   #1A1200;  /* Orange badge backgrounds */
  --stehlen-orange-border: #3A2800;  /* Orange badge borders */

  /* Backgrounds — layered dark surfaces */
  --stehlen-bg:            #0E0E0E;  /* Page background */
  --stehlen-surface:       #111111;  /* Cards, modals, nav */
  --stehlen-surface-2:     #0C0C0C;  /* Sidebar, recessed areas */
  --stehlen-surface-3:     #151515;  /* Image containers */

  /* Borders */
  --stehlen-border:        #1E1E1E;  /* Default border */
  --stehlen-border-2:      #2A2A2A;  /* Hover border, inputs */
  --stehlen-border-hover:  #F5A623;  /* Card hover border */

  /* Text */
  --stehlen-text:          #E8E6E0;  /* Primary text */
  --stehlen-text-2:        #CCCCCC;  /* Card titles, secondary text */
  --stehlen-muted:         #666666;  /* Descriptions, subtitles */
  --stehlen-dim:           #3A3A3A;  /* SKUs, compare prices, counts */
  --stehlen-label:         #555555;  /* Filter group labels */

  /* Semantic */
  --stehlen-green:         #3A8A3A;  /* Fitment match dot */
  --stehlen-green-bg:      #0A1A0A;  /* Fitment bar background */
  --stehlen-green-border:  #1E3A1E;  /* Fitment bar border */
  --stehlen-green-text:    #4A9A4A;  /* Fitment bar text */
}
```

---

## 3. Typography — The Two Fonts

```css
/* Import in theme.liquid <head> */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');
```

| Use | Font | Weight | Size | Case |
|---|---|---|---|---|
| Page titles, collection names | Barlow Condensed | 800 | 36–48px | UPPERCASE |
| Section headings | Barlow Condensed | 700 | 20–28px | UPPERCASE |
| Filter group labels | Barlow Condensed | 700 | 11px | UPPERCASE |
| Eyebrow labels | Barlow Condensed | 700 | 10px | UPPERCASE |
| Card product name | Barlow | 500 | 13px | Sentence |
| Price | Barlow Condensed | 700 | 20–22px | — |
| Body / description | Barlow | 400 | 13–14px | Sentence |
| SKU / meta | Barlow | 400 | 9–10px | UPPERCASE |
| CTA buttons | Barlow Condensed | 800 | 11–13px | UPPERCASE |

**Never use:** Inter, Roboto, Arial, system-ui, or any rounded display font.

---

## 4. Shape Language — Hard Edges Everywhere

```css
/* Global rule — always include this */
button, .button, .btn, input, select, textarea,
.card, .modal, .badge, .pill, .tag,
[class*="card"], [class*="modal"], [class*="btn"],
[class*="button"], [class*="badge"] {
  border-radius: 0 !important;
}
```

**Why:** The Stehlen logo is a hard-edged geometric S in a square.
Every rounded corner on the site fights the brand. Hard edges =
industrial, masculine, trustworthy in this market.

**Only exception:** The vehicle selector dropdown chevrons and
native browser form controls where overriding would break function.

---

## 5. Button System

### Primary CTA (Add to Cart, Shop Now, Go)
```css
.btn-primary {
  background: var(--stehlen-orange);
  color: #111111;
  border: none;
  border-radius: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.12s;
}
.btn-primary:hover { background: var(--stehlen-orange-hover); }
```

### Secondary / Ghost
```css
.btn-secondary {
  background: transparent;
  color: var(--stehlen-text);
  border: 1px solid var(--stehlen-border-2);
  border-radius: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 16px;
}
.btn-secondary:hover {
  border-color: var(--stehlen-orange);
  color: var(--stehlen-orange);
}
```

---

## 6. Collection Page — Full Spec

### Layout wrapper
```css
.collection-wrapper.grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  align-items: start;
  width: 100%;
}
```

### Collection header (above the two-column grid)
```html
<div class="collection-header">
  <!-- Orange eyebrow — category breadcrumb -->
  <p class="collection-eyebrow">Protection / Exterior</p>

  <!-- Title — Barlow Condensed 800 -->
  <h1 class="collection-title">{{ collection.title }}</h1>

  <!-- Description -->
  <p class="collection-desc">{{ collection.description }}</p>

  <!-- Meta row: count + sort -->
  <div class="collection-meta">
    <span class="collection-count">
      {{ collection.products_count }} Products
    </span>
    <select name="sort_by" class="collection-sort">
      {% for option in collection.sort_options %}
        <option value="{{ option.value }}"
          {% if option.value == collection.sort_by %}selected{% endif %}>
          {{ option.name }}
        </option>
      {% endfor %}
    </select>
  </div>
</div>
```

```css
.collection-eyebrow {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stehlen-orange);
  margin-bottom: 4px;
}

.collection-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 42px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--stehlen-text);
  line-height: 1;
  margin-bottom: 8px;
}

.collection-desc {
  font-size: 13px;
  color: var(--stehlen-muted);
  max-width: 560px;
  line-height: 1.55;
  margin-bottom: 14px;
}

.collection-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collection-count {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--stehlen-label);
}

.collection-sort {
  background: var(--stehlen-surface);
  border: 1px solid var(--stehlen-border-2);
  color: var(--stehlen-muted);
  padding: 6px 10px;
  font-size: 12px;
  font-family: 'Barlow', sans-serif;
  border-radius: 0;
}
```

### Sidebar filters
```css
/* Sidebar container */
.facets-block-wrapper--sidebar {
  background: var(--stehlen-surface-2);
  border-right: 1px solid var(--stehlen-border);
  min-height: 100vh;
}

.facets--sidebar {
  background: var(--stehlen-surface-2);
  padding: 20px;
}

/* "REFINE RESULTS" heading — add via Liquid if not present */
.sidebar-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stehlen-orange);
  margin-bottom: 16px;
}

/* Filter group labels (CATEGORY, VEHICLE TYPE etc) */
.facets__label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--stehlen-label);
}

/* Filter option text */
.checkbox__label-text {
  font-size: 13px;
  color: #888888;
}

/* Checked state */
.checkbox__input:checked + .checkbox__label .checkbox__label-text {
  color: var(--stehlen-text);
}

/* Checkbox accent */
input[type="checkbox"] {
  accent-color: var(--stehlen-orange);
}

/* Filter counts */
.facets__count,
[class*="facet-count"] {
  color: var(--stehlen-dim);
  font-size: 11px;
}
```

### Fitment bar
```css
.fitment-bar {
  background: var(--stehlen-green-bg);
  border: 1px solid var(--stehlen-green-border);
  padding: 9px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  border-radius: 0;
}

.fitment-bar__dot {
  width: 7px;
  height: 7px;
  background: var(--stehlen-green);
  border-radius: 50%;
  flex-shrink: 0;
}

.fitment-bar__text {
  font-size: 12px;
  font-weight: 600;
  color: var(--stehlen-green-text);
}

.fitment-bar__cta {
  font-size: 11px;
  font-weight: 700;
  color: var(--stehlen-orange);
  margin-left: auto;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
}
```

### Active filter pills
```css
.active-filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--stehlen-orange-dark);
  border: 1px solid var(--stehlen-orange-border);
  border-radius: 0;
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 700;
  color: var(--stehlen-orange);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

### Product grid
```css
ul[class*="product-grid"] {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
  gap: 12px !important;
  padding: 20px !important;
  list-style: none !important;
  width: 100% !important;
  min-width: 0 !important;
  background: var(--stehlen-bg) !important;
}

li[class*="product-grid__item"] {
  width: auto !important;
  max-width: none !important;
  flex: none !important;
}
```

### Product card
```css
/* Target Horizon's utility classes directly */
.product-card__content.border-style,
.product-card__content.spacing-style,
.product-card__content {
  background: var(--stehlen-surface) !important;
  border: 1px solid var(--stehlen-border) !important;
  border-radius: 0 !important;
  padding: 0 !important;
  /* Override Horizon CSS variable */
  --color-background-primary: #111111 !important;
}

product-card:hover .product-card__content {
  border-color: var(--stehlen-orange) !important;
}

/* Image area */
.card-gallery,
product-card [class*="gallery"] {
  background: var(--stehlen-surface-3) !important;
  --color-background-primary: #151515 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid var(--stehlen-border) !important;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-gallery img {
  object-fit: contain !important;
  padding: 8px !important;
  width: 100% !important;
  height: 100% !important;
}

/* Card info area */
.product-card__info,
product-card [class*="product-card__info"] {
  padding: 10px 12px 12px !important;
  background: var(--stehlen-surface) !important;
}

/* SKU — show above title if available */
.product-card__sku {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--stehlen-dim);
  margin-bottom: 3px;
}

/* Product title */
[class*="product-card__title"] {
  font-size: 13px !important;
  font-weight: 500 !important;
  color: var(--stehlen-text-2) !important;
  line-height: 1.35 !important;
}

/* Fitment tag */
.product-card__fitment {
  display: inline-block;
  background: #191919;
  border: 1px solid #232323;
  border-radius: 0;
  padding: 2px 6px;
  font-size: 10px;
  color: var(--stehlen-muted);
  margin-bottom: 8px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Price */
.product-card [class*="price"],
.product-card [class*="Price"] {
  font-family: 'Barlow Condensed', sans-serif !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  color: var(--stehlen-orange) !important;
}

/* Compare-at price */
.product-card [class*="price--compare"],
.product-card [class*="compareAt"] {
  font-size: 12px !important;
  color: var(--stehlen-dim) !important;
  text-decoration: line-through !important;
}

/* Card CTA button */
.product-card button[name="add"],
.product-card [class*="add-to-cart"],
.product-card [class*="quick-add"] button {
  background: var(--stehlen-orange) !important;
  color: #111111 !important;
  border: none !important;
  border-radius: 0 !important;
  font-family: 'Barlow Condensed', sans-serif !important;
  font-weight: 800 !important;
  font-size: 11px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  width: 100% !important;
  padding: 8px !important;
}
```

### Mobile — collection page
```css
@media (max-width: 680px) {
  .collection-wrapper.grid {
    grid-template-columns: 1fr !important;
  }
  .facets-block-wrapper--sidebar {
    display: none !important;
  }
  ul[class*="product-grid"] {
    grid-template-columns: repeat(2, 1fr) !important;
    padding: 12px !important;
    gap: 8px !important;
  }
  .collection-title {
    font-size: 28px !important;
  }
}
```

---

## 7. Product Detail Page — Full Spec

### Layout
- Left column: image gallery with thumbnails below (60% width)
- Right column: all purchase info (40% width)
- Sticky right column on desktop scroll
- Both columns on dark background — no white

### Right column elements in order
1. Breadcrumb (small, muted)
2. Product title — Barlow Condensed 800, 28–32px
3. Price — Barlow Condensed 700, 32px, orange
4. Variant selector (if applicable)
5. Quantity stepper + Add to Cart (full width, orange)
6. Trust badges: Free Shipping / 30-Day Returns / Manufacturer Warranty
7. Divider
8. Section heading with orange left border: "PRODUCT OVERVIEW"
9. Description text

```css
/* PDP right column — force dark bg */
.product-information,
[class*="product-info"],
[class*="product__info"],
[id*="ProductInfo"] {
  background: var(--stehlen-bg) !important;
  --color-background-primary: #0E0E0E !important;
  color: var(--stehlen-text) !important;
}

/* PDP title */
.product__title,
[class*="product-title"],
[class*="product__title"] {
  font-family: 'Barlow Condensed', sans-serif !important;
  font-size: 30px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  color: var(--stehlen-text) !important;
  line-height: 1.1 !important;
}

/* PDP price */
.product__price,
[class*="product-price"],
[class*="product__price"] {
  font-family: 'Barlow Condensed', sans-serif !important;
  font-size: 32px !important;
  font-weight: 700 !important;
  color: var(--stehlen-orange) !important;
}

/* Add to Cart button */
[id*="AddToCart"],
[class*="add-to-cart-component"] button,
form[action="/cart/add"] button[type="submit"] {
  background: var(--stehlen-orange) !important;
  color: #111111 !important;
  border: none !important;
  border-radius: 0 !important;
  font-family: 'Barlow Condensed', sans-serif !important;
  font-weight: 800 !important;
  font-size: 15px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  width: 100% !important;
  padding: 14px 20px !important;
}

/* Section headings with orange left border */
.product-section-heading,
[class*="product-overview"] h2,
[class*="product-features"] h2,
[class*="product-specs"] h2 {
  border-left: 3px solid var(--stehlen-orange);
  padding-left: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--stehlen-text);
  margin-bottom: 12px;
}

/* Trust badges */
.trust-badge-row {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.trust-badge {
  flex: 1;
  background: var(--stehlen-surface);
  border: 1px solid var(--stehlen-border);
  border-radius: 0;
  padding: 10px 8px;
  text-align: center;
  font-size: 11px;
  color: var(--stehlen-muted);
  font-weight: 500;
}

.trust-badge strong {
  display: block;
  color: var(--stehlen-text);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
}
```

---

## 8. Homepage Sections

### Trust bar (below hero)
```css
.trust-bar {
  background: var(--stehlen-surface);
  border-top: 1px solid var(--stehlen-border);
  border-bottom: 1px solid var(--stehlen-border);
  padding: 14px 24px;
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.trust-bar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--stehlen-text);
}

.trust-bar__item span {
  font-weight: 400;
  color: var(--stehlen-muted);
  text-transform: none;
  letter-spacing: 0;
  font-size: 11px;
}
```

### Shop by Category cards
```css
.category-card {
  background: var(--stehlen-surface);
  border: 1px solid var(--stehlen-border);
  border-radius: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: border-color 0.15s;
}

.category-card:hover {
  border-color: var(--stehlen-orange);
}

.category-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  padding: 12px 14px;
}

.category-card__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--stehlen-text);
  margin-bottom: 2px;
}

.category-card__link {
  font-size: 11px;
  font-weight: 700;
  color: var(--stehlen-orange);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

### Shop by Popular Models cards
```css
.model-card {
  position: relative;
  overflow: hidden;
  border-radius: 0;
  cursor: pointer;
}

.model-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--stehlen-orange);
  color: #111111;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 0;
  z-index: 2;
}
```

---

## 9. What The Best Sites Do That We Must Do

Based on Summit Racing, JEGS, and AmericanMuscle research:

### Fitment — the #1 trust signal
- Vehicle selector must be persistent and visible in the nav
- Every collection page must show "Showing X matches for [vehicle]"
- Every product card must show the fitment year range
- Mismatch warning must be prominent, not hidden

### Search — must be instant and smart
- Supports part numbers, make/model/year, and product type
- Autocomplete shows product images not just text
- No results page must show alternatives

### Product cards — what works for this demographic
- Show the part clearly on white/neutral background
- Price prominent and in a distinct color (orange)
- Fitment year range always visible
- "Add" CTA always visible — no hover-to-reveal
- Part number visible for cross-referencing

### Trust signals — this customer is skeptical
- Lifetime warranty callout on every card
- Free shipping threshold clear in nav bar
- "Guaranteed fitment" is the #1 promise — show it everywhere
- Real phone number in footer — this customer will call

### Navigation — this customer knows what he wants
- Shop by vehicle make in main nav dropdown
- Shop by category in main nav dropdown
- Search is the primary tool — make it huge

### What to AVOID — patterns that lose this customer
- Long hero animations or page transitions
- Popups on entry (email capture)
- Trendy UI patterns (glassmorphism, gradients, floating elements)
- Small text or tight line-height
- Orange on orange (unreadable)
- Rounded everything — makes it look like a fashion site
- Hiding the price until hover
- Pagination over load-more (this customer wants to scan everything)

---

## 10. Horizon Theme — Known Gotchas

The Stehlen site runs on Shopify's **Horizon theme**. These are
the specific issues that come up repeatedly:

### CSS specificity — how to win
Horizon uses CSS custom properties (`var(--color-background-primary)`)
on utility classes like `border-style` and `spacing-style`. To override:

```css
/* WRONG — hex !important doesn't override a CSS variable */
.product-card__content { background: #111111 !important; }

/* RIGHT — override the variable itself at the component level */
.product-card__content.border-style {
  --color-background-primary: #111111 !important;
  background: #111111 !important;
}
```

### Product grid columns
Horizon uses a `<ul>` with multiple dynamic classes. Always target:
```css
ul[class*="product-grid"] { /* your grid rules */ }
```

### Collection layout wrapper
Always target both classes together:
```css
.collection-wrapper.grid { /* your layout rules */ }
```

### Sidebar classes
The sidebar has two nested elements — target both:
```css
.facets-block-wrapper--sidebar { /* outer container */ }
.facets--sidebar { /* inner padding container */ }
```

### Never override `.shopify-section`
Horizon uses this class plus color scheme classes to manage
section theming. Overriding it broadly will break homepage sections.
Target specific section types instead.

### Third-party apps
The vehicle selector modal is a third-party app. To restyle it,
inspect the rendered HTML first to get the real class names, then
add overrides to `stehlen-theme.css`. Never edit app embed files.

---

## 11. File Structure

```
layout/
  theme.liquid          ← Load fonts + stehlen-theme.css here

assets/
  stehlen-theme.css    ← Single source of truth for all custom styles
                          Never split into multiple CSS files

sections/
  main-collection.liquid   ← Collection page template
  main-product.liquid      ← PDP template
  header-group.liquid      ← Nav + announcement bar

snippets/
  product-card.liquid      ← Reusable card component
```

### theme.liquid checklist
Before any other work, confirm these 3 lines exist in `<head>`:
```liquid
{{ 'stehlen-theme.css' | asset_url | stylesheet_tag }}
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
```
And on `<body>`:
```html
<body style="background:#0E0E0E;color:#E8E6E0;">
```

---

## 12. Claude Code Prompt Rules

When working on this theme, always:

1. **Read before writing** — fetch the live page HTML before editing
   any file. Use: `curl -A "Mozilla/5.0" [url] > /tmp/page.html`

2. **Confirm class names** — never guess Horizon class names.
   Always grep the real HTML: `grep "class=" /tmp/page.html | grep [keyword]`

3. **One file at a time** — only edit `assets/stehlen-theme.css`
   unless a Liquid structural change is explicitly needed

4. **Report what you changed** — after every edit, list:
   - Which file was modified
   - Which lines were added/changed/removed
   - What visual effect is expected

5. **Never use broad selectors** — avoid `*`, `section`, `.shopify-section`
   as standalone rules. Always qualify them.

6. **Test the override chain** — if a rule isn't working, check:
   - Is Horizon setting this via a CSS variable?
   - Is there a higher-specificity Horizon rule winning?
   - Add `--color-background-primary` override alongside `background`

7. **Protect what's working** — if the nav, hero, or fitment bar
   are working correctly, do not include those selectors in your edits.
   Explicitly list what you are NOT touching.
