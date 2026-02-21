# EzzCode — Design System Document

> **Version:** 1.0  
> **Last Updated:** February 22, 2026  
> **Platform:** [ezzcode.online](https://www.ezzcode.online)  
> **Author:** Mahar Ghulam Muhammad  

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Visual Identity](#2-visual-identity)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Layout & Grid](#5-layout--grid)
6. [Component Library](#6-component-library)
7. [Iconography](#7-iconography)
8. [Animations & Transitions](#8-animations--transitions)
9. [Page Specifications](#9-page-specifications)
10. [Data Layer & Backend](#10-data-layer--backend)
11. [Performance & Optimization](#11-performance--optimization)
12. [Accessibility (a11y)](#12-accessibility-a11y)
13. [SEO Strategy](#13-seo-strategy)
14. [Technical Stack](#14-technical-stack)

---

## 1. Brand Overview

### Mission
Empowering future developers through practical, real-world learning, mentorship-driven internship programs, and verifiable industry-recognized certification.

### Tagline
> *"Empowering Future Developers Through Practical Learning"*

### Brand Personality
| Trait          | Expression                                                        |
|----------------|-------------------------------------------------------------------|
| Trustworthy    | Clean, professional layouts; blue-dominant palette                |
| Empowering     | Bold headings, strong CTAs, stats that reinforce credibility      |
| Modern         | Gradient-heavy hero sections, subtle dot-grid patterns, hover FX  |
| Accessible     | Clear hierarchy, legible font sizes, responsive down to 320 px   |

### Logo
- **Wordmark:** `EZZ` (dark/`gray-900`) + `CODE` (blue/`blue-600` or `blue-500`)
- **Icon companion:** `Code2` icon from Lucide (used alongside wordmark in header & footer)
- **Logo files:**
  - `/src/EZZCODE.jpg` — favicon / touch icon
  - `/src/logo_white.jpg` — white variant (OG share image)
  - `/src/logo_black.jpg` — dark variant
  - `/src/logo_white_nobg.png` — transparent white
  - `/src/logo_black_nobg.png` — transparent dark

---

## 2. Visual Identity

### Design Language
The platform follows a **Clean Professional** aesthetic — a balance between corporate trust and modern tech energy achieved through:

- **Gradient hero banners** on every page (`from-blue-900 via-blue-800 to-blue-900`)
- **Dot-grid background pattern** on the main hero (radial-gradient dots at `40 × 40 px` spacing)
- **Card-based content** with subtle shadow elevation (`shadow-md` → `shadow-xl` on hover)
- **Alternating section backgrounds** (`white` ↔ `gray-50` ↔ `blue-50`) for visual rhythm
- **Rounded corners** everywhere (`rounded-lg`, `rounded-xl`) — no sharp edges

### Spacing Rhythm
| Token         | Value     | Usage                                            |
|---------------|-----------|--------------------------------------------------|
| Section `py`  | `py-16`–`py-20` | Vertical breathing room between sections    |
| Inner `px`    | `px-4 sm:px-6 lg:px-8` | Horizontal gutters (responsive)      |
| Card padding  | `p-6`–`p-8` | Inner content padding on cards                |
| Stack gaps    | `space-y-4`–`space-y-8` | Vertical spacing within groups     |
| Grid gaps     | `gap-8`   | Between cards / columns                          |

---

## 3. Color System

### Primary Palette (Blue Family)
| Name            | Tailwind Class  | Hex (approx) | Usage                                              |
|-----------------|-----------------|--------------|-----------------------------------------------------|
| **Blue-900**    | `blue-900`      | `#1e3a8a`    | Hero backgrounds, certificate border, text accents   |
| **Blue-800**    | `blue-800`      | `#1e40af`    | Hero gradient end, CTA sections, theme-color meta    |
| **Blue-700**    | `blue-700`      | `#1d4ed8`    | Button hover, program sidebar gradient end            |
| **Blue-600**    | `blue-600`      | `#2563eb`    | **Primary brand color** — buttons, links, icons, nav active |
| **Blue-500**    | `blue-500`      | `#3b82f6`    | Footer brand accent, social hover                     |
| **Blue-300**    | `blue-300`      | `#93c5fd`    | Hero stats numbers, hero subtitle text                |
| **Blue-100**    | `blue-100`      | `#dbeafe`    | Hero body text, icon bg circles, skill tags           |
| **Blue-50**     | `blue-50`       | `#eff6ff`    | Nav active bg, section tints, certificate bg          |

### Neutral Palette (Gray Family)
| Name            | Tailwind Class  | Usage                                             |
|-----------------|-----------------|---------------------------------------------------|
| **gray-900**    | `gray-900`      | Primary heading text, footer background            |
| **gray-800**    | `gray-800`      | Footer dividers                                    |
| **gray-700**    | `gray-700`      | Body text, nav items (inactive)                    |
| **gray-600**    | `gray-600`      | Secondary text, descriptions                       |
| **gray-500**    | `gray-500`      | Placeholder text, helper text, skill overflow text |
| **gray-400**    | `gray-400`      | Form icons, dropdown chevrons                      |
| **gray-300**    | `gray-300`      | Input borders, footer text                         |
| **gray-200**    | `gray-200`      | Dividers, mobile menu border                       |
| **gray-100**    | `gray-100`      | Skill tag bg (neutral), hover bg                   |
| **gray-50**     | `gray-50`       | Alternate section background, nav hover bg         |
| **White**       | `white`         | Backgrounds, button text on dark, card surfaces    |

### Semantic Colors
| Role      | Success              | Error                | Info                      |
|-----------|----------------------|----------------------|---------------------------|
| Background| `green-50`           | `red-50`             | `blue-50`                 |
| Border    | `green-200`          | `red-200`            | `blue-200`                |
| Text      | `green-700` / `900`  | `red-700` / `900`    | `blue-700`                |
| Icon      | `green-600`          | `red-600`            | `blue-600`                |
| Badge     | `green-100`/`green-800` | `red-100`/`red-800` | `blue-100`/`blue-700`   |

---

## 4. Typography

### Font Stack
- **Primary:** System font stack (Tailwind default)
  ```
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
               "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  ```
- **Monospace:** Used for certificate IDs
  ```
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  ```

### Type Scale
| Element              | Classes                                  | Size (approx)    |
|----------------------|------------------------------------------|------------------|
| **Hero h1**          | `text-4xl md:text-6xl font-bold`         | 36 px → 60 px    |
| **Section h2**       | `text-4xl font-bold` or `text-3xl`       | 30–36 px         |
| **Card h3**          | `text-xl font-bold` or `text-2xl`        | 20–24 px         |
| **Subheading h4**    | `text-sm font-semibold uppercase`        | 14 px (labeled)  |
| **Body paragraph**   | `text-base` or `text-lg`                 | 16–18 px         |
| **Hero subtitle**    | `text-xl md:text-2xl`                    | 20–24 px         |
| **Small / helper**   | `text-sm` or `text-xs`                   | 12–14 px         |
| **Stat number**      | `text-4xl font-bold`                     | 36 px            |
| **Button**           | `text-lg font-semibold` or `font-medium` | 18 px / 16 px    |

### Font Weights
| Weight     | Class           | Usage                               |
|------------|-----------------|-------------------------------------|
| Regular    | `font-normal`   | Body text (default)                 |
| Medium     | `font-medium`   | Nav items, secondary buttons, tags  |
| Semibold   | `font-semibold` | Sub-headings, CTA text, footer h3   |
| Bold       | `font-bold`     | All headings, stats, card titles    |

---

## 5. Layout & Grid

### Responsive Breakpoints
Standard TailwindCSS breakpoints:

| Breakpoint | Prefix | Min-Width |
|------------|--------|-----------|
| Mobile     | —      | 0 px      |
| Small      | `sm:`  | 640 px    |
| Medium     | `md:`  | 768 px    |
| Large      | `lg:`  | 1024 px   |
| XL         | `xl:`  | 1280 px   |

### Max-Width Containers
| Scope              | Class                     | Approx Width |
|---------------------|--------------------------|--------------|
| Full-width container| `max-w-7xl mx-auto`      | 1280 px      |
| Content constraint  | `max-w-6xl mx-auto`      | 1152 px      |
| Narrow content      | `max-w-4xl mx-auto`      | 896 px       |
| Tight content       | `max-w-3xl mx-auto`      | 768 px       |

### Grid Patterns
| Pattern                 | Classes                                         | Usage                      |
|-------------------------|--------------------------------------------------|----------------------------|
| **Stats row**           | `grid grid-cols-2 md:grid-cols-4 gap-8`         | Hero stats strip           |
| **Program cards**       | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8` | Featured programs   |
| **Feature cards**       | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` | Why Choose section  |
| **Footer columns**      | `grid grid-cols-1 md:grid-cols-4 gap-8`         | Footer layout              |
| **Contact layout**      | `grid grid-cols-1 lg:grid-cols-3 gap-8`         | Sidebar + form (1:2 ratio) |
| **Program detail card** | `md:flex` → `md:w-1/3` + `md:w-2/3`            | Horizontal card            |

### Page Shell
```
┌─────────────────────────────────────────────┐
│  Header  (sticky, bg-white, shadow-md, z-50)│
├─────────────────────────────────────────────┤
│  <main className="flex-grow">               │
│    ┌─ Hero Section (gradient bg) ──────────┐│
│    │                                       ││
│    └───────────────────────────────────────┘│
│    ┌─ Content Section (gray-50 / white) ───┐│
│    │                                       ││
│    └───────────────────────────────────────┘│
│    ┌─ CTA Section (gradient bg) ───────────┐│
│    │                                       ││
│    └───────────────────────────────────────┘│
│  </main>                                    │
├─────────────────────────────────────────────┤
│  Footer  (bg-gray-900, text-gray-300)       │
└─────────────────────────────────────────────┘
```

---

## 6. Component Library

### 6.1 Header / Navigation
- **Position:** Sticky top, `z-50`
- **Background:** `bg-white shadow-md`
- **Height:** `h-16`
- **Logo:** `Code2` icon (`h-8 w-8 text-blue-600`) + Wordmark
- **Nav items:** `text-sm font-medium`, hover → `text-blue-600 bg-gray-50`
- **Active state:** `text-blue-600 bg-blue-50`
- **CTA Button:** `bg-blue-600 text-white rounded-lg` (desktop only)
- **Mobile menu:** Hamburger toggle (`Menu` / `X` icons), slide-down panel with `border-t border-gray-200`

### 6.2 Buttons

#### Primary Button
```
px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
font-semibold text-lg transition-all hover:scale-105 shadow-lg
```
- Used for: "Apply Now", main CTAs
- Icon: Optional `ArrowRight` trailing icon

#### Secondary Button (Outline)
```
px-8 py-3 border-2 border-blue-600 text-blue-600
hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all
```
- Used for: "View All Programs", "Learn More"

#### Ghost Button (White border on dark bg)
```
px-8 py-4 border-2 border-white hover:bg-white hover:text-blue-900
text-white rounded-lg font-semibold text-lg transition-all
```
- Used for: "Contact Us" on hero CTA sections

#### Small Button
```
px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
font-medium transition-colors
```
- Used for: Program card CTAs, form submit

#### Full-Width Button (Form Submit)
```
w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed
```

### 6.3 Cards

#### Program Card (Home — Grid)
```
bg-white rounded-xl shadow-md hover:shadow-xl
transition-all duration-300 overflow-hidden group hover:-translate-y-2
```
- Top accent: `h-2 bg-gradient-to-r from-blue-500 to-blue-600`
- Padding: `p-6 space-y-4`
- Category badge: `bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium`
- Skill tags: `bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm`

#### Program Card (Programs Page — Horizontal)
```
bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden
```
- Layout: `md:flex` with sidebar (`md:w-1/3`) + content (`md:w-2/3`)
- Sidebar: `bg-gradient-to-br from-blue-600 to-blue-700` with icon + title
- Skill tags: `bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium`

#### Contact Info Card
```
bg-white rounded-xl shadow-md p-6
```
- Icon container: `w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center`

#### Quick Response Card
```
bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white
```

### 6.4 Form Elements

#### Text Input
```
w-full px-4 py-3 border border-gray-300 rounded-lg
focus:ring-2 focus:ring-blue-500 focus:border-transparent
```

#### Textarea
```
w-full px-4 py-3 border border-gray-300 rounded-lg
focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
```

#### Select Dropdown
```
w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white
```
- Lead icon positioned absolutely: `absolute inset-y-0 left-0 pl-3 flex items-center`
- Custom chevron: SVG arrow positioned absolutely on right

#### File Upload
```
border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
hover:border-blue-500 hover:bg-blue-50 transition-colors
```

#### Labels
```
block text-sm font-medium text-gray-700 mb-2
```
- Required indicator: `<span className="text-red-500">*</span>`
- Optional subtext: `text-gray-500 text-xs`

### 6.5 Alerts / Banners

#### Success Alert
```
p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3
```
- Icon: `CheckCircle h-6 w-6 text-green-600`
- Title: `font-semibold text-green-900`
- Body: `text-green-700`

#### Error Alert
```
p-4 bg-red-50 border border-red-200 rounded-lg
```
- Body: `text-red-700`

### 6.6 Certificate Display
- Container: `border-4 border-blue-900 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-white`
- Certificate ID: `font-mono font-bold text-lg text-blue-900`
- Status Badge (valid): `bg-green-100 text-green-800 px-4 py-2 rounded-full`
- Status Badge (invalid): `bg-red-100 text-red-800 px-4 py-2 rounded-full`

### 6.7 Loading Spinner
```
animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600
```
- Centered: `flex items-center justify-center min-h-[400px]`

### 6.8 Footer
- Background: `bg-gray-900 text-gray-300`
- Logo uses `text-blue-500` accent
- Social icons: `hover:text-blue-500 transition-colors`
- Link hover: `hover:text-blue-500 transition-colors`
- Copyright divider: `border-t border-gray-800 mt-8 pt-8`

### 6.9 Category Filter Pills
```
Active:   px-6 py-2 rounded-full font-medium bg-blue-600 text-white shadow-lg
Inactive: px-6 py-2 rounded-full font-medium bg-white text-gray-700 hover:bg-gray-100 shadow
```

---

## 7. Iconography

### Icon Library
**Lucide React** (`lucide-react`) — lightweight, tree-shakable SVG icons.

### Icon Usage Map
| Icon            | Context                                     | Size      |
|-----------------|----------------------------------------------|-----------|
| `Code2`         | Brand logo companion (header, footer)        | `h-8 w-8` |
| `Code`          | "Real-World Projects" feature                | `h-8 w-8` |
| `Users`         | "Industry Mentorship" feature                | `h-8 w-8` |
| `Briefcase`     | "Internship Experience" feature              | `h-8 w-8` |
| `Award`         | Certificates section, certificate page hero  | `h-16`–`h-24 w-24` |
| `BookOpen`      | Program cards, program selector icon         | `h-6 w-6` / `h-20 w-20` |
| `ArrowRight`    | CTA button trailing icon                     | `h-4`–`h-5 w-5` |
| `CheckCircle`   | Success messages, eligibility, verify button | `h-5`–`h-6 w-6` |
| `XCircle`       | Verification failed                          | `h-6 w-6` |
| `Search`        | Certificate verify button                    | `h-5 w-5` |
| `Clock`         | Program duration badge                       | `h-4 w-4` |
| `Mail`          | Contact info, footer                         | `h-4`–`h-6 w-6` |
| `Send`          | Form submit button                           | `h-5 w-5` |
| `Phone`         | WhatsApp number field                        | `h-5 w-5` |
| `FileText`      | Resume upload, Terms page, certificate info  | `h-4`–`h-16 w-16` |
| `Shield`        | Privacy page hero                            | `h-16 w-16` |
| `Menu` / `X`    | Mobile nav toggle                            | `h-6 w-6` |
| `Linkedin`      | Footer social                                | `h-5 w-5` |
| `Twitter`       | Footer social                                | `h-5 w-5` |
| `Github`        | Footer social                                | `h-5 w-5` |
| `Calendar`      | Certificate issue date                       | `h-5 w-5` |
| `User`          | Certificate student name                     | `h-5 w-5` |

### Icon Styling Convention
- **Default state:** Text color matching context (e.g. `text-blue-600`, `text-gray-400`)
- **Feature icon circles:** `w-16 h-16 bg-blue-100 rounded-full` → hover: `bg-blue-600`, icon → `text-white`
- **`aria-hidden="true"`** on all decorative icons
- **`aria-label`** on all interactive icon-only buttons

---

## 8. Animations & Transitions

### Transition Standards
| Property                    | Class / Value                      |
|-----------------------------|------------------------------------|
| General transitions         | `transition-colors` (color only)   |
| Multi-property transitions  | `transition-all` (all properties)  |
| Duration                    | `duration-300` (300 ms default)    |
| Loading spinner             | `animate-spin`                     |

### Hover Effects
| Component            | Effect                                              |
|----------------------|------------------------------------------------------|
| Primary buttons      | `hover:scale-105` + darker shade                     |
| Program cards (home) | `hover:shadow-xl hover:-translate-y-2`               |
| Program cards (page) | `hover:shadow-xl`                                    |
| Feature icons        | Background circle color swap + icon color inversion   |
| Nav items            | Background tint + text color change                   |
| Footer links         | `hover:text-blue-500`                                |
| File upload area     | `hover:border-blue-500 hover:bg-blue-50`             |

### Scroll Behavior
- Page navigation: `window.scrollTo({ top: 0, behavior: 'smooth' })`

---

## 9. Page Specifications

### 9.1 Home Page (`/` or `#home`)

| Section             | Background                                      | Key Components                              |
|----------------------|--------------------------------------------------|----------------------------------------------|
| **Hero**            | `from-blue-900 via-blue-800 to-blue-900` + dot grid + black overlay | h1, subtitle, 2 CTA buttons, 4-col stats   |
| **Featured Programs** | `bg-gray-50`                                   | 2-col program card grid (max 3), "View All" outline button |
| **Why Choose EzzCode** | `bg-white`                                    | 3-col feature cards with icon circles        |
| **Certificates**    | `from-blue-50 to-blue-100`                      | Certificate preview mock, "Verify" CTA       |
| **CTA Banner**      | `from-blue-900 to-blue-800`                     | Heading, description, 2 CTA buttons          |

### 9.2 Programs Page (`#programs`)

| Section               | Background        | Key Components                                  |
|------------------------|--------------------|-------------------------------------------------|
| **Hero**              | Blue gradient      | h1 + subtitle                                   |
| **Programs List**     | `bg-gray-50`      | Category filter pills, horizontal program cards  |
| **Not Sure CTA**     | `bg-white`        | Heading, description, "Get In Touch" button      |

### 9.3 Certificate Verification Page (`#certificate`)

| Section               | Background        | Key Components                                   |
|------------------------|--------------------|-------------------------------------------------|
| **Hero**              | Blue gradient      | Award icon, h1, subtitle                         |
| **Verification Form** | `bg-gray-50`      | Input + Verify button, result display / error    |
| **Sample IDs**        | `bg-blue-50`      | List of example certificate IDs                  |

### 9.4 Contact Page (`#contact`)

| Section               | Background        | Key Components                                   |
|------------------------|--------------------|-------------------------------------------------|
| **Hero**              | Blue gradient      | h1 + subtitle                                   |
| **Contact Section**   | `bg-gray-50`      | 3-col layout: sidebar (info cards) + form (2-col span) |

**Contact Form Fields:**
| Field                | Type         | Required | Validation             |
|----------------------|-------------|----------|------------------------|
| Full Name            | text         | ✅       | Non-empty              |
| Email Address        | email        | ✅       | Email regex            |
| WhatsApp Number      | tel + select | ✅       | Phone regex            |
| Interested Program   | select       | ✅       | Must select one        |
| Message              | textarea     | ✅       | Non-empty              |
| Resume/CV            | file (PDF)   | ❌       | PDF only, max 2 MB     |

### 9.5 Privacy Policy Page (`#privacy`)

| Section     | Background        | Key Components                 |
|-------------|--------------------|---------------------------------|
| **Hero**    | Blue gradient      | Shield icon, h1, date          |
| **Content** | `bg-white`        | Prose-styled legal text blocks  |

### 9.6 Terms & Conditions Page (`#terms`)

| Section     | Background        | Key Components                 |
|-------------|--------------------|---------------------------------|
| **Hero**    | Blue gradient      | FileText icon, h1, date        |
| **Content** | `bg-white`        | Numbered sections (1–12)        |

---

## 10. Data Layer & Backend

### Backend Service
**Supabase** — Postgres database + Storage + Auth (anon key for public reads).

### Data Models

#### `programs`
| Column        | Type       | Notes                                |
|---------------|-----------|---------------------------------------|
| `id`          | uuid (PK) | Auto-generated                        |
| `title`       | text      | Program display name                  |
| `description` | text      | Full description                      |
| `duration`    | text      | e.g. "8 weeks"                        |
| `skills`      | text[]    | Array of skill strings                |
| `eligibility` | text      | Eligibility criteria                  |
| `category`    | text      | e.g. "Web Development", "AI/ML"      |
| `status`      | text      | `active` / `inactive`                |
| `created_at`  | timestamp | Auto-generated                        |

#### `certificates`
| Column           | Type       | Notes                             |
|------------------|-----------|-----------------------------------|
| `id`             | uuid (PK) | Auto-generated                   |
| `certificate_id` | text      | e.g. `EZZCODE-2024-WD-001`       |
| `student_name`   | text      | Full name                         |
| `program_name`   | text      | Linked program name               |
| `issue_date`     | date      | Date of issuance                  |
| `status`         | text      | `valid` / `revoked`               |
| `created_at`     | timestamp | Auto-generated                    |

#### `contacts`
| Column            | Type       | Notes                             |
|-------------------|-----------|-----------------------------------|
| `name`            | text      | Required                          |
| `email`           | text      | Required, validated               |
| `message`         | text      | Required                          |
| `resume_url`      | text      | Nullable — Supabase Storage URL   |
| `whatsapp_number` | text      | Required, validated               |
| `program_id`      | uuid (FK) | Required — links to `programs.id` |

### Storage
- **Bucket:** `contacts`
- **Path pattern:** `resumes/{SanitizedName}_{timestamp}.pdf`
- **Constraints:** PDF only, max 2 MB
- **Access:** Public URL via `supabase.storage.from('contacts').getPublicUrl()`

---

## 11. Performance & Optimization

### Code Splitting
- **Home page** is **eagerly loaded** (critical path)
- All other pages use **`React.lazy()` + `<Suspense>`** with a spinner fallback

### Build Optimization (Vite)
| Setting                | Value                                   |
|------------------------|-----------------------------------------|
| Minifier               | `esbuild` (faster than Terser)         |
| Manual chunks          | `react-vendor`, `supabase-vendor`      |
| Source maps             | Disabled in production                 |
| Chunk size warning     | 1000 KB                                |
| Lucide excluded        | From `optimizeDeps` (prevents pre-bundling) |

### Network
- **Preconnect** to Supabase endpoint
- **DNS prefetch** for Supabase
- **Lazy loading** for non-critical pages

---

## 12. Accessibility (a11y)

### Standards Followed
- `aria-label` on all interactive elements (buttons, links, nav items)
- `aria-hidden="true"` on all decorative icons
- `aria-current="page"` on active navigation items
- `aria-expanded` on mobile menu toggle
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Form labels with `htmlFor` binding
- Required fields marked with visual `*` indicator
- Focus ring on all inputs: `focus:ring-2 focus:ring-blue-500`
- Color contrast: All text on dark backgrounds uses `text-white`, `text-blue-100`, or `text-blue-300` for sufficient contrast

---

## 13. SEO Strategy

### Meta Tags (per `index.html`)
- Full OG (Open Graph) tags for Facebook/social sharing
- Twitter Card tags (`summary_large_image`)
- Comprehensive keyword meta tag covering tech training verticals
- Canonical URL set to `https://www.ezzcode.online/`
- Dublin Core (DC) metadata for academic/library indexing
- Mobile optimization metadata (`HandheldFriendly`, `MobileOptimized`, `apple-mobile-web-app-capable`)

### Structured Data (JSON-LD)
Three schema blocks embedded in `index.html`:
1. **EducationalOrganization** — courses, contact info, certifications
2. **Organization** — founder, founding date, social links
3. **WebSite** — search action potential

### Analytics
- **Google Analytics** via `gtag.js` (tracking ID: `G-XT4KKGQQJ2`)
- SPA-aware: page views sent on every hash-route change via `useEffect` in `AnalyticsTracker` component

---

## 14. Technical Stack

| Layer        | Technology                                 | Version     |
|--------------|--------------------------------------------|-------------|
| **Framework**| React                                      | 18.3.x      |
| **Language** | TypeScript                                 | 5.5.x       |
| **Build**    | Vite                                       | 5.4.x       |
| **Styling**  | TailwindCSS                                | 3.4.x       |
| **Routing**  | Hash-based custom router (`react-router-dom` imported but hash managed manually) | 7.12.x |
| **Icons**    | Lucide React                               | 0.562.x     |
| **Backend**  | Supabase (Postgres + Storage)              | 2.57.x      |
| **Analytics**| Google Analytics 4 (gtag)                  | —           |
| **Hosting**  | Static hosting (Netlify / Vercel assumed)   | —           |

### Project Structure
```
EzzCode/
├── index.html                  # SPA entry with full SEO meta
├── package.json
├── vite.config.ts              # Build config with chunking
├── tailwind.config.js          # TailwindCSS config
├── postcss.config.js
├── tsconfig.json
├── public/
│   └── _headers                # CDN headers (caching etc.)
├── src/
│   ├── main.tsx                # App bootstrap + GA tracker
│   ├── App.tsx                 # Root → Router
│   ├── index.css               # Tailwind directives
│   ├── global.d.ts             # Type declarations
│   ├── vite-env.d.ts
│   ├── lib/
│   │   └── supabase.ts         # Client + type interfaces
│   ├── components/
│   │   ├── Router.tsx           # Hash-based page router + lazy loading
│   │   ├── Header.tsx           # Sticky nav + mobile menu
│   │   └── Footer.tsx           # Site footer
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── ProgramsPage.tsx     # Program listing (filterable)
│   │   ├── CertificatePage.tsx  # Certificate verification
│   │   ├── ContactPage.tsx      # Contact form + file upload
│   │   ├── PrivacyPage.tsx      # Privacy policy
│   │   └── TermsPage.tsx        # Terms & conditions
│   ├── EZZCODE.jpg              # Favicon
│   ├── logo_white.jpg           # White logo
│   ├── logo_black.jpg           # Dark logo
│   ├── logo_white_nobg.png      # Transparent white
│   └── logo_black_nobg.png      # Transparent dark
└── supabase/
    └── migrations/              # SQL migration files
```

---

## Design Rules & Conventions

### DO ✅
- Use `blue-600` as the primary action color for all interactive elements
- Use gradient hero sections (`from-blue-900 to-blue-800`) on every page
- Alternate section backgrounds for visual rhythm
- Use `rounded-xl` for cards and large containers, `rounded-lg` for buttons and inputs
- Add `hover:scale-105` only on primary CTA buttons (not all buttons)
- Keep all icons from Lucide — do not mix icon libraries
- Use `max-w-7xl mx-auto` for all section containers
- Mark decorative icons with `aria-hidden="true"`

### DON'T ❌
- Don't use colors outside the defined palette
- Don't use sharp corners (`rounded-none`) anywhere
- Don't add custom fonts without updating this document
- Don't inline styles — use Tailwind utility classes exclusively
- Don't use `position: fixed` for anything except the header
- Don't introduce new animation libraries — stick to Tailwind transitions
- Don't skip the hero gradient section on new pages
- Don't use different icon sizes than defined in the icon usage map

---

*This document is the single source of truth for all visual design decisions in the EzzCode platform. Any deviation requires updating this spec first.*
