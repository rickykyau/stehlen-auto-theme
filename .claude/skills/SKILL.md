## REFERENCE MOCKUPS — Images are the source of truth

The files in .claude/skills/mockups/ are the
permanent reference screenshots taken from the
approved Lovable design at stehlenauto.lovable.app.

These images OVERRIDE any text description in this
file when there is a conflict.

Before building or testing anything:
1. Read the relevant mockup image
2. Take a screenshot of the live Shopify page
3. Compare pixel by pixel
4. Every visible difference is a bug

Mockup files:
  homepage-target.png        — full homepage, 1440px
  homepage-mobile-target.png — full homepage, 375px
  collection-target.png      — collection page, 1440px
  collection-mobile-target.png
  pdp-target.png             — product detail page, 1440px

IMPORTANT EXCEPTIONS — do not try to match these:
  1. Featured products card image area is WHITE in Lovable.
     Do not apply dark background to product image areas
     on the homepage featured section. Product photos
     are shot on white and must stay white.
  2. Vehicle selector is a modal button in Shopify,
     not inline dropdowns like Lovable. Accept this.
  3. Announcement bar exists in Shopify, not in Lovable.
     Keep it. Do not remove it.
  4. Real products show instead of demo products. Accept.
  5. Fonts: Barlow Condensed replaces Geist Mono. Accept.

---

# SKILL.md — Stehlen Auto Design System
# Reference: Summit Racing, JEGS, AmericanMuscle
# Audience: American male 35-45, truck/muscle car owner
# Feels like a tool, not a boutique. Hard edges. Utilitarian.

## Brand tokens — never change these
:root {
  --stehlen-orange:        #F5A623;
  --stehlen-orange-hover:  #FFB93A;
  --stehlen-orange-dark:   #1A1200;
  --stehlen-orange-border: #3A2800;
  --stehlen-bg:            #0E0E0E;
  --stehlen-surface:       #111111;
  --stehlen-surface-2:     #0C0C0C;
  --stehlen-surface-3:     #151515;
  --stehlen-border:        #1E1E1E;
  --stehlen-border-2:      #2A2A2A;
  --stehlen-border-hover:  #F5A623;
  --stehlen-text:          #E8E6E0;
  --stehlen-text-2:        #CCCCCC;
  --stehlen-muted:         #666666;
  --stehlen-dim:           #3A3A3A;
  --stehlen-label:         #555555;
  --stehlen-green:         #3A8A3A;
  --stehlen-green-bg:      #0A1A0A;
  --stehlen-green-border:  #1E3A1E;
  --stehlen-green-text:    #4A9A4A;
}

## Typography
Google Fonts URL:
https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap

Rules:
- Page/collection titles: Barlow Condensed 800, uppercase
- Section headings:       Barlow Condensed 700, uppercase
- Filter group labels:    Barlow Condensed 700, 11px, uppercase
- Card product name:      Barlow 500, 13px, sentence case
- Price:                  Barlow Condensed 700, 20-22px
- Body/description:       Barlow 400, 13-14px
- CTA buttons:            Barlow Condensed 800, uppercase
- Never use:              Inter, Roboto, Arial, system-ui

## Shape language — hard edges everywhere
border-radius: 0 on everything, no exceptions.

Global reset — always in stehlen-theme.css:
button, .button, .btn, input, select, textarea,
.card, .modal, .badge, .pill, .tag,
[class*="card"], [class*="modal"], [class*="btn"],
[class*="button"], [class*="badge"] {
  border-radius: 0 !important;
}

## Buttons

Primary CTA (Add to Cart, Shop Now, Go):
  background:      #F5A623
  color:           #111111
  border:          none
  border-radius:   0
  font-family:     Barlow Condensed
  font-weight:     800
  font-size:       13px
  letter-spacing:  0.08em
  text-transform:  uppercase
  padding:         10px 20px
  hover:           background #FFB93A

Secondary ghost:
  background:      transparent
  color:           #E8E6E0
  border:          1px solid #2A2A2A
  border-radius:   0
  hover:           border-color #F5A623, color #F5A623

## Horizon theme — critical override pattern
Horizon uses CSS custom properties on utility classes.
ALWAYS override the variable AND the hex value together.

WRONG — this will not work:
  .product-card__content {
    background: #111111 !important;
  }

RIGHT — this is how to beat Horizon's cascade:
  .product-card__content.border-style,
  .product-card__content.spacing-style,
  .product-card__content {
    --color-background-primary: #111111 !important;
    background: #111111 !important;
    border-radius: 0 !important;
  }

## Real class names confirmed from live HTML
  Collection layout wrapper:  .collection-wrapper.grid
  Product grid ul:            ul[class*="product-grid"]
  Grid item li:               li[class*="product-grid__item"]
  Product card content:       .product-card__content.border-style
  Card image area:            .card-gallery
  Sidebar outer:              .facets-block-wrapper--sidebar
  Sidebar inner:              .facets--sidebar
  Filter group label:         .facets__label
  Checkbox label text:        .checkbox__label-text

## Collection page — full CSS spec

Layout:
  .collection-wrapper.grid {
    display: grid !important;
    grid-template-columns: 260px 1fr !important;
    gap: 0 !important;
    align-items: start !important;
  }

Collection header:
  Eyebrow:    Barlow Condensed 700, 10px, #F5A623,
              letter-spacing 0.14em, uppercase
  Title:      Barlow Condensed 800, 42px, #E8E6E0,
              uppercase, letter-spacing 0.06em
  Desc:       Barlow 400, 13px, #666666, max-width 560px
  Meta row:   count left + sort right, same line

Sidebar:
  .facets-block-wrapper--sidebar {
    background: #0C0C0C !important;
    border-right: 1px solid #1E1E1E !important;
    min-height: 100vh !important;
  }
  .facets--sidebar {
    background: #0C0C0C !important;
    padding: 20px !important;
  }
  Sidebar heading "REFINE RESULTS":
    Barlow Condensed 700, 10px, #F5A623,
    letter-spacing 0.14em, uppercase
  .facets__label:
    Barlow Condensed 700, 11px, #555555,
    letter-spacing 0.12em, uppercase
  .checkbox__label-text:
    Barlow 400, 13px, #888888
  Checked state: color #E8E6E0
  input[type="checkbox"]: accent-color #F5A623
  Filter counts: #3A3A3A, 11px, right-aligned

Fitment bar:
  background:   #0A1A0A
  border:       1px solid #1E3A1E
  border-radius: 0
  Green dot:    7px circle, #3A8A3A
  Text:         Barlow 600, 12px, #4A9A4A
  SHOW ALL:     #F5A623, 11px, 700, right-aligned

Active filter pills:
  background:   #1C1400
  border:       1px solid #3A2800
  border-radius: 0
  color:        #F5A623
  font:         Barlow Condensed 700, 11px, uppercase

Product grid:
  ul[class*="product-grid"] {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
    gap: 12px !important;
    padding: 20px !important;
    list-style: none !important;
    background: #0E0E0E !important;
    width: 100% !important;
    min-width: 0 !important;
  }
  li[class*="product-grid__item"] {
    width: auto !important;
    max-width: none !important;
    flex: none !important;
  }

Product card:
  .product-card__content.border-style,
  .product-card__content.spacing-style,
  .product-card__content {
    --color-background-primary: #111111 !important;
    background: #111111 !important;
    border: 1px solid #1E1E1E !important;
    border-radius: 0 !important;
    padding: 0 !important;
  }
  Hover: border-color #F5A623

Card image:
  .card-gallery {
    --color-background-primary: #151515 !important;
    background: #151515 !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #1E1E1E !important;
    aspect-ratio: 1 / 1 !important;
    overflow: hidden !important;
  }
  .card-gallery img {
    object-fit: contain !important;
    padding: 8px !important;
    width: 100% !important;
    height: 100% !important;
  }

Card body (padding 10px 12px 12px, bg #111111):
  SKU:          9px, #3A3A3A, uppercase, letter-spacing 0.12em
  Title:        Barlow 500, 13px, #CCCCCC, line-height 1.35
  Fitment tag:  bg #191919, border #232323, border-radius 0,
                10px, #666666, max-width 100%, ellipsis
  Price:        Barlow Condensed 700, 20px, #F5A623
  Compare-at:   12px, #3A3A3A, line-through
  Add button:   bg #F5A623, color #111, Barlow Condensed 800,
                11px, border-radius 0, padding 7px 13px
  Warranty:     checkmark Lifetime Warranty 10px, #3A6A2A, 600

Pagination:
  Buttons:      32x32px, bg #111111, border 1px solid #222222,
                border-radius 0, Barlow Condensed 700, 12px, #555555
  Hover:        border #F5A623, color #F5A623
  Active:       bg #F5A623, border #F5A623, color #111111

Mobile (max-width 680px):
  .collection-wrapper.grid { grid-template-columns: 1fr !important; }
  .facets-block-wrapper--sidebar { display: none !important; }
  ul[class*="product-grid"] {
    grid-template-columns: repeat(2, 1fr) !important;
    padding: 12px !important;
    gap: 8px !important;
  }

## Product detail page — full CSS spec

Page background:
  --color-background-primary: #0E0E0E !important;
  background: #0E0E0E !important;
  color: #E8E6E0 !important;

Product title:
  Barlow Condensed 800, 30px, uppercase,
  letter-spacing 0.04em, #E8E6E0, line-height 1.1

Price:
  Barlow Condensed 700, 32px, #F5A623

Add to Cart:
  background: #F5A623 !important;
  color: #111111 !important;
  border-radius: 0 !important;
  font-family: Barlow Condensed !important;
  font-weight: 800 !important;
  font-size: 15px !important;
  width: 100% !important;
  padding: 14px 20px !important;

Section headings (Product Overview, Features etc):
  border-left: 3px solid #F5A623
  padding-left: 10px
  Barlow Condensed 700, 14px, uppercase,
  letter-spacing 0.1em, #E8E6E0

Related products:
  Heading: YOU MAY ALSO LIKE
  Barlow Condensed 800, 24px, #E8E6E0, uppercase
  Same card spec as collection page

## Homepage sections — card rules by section

### RULE: Different sections use different card styles
Collection page cards and homepage featured product
cards are NOT the same. Do not apply collection
card styles globally.

### Featured products cards (homepage only)
These cards have NO dark background and NO border.
Product photos are shot on white — the white image
area is intentional and correct.

  Card container:
    background:   transparent
    border:       none
    border-radius: 0
    overflow:     hidden

  Image area:
    background:   #FFFFFF (intentional — product photos)
    aspect-ratio: 1 / 1
    overflow:     hidden

  Card body (below image):
    background:   transparent
    padding:      10px 0 0 0

  Title:
    Barlow 500, 13px, #E8E6E0, line-height 1.35
    max 2 lines, ellipsis

  Price:
    Barlow Condensed 700, 18px, #F5A623

  Split CTA row (title+price left, cart button right):
    display:        flex
    align-items:    center
    justify-content: space-between
    margin-top:     8px

  Cart button:
    background:   #F5A623
    color:        #111111
    width:        32px
    height:       32px
    border-radius: 0
    display:      flex
    align-items:  center
    justify-content: center

  Grid gap:       8px (tighter than collection page 12px)

  CSS to target homepage featured only:
    [data-section-type="featured-products"]
      .product-card__content,
    .home-featured-products .product-card__content,
    .section-featured-products .product-card__content {
      --color-background-primary: transparent !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }

  Note: find the actual section wrapper class by running:
    curl -A "Mozilla/5.0" https://stehlenauto.myshopify.com \
      > /tmp/home.html
    grep -i "featured" /tmp/home.html | grep "class=" | head -10

### Collection page cards (collection pages only)
  (existing spec — dark bg #111111, border #1E1E1E)

### Category cards (homepage Shop by Category)
  bg #0E0E0E for section
  Card: border-radius 0, border #1E1E1E, overflow hidden
  Hover: border-color #F5A623
  Overlay: gradient to dark
  Title: Barlow Condensed 800, 16px, #E8E6E0, uppercase
  Link: VIEW ALL PARTS 11px, #F5A623, 700, uppercase

### Section heading row (applies to ALL homepage sections)
  Layout:
    display:         flex
    align-items:     center
    justify-content: space-between
    margin-bottom:   16px
    padding:         0

  Left — section title:
    Barlow Condensed 800, 24px, #E8E6E0, uppercase
    letter-spacing: 0.06em

  Right — SHOP ALL link:
    Barlow Condensed 700, 12px, #F5A623, uppercase
    text-decoration: none
    letter-spacing: 0.04em
    content: "SHOP ALL →"

### Nav — vehicle badge (inside nav bar, not below it)
  Position: inside nav flex container, right side
  Style:
    display:        inline-flex
    align-items:    center
    gap:            6px
    border:         1px solid #F5A623
    color:          #F5A623
    background:     transparent
    border-radius:  0
    padding:        6px 12px
    font-family:    Barlow Condensed
    font-size:      12px
    font-weight:    700
    letter-spacing: 0.06em
    text-transform: uppercase

  CURRENT WRONG STATE:
    Vehicle badge renders as a separate full-width
    row below the nav bar

  CORRECT TARGET STATE:
    Vehicle badge is inside the nav bar on the right
    side, between the search bar and cart icon

  Fix requires Liquid change to move the vehicle
  selector snippet from its own row into the nav
  flex container. Check sections/header-group.liquid
  or layout/theme.liquid for where the vehicle
  selector is currently rendered.

## Homepage sections spec

Trust bar:
  bg #111111, border-top and bottom #1E1E1E
  4 cols: Free Shipping, Guaranteed Fitment,
          Manufacturer Warranty, Easy Returns
  Icon: #F5A623, 20px
  Label: Barlow Condensed 700, 12px, #E8E6E0, uppercase
  Subtext: Barlow 400, 11px, #666666

Footer:
  bg #0C0C0C, border-top 2px solid #1E1E1E
  Column headings: Barlow Condensed 700, 12px, #F5A623,
                   uppercase, letter-spacing 0.12em
  Links: Barlow 400, 13px, #666666, hover #E8E6E0
  Copyright: 12px, #3A3A3A

Announcement bar:
  bg #1A1200, border-bottom #2A1E00
  Text: Barlow 600, 12px, #F5A623, uppercase, centered
