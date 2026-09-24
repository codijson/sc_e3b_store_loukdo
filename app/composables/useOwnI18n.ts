import {
  TranslationEngine,
  type LocaleCode,
  type LocaleDescriptor,
  type MessagesMap,
  type TranslateParams,
} from "~/core/i18n/TranslationEngine";

// Reuses the same locale files @nuxtjs/i18n used to load — one set of
// translated strings, now read by our own engine instead. `~~` resolves
// to the project root regardless of `srcDir`.
import en from "./../../i18n/locales/en.json";
import km from "./../../i18n/locales/km.json";
import zh from "./../../i18n/locales/zh.json";

const FALLBACK_LOCALE: LocaleCode = "en";
const STATE_KEY = "own-i18n-locale";

const LOCALE_NAMES: Record<LocaleCode, string> = {
  en: "English",
  km: "ខ្មែរ",
  zh: "中文",
};

const messages: MessagesMap = { en, km, zh };

// The engine itself holds no per-request state (see TranslationEngine's
// doc comment) — messages, fallback locale, and the dev-warning flag are
// all fixed at startup, so a single module-level instance is safe to
// share across every request and every component.
const engine = new TranslationEngine(messages, FALLBACK_LOCALE, import.meta.dev);

/**
 * useOwnI18n
 * ----------
 * Self-implemented alternative to `useI18n()` from @nuxtjs/i18n — no
 * external module, no build-time codegen, just plain messages + a small
 * translation engine (see TranslationEngine.ts). Exposes the same shape
 * (`locale`, `locales`, `t`, `setLocale`) so it was a near drop-in
 * replacement for every call site that used to call `useI18n()`.
 *
 * Real-time reactivity: `locale` is backed by Nuxt's `useState`, which is
 * a Vue `ref` under the hood — so any template calling `t('some.key')`
 * automatically re-renders the moment `setLocale()` is called anywhere in
 * the app, no manual refresh, no page reload.
 *
 * SSR-safety: `useState` is request-scoped on the server (Nuxt stores it
 * on the current request's Nuxt app instance and serializes it into the
 * page payload for hydration) and shared/reactive on the client — unlike
 * a plain module-level `ref`, it can never leak one visitor's locale into
 * another concurrent request.
 */
export function useOwnI18n() {
  const locale = useState<LocaleCode>(STATE_KEY, () => FALLBACK_LOCALE);

  function t(key: string, params?: TranslateParams): string {
    // Reading `locale.value` here is what makes this reactive: Vue
    // records the dependency during render and reruns it whenever the
    // state changes.
    return engine.translate(key, locale.value, params);
  }

  function setLocale(next: LocaleCode): void {
    if (!engine.hasLocale(next) || next === locale.value) return;
    locale.value = next;
  }

  const locales = computed<LocaleDescriptor[]>(() =>
    engine.availableLocales().map(code => ({
      code,
      name: LOCALE_NAMES[code] ?? code,
    }))
  );

  return {
    locale: readonly(locale),
    locales,
    t,
    setLocale,
  };
}
