import { AppConfigStoreFactory } from "~/core/storage/AppConfigStore";
import type { SupportedLocale } from "~/core/storage/AppConfigStore";

/**
 * locale
 * ------
 * Boot-time + real-time wiring for `useOwnI18n()`. Replaces three
 * separate @nuxtjs/i18n-era plugins (own-i18n.client.ts,
 * locale-persistence.client.ts, i18n-head.client.ts) with one universal
 * plugin:
 *
 *  1. On both server and client, restores a previously chosen locale from
 *     a cookie — so the very first server-rendered response for a
 *     returning visitor already matches their saved language, with no
 *     post-hydration flash and no `/km/...`-style URL prefix routing
 *     required.
 *  2. On the client only, also falls back to the OOP `local` storage
 *     backend for a device that has a saved preference but no cookie yet
 *     (e.g. cookies cleared).
 *  3. Keeps the cookie, `local` storage, and `<html lang>` all in sync in
 *     real time via a `watch` on the reactive `locale` state — no
 *     polling, no manual refresh, no reload. Every future `setLocale()`
 *     call (from `LocaleSwitcher` or anywhere else) re-runs this
 *     immediately.
 *
 * This is universal (not `.client`-suffixed) on purpose: `useOwnI18n()`'s
 * `locale` is backed by Nuxt's `useState`, which is request-isolated on
 * the server (see useOwnI18n.ts), so it's safe to read/write here during
 * SSR — unlike the old @nuxtjs/i18n-backed plugins, which had to dodge a
 * Nitro bundling error by staying client-only.
 */
const SUPPORTED_LOCALES: readonly SupportedLocale[] = ["en", "km", "zh"];

function isSupportedLocale(
  value: string | null | undefined,
): value is SupportedLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export default defineNuxtPlugin({
  name: "locale",
  setup() {
    const { locale, setLocale } = useOwnI18n();

    const localeCookie = useCookie<SupportedLocale | null>("loukdo_locale", {
      default: () => null,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    if (isSupportedLocale(localeCookie.value)) {
      setLocale(localeCookie.value);
    } else if (import.meta.client) {
      const stored = AppConfigStoreFactory.create("local").getLocale();
      if (stored) setLocale(stored);
    }

    watch(
      locale,
      (value) => {
        localeCookie.value = value as SupportedLocale;
        if (import.meta.client) {
          document.documentElement.lang = value;
          AppConfigStoreFactory.create("local").setLocale(
            value as SupportedLocale,
          );
        }
      },
      { immediate: true },
    );
  },
});
