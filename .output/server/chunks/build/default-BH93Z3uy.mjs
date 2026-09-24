import { a as __nuxt_component_0$1, _ as __nuxt_component_3 } from './BaseButton-Cgy_bc0x.mjs';
import { useSSRContext, defineComponent, ref, computed, mergeProps, unref, watch, resolveDirective, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrRenderTeleport, ssrGetDirectiveProps, ssrRenderSlot } from 'vue/server-renderer';
import { u as useOwnI18n, d as useRoute, c as useState } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LocaleSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, locales } = useOwnI18n();
    const isOpen = ref(false);
    const dropdownRef = ref(null);
    const available = computed(
      () => locales.value.map((l) => ({
        code: l.code,
        name: l.name ?? l.code
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "dropdownRef",
        ref: dropdownRef,
        class: "relative inline-block"
      }, _attrs))}><button type="button" class="flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4"><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" stroke-linecap="round"></path></svg> ${ssrInterpolate(available.value.find((l) => l.code === unref(locale))?.name)}</button>`);
      if (isOpen.value) {
        _push(`<ul class="absolute left-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-soft dark:border-white/10 dark:bg-ink-800 md:left-auto md:right-0"><!--[-->`);
        ssrRenderList(available.value, (l) => {
          _push(`<li><button type="button" class="${ssrRenderClass([
            l.code === unref(locale) ? "bg-brand-50 font-semibold text-brand-600 dark:bg-brand-900/40 dark:text-brand-200" : "text-ink-700 hover:bg-ink-900/5 dark:text-ink-100 dark:hover:bg-white/5",
            "block w-full px-4 py-2.5 text-left text-sm transition-colors"
          ])}">${ssrInterpolate(l.name)}</button></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LocaleSwitcher.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$5, { __name: "LocaleSwitcher" });
class ThemeManagerBase {
  /** The user's stored preference: 'system' | 'light' | 'dark'. */
  get preference() {
    return this.getMode().preference ?? "system";
  }
  /** The resolved, currently-applied theme ('light' | 'dark'). */
  get resolved() {
    return this.getMode().value === "dark" ? "dark" : "light";
  }
  isDark() {
    return this.resolved === "dark";
  }
  toggle() {
    this.set(this.isDark() ? "light" : "dark");
  }
  /** Cycles system -> light -> dark -> system, useful for a single button UI. */
  cycle() {
    const order = ["system", "light", "dark"];
    const next = order[(order.indexOf(this.preference) + 1) % order.length] ?? "system";
    this.set(next);
  }
}
class NuxtThemeManager extends ThemeManagerBase {
  constructor(colorMode) {
    super();
    this.colorMode = colorMode;
  }
  colorMode;
  getMode() {
    return this.colorMode;
  }
  set(preference) {
    this.colorMode.preference = preference;
  }
}
const useColorMode = () => {
  return useState("color-mode").value;
};
function useTheme() {
  const colorMode = useColorMode();
  const manager = new NuxtThemeManager(colorMode);
  const preference = computed({
    get: () => manager.preference,
    set: (value) => manager.set(value)
  });
  const isDark = computed(() => manager.isDark());
  function setTheme(preferenceValue) {
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const { preference } = useTheme();
    const mounted = ref(false);
    const options = [
      {
        value: "light",
        icon: "M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M18.4 5.6l-1.1 1.1M6.7 17.3l-1.1 1.1M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
      },
      {
        value: "system",
        icon: "M4.5 5.25A1.5 1.5 0 016 3.75h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0118 15.75H6a1.5 1.5 0 01-1.5-1.5v-9zM9.75 19.5h4.5M12 15.75V19.5"
      },
      {
        value: "dark",
        icon: "M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      }
    ];
    const { t } = useOwnI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex items-center gap-0.5 rounded-full border border-ink-900/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5",
        role: "group",
        "aria-label": unref(t)("a11y.themeToggle")
      }, _attrs))}><!--[-->`);
      ssrRenderList(options, (option) => {
        _push(`<button type="button" class="${ssrRenderClass([
          unref(mounted) && unref(preference) === option.value ? "bg-brand-500 text-white" : "text-ink-500 hover:bg-ink-900/5 dark:text-ink-200 dark:hover:bg-white/10",
          "flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200"
        ])}"${ssrRenderAttr("aria-pressed", unref(mounted) ? unref(preference) === option.value : false)}${ssrRenderAttr("aria-label", unref(t)(`theme.${option.value}`))}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4"><path${ssrRenderAttr("d", option.icon)} stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/ThemeToggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2$1 = Object.assign(_sfc_main$4, { __name: "ThemeToggle" });
const _imports_0 = "" + __buildAssetsURL("e3byte-landing-logo.Bttm-ajz.svg");
class NavigationService {
  static PRIMARY = [
    { key: "home", to: "/", labelKey: "nav.home" },
    { key: "features", to: "/features", labelKey: "nav.features" },
    { key: "about", to: "/about", labelKey: "nav.about" },
    { key: "contact", to: "/contact", labelKey: "nav.contact" }
  ];
  static FOOTER_GROUPS = [
    {
      titleKey: "footer.menu",
      links: NavigationService.PRIMARY
    },
    {
      titleKey: "footer.legal",
      links: [
        { key: "terms-conditions", to: "/terms-conditions", labelKey: "footer.termsConditions" },
        {
          key: "terms-of-service",
          to: "/terms-of-service",
          labelKey: "footer.termsOfService"
        },
        {
          key: "user-code-of-conduct",
          to: "/user-code-of-conduct",
          labelKey: "footer.userConduct"
        },
        {
          key: "privacy-policy",
          to: "/privacy-policy",
          labelKey: "footer.privacy"
        }
      ]
    }
  ];
  static getPrimaryLinks() {
    return this.PRIMARY;
  }
  static getFooterGroups() {
    return this.FOOTER_GROUPS;
  }
  static isActive(currentPath, linkPath) {
    if (linkPath === "/") return currentPath === "/";
    return currentPath.startsWith(linkPath);
  }
}
function useNavigation() {
  const route = useRoute();
  const primaryLinks = NavigationService.getPrimaryLinks();
  const footerGroups = NavigationService.getFooterGroups();
  function isActive(path) {
    return NavigationService.isActive(route.path, path);
  }
  return { primaryLinks, footerGroups, isActive };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { primaryLinks, isActive } = useNavigation();
    const { t } = useOwnI18n();
    const route = useRoute();
    const isMenuOpen = ref(false);
    const isScrolled = ref(false);
    function closeMenu() {
      isMenuOpen.value = false;
    }
    watch(isMenuOpen, (open) => {
      (void 0).documentElement.classList.toggle("overflow-hidden", open);
    });
    watch(
      () => route.fullPath,
      () => closeMenu()
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_LocaleSwitcher = __nuxt_component_1$1;
      const _component_ThemeToggle = __nuxt_component_2$1;
      const _component_BaseButton = __nuxt_component_3;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<!--[--><header class="${ssrRenderClass([
        unref(isScrolled) || unref(isMenuOpen) ? "border-white/10 bg-primary shadow-soft-dark backdrop-blur-md" : "border-transparent bg-primary backdrop-blur-sm",
        "fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-300 py-1.5"
      ])}"><div class="shell flex h-16 items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-display text-xl font-extrabold tracking-tight transition-opacity hover:opacity-90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden items-center gap-8 md:flex"><!--[-->`);
      ssrRenderList(unref(primaryLinks), (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.key,
          to: link.to,
          class: [
            "relative pb-1 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white",
            unref(isActive)(link.to) ? "text-white after:absolute after:inset-x-0 after:-bottom-[1px] after:h-0.5 after:rounded-full after:bg-white after:content-['']" : ""
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)(link.labelKey))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)(link.labelKey)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="hidden items-center gap-3 md:flex">`);
      _push(ssrRenderComponent(_component_LocaleSwitcher, null, null, _parent));
      _push(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
      _push(ssrRenderComponent(_component_BaseButton, {
        to: "/contact",
        variant: "primary",
        class: "!bg-white !text-brand-700 hover:!bg-brand-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.getStarted"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.getStarted")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button type="button" class="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"${ssrRenderAttr("aria-label", unref(isMenuOpen) ? unref(t)("a11y.closeMenu") : unref(t)("a11y.openMenu"))} aria-haspopup="true"${ssrRenderAttr("aria-expanded", unref(isMenuOpen))}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-6 w-6"><path class="${ssrRenderClass([unref(isMenuOpen) ? "opacity-0" : "opacity-100", "origin-center transition-all duration-200"])}" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"></path><path class="${ssrRenderClass([unref(isMenuOpen) ? "opacity-100" : "opacity-0", "origin-center transition-all duration-200"])}" d="M6 6l12 12M18 6L6 18" stroke-linecap="round"></path></svg></button></div></header>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isMenuOpen)) {
          _push2(`<div class="fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm md:hidden"></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (unref(isMenuOpen)) {
          _push2(`<nav${ssrRenderAttr("aria-label", unref(t)("a11y.mobileNav"))} class="fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[82vw] max-w-xs flex-col overflow-y-auto bg-brand-900 pb-8 pt-20 shadow-soft-dark md:hidden"><div class="flex flex-1 flex-col gap-1 px-5 pt-10"><!--[-->`);
          ssrRenderList(unref(primaryLinks), (link, index) => {
            _push2(ssrRenderComponent(_component_NuxtLink, mergeProps({
              key: link.key,
              to: link.to,
              class: ["rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10", unref(isActive)(link.to) ? "bg-white/10 text-white" : ""],
              onClick: closeMenu
            }, ssrGetDirectiveProps(_ctx, _directive_reveal, { type: "left", delay: index * 60 })), {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)(link.labelKey))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)(link.labelKey)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push2(`<!--]--><div class="mt-4 flex items-center justify-between gap-3 px-3">`);
          _push2(ssrRenderComponent(_component_LocaleSwitcher, null, null, _parent));
          _push2(ssrRenderComponent(_component_ThemeToggle, null, null, _parent));
          _push2(`</div>`);
          _push2(ssrRenderComponent(_component_BaseButton, {
            to: "/contact",
            class: "mt-4 w-full !bg-white !text-brand-700",
            onClick: closeMenu
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`${ssrInterpolate(unref(t)("nav.getStarted"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)("nav.getStarted")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></nav>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "AppHeader" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { footerGroups } = useNavigation();
    const { t } = useOwnI18n();
    const socials = [
      {
        key: "facebook",
        href: "https://facebook.com",
        path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"
      },
      {
        key: "twitter",
        href: "https://twitter.com",
        path: "M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.8a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 18.4a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"
      },
      {
        key: "instagram",
        href: "https://instagram.com",
        path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.4a5 5 0 012.9 2.9c.2.6.4 1.3.4 2.4.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.4a5 5 0 01-2.9 2.9c-.6.2-1.3.4-2.4.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.4a5 5 0 01-2.9-2.9c-.2-.6-.4-1.3-.4-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.4a5 5 0 012.9-2.9c.6-.2 1.3-.4 2.4-.4C8.9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"
      },
      {
        key: "linkedin",
        href: "https://linkedin.com",
        path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z"
      },
      {
        key: "youtube",
        href: "https://youtube.com",
        path: "M23 12s0-3.2-.4-4.7a3 3 0 00-2.1-2.1C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.5.5A3 3 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a3 3 0 002.1 2.1c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a3 3 0 002.1-2.1c.4-1.5.4-4.7.4-4.7zM9.8 15.5v-7l6 3.5-6 3.5z"
      }
    ];
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-white/10 bg-black text-ink-100" }, _attrs))}><div${ssrRenderAttrs(mergeProps({ class: "shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]" }, ssrGetDirectiveProps(_ctx, _directive_reveal, "up")))}><div><p class="font-display text-2xl font-extrabold text-white"><img${ssrRenderAttr("src", _imports_0)} alt=""></p><p class="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">${ssrInterpolate(unref(t)("footer.tagline"))}</p></div><!--[-->`);
      ssrRenderList(unref(footerGroups), (group) => {
        _push(`<div><p class="text-xs font-bold uppercase tracking-widest text-brand-300">${ssrInterpolate(unref(t)(group.titleKey))}</p><ul class="mt-4 space-y-3"><!--[-->`);
        ssrRenderList(group.links, (link) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.to,
            class: "text-sm text-ink-200 transition-colors hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)(link.labelKey))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)(link.labelKey)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--><div><p class="text-xs font-bold uppercase tracking-widest text-brand-300 underline decoration-brand-400 decoration-2 underline-offset-8">${ssrInterpolate(unref(t)("footer.followUs"))}</p><div class="mt-5 flex gap-2.5"><!--[-->`);
      ssrRenderList(socials, (social) => {
        _push(`<a${ssrRenderAttr("href", social.href)} target="_blank" rel="noopener noreferrer" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500"${ssrRenderAttr("aria-label", social.key)}><svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path${ssrRenderAttr("d", social.path)}></path></svg></a>`);
      });
      _push(`<!--]--></div><p class="mt-6 text-xs text-ink-400">${ssrInterpolate(unref(t)("footer.copyright", { year: unref(year) }))}</p></div></div></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "AppFooter" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScrollFab",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    const isVisible = ref(false);
    const canScrollUp = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-5 right-4 z-40 flex flex-col gap-2.5 sm:bottom-8 sm:right-6" }, _attrs))}>`);
        if (unref(canScrollUp)) {
          _push(`<button type="button"${ssrRenderAttr("aria-label", unref(t)("a11y.scrollToTop"))} class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft-dark ring-1 ring-inset ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 dark:bg-brand-500 dark:hover:bg-brand-400"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ScrollFab.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "ScrollFab" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  const _component_ScrollFab = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col bg-[var(--surface-light)] text-ink-900 dark:bg-[var(--surface-dark)] dark:text-ink-50" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<div class="h-16 shrink-0" aria-hidden="true"></div><main class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_ScrollFab, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-BH93Z3uy.mjs.map
