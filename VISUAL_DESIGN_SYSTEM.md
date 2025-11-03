# JellyGuard Visual Design System

## 🎨 Color Palette

### Primary Colors
```
Navy:   #0b1b2b  ███████  Trust, depth, professionalism
Teal:   #1aa3a3  ███████  Innovation, ocean, technology  
Sand:   #edf5f7  ███████  Calm, clarity, openness
Coral:  #ff7f66  ███████  Energy, action (accents only)
```

### Semantic Usage
- **Backgrounds:** Sand (#edf5f7) and White (#ffffff) for light sections
- **Backgrounds:** Navy (#0b1b2b) for contrast/emphasis sections
- **Primary CTA:** Teal (#1aa3a3) - main action buttons
- **Accent:** Coral (#ff7f66) - badges, checkmarks, highlights
- **Text:** Navy (#0b1b2b) on light backgrounds, White on navy

---

## 🌊 Section Flow & Color Alternation

```
┌─────────────────────────────────────────┐
│  HERO                                   │  Light blue gradient (animated)
│  "Protect Your Operations — Naturally" │  + Floating jellyfish
└─────────────────────────────────────────┘
           ▼  Wave Divider
┌─────────────────────────────────────────┐
│  OPENING / THE CHALLENGE                │  White background
│  Problem statement                      │  + Subtle wave pattern
└─────────────────────────────────────────┘
           ▼  Wave Divider (flipped)
┌─────────────────────────────────────────┐
│  PROMISE / NATURE-INSPIRED              │  Navy background (dark)
│  Solution introduction                  │  + Bubble field
└─────────────────────────────────────────┘
           ▼  Wave Divider
┌─────────────────────────────────────────┐
│  GLOBAL IMPACT / CRISIS                 │  Sand background
│  Problem vs Solution cards              │  + World map dots
└─────────────────────────────────────────┘
           ▼  Wave Divider (flipped)
┌─────────────────────────────────────────┐
│  FOUR STEPS / HOW IT WORKS              │  White background
│  Process overview (non-technical)       │  + Grid pattern
└─────────────────────────────────────────┘
           ▼  Wave Divider
┌─────────────────────────────────────────┐
│  DIFFERENTIATORS / WHY CHOOSE           │  Sand background
│  4 key benefits                         │  + Water caustics
└─────────────────────────────────────────┘
           ▼  Wave Divider (flipped)
┌─────────────────────────────────────────┐
│  WHO WE PROTECT                         │  White background
│  Target audience                        │
└─────────────────────────────────────────┘
           ▼  Wave Divider
┌─────────────────────────────────────────┐
│  SITE REQUIREMENTS                      │  White background
│  Integration simplicity                 │
└─────────────────────────────────────────┘
           ▼  Wave Divider (flipped)
┌─────────────────────────────────────────┐
│  COMMERCIAL MODEL                       │  Sand background
│  Partnership approach                   │
└─────────────────────────────────────────┘
           ▼  Wave Divider
┌─────────────────────────────────────────┐
│  SAFETY & ECOLOGY                       │  White background
│  Conservation credentials               │
└─────────────────────────────────────────┘
           ▼  Wave Divider (flipped)
┌─────────────────────────────────────────┐
│  FINAL CTA                              │  Navy background (dark)
│  Schedule consultation                  │  + Radial glow
└─────────────────────────────────────────┘
```

**Pattern:** Light → Dark → Light creates visual rhythm and maintains engagement

---

## 🎬 Animation Timing Guide

### Entrance Animations (Scroll-triggered)
```
Section appears in viewport
    ↓
Wait 0-100ms (viewport margin)
    ↓
Fade in + Translate Y
    ↓
Duration: 700ms
Easing: cubic-bezier(0.22, 1, 0.36, 1)
    ↓
Complete
```

### Staggered Card Animations
```
Section enters viewport
    ↓
Card 1: delay 0ms   ────→ Animates
    ↓
Card 2: delay 100ms ────→ Animates
    ↓
Card 3: delay 200ms ────→ Animates
    ↓
Card 4: delay 300ms ────→ Animates
```

### Hover Interactions
- **Duration:** 300ms
- **Easing:** cubic-bezier(0.34, 1.56, 0.64, 1) (slight bounce)
- **Transform:** translateY(-4px) for cards, scale(1.1) for icons
- **Shadow:** Increase blur + opacity

---

## 🌊 Background Layers (Z-Index Strategy)

```
┌─────────────────────────────────────────┐
│  Z-INDEX LAYERS                         │
├─────────────────────────────────────────┤
│  z-9999: Grain texture overlay          │
│  z-50:   Header (sticky)                │
│  z-10:   Content layer                  │
│  z-1:    Content elements (default)     │
│  z-0:    DepthGradient (scroll-reactive)│
│  z-0:    FloatingJellyfish              │
│  z-0:    ParticleWaves (optional)       │
│  -z-10:  Section-specific decorations   │
│  -z-19:  Hero floating particles        │
│  -z-20:  Hero gradient mesh             │
└─────────────────────────────────────────┘
```

**Key Principle:** Background effects never interfere with content interaction

---

## 🎯 Interactive Elements

### Buttons
```css
/* Primary CTA (Teal) */
.btn-primary {
  background: #1aa3a3;
  hover: scale(1.05) + shadow-lg;
  active: scale(0.98);
}

/* Secondary CTA (Outlined) */
.btn-secondary {
  border: 2px solid #1aa3a3;
  hover: bg-teal + text-white;
}

/* Glass CTA (Transparent) */
.glass {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  hover: bg-navy + text-white;
}
```

### Cards
```css
.card-glass {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  hover: translateY(-4px) + shadow-md;
}
```

### Icons
```css
.icon {
  transition: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  hover: scale(1.1) + rotate(5deg);
}
```

---

## 📐 Spacing System

### Section Padding
```
Mobile:  py-16  (4rem / 64px)
Tablet:  py-24  (6rem / 96px)
Desktop: py-32  (8rem / 128px)
```

### Content Max-Width
```
Standard section: max-w-7xl  (1280px)
Text-focused:     max-w-4xl  (896px)
Wide layout:      max-w-6xl  (1152px)
```

### Gap System
```
Card grids:  gap-6 md:gap-8   (1.5rem → 2rem)
Text flow:   space-y-4        (1rem vertical)
Icon + Text: gap-2 md:gap-3   (0.5rem → 0.75rem)
```

---

## 🎨 Typography Scale

### Headings
```
h1 (Hero):     text-4xl sm:text-5xl md:text-6xl lg:text-7xl
h2 (Section):  text-3xl md:text-4xl lg:text-5xl
h3 (Card):     text-xl md:text-2xl
Kicker:        text-xs md:text-sm (uppercase, tracking-wider)
```

### Body Text
```
Large:   text-lg md:text-xl    (For hero tagline, section intros)
Medium:  text-base              (Default body text)
Small:   text-sm                (Card descriptions, captions)
```

### Font Weights
```
Bold:      font-bold (700)      For headings, CTAs
Semibold:  font-semibold (600)  For subheadings, kickers
Medium:    font-medium (500)    For emphasized body text
Regular:   font-normal (400)    For standard body text
```

---

## 🌊 Atmospheric Effect Parameters

### FloatingJellyfish
```javascript
Count:     8 jellyfish
Opacity:   0.03 - 0.07
Duration:  25 - 45 seconds
Movement:  Gentle drift (±30px XY)
Blur:      filter: blur(0.5rem)
```

### DepthGradient
```javascript
Start:     rgba(200,233,245,0)   Light blue
Mid:       rgba(26,163,163,0.15) Teal
End:       rgba(11,27,43,0.4)    Navy
Trigger:   scrollYProgress
Easing:    Spring physics (stiffness: 100, damping: 30)
```

### ParticleWaves (Optional)
```javascript
Count:     20 particles
Opacity:   0.2 - 0.5 (pulsing)
Duration:  4 - 8 seconds
Movement:  Vertical oscillation (±10px)
```

### BubbleField
```javascript
Bubbles:   12 bubbles per instance
Rise time: 15-25 seconds
Opacity:   0 → 0.6 → 0.3 → 0
Scale:     0.8 → 1.2
```

---

## 🎯 Conversion-Focused Design

### Primary CTA Hierarchy
```
1. Hero: "Schedule Consultation" (largest, teal, shadow)
2. Final CTA: "Schedule Consultation" (large, teal, glow)
3. Header: "Schedule a consultation" (small, outlined)
```

### Visual Cues for Trust
- ✓ Coral checkmarks on benefit cards
- 🌍 World map overlay on Global Impact
- 🔢 Numbered steps with connecting line
- 📊 Stat badges ("90% reduction", "field-tested")
- 🎓 Credentials ("certified by marine biologists")

---

## 🔄 Responsive Breakpoints

```
Mobile:     < 640px   (sm)
Tablet:     640-768px (md)
Desktop:    768-1024px (lg)
Wide:       > 1024px  (xl)
```

### Responsive Adjustments
- **Mobile:** Single column, larger touch targets, simplified animations
- **Tablet:** 2-column grids, medium text sizes
- **Desktop:** 4-column grids (steps), full parallax effects
- **Wide:** Max content width maintained, more whitespace

---

## ✨ Micro-Interactions Checklist

- [x] Button hover: scale + gradient overlay
- [x] Card hover: lift + shadow increase
- [x] Icon hover: scale + subtle rotation
- [x] Link hover: color shift + underline
- [x] Step badge hover: glow + sparkle
- [x] Scroll: depth gradient transition
- [x] Scroll: section fade-up reveals
- [x] Background: floating jellyfish drift
- [x] Background: particle gentle oscillation

---

## 🎨 Design Philosophy Summary

**Three Core Principles:**

1. **Calm Confidence**
   - Slow, deliberate animations (6-45s durations)
   - Soft color palette (blues, teals, sand)
   - Generous whitespace
   - Professional typography

2. **Environmental Connection**
   - Ocean-inspired visuals (jellyfish, waves, bubbles)
   - Natural movement patterns (drift, float, sway)
   - Depth metaphor (light surface → deep ocean)
   - Biomimetic language ("works with nature")

3. **Trustworthy Innovation**
   - Clean, minimal layouts
   - Data-driven messaging
   - Credibility markers
   - Sophisticated animations (not gimmicky)

---

## 📊 Performance Targets

```
Lighthouse Scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

Animation FPS: 60fps (smooth)
Layout Shifts: < 0.1 CLS
First Paint: < 1.5s
Interactive: < 3.5s
```

---

## 🎬 Animation Budget

To maintain 60fps:
- Maximum 8 floating jellyfish (GPU-accelerated)
- Maximum 20 particle waves (simple opacity/translate)
- Staggered reveals limited to 4-6 items max
- Hover effects use transform only (no layout changes)
- Scroll effects use Framer Motion (optimized)

---

This visual design system ensures consistency, performance, and a compelling user experience that balances technical credibility with environmental sensitivity. 🌊✨
