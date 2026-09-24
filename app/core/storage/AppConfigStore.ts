/**
 * AppConfigStore
 * --------------
 * Single facade the rest of the app talks to for persisted config. It is
 * constructed with a `StorageEngine` (cookie / local / session — see
 * StorageEngine.ts) so the *backend* is injected, not hard-coded, and every
 * key is namespaced to avoid clashing with other cookies/keys the app or
 * third-party scripts might set.
 *
 * Usage:
 *   const store = new AppConfigStore(StorageEngineFactory.create("local"));
 *   store.setLocale("km");
 *   store.getLocale(); // "km"
 *
 * Add new typed accessors the same way `locale` is done below whenever a
 * new piece of config needs persisting — keep raw `get`/`set` for anything
 * ad-hoc.
 */

import { StorageEngineFactory, type StorageEngine, type StorageKind } from "./StorageEngine";

export type SupportedLocale = "en" | "km" | "zh";
export type ThemePreferenceValue = "system" | "light" | "dark";

export interface AppConfigSnapshot {
  locale: SupportedLocale | null;
  theme: ThemePreferenceValue | null;
}

const DEFAULT_NAMESPACE = "loukdo";

export class AppConfigStore {
  constructor(
    private readonly engine: StorageEngine,
    private readonly namespace: string = DEFAULT_NAMESPACE
  ) {}

  /** Namespaced key, e.g. `loukdo:locale`. */
  private key(name: string): string {
    return `${this.namespace}:${name}`;
  }

  // ---- generic, typed access for any config entry -----------------------

  public get<T>(name: string): T | null {
    return this.engine.get<T>(this.key(name));
  }

  public set<T>(name: string, value: T): void {
    this.engine.set<T>(this.key(name), value);
  }

  public remove(name: string): void {
    this.engine.remove(this.key(name));
  }

  /** Removes every config entry this store owns (matches its namespace). */
  public reset(): void {
    this.engine.clear(this.namespace);
  }

  public get backend(): StorageKind {
    return this.engine.kind;
  }

  // ---- convenience accessors for well-known config entries --------------

  public getLocale(): SupportedLocale | null {
    return this.get<SupportedLocale>("locale");
  }

  public setLocale(locale: SupportedLocale): void {
    this.set<SupportedLocale>("locale", locale);
  }

  public getThemePreference(): ThemePreferenceValue | null {
    return this.get<ThemePreferenceValue>("theme");
  }

  public setThemePreference(theme: ThemePreferenceValue): void {
    this.set<ThemePreferenceValue>("theme", theme);
  }

  public snapshot(): AppConfigSnapshot {
    return {
      locale: this.getLocale(),
      theme: this.getThemePreference(),
    };
  }
}

/** Convenience factory so callers rarely need to import StorageEngineFactory directly. */
export class AppConfigStoreFactory {
  private static instances = new Map<StorageKind, AppConfigStore>();

  static create(
    backend: StorageKind = "local",
    namespace: string = DEFAULT_NAMESPACE
  ): AppConfigStore {
    const cacheKey = backend;
    const cached = this.instances.get(cacheKey);
    if (cached) return cached;

    const store = new AppConfigStore(StorageEngineFactory.create(backend), namespace);
    this.instances.set(cacheKey, store);
    return store;
  }
}
