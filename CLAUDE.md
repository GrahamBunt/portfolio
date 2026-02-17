# Portfolio — Design & Development Guidelines

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- Deployed on Vercel, auto-deploys from `main` on GitHub

## Visual Design

- **Background**: Pure black (`#000000`)
- **Text**: White (`#ffffff`)
- **Font**: Instrument Serif (Google Fonts), loaded in `layout.tsx` with both `normal` and `italic` styles
- The aesthetic is minimal, clean, and typographically focused

## Entrance Animation

All page content uses a unified reveal animation (`.animate-reveal` in `globals.css`):

- Starts 30px below final position, opacity 0
- Animates upward to resting position while fading in
- Includes a left-to-right gradient mask wipe that reveals text from left to right
- All three effects (translate, opacity, mask) are part of one single CSS animation
- Duration: 2 seconds, easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- Multiple lines are staggered with ~200ms delay between them
- Animation waits for fonts to fully load, plus a 350ms pause, before playing
- The overall feel should be graceful and intentional — like a deep breath, not a snap

## Responsive Design Principles

Design three intentional experiences — mobile, tablet, desktop — not one design that stretches. Inspired by stripe.com.

### Breakpoints

- **Mobile**: < 768px (base/default styles)
- **Tablet**: 768px–1024px (`md:`)
- **Desktop**: > 1024px (`lg:`)
- Most elements only need a mobile and desktop treatment; tablet handles itself in between
- Use fluid sizing (`clamp`, `vw` units) between breakpoints rather than fixed jumps
- Don't over-engineer — `sm:` should rarely be needed

### Typography

- Use fluid font sizes (e.g., `clamp(2rem, 5vw, 4.25rem)`) so text scales smoothly
- Line height should be slightly more open on mobile and tighter on desktop
- Letter-spacing can tighten slightly at larger sizes

### Spacing & Padding

- Padding should feel generous at every screen size, not just smaller on mobile
- Step padding responsively: e.g., `px-6` base → `sm:px-12` → `lg:px-20`
- Maintain vertical rhythm when tightening spacing on smaller screens

### Text Wrapping

- Let text reflow naturally — never fight wrapping
- More lines on smaller screens is expected and fine
- Use one generous `max-width` and let font size + screen width determine line breaks
- The text should look like it belongs at every width, like a well-typeset book
- Don't set rigid line break rules that create awkward spacing

## Animation Principles

- Animations should feel like one cohesive gesture, not layered effects
- Keep CSS animations simple — prefer one `@keyframes` with multiple properties over multiple stacked animations
- Wait for fonts to load before animating text
- Stagger elements for a sequential reveal, but keep delays subtle (100–250ms)
- Ease-out curves that decelerate gracefully
