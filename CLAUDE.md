# CLAUDE.md — Read before every task

## Before touching any file
1. Read .claude/skills/SKILL.md
2. Take a screenshot of the affected live page
3. Grep live HTML for real class names before writing CSS:
   curl -A "Mozilla/5.0" [url] > /tmp/page.html
   grep "class=" /tmp/page.html | grep [keyword]

## Never do
- Guess Horizon theme class names
- Use broad selectors (* / section / .shopify-section alone)
- Edit more than one file per task
- Say "already done" without a screenshot
- Touch layout/theme.liquid unless adding a single asset link
- Touch config/settings_data.json
- Touch any app embed files
- Use !important on broad selectors
- Override .shopify-section background globally
- Apply collection page card styles to homepage
  featured products cards — they use different specs
- Assume all product cards use the same CSS —
  homepage and collection page cards are different

## After every change
- Take a screenshot of the live page
- Compare to mockup in .claude/skills/mockups/
- List every file modified and every line changed

## Definition of done
A section is ONLY done when QA screenshot matches mockup.
Not when the code is written.

## Working order — never skip ahead
1. Collection page
2. Product detail page
3. Homepage sections
4. Global polish

## Primary CSS file
assets/stehlen-theme.css is the single source of truth.
All styling goes here first.
Only edit Liquid files if CSS cannot solve the problem.
