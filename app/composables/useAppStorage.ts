import {
  AppConfigStoreFactory,
  type SupportedLocale,
  type ThemePreferenceValue,
} from "~/core/storage/AppConfigStore";
import type { StorageKind } from "~/core/storage/StorageEngine";

/**
 * useAppStorage
 * -------------
 * Thin composable bridge between components and the framework-agnostic
 * `AppConfigStore` (cookie / localStorage / sessionStorage). Components
 * should talk to this, never to `window.localStorage` etc. directly, so
 * the OOP storage layer stays the single source of persistence behaviour.
 *
 * @param backend which engine backs this store — defaults to `local`
 *   (localStorage). Pass `"cookie"` for values that must also be readable
 *   during SSR on the next request, or `"session"` for per-tab state.
 */
export function useAppStorage(backend: StorageKind = "local") {
  const store = AppConfigStoreFactory.create(backend);

  function getConfig<T>(key: string): T | null {
    return store.get<T>(key);
  }

  function setConfig<T>(key: string, value: T): void {
    store.set<T>(key, value);
  }

  function getStoredLocale(): SupportedLocale | null {
    return store.getLocale();
  }

  function setStoredLocale(locale: SupportedLocale): void {
    store.setLocale(locale);
  }

  function getStoredTheme(): ThemePreferenceValue | null {
    return store.getThemePreference();
  }

  function setStoredTheme(theme: ThemePreferenceValue): void {
    store.setThemePreference(theme);
  }

  return {
    store,
    getConfig,
    setConfig,
    getStoredLocale,
    setStoredLocale,
    getStoredTheme,
    setStoredTheme,
  };
}
