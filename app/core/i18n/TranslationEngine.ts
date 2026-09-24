/**
 * TranslationEngine
 * ------------------
 * A small, dependency-free translation core — no @nuxtjs/i18n, no
 * vue-i18n. It exists purely as a plain TypeScript class (same pattern as
 * ThemeManager / StorageEngine elsewhere in app/core) so it stays
 * framework-agnostic and unit-testable on its own.
 *
 * Deliberately stateless with respect to "current locale": earlier
 * versions of this class tracked `currentLocale` internally and emitted
 * change events from a module-level singleton. Under Nuxt's SSR, a plain
 * module-level object is shared by every concurrent request handled by
 * the same Node process — mutating "current locale" on it would leak one
 * visitor's language into another visitor's response. So this class only
 * ever does pure lookups: every call takes the locale it should use as an
 * explicit argument, and never remembers it afterwards.
 *
 * "Current locale" and real-time reactivity live one layer up, in the
 * Vue-facing composable (`useOwnI18n`, see
 * app/composables/useOwnI18n.ts), backed by Nuxt's `useState` — which
 * *is* request-isolated on the server and automatically stays in sync
 * with the client after hydration.
 *
 * Supports:
 *  - dot-path key lookup ("home.hero.title")
 *  - `{token}` interpolation ("Copyright {year}" + { year: 2026 })
 *  - fallback to a configured fallback locale when a key is missing
 *  - dev-time console warnings for missing keys (mirrors the old
 *    i18n.config.ts `missingWarn` behaviour)
 */

export type LocaleCode = string;
export type MessageDictionary = Record<string, unknown>;
export type MessagesMap = Record<LocaleCode, MessageDictionary>;
export type TranslateParams = Record<string, string | number>;

export interface LocaleDescriptor {
  code: LocaleCode;
  name: string;
}

export class TranslationEngine {
  constructor(
    private readonly messages: MessagesMap,
    private readonly fallbackLocale: LocaleCode,
    private readonly warnOnMissingKey = false
  ) {}

  /** All locale codes this engine has messages for. */
  public availableLocales(): LocaleCode[] {
    return Object.keys(this.messages);
  }

  public hasLocale(locale: string): boolean {
    return locale in this.messages;
  }

  /**
   * Resolves `key` against `locale`, falling back to `fallbackLocale`,
   * then to the raw key itself. Pure function of its arguments — no
   * internal state, safe to call concurrently for different locales.
   */
  public translate(key: string, locale: LocaleCode, params?: TranslateParams): string {
    const direct = this.lookup(this.messages[locale], key);
    if (typeof direct === "string") return this.interpolate(direct, params);

    if (locale !== this.fallbackLocale) {
      const fallback = this.lookup(this.messages[this.fallbackLocale], key);
      if (typeof fallback === "string") {
        return this.interpolate(fallback, params);
      }
    }

    if (this.warnOnMissingKey) {
      // eslint-disable-next-line no-console
      console.warn(`[own-i18n] Missing translation key "${key}" (${locale})`);
    }
    return key;
  }

  private lookup(dictionary: MessageDictionary | undefined, path: string): unknown {
    if (!dictionary) return undefined;
    return path.split(".").reduce<unknown>((node, segment) => {
      if (node && typeof node === "object" && segment in (node as object)) {
        return (node as Record<string, unknown>)[segment];
      }
      return undefined;
    }, dictionary);
  }

  private interpolate(template: string, params?: TranslateParams): string {
    if (!params) return template;

    return template.replace(/\{(\w+)\}/g, (match, token: string) =>
      Object.prototype.hasOwnProperty.call(params, token) ? String(params[token]) : match
    );
  }
}
