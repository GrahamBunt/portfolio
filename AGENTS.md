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
- TranslateY and mask complete in 1.4s; opacity fades in over 2s for a softer finish
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- All movement and mask properties reach final values at 80–85% of their duration, leaving the tail end with zero visible drift
- Multiple lines are staggered with ~120ms delay between them
- Animation waits for fonts to fully load, plus a 350ms pause, before playing
- The overall feel should be graceful and intentional — like a deep breath, not a snap

## Homepage Vision & Load Sequence

The homepage has three sections that animate in sequentially on load:

1. **Hero text** (already built) — animates in first with the current reveal animation
2. **Segmented control** with "Projects" and "Snippets" tabs — animates in after the hero text settles, using a similar opacity and gradient reveal
3. **Content peek below the fold** — animates in after the segmented control, encouraging scroll

The entire load sequence should feel like one choreographed animation — each element follows the previous one naturally with consistent animation language throughout.

### Segmented Control

The segmented control switches between two content views:

- **Projects**: vertical stack of case study cards with header, description, CTA button, and image
- **Snippets**: three-column masonry grid with staggered card heights, showcasing UI work, interactions, animated gifs, and personal photos for personality

### Content Guidelines

- All new elements should follow the responsive design principles already established
- Animation timing for new sections should use the same easing curve and reveal style as the hero text
- Stagger delays between sections should feel natural — each section waits for the previous one to settle before beginning

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
