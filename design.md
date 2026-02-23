# EzzCode — Design System Document
# *Inspired by [ezitech.org](https://ezitech.org)*

> **Version:** 2.0  
> **Last Updated:** February 22, 2026  
> **Platform:** [ezzcode.online](https://www.ezzcode.online)  
> **Author:** Mahar Ghulam Muhammad  

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)  
2. [Visual Identity & Aesthetic](#2-visual-identity--aesthetic)  
3. [Color System](#3-color-system)  
4. [Typography](#4-typography)  
5. [Layout & Grid](#5-layout--grid)  
6. [Component Library](#6-component-library)  
7. [Iconography](#7-iconography)  
8. [Animations & Motion](#8-animations--motion)  
9. [Page Specifications](#9-page-specifications)  
10. [Data Layer & Backend](#10-data-layer--backend)  
11. [Performance & Optimization](#11-performance--optimization)  
12. [Accessibility](#12-accessibility)  
13. [SEO Strategy](#13-seo-strategy)  
14. [Technical Stack](#14-technical-stack)  
15. [Design Rules](#15-design-rules)

---

## 1. Brand Overview

### Mission
Empowering future developers through practical, real-world learning, mentorship-driven internship programs, and verifiable industry-recognized certification.

### Tagline
> *"Shaping & Empowering Future IT Talent"*

### Brand Personality
| Trait         | Expression                                                                   |
|---------------|------------------------------------------------------------------------------|
| Bold          | Dark backgrounds, large hero typography, vibrant accent colors               |
| Modern        | Glassmorphism cards, gradient overlays, animated counters, smooth scroll FX   |
| Professional  | Clean section rhythm, consistent spacing, structured step-based processes    |
| Dynamic       | Scroll-triggered animations, text rotators, hover transforms, particle BGs   |

### Logo
- **Wordmark:** `EZZ` (white on dark) + `CODE` (primary green accent `#00E676` or brand blue)
- **Icon companion:** Custom code bracket icon or `Code2` from Lucide
- **Logo files:** `/src/EZZCODE.jpg`, `/src/logo_white.jpg`, `/src/logo_black.jpg`, transparent PNGs

---

## 2. Visual Identity & Aesthetic

### Design Philosophy — *"Dark Immersive Tech"*
Inspired by ezitech.org, the design shifts from a traditional light corporate look to a **dark-mode-first, immersive tech aesthetic**:

- **Dark hero sections** with particle/dot-grid animated backgrounds
- **Glassmorphism cards** — semi-transparent with backdrop blur and subtle borders
- **Vibrant gradient accents** on CTAs, badges, and section highlights
- **Step-based process sections** with numbered steps and connector lines
- **Scroll-triggered reveal animations** on every major section
- **Text rotator/typewriter** effect in hero section
- **Alternating dark/light sections** — dark dominates (~70%), light accent sections (~30%)
- **Large whitespace** and generous padding for premium feel
- **Floating elements** with subtle parallax movement

### Section Background Pattern
```
Hero       → Dark (#0A0F1C) with animated particles / dot grid
Section 2  → Slightly lighter dark (#111827) 
Section 3  → Dark with gradient overlay
Section 4  → Light accent (#F8FAFC or white) — contrast break
Section 5  → Dark gradient
CTA        → Vibrant gradient (green-to-blue or blue-to-purple)
Footer     → Deepest dark (#050A14)
```

---

## 3. Color System

### Primary Palette — Dark Theme
| Token              | Hex         | Tailwind Approx     | Usage                                    |
|--------------------|-------------|----------------------|------------------------------------------|
| **Base Dark**      | `#0A0F1C`   | `slate-950` custom   | Page background, hero sections           |
| **Surface Dark**   | `#111827`   | `gray-900`           | Card backgrounds, section backgrounds    |
| **Surface Elevated** | `#1E293B` | `slate-800`          | Elevated cards, nav background           |
| **Border Subtle**  | `#1E293B`   | `slate-800`          | Card borders, dividers                   |
| **Border Glass**   | `rgba(255,255,255,0.1)` | —          | Glassmorphism borders                    |

### Accent Colors
| Token              | Hex         | Usage                                          |
|--------------------|-------------|-------------------------------------------------|
| **Primary Green**  | `#00E676`   | Primary CTAs, active states, step numbers, highlights |
| **Primary Blue**   | `#3B82F6`   | Links, secondary actions, info badges           |
| **Accent Purple**  | `#8B5CF6`   | Gradient endpoints, hover glows, tags           |
| **Accent Cyan**    | `#06B6D4`   | Tech labels, code highlights                    |
| **Accent Orange**  | `#F59E0B`   | Warning states, featured badges                 |

### Text Colors
| Token              | Hex / Class              | Usage                              |
|--------------------|--------------------------|------------------------------------|
| **Heading White**  | `#FFFFFF`                | All headings on dark backgrounds   |
| **Body Light**     | `#94A3B8` (`slate-400`)  | Body text, descriptions            |
| **Body Muted**     | `#64748B` (`slate-500`)  | Subtitles, helper text, labels     |
| **Text on Light**  | `#0F172A` (`slate-900`)  | Headings on light sections         |
| **Text Body Light**| `#475569` (`slate-600`)  | Body text on light sections        |

### Semantic Colors
| Role      | Background          | Border             | Text/Icon          |
|-----------|---------------------|---------------------|--------------------|
| Success   | `#052E16` (green-950)| `#16A34A` (green-600)| `#4ADE80` (green-400)|
| Error     | `#450A0A` (red-950) | `#DC2626` (red-600) | `#F87171` (red-400)|
| Info      | `#0C1A3D`           | `#3B82F6` (blue-500)| `#60A5FA` (blue-400)|

### Gradient Presets
| Name                 | Value                                            | Usage          |
|----------------------|--------------------------------------------------|----------------|
| **Hero Gradient**    | `linear-gradient(135deg, #0A0F1C 0%, #1a1a3e 50%, #0A0F1C 100%)` | Hero BG |
| **CTA Gradient**     | `linear-gradient(135deg, #00E676 0%, #3B82F6 100%)` | CTA buttons |
| **Card Glow**        | `linear-gradient(135deg, rgba(0,230,118,0.1), rgba(59,130,246,0.1))` | Card hover |
| **Section Gradient** | `linear-gradient(180deg, #0A0F1C 0%, #111827 100%)` | Section transitions |
| **Purple CTA**       | `linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)` | Secondary CTA |

---

## 4. Typography

### Font Stack
- **Primary (Headings):** `"Inter", "Outfit", system-ui, sans-serif` — load from Google Fonts
- **Secondary (Body):** `"Inter", system-ui, sans-serif`
- **Monospace (Code/IDs):** `"JetBrains Mono", "Fira Code", ui-monospace, monospace`

### Type Scale
| Element                | Size (mobile → desktop) | Weight    | Color          | Extra                 |
|------------------------|-------------------------|-----------|----------------|-----------------------|
| **Hero H1**            | 40px → 72px             | 800       | White          | Letter-spacing: -0.02em |
| **Hero rotating text** | 40px → 72px             | 800       | Primary Green  | Typewriter / rotator  |
| **Section H2**         | 32px → 48px             | 700       | White / Dark   | —                     |
| **Card H3**            | 20px → 24px             | 600       | White          | —                     |
| **Step Label**         | 12px → 14px             | 600       | Primary Green  | Uppercase, tracking wide |
| **Body**               | 16px → 18px             | 400       | Slate-400      | Line-height: 1.7      |
| **Small / Caption**    | 12px → 14px             | 400       | Slate-500      | —                     |
| **Button (Primary)**   | 16px                    | 600       | Dark (#0A0F1C) | On green BG            |
| **Button (Secondary)** | 16px                    | 500       | White          | On transparent/border  |
| **Stat Number**        | 48px → 64px             | 800       | White          | Counter animation      |
| **Stat Label**         | 14px                    | 500       | Slate-400      | Uppercase              |

---

## 5. Layout & Grid

### Breakpoints (Tailwind)
| Name    | Prefix | Min-Width |
|---------|--------|-----------|
| Mobile  | —      | 0px       |
| `sm`    | `sm:`  | 640px     |
| `md`    | `md:`  | 768px     |
| `lg`    | `lg:`  | 1024px    |
| `xl`    | `xl:`  | 1280px    |
| `2xl`   | `2xl:` | 1536px    |

### Container & Spacing
| Scope            | Value                            |
|------------------|----------------------------------|
| Max-width        | `max-w-7xl mx-auto` (1280px)     |
| Section padding  | `py-20 lg:py-28` (80–112px)      |
| Horizontal gutter| `px-6 lg:px-8`                   |
| Card inner       | `p-6 lg:p-8`                     |
| Section gap      | `space-y-6` to `space-y-8`       |
| Grid gap         | `gap-6 lg:gap-8`                 |

### Grid Patterns
| Pattern              | Classes                                                  | Usage             |
|----------------------|----------------------------------------------------------|-------------------|
| Process Steps        | `grid grid-cols-1 md:grid-cols-3 gap-8`                  | 3-step process    |
| Program Cards        | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`   | Service grid      |
| Features / Benefits  | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`   | Benefits grid     |
| Stats Row            | `grid grid-cols-2 md:grid-cols-4 gap-8`                  | Counter strip     |
| Footer               | `grid grid-cols-1 md:grid-cols-4 gap-8`                  | Footer columns    |
| About Split          | `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`    | Text + Image      |
| Testimonials         | Horizontal `overflow-x-auto` or Swiper carousel          | Alumni carousel   |
| Social Links         | `grid grid-cols-2 md:grid-cols-4 gap-4`                  | Social CTA cards  |
| Blog Cards           | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`   | Blog listing      |

### Page Shell
```
┌───────────────────────────────────────────────────────┐
│ Top Bar (contact info, dark, small text)              │
├───────────────────────────────────────────────────────┤
│ Header (transparent → solid on scroll, glassmorphism) │
├───────────────────────────────────────────────────────┤
│ <main>                                                │
│  ┌─ Hero (full-viewport, dark, particles, rotator) ─┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ Process Steps (dark, numbered cards) ───────────┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ About / What We Do (split layout, image+text) ──┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ Stats Counter (dark gradient, animated numbers) ─┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ Programs Grid (cards with hover glow) ──────────┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ Testimonials Carousel (alumni slider) ──────────┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ Partners / Trusted By (logo strip, light bg) ───┐│
│  └──────────────────────────────────────────────────┘│
│  ┌─ CTA (vibrant gradient, bold text + button) ─────┐│
│  └──────────────────────────────────────────────────┘│
│ </main>                                               │
├───────────────────────────────────────────────────────┤
│ Footer (deepest dark, 4-col, newsletter, social)     │
└───────────────────────────────────────────────────────┘
```

---

## 6. Component Library

### 6.1 Top Bar
- Background: `#050A14` (deepest dark)
- Content: Phone number, email, address — `text-xs text-slate-500`
- Hidden on mobile (`hidden md:flex`)

### 6.2 Header / Navigation
- **Default:** Transparent background, blends into hero
- **On scroll:** `backdrop-blur-xl bg-slate-900/80 border-b border-white/10` (glassmorphism)
- **Position:** `sticky top-0 z-50`
- **Logo:** White wordmark with green accent
- **Nav items:** `text-sm font-medium text-slate-300 hover:text-white transition-colors`
- **Active state:** `text-white` with green underline accent (`border-b-2 border-[#00E676]`)
- **CTA Button (header):** Green background `bg-[#00E676] text-[#0A0F1C] rounded-full px-6 py-2 font-semibold hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]`
- **Mobile:** Hamburger → full-screen overlay or slide-in drawer, dark BG, large nav items
- **Dropdown menus:** Glassmorphism panel `bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl`

### 6.3 Buttons

#### Primary (Green CTA)
```css
background: #00E676;
color: #0A0F1C;
padding: 14px 32px;
border-radius: 9999px; /* fully rounded */
font-weight: 600;
transition: all 0.3s ease;
box-shadow: 0 0 0 rgba(0,230,118,0);
&:hover {
  box-shadow: 0 0 25px rgba(0,230,118,0.4);
  transform: translateY(-2px);
}
```

#### Secondary (Outline)
```css
background: transparent;
color: #FFFFFF;
border: 1.5px solid rgba(255,255,255,0.2);
padding: 14px 32px;
border-radius: 9999px;
&:hover {
  border-color: #00E676;
  color: #00E676;
}
```

#### Gradient CTA (Section Banners)
```css
background: linear-gradient(135deg, #00E676, #3B82F6);
color: #0A0F1C;
padding: 16px 40px;
border-radius: 9999px;
font-weight: 700;
&:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,230,118,0.3); }
```

#### Ghost (Links)
```css
color: #00E676;
background: none;
border: none;
text-decoration: underline;
&:hover { color: #3B82F6; }
```

### 6.4 Cards

#### Glassmorphism Card (Programs / Features)
```css
background: rgba(17, 24, 39, 0.6); /* gray-900 at 60% */
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
padding: 32px;
transition: all 0.4s ease;
&:hover {
  border-color: rgba(0,230,118,0.3);
  box-shadow: 0 8px 40px rgba(0,230,118,0.1);
  transform: translateY(-4px);
}
```

#### Step Card (Process Section)
- Step number: Large `text-6xl font-800 text-[#00E676]/20` as watermark behind
- Step label: `text-xs uppercase tracking-widest text-[#00E676] font-semibold`
- Heading: `text-xl font-bold text-white`
- Description: `text-sm text-slate-400`
- Connector line between steps on desktop (CSS pseudo-element, dashed `border-[#00E676]/30`)

#### Testimonial Card
```css
background: rgba(17,24,39,0.5);
border: 1px solid rgba(255,255,255,0.06);
border-radius: 20px;
padding: 32px;
/* Quote icon in top-left, large, green at 10% opacity */
```
- Student name: `text-white font-semibold`
- Role/Program: `text-[#00E676] text-sm`
- Quote text: `text-slate-400 italic`
- Star rating or emoji decorators

#### Blog Card
- Image: `rounded-xl overflow-hidden aspect-video`
- Tag pill: `bg-[#00E676]/10 text-[#00E676] text-xs px-3 py-1 rounded-full`
- Title: `text-lg font-semibold text-white group-hover:text-[#00E676]`
- Date + Author: `text-slate-500 text-sm`
- Card hover: slight lift + border glow

### 6.5 Form Elements
- **Input/Textarea:**
```css
background: #111827;
border: 1px solid rgba(255,255,255,0.1);
color: white;
padding: 14px 18px;
border-radius: 12px;
&:focus { border-color: #00E676; box-shadow: 0 0 0 3px rgba(0,230,118,0.15); }
```
- **Select dropdown:** Same as input, custom chevron icon
- **Labels:** `text-sm font-medium text-slate-300 mb-2`
- **Required marker:** `text-[#00E676]` (green asterisk instead of red)
- **File upload:** Dashed border area `border-2 border-dashed border-white/10 hover:border-[#00E676]/50`

### 6.6 Alerts
- **Success:** `bg-green-950/50 border border-green-600/30 text-green-400 rounded-xl`
- **Error:** `bg-red-950/50 border border-red-600/30 text-red-400 rounded-xl`

### 6.7 Stats Counter Section
- Background: Dark with subtle gradient or dot grid
- Number: `text-5xl md:text-6xl font-extrabold text-white` — animated count-up on scroll
- Suffix: `text-[#00E676]` (e.g., the `+`, `%`, `x`)
- Label: `text-slate-400 uppercase text-sm tracking-wide`
- Dividers between stats on desktop (vertical line `border-r border-white/10`)

### 6.8 Certificate Display
- Container: Glassmorphism card with green border glow `border-[#00E676]/30`
- Certificate ID: `font-mono text-[#00E676] font-bold`
- Status badge (valid): `bg-green-500/10 text-green-400 border border-green-500/30 rounded-full`
- Award icon with green glow ring behind it

### 6.9 Footer
- Background: `#050A14` (deepest dark)
- 4-column grid: Explore More, Internships, Updates (newsletter), Contact
- Logo: White with green accent
- Links: `text-slate-500 hover:text-[#00E676] transition-colors text-sm`
- Newsletter input: Dark input with green submit button
- Social icons: `text-slate-500 hover:text-white` with hover glow
- Bottom bar: `border-t border-white/5`, copyright + Terms + Privacy
- Gradient divider line at top of footer (green-to-blue thin line)

### 6.10 Social CTA Cards (ezitech-style)
- Grid of 4 cards: LinkedIn, YouTube, Facebook, WhatsApp
- Each card: Platform-colored gradient background + icon + "Follow us / Join" text
- Hover: Scale up slightly + shadow

### 6.11 Partners / Trusted By Strip
- Background: White or very light `#F8FAFC`
- Heading: Dark text `text-slate-900`
- Logos: Grayscale by default, color on hover, auto-scrolling marquee or grid

### 6.12 Loading Spinner
```css
width: 48px; height: 48px;
border: 3px solid rgba(255,255,255,0.1);
border-top-color: #00E676;
border-radius: 50%;
animation: spin 0.8s linear infinite;
```

### 6.13 Category Filter Pills
- Active: `bg-[#00E676] text-[#0A0F1C] rounded-full shadow-[0_0_15px_rgba(0,230,118,0.3)]`
- Inactive: `bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white rounded-full border border-white/10`

---

## 7. Iconography

### Icon Library
**Lucide React** — consistent, tree-shakable. All icons render in `currentColor`.

### Icon Styling
- **On dark BG:** `text-[#00E676]` or `text-slate-400`
- **Icon circles:** `w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center` → icon in `text-[#00E676]`
- **Hover:** Icon circle gains `bg-[#00E676]/20` and icon brightens
- **Decorative:** `aria-hidden="true"`
- **Interactive icon-only:** Must have `aria-label`

---

## 8. Animations & Motion

### Scroll-Triggered Reveals
Every major content block uses **fade-in + slide-up** on scroll entry:
```css
/* Initial state */
opacity: 0; transform: translateY(30px);
/* Revealed state */
opacity: 1; transform: translateY(0);
transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
```
- Stagger children by `100ms` delay each
- Use `IntersectionObserver` or a lightweight library like `framer-motion`

### Hero Text Rotator
Cycle through words with fade or typewriter effect:
```
"Empowering Future [Developers] / [Designers] / [Marketers] / [Innovators]"
```
- Rotating word in `text-[#00E676]`
- Transition: Slide-up + fade, 3-second interval

### Animated Counters
Stats numbers count from 0 to target value over ~2 seconds when section enters viewport.

### Hover Effects
| Component            | Effect                                                             |
|----------------------|--------------------------------------------------------------------|
| Primary buttons      | `translateY(-2px)` + green glow shadow                             |
| Cards                | `translateY(-4px)` + border glow + shadow expansion                 |
| Nav items            | Color transition to white + optional underline slide-in             |
| Footer links         | Color shift to green                                               |
| Social cards         | `scale(1.03)` + shadow                                             |
| Blog card images     | `scale(1.05)` within overflow-hidden container                     |
| Category pills       | Background fill transition                                         |

### Particle / Dot Grid Background (Hero)
Subtle animated dots or particles in the hero section:
- CSS radial-gradient dots at `30px` spacing, `rgba(255,255,255,0.03)`
- OR canvas-based particles (lightweight, ~50 particles, slow drift)

### Page Transitions
- Smooth scroll: `scroll-behavior: smooth` globally
- Route change: Quick fade transition (`opacity 0→1`, 200ms)

---

## 9. Page Specifications

### 9.1 Home Page (`/`)
| Section                  | Background                | Key Components                                              |
|--------------------------|---------------------------|--------------------------------------------------------------|
| **Hero**                 | `#0A0F1C` + particles     | H1 with text rotator, subtitle, 2 CTAs (green + outline), hero image/illustration |
| **Process Steps**        | `#111827`                 | 3 step cards (Discover → Evaluate → Track), numbered, connector lines |
| **What We Do**           | Dark gradient             | Split layout: text left + image right, "More about us" link   |
| **Stats Counter**        | Dark with subtle gradient | 4-col animated counter (Students, Success Rate, Projects, Programs) |
| **Programs Grid**        | `#0A0F1C`                 | 6 glassmorphism cards (one per program), icons, "Explore" links |
| **Testimonials**         | `#111827`                 | Horizontal carousel of alumni cards with quotes                |
| **Social CTA**           | Dark                      | 4 social platform cards (LinkedIn, YouTube, Facebook, WhatsApp) |
| **Client Praise**        | Dark gradient             | Large quote carousel with client testimonials                  |
| **Trusted By**           | Light (`#F8FAFC`)         | Partner logo marquee/grid                                      |
| **CTA Banner**           | Green-to-blue gradient    | Bold heading + "Get started now" button                        |

### 9.2 About Page (`#about`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark + overlay | Page title "About Us", mission statement               |
| **Mission / Story**      | Dark           | Split layout: text + image, mission paragraph           |
| **Values Grid**          | `#111827`      | 4 cards: Practical Skills, Innovative Environment, Career-Focused, Empowering |
| **Trusted By**           | Light          | Partner logos                                           |
| **CTA Banner**           | Gradient       | "Start Your Internship" CTA                            |

### 9.3 Programs Page (`#programs`)
| Section                  | Background     | Key Components                                         |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark + overlay | "Our Programs" title, subtitle                          |
| **Category Filters**     | Dark           | Pill filters (All, Web Dev, AI, etc.)                   |
| **Program Cards Grid**   | `#0A0F1C`     | Glassmorphism cards with icon, title, description, skills, duration, CTA |
| **Not Sure CTA**         | `#111827`      | Help text + "Get in Touch" button                       |

### 9.4 Individual Program Pages (`#programs/:slug`)
| Section                  | Background     | Key Components                                         |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | Program title, key highlights (Job Ready, Portfolio, Collaborative) |
| **Mentors / Info**       | Dark           | Start date, duration, student count, top mentors        |
| **Sub-Programs Grid**    | `#111827`      | Cards for each sub-track (e.g., MERN, WordPress, Laravel) with duration, mode, student count |
| **CTA**                  | Gradient       | "Get started now"                                       |

### 9.5 Certificate Verification (`#certificate`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | Award icon with green glow, title, subtitle            |
| **Verification Form**    | `#111827`      | Dark glassmorphism card, input + verify button          |
| **Result Display**       | Dark           | Certificate card with green border glow, status badge   |
| **Sample IDs**           | Dark card      | Example certificate IDs in monospace green              |

### 9.6 Contact Page (`#contact`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "Get in Touch" title                                   |
| **Contact Section**      | `#0A0F1C`     | 3-col: sidebar (info cards, quick response) + form (2-col span), all dark-themed inputs |

### 9.7 Careers Page (`#careers`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "Careers" title                                        |
| **Open Positions**       | Dark           | Job listing cards with title, location, type, apply CTA |

### 9.8 Tech Blogs Page (`#blogs`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "Tech Blogs" title, category filter                    |
| **Blog Grid**            | `#0A0F1C`     | 3-col grid of blog cards with thumbnail, tag, title, excerpt, date |
| **Pagination**           | Dark           | Page numbers with green active state                    |

### 9.9 Seminars Page (`#seminars`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "University Seminars" title                             |
| **Photo Gallery**        | Dark           | University-wise image carousels with university names   |
| **FYP Evaluation**       | `#111827`      | Description + CTA cards (Get Directions, WhatsApp)     |
| **CTA**                  | Gradient       | "Interested in a free seminar?"                        |

### 9.10 Activities Page (`#activities`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "Life at EzzCode" title                                |
| **Activity Feed**        | `#0A0F1C`     | Blog-style cards with images and descriptions           |

### 9.11 MoU / Partnerships Page (`#partnerships`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | "Industry & Academia Collaborations"                   |
| **Partners Grid**        | Dark           | Categorized: Software Houses, Universities — logo cards with descriptions |

### 9.12 Privacy Policy & Terms (`#privacy`, `#terms`)
| Section                  | Background     | Key Components                                        |
|--------------------------|----------------|--------------------------------------------------------|
| **Hero**                 | Dark           | Page icon + title + date                               |
| **Content**              | `#111827`      | Glassmorphism card with prose-styled legal text, white headings, slate-400 body |

---

## 10. Data Layer & Backend

### Backend: Supabase (Postgres + Storage + Auth)

#### Tables
| Table           | Key Columns                                                              |
|-----------------|--------------------------------------------------------------------------|
| `programs`      | id, title, description, duration, skills[], eligibility, category, status |
| `certificates`  | id, certificate_id, student_name, program_name, issue_date, status       |
| `contacts`      | name, email, message, resume_url, whatsapp_number, program_id            |

#### Storage
- Bucket: `contacts` → `resumes/{Name}_{timestamp}.pdf` (PDF, max 2MB)

---

## 11. Performance & Optimization

| Strategy                    | Implementation                                      |
|-----------------------------|------------------------------------------------------|
| Code splitting              | `React.lazy()` + `Suspense` for all pages except Home |
| Vendor chunking             | `react-vendor`, `supabase-vendor` manual chunks       |
| Image optimization          | WebP format, lazy loading, `aspect-ratio` containers  |
| Font loading                | `font-display: swap`, preconnect to Google Fonts      |
| Animation perf              | `will-change: transform` on animated elements         |
| Preconnect                  | Supabase endpoint                                     |
| Minifier                    | esbuild (Vite default)                                |
| Source maps                 | Disabled in production                                |

---

## 12. Accessibility

- `aria-label` on all interactive elements
- `aria-hidden="true"` on decorative icons
- `aria-current="page"` on active nav items
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Focus-visible styles: `outline: 2px solid #00E676; outline-offset: 2px`
- Color contrast: All text on dark backgrounds meets WCAG AA (slate-400 on slate-950 = 7.1:1)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables animations
- Skip-to-content link at top

---

## 13. SEO Strategy

- Full OG + Twitter Card meta on every page
- JSON-LD schemas: EducationalOrganization, Organization, WebSite
- Semantic heading hierarchy (single `<h1>` per page)
- Canonical URLs
- Google Analytics 4 (SPA-aware, fires on route change)
- Descriptive `alt` text on all images
- Sitemap + robots.txt

---

## 14. Technical Stack

| Layer        | Technology            | Version |
|--------------|-----------------------|---------|
| Framework    | React                 | 18.x    |
| Language     | TypeScript            | 5.x     |
| Build        | Vite                  | 5.x     |
| Styling      | TailwindCSS           | 3.x     |
| Routing      | Hash-based custom router | —    |
| Icons        | Lucide React          | latest  |
| Backend      | Supabase              | 2.x     |
| Analytics    | Google Analytics 4    | —       |
| Animations   | CSS + IntersectionObserver (or Framer Motion) | — |
| Fonts        | Google Fonts (Inter)  | —       |

---

## 15. Design Rules

### DO ✅
- Use dark backgrounds (`#0A0F1C`, `#111827`) as the dominant palette
- Use `#00E676` (green) as the primary accent for all CTAs, active states, and highlights
- Use glassmorphism (backdrop-blur + semi-transparent BG + subtle border) for cards
- Use fully-rounded buttons (`rounded-full`) for all CTAs
- Add scroll-triggered fade-in animations on every section
- Include a text rotator/typewriter in the hero
- Use animated counter for stats sections
- Include particle or dot-grid backgrounds in hero sections
- Maintain generous spacing (`py-20 lg:py-28`)
- Keep all icons from Lucide — do not mix libraries
- Use `Inter` or `Outfit` as the primary typeface
- Include a top contact bar on desktop
- Add green glow effects (`box-shadow`) on hover for buttons and cards

 ### DON'T ❌
- Don't use a light/white primary background (dark-first design)
- Don't use square-cornered buttons (always `rounded-full` or `rounded-xl`)
- Don't skip animations — every section should animate on scroll entry
- Don't use basic Tailwind blues as primary — green (`#00E676`) is the brand accent
- Don't use default system fonts — load Inter from Google Fonts
- Don't place more than 4 items in a stats row
- Don't use generic card styles — always use glassmorphism
- Don't add non-Lucide icon libraries
- Don't break the dark aesthetic with large white sections (light sections are accent only)

---

*This document is the single source of truth for all visual design decisions in the EzzCode platform. Inspired by the premium dark aesthetic of [ezitech.org](https://ezitech.org). Any deviation requires updating this spec first.*
