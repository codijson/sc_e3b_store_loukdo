// plugins/reveal.ts
// Registers a global `v-reveal` directive used to animate sections and
// components into view as the user scrolls.
//
// This plugin runs on both server and client so the directive is always
// resolvable during SSR (a client-only plugin would leave `v-reveal`
// unregistered server-side and crash Vue's SSR renderer). The actual
// IntersectionObserver work only ever happens in the browser — guarded by
// a `typeof window` check — and `getSSRProps` mirrors the classes/inline
// style the client would add on mount, so the server-rendered markup
// already starts in its hidden state and there's no flash of visible
// content before the reveal animation kicks in. Fully inert when
// prefers-reduced-motion is on, since main.scss collapses the transition
// durations to ~0.
//
// Usage:
//   <section v-reveal>...</section>                 fade + slide up
//   <div v-reveal="'left'">...</div>                 fade + slide from left
//   <div v-reveal="'right'">...</div>                fade + slide from right
//   <div v-reveal="'scale'">...</div>                fade + scale in
//   <div v-reveal="{ type: 'left', delay: 120 }">     with a stagger delay (ms)

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";
interface RevealOptions {
  type?: RevealVariant;
  delay?: number;
}
type RevealBindingValue = RevealVariant | RevealOptions | undefined;

function resolveRevealVariant(value: RevealBindingValue): RevealVariant {
  return typeof value === "string" ? value : (value?.type ?? "up");
}

function resolveRevealDelay(value: RevealBindingValue): number | undefined {
  return typeof value === "object" ? value.delay : undefined;
}

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null;

  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
  }

  nuxtApp.vueApp.directive("reveal", {
    getSSRProps(binding: { value: RevealBindingValue }) {
      const variant = resolveRevealVariant(binding.value);
      const delay = resolveRevealDelay(binding.value);
      return {
        class: `reveal reveal-${variant}`,
        style: delay ? { "--reveal-delay": `${delay}ms` } : undefined,
        // The classes above are only known to the server via this hook —
        // the client vnode's own class binding never includes them, so
        // Vue's hydration diff flags a (harmless, cosmetic) class
        // mismatch. This tells Vue to skip that specific check instead
        // of logging a false-positive warning on every revealed element.
        "data-allow-mismatch": "class",
      };
    },
    mounted(el: HTMLElement, binding: { value: RevealBindingValue }) {
      const variant = resolveRevealVariant(binding.value);
      const delay = resolveRevealDelay(binding.value);

      el.classList.add("reveal", `reveal-${variant}`);
      if (delay) {
        el.style.setProperty("--reveal-delay", `${delay}ms`);
      }

      if (!observer) {
        // No IntersectionObserver support — just show it.
        el.classList.add("is-revealed");
        return;
      }

      observer.observe(el);
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el);
    },
  });
});
