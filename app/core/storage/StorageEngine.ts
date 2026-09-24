/**
 * StorageEngine
 * -------------
 * Framework-agnostic persistence layer. Three concrete engines (cookie,
 * localStorage, sessionStorage) all implement the same tiny interface, so
 * anything that needs to persist config — locale, theme, onboarding flags,
 * whatever — can depend on `StorageEngine` and stay indifferent to *where*
 * the value actually lives. Swapping the backend is a one-line change.
 *
 * All engines are SSR-safe: on the server (no `window`/`document`) every
 * call is a silent no-op / returns `null`, so this file can be imported
 * from anywhere, including Nuxt composables, without guards at call sites.
 */

export type StorageKind = "cookie" | "local" | "session";

export interface StorageEngine {
  readonly kind: StorageKind;
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(prefix?: string): void;
}

const isBrowser = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

/** Shared JSON encode/decode so every engine stores values the same way. */
abstract class BaseStorageEngine implements StorageEngine {
  public abstract readonly kind: StorageKind;

  protected abstract read(key: string): string | null;
  protected abstract write(key: string, raw: string): void;
  protected abstract erase(key: string): void;
  protected abstract keys(): string[];

  public get<T>(key: string): T | null {
    if (!isBrowser()) return null;
    const raw = this.read(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  public set<T>(key: string, value: T): void {
    if (!isBrowser()) return;
    this.write(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    if (!isBrowser()) return;
    this.erase(key);
  }

  public clear(prefix?: string): void {
    if (!isBrowser()) return;
    for (const key of this.keys()) {
      if (!prefix || key.startsWith(prefix)) this.erase(key);
    }
  }
}

/** Cookie-backed engine — the only one readable on subsequent SSR requests. */
export class CookieStorageEngine extends BaseStorageEngine {
  public readonly kind: StorageKind = "cookie";

  constructor(private readonly maxAgeDays = 365) {
    super();
  }

  protected read(key: string): string | null {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`));
    if (!match) return null;
    const value = match.slice(key.length + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return null;
    }
  }

  protected write(key: string, raw: string): void {
    const maxAge = this.maxAgeDays * 24 * 60 * 60;
    document.cookie = `${key}=${encodeURIComponent(raw)}; path=/; max-age=${maxAge}; samesite=lax`;
  }

  protected erase(key: string): void {
    document.cookie = `${key}=; path=/; max-age=0; samesite=lax`;
  }

  protected keys(): string[] {
    return document.cookie
      .split("; ")
      .map((row) => row.split("=")[0])
      .filter((key): key is string => Boolean(key));
  }
}

/** Persists across browser restarts, scoped to the origin. */
export class LocalStorageEngine extends BaseStorageEngine {
  public readonly kind: StorageKind = "local";

  protected read(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  protected write(key: string, raw: string): void {
    window.localStorage.setItem(key, raw);
  }

  protected erase(key: string): void {
    window.localStorage.removeItem(key);
  }

  protected keys(): string[] {
    return Object.keys(window.localStorage);
  }
}

/** Cleared when the browser tab closes — good for transient/per-visit state. */
export class SessionStorageEngine extends BaseStorageEngine {
  public readonly kind: StorageKind = "session";

  protected read(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  protected write(key: string, raw: string): void {
    window.sessionStorage.setItem(key, raw);
  }

  protected erase(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  protected keys(): string[] {
    return Object.keys(window.sessionStorage);
  }
}

/** Picks the concrete engine for a given backend kind. */
export class StorageEngineFactory {
  private static cache = new Map<StorageKind, StorageEngine>();

  static create(kind: StorageKind): StorageEngine {
    const cached = this.cache.get(kind);
    if (cached) return cached;

    const engine =
      kind === "cookie"
        ? new CookieStorageEngine()
        : kind === "local"
          ? new LocalStorageEngine()
          : new SessionStorageEngine();

    this.cache.set(kind, engine);
    return engine;
  }
}
