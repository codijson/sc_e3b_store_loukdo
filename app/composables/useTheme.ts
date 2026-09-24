import {
  NuxtThemeManager,
  type ThemePreference,
} from "~/core/theme/ThemeManager";

/**
 * useTheme
 * --------
 * Thin composable bridge between Nuxt's reactive `useColorMode()` and the
 * framework-agnostic ThemeManager class. Components should talk to this,
 * never to `useColorMode()` directly, so the OOP layer stays the single
 * source of behaviour.
 */
export function useTheme() {
  const colorMode = useColorMode();
  const manager = new NuxtThemeManager(colorMode);

  const preference = computed<ThemePreference>({
    get: () => manager.preference,
    set: (value) => manager.set(value),
  });

  const isDark = computed(() => manager.isDark());

  function setTheme(preferenceValue: ThemePreference) {
    manager.set(preferenceValue);
  }

  function toggleTheme() {
    manager.toggle();
  }

  function cycleTheme() {
    manager.cycle();
  }

  return { preference, isDark, setTheme, toggleTheme, cycleTheme };
}
