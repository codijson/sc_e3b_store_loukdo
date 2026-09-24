/**
 * ThemeManager
 * ------------
 * Encapsulates all colour-scheme logic (system / light / dark) behind a
 * small, testable class rather than scattering `document.documentElement`
 * calls across components. The Nuxt Color Mode module supplies the
 * reactive `$colorMode` object; this class wraps it with an explicit,
 * intention-revealing API.
 */

export type ThemePreference = "system" | "light" | "dark";

export interface ColorModeLike {
  preference: string;
  value: string;
  unknown?: boolean;
}

export abstract class ThemeManagerBase {
  protected abstract getMode(): ColorModeLike;

  /** The user's stored preference: 'system' | 'light' | 'dark'. */
  public get preference(): ThemePreference {
    return (this.getMode().preference as ThemePreference) ?? "system";
  }

  /** The resolved, currently-applied theme ('light' | 'dark'). */
  public get resolved(): "light" | "dark" {
    return this.getMode().value === "dark" ? "dark" : "light";
  }

  public isDark(): boolean {
    return this.resolved === "dark";
  }

  public abstract set(preference: ThemePreference): void;

  public toggle(): void {
    this.set(this.isDark() ? "light" : "dark");
  }

  /** Cycles system -> light -> dark -> system, useful for a single button UI. */
  public cycle(): void {
    const order: ThemePreference[] = ["system", "light", "dark"];
    const next =
      order[(order.indexOf(this.preference) + 1) % order.length] ?? "system";
    this.set(next);
  }
}

/**
 * Concrete implementation bound to a Nuxt `useColorMode()` ref-like object.
 * Kept separate from the abstract base so the logic above is framework
 * agnostic and unit-testable without mounting Nuxt.
 */
export class NuxtThemeManager extends ThemeManagerBase {
  constructor(private readonly colorMode: ColorModeLike) {
    super();
  }

  protected getMode(): ColorModeLike {
    return this.colorMode;
  }

  public set(preference: ThemePreference): void {
    this.colorMode.preference = preference;
  }
}
