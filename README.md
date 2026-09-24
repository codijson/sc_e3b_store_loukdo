# Loukdo — Marketing Site

Nuxt 3 + TypeScript rebuild of the Loukdo marketing site (Home, Features,
About Us, Contact Us, Terms & Conditions), with dark/light mode, SEO +
social sharing metadata, and English / Khmer / Chinese localization.

## Stack

- **Nuxt 3** (Vue 3, TypeScript, Vite)
- **Tailwind CSS** for utility styling + **SCSS** for design tokens and
  hand-written component styles (`app/assets/scss`)
- **@nuxtjs/color-mode** — dark / light / system theme, persisted
- Self-built `en` (default) / `km` / `zh` localization — no
  `@nuxtjs/i18n`/vue-i18n dependency. `app/core/i18n/TranslationEngine.ts`
  is a small, framework-agnostic message-lookup class; `useOwnI18n()`
  wraps it in Nuxt's SSR-safe `useState` for real-time reactivity; the
  cookie/localStorage persistence and `<html lang>` sync live in
  `app/plugins/locale.ts`. No URL locale prefix (`/km/...`) — the active
  language is a stored preference, not part of the route.
- OOP core layer (`app/core/**`) — `ThemeManager`, `SeoBuilder`,
  `NavigationService`, `ContactFormValidator`, `TermsDocument` — framework
  -agnostic classes consumed by thin composables in `app/composables`
- Docker multi-stage build for deployment

## Project layout

```
app/
  assets/scss/       design tokens, mixins, global styles
  components/
    layout/           header, footer, theme + locale switchers
    ui/                BaseButton, BaseCard, SectionHeading
    home/ features/ about/ contact/ terms/   page-specific sections
  composables/         useTheme, usePageSeo, useNavigation
  core/                OOP domain layer (see below)
  layouts/default.vue
  pages/               index, features, about, contact, terms
  plugins/
i18n/locales/          en.json, km.json, zh.json
public/                favicon, robots.txt
scripts/obfuscate.mjs  optional post-build obfuscation pass
```

### OOP core (`app/core`)

| Class                                   | Responsibility                                                   |
| --------------------------------------- | ---------------------------------------------------------------- |
| `ThemeManagerBase` / `NuxtThemeManager` | Resolve/set light-dark-system preference                         |
| `SeoBuilder`                            | Fluent builder for per-page `<meta>` / Open Graph / Twitter tags |
| `NavigationService`                     | Single source of truth for header + footer links                 |
| `ContactFormValidator`                  | Rule-based validation for the contact form                       |
| `TermsDocument`                         | Structured model of the 16-section Terms & Conditions doc        |

Composables (`useTheme`, `usePageSeo`, `useNavigation`) are thin
Vue-reactive wrappers around these classes — components never touch
`useColorMode()` or raw `useSeoMeta()` calls directly.

## Getting started

```bash
npm install
npm run dev        # http://localhost:9050
```

## Building

```bash
npm run build              # standard Nuxt production build (.output/)
npm run build:obfuscate    # build, then obfuscate client JS bundles
npm run preview            # preview the production build locally
```

## Docker

```bash
docker compose up --build
# site available on http://localhost:9050
```

Or plain Docker:

```bash
docker build -t loukdo-web .
docker run -p 9050:9050 loukdo-web
```

## Localization

Add or edit strings in `i18n/locales/{en,km,zh}.json`. Keys are grouped by
page (`home.*`, `features.*`, `about.*`, `contact.*`, `terms.*`) plus
shared `nav.*` / `footer.*` / `theme.*` groups. The Terms & Conditions
legal body currently ships in English as the authoritative text for `km`
and `zh`; a banner on the page links to `legal@loukdo.com` for an official
translated copy — replace with full translations when legal sign-off is
ready.

## Theming

`useTheme()` exposes `preference` (`system` | `light` | `dark`),
`isDark`, and `setTheme()/toggleTheme()/cycleTheme()`. Dark mode is
class-based (`darkMode: 'class'` in `tailwind.config.ts`) and follows the
OS preference by default.

## Notes

- Replace placeholder legal fields in `i18n/locales/en.json` (`[XXXX]`
  registration numbers, arbitration centre choice, etc.) with real values
  before publishing.
- `scripts/obfuscate.mjs` obfuscates only the client bundle
  (`.output/public/_nuxt`); the Nitro server output is left readable.
