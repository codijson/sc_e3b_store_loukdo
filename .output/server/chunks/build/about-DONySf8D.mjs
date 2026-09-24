import { _ as __nuxt_component_0, a as __nuxt_component_1$1 } from './BaseCard-_Bf1gK1_.mjs';
import { defineComponent, resolveDirective, unref, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useOwnI18n } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './SectionHeading-DOTHL2r2.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as usePageSeo, a as useSkeleton } from './useSkeleton-Cc_B2Jsk.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _imports_0 = "" + __buildAssetsURL("1.DC1db9__.svg");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StorySection",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell grid gap-10 md:grid-cols-2 md:items-center"><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_reveal, "left"))}><h2 class="text-2xl font-extrabold text-ink-900 dark:text-white md:text-3xl">${ssrInterpolate(unref(t)("about.storyTitle"))}</h2><p class="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-300 md:text-base">${ssrInterpolate(unref(t)("about.storyBody"))}</p></div><div${ssrRenderAttrs(mergeProps({
        class: "rounded-xl2 border border-ink-900/10 bg-gradient-to-br from-amber-50 to-white dark:border-white/10 dark:from-amber-900/10 dark:to-transparent",
        role: "img",
        "aria-label": unref(t)("about.storyImageAlt")
      }, ssrGetDirectiveProps(_ctx, _directive_reveal, "right")))}><img${ssrRenderAttr("src", _imports_0)} alt="" class="rounded-xl max-w-auto">`);
      {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/StorySection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$4, { __name: "StorySection" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BeliefsSection",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false }
  },
  setup(__props) {
    const { t } = useOwnI18n();
    const beliefs = [
      {
        titleKey: "about.belief1Title",
        bodyKey: "about.belief1Body",
        icon: `<svg width="20" height="20" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24V19.8C0 18.95 0.21875 18.1687 0.65625 17.4562C1.09375 16.7437 1.675 16.2 2.4 15.825C3.95 15.05 5.525 14.4688 7.125 14.0813C8.725 13.6938 10.35 13.5 12 13.5C13.65 13.5 15.275 13.6938 16.875 14.0813C18.475 14.4688 20.05 15.05 21.6 15.825C22.325 16.2 22.9062 16.7437 23.3438 17.4562C23.7812 18.1687 24 18.95 24 19.8V24H0ZM27 24V19.5C27 18.4 26.6937 17.3438 26.0812 16.3312C25.4688 15.3187 24.6 14.45 23.475 13.725C24.75 13.875 25.95 14.1312 27.075 14.4937C28.2 14.8562 29.25 15.3 30.225 15.825C31.125 16.325 31.8125 16.8813 32.2875 17.4937C32.7625 18.1062 33 18.775 33 19.5V24H27ZM12 12C10.35 12 8.9375 11.4125 7.7625 10.2375C6.5875 9.0625 6 7.65 6 6C6 4.35 6.5875 2.9375 7.7625 1.7625C8.9375 0.5875 10.35 0 12 0C13.65 0 15.0625 0.5875 16.2375 1.7625C17.4125 2.9375 18 4.35 18 6C18 7.65 17.4125 9.0625 16.2375 10.2375C15.0625 11.4125 13.65 12 12 12ZM27 6C27 7.65 26.4125 9.0625 25.2375 10.2375C24.0625 11.4125 22.65 12 21 12C20.725 12 20.375 11.9688 19.95 11.9062C19.525 11.8438 19.175 11.775 18.9 11.7C19.575 10.9 20.0938 10.0125 20.4562 9.0375C20.8187 8.0625 21 7.05 21 6C21 4.95 20.8187 3.9375 20.4562 2.9625C20.0938 1.9875 19.575 1.1 18.9 0.3C19.25 0.175 19.6 0.09375 19.95 0.05625C20.3 0.01875 20.65 0 21 0C22.65 0 24.0625 0.5875 25.2375 1.7625C26.4125 2.9375 27 4.35 27 6Z" fill="currentColor"/></svg>`
      },
      {
        titleKey: "about.belief2Title",
        bodyKey: "about.belief2Body",
        icon: `<svg width="20" height="20" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.35 30L23.175 12H26.325L33.15 30H30L28.3875 25.425H21.1125L19.5 30H16.35ZM4.5 25.5L2.4 23.4L9.975 15.825C9.1 14.95 8.30625 13.95 7.59375 12.825C6.88125 11.7 6.225 10.425 5.625 9H8.775C9.275 9.975 9.775 10.825 10.275 11.55C10.775 12.275 11.375 13 12.075 13.725C12.9 12.9 13.7563 11.7438 14.6438 10.2563C15.5312 8.76875 16.2 7.35 16.65 6H0V3H10.5V0H13.5V3H24V6H19.65C19.125 7.8 18.3375 9.65 17.2875 11.55C16.2375 13.45 15.2 14.9 14.175 15.9L17.775 19.575L16.65 22.65L12.075 17.9625L4.5 25.5ZM22.05 22.8H27.45L24.75 15.15L22.05 22.8Z" fill="currentColor"/></svg>`
      },
      {
        titleKey: "about.belief3Title",
        bodyKey: "about.belief3Body",
        icon: `<svg width="20" height="20" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L0 9L9 0L11.1375 2.1375L4.2375 9.0375L11.1 15.9L9 18ZM21 18L18.8625 15.8625L25.7625 8.9625L18.9 2.1L21 0L30 9L21 18Z" fill="currentColor"/></svg>`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHeading = __nuxt_component_0$1;
      const _component_BaseCard = __nuxt_component_1$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell">`);
      _push(ssrRenderComponent(_component_SectionHeading, mergeProps({
        title: unref(t)("about.beliefsTitle"),
        loading: __props.loading
      }, ssrGetDirectiveProps(_ctx, _directive_reveal)), null, _parent));
      _push(`<div class="mt-12 grid gap-6 md:grid-cols-3"><!--[-->`);
      ssrRenderList(beliefs, (belief, index) => {
        _push(ssrRenderComponent(_component_BaseCard, mergeProps({
          key: belief.titleKey,
          loading: __props.loading
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, { type: "up", delay: index * 90 })), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"${_scopeId}><span${_scopeId}>${belief?.icon ?? ""}</span></div><h3 class="mt-5 text-lg font-bold text-ink-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)(belief.titleKey))}</h3><p class="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300"${_scopeId}>${ssrInterpolate(unref(t)(belief.bodyKey))}</p>`);
            } else {
              return [
                createVNode("div", { class: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium" }, [
                  createVNode("span", {
                    innerHTML: belief?.icon
                  }, null, 8, ["innerHTML"])
                ]),
                createVNode("h3", { class: "mt-5 text-lg font-bold text-ink-900 dark:text-white" }, toDisplayString(unref(t)(belief.titleKey)), 1),
                createVNode("p", { class: "mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300" }, toDisplayString(unref(t)(belief.bodyKey)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/BeliefsSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$3, { __name: "BeliefsSection" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WhatWeDoSection",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false }
  },
  setup(__props) {
    const { t } = useOwnI18n();
    const pillars = [
      {
        titleKey: "about.omnichatTitle",
        bodyKey: "about.omnichatBody",
        icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H6L0 30ZM6 18H18V15H6V18ZM6 13.5H24V10.5H6V13.5ZM6 9H24V6H6V9Z" fill="currentColor"/></svg>`
      },
      {
        titleKey: "about.ordersTitle",
        bodyKey: "about.ordersBody",
        icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 30C8.175 30 7.46875 29.7062 6.88125 29.1187C6.29375 28.5312 6 27.825 6 27C6 26.175 6.29375 25.4688 6.88125 24.8813C7.46875 24.2938 8.175 24 9 24C9.825 24 10.5312 24.2938 11.1187 24.8813C11.7062 25.4688 12 26.175 12 27C12 27.825 11.7062 28.5312 11.1187 29.1187C10.5312 29.7062 9.825 30 9 30ZM24 30C23.175 30 22.4688 29.7062 21.8813 29.1187C21.2938 28.5312 21 27.825 21 27C21 26.175 21.2938 25.4688 21.8813 24.8813C22.4688 24.2938 23.175 24 24 24C24.825 24 25.5312 24.2938 26.1187 24.8813C26.7062 25.4688 27 26.175 27 27C27 27.825 26.7062 28.5312 26.1187 29.1187C25.5312 29.7062 24.825 30 24 30ZM6.3 3H28.425C29 3 29.4375 3.25625 29.7375 3.76875C30.0375 4.28125 30.05 4.8 29.775 5.325L24.45 14.925C24.175 15.425 23.8062 15.8125 23.3438 16.0875C22.8813 16.3625 22.375 16.5 21.825 16.5H10.65L9 19.5H27V22.5H9C7.875 22.5 7.025 22.0062 6.45 21.0187C5.875 20.0312 5.85 19.05 6.375 18.075L8.4 14.4L3 3H0V0H4.875L6.3 3Z" fill="currentColor"/></svg>`
      },
      {
        titleKey: "about.productsTitle",
        bodyKey: "about.productsBody",
        icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 30C3.675 30 2.96875 29.7062 2.38125 29.1187C1.79375 28.5312 1.5 27.825 1.5 27V10.0875C1.05 9.8125 0.6875 9.45625 0.4125 9.01875C0.1375 8.58125 0 8.075 0 7.5V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V7.5C30 8.075 29.8625 8.58125 29.5875 9.01875C29.3125 9.45625 28.95 9.8125 28.5 10.0875V27C28.5 27.825 28.2062 28.5312 27.6187 29.1187C27.0312 29.7062 26.325 30 25.5 30H4.5ZM3 7.5H27V3H3V7.5ZM10.5 18H19.5V15H10.5V18Z" fill="currentColor"/></svg>`
      },
      {
        titleKey: "about.deliveryTitle",
        bodyKey: "about.deliveryBody",
        icon: `<svg width="20" height="20" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 24C6.25 24 5.1875 23.5625 4.3125 22.6875C3.4375 21.8125 3 20.75 3 19.5H0V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H24V6H28.5L33 12V19.5H30C30 20.75 29.5625 21.8125 28.6875 22.6875C27.8125 23.5625 26.75 24 25.5 24C24.25 24 23.1875 23.5625 22.3125 22.6875C21.4375 21.8125 21 20.75 21 19.5H12C12 20.75 11.5625 21.8125 10.6875 22.6875C9.8125 23.5625 8.75 24 7.5 24ZM7.5 21C7.925 21 8.28125 20.8563 8.56875 20.5688C8.85625 20.2812 9 19.925 9 19.5C9 19.075 8.85625 18.7188 8.56875 18.4312C8.28125 18.1437 7.925 18 7.5 18C7.075 18 6.71875 18.1437 6.43125 18.4312C6.14375 18.7188 6 19.075 6 19.5C6 19.925 6.14375 20.2812 6.43125 20.5688C6.71875 20.8563 7.075 21 7.5 21ZM25.5 21C25.925 21 26.2812 20.8563 26.5688 20.5688C26.8563 20.2812 27 19.925 27 19.5C27 19.075 26.8563 18.7188 26.5688 18.4312C26.2812 18.1437 25.925 18 25.5 18C25.075 18 24.7188 18.1437 24.4312 18.4312C24.1437 18.7188 24 19.075 24 19.5C24 19.925 24.1437 20.2812 24.4312 20.5688C24.7188 20.8563 25.075 21 25.5 21ZM24 13.5H30.375L27 9H24V13.5Z" fill="currentColor"/></svg>`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHeading = __nuxt_component_0$1;
      const _component_BaseCard = __nuxt_component_1$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell">`);
      _push(ssrRenderComponent(_component_SectionHeading, mergeProps({
        title: unref(t)("about.doTitle"),
        subtitle: unref(t)("about.doSubtitle"),
        loading: __props.loading
      }, ssrGetDirectiveProps(_ctx, _directive_reveal)), null, _parent));
      _push(`<div class="mt-12 grid gap-5 sm:grid-cols-2"><!--[-->`);
      ssrRenderList(pillars, (pillar, index) => {
        _push(ssrRenderComponent(_component_BaseCard, mergeProps({
          key: pillar.titleKey,
          class: "flex items-start gap-4",
          loading: __props.loading
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, { type: "up", delay: index * 80 })), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"${_scopeId}><span${_scopeId}>${pillar.icon ?? ""}</span></span><span${_scopeId}><h3 class="text-base font-bold text-ink-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)(pillar.titleKey))}</h3><p class="mt-1.5 text-sm text-ink-500 dark:text-ink-300"${_scopeId}>${ssrInterpolate(unref(t)(pillar.bodyKey))}</p></span>`);
            } else {
              return [
                createVNode("span", { class: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium" }, [
                  createVNode("span", {
                    innerHTML: pillar.icon
                  }, null, 8, ["innerHTML"])
                ]),
                createVNode("span", null, [
                  createVNode("h3", { class: "text-base font-bold text-ink-900 dark:text-white" }, toDisplayString(unref(t)(pillar.titleKey)), 1),
                  createVNode("p", { class: "mt-1.5 text-sm text-ink-500 dark:text-ink-300" }, toDisplayString(unref(t)(pillar.bodyKey)), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/WhatWeDoSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "WhatWeDoSection" });
const companyName = "E3Byte Co., Ltd.";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CompanySection",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell"><div${ssrRenderAttrs(mergeProps({ class: "rounded-xl2 border border-primary-light bg-primary-light px-6 py-12 text-center dark:border-primary-dark/50 dark:bg-primary-dark" }, ssrGetDirectiveProps(_ctx, _directive_reveal, "scale")))}><span class="mx-auto flex h-12 w-12 items-center justify-center text-primary dark:text-primary-medium"><svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 36V0H20V8H40V36H0ZM4 32H16V28H4V32ZM4 24H16V20H4V24ZM4 16H16V12H4V16ZM4 8H16V4H4V8ZM20 32H36V12H20V32ZM24 20V16H32V20H24ZM24 28V24H32V28H24Z" fill="currentColor"></path></svg></span><h3 class="mt-4 text-xl font-extrabold text-ink-900 dark:text-white">${ssrInterpolate(unref(t)("about.companyTitle"))}</h3><p class="mx-auto mt-3 max-w-xl text-sm text-ink-600 dark:text-ink-200"><strong>${ssrInterpolate(companyName)}</strong></p><p class="mt-1 text-sm text-ink-500 dark:text-ink-300">${ssrInterpolate(unref(t)("about.companyReg"))}</p><p class="mt-1 text-sm text-ink-500 dark:text-ink-300">${ssrInterpolate(unref(t)("about.companyAddress"))}</p></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/CompanySection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "CompanySection" });
const aboutImageUrl = publicAssetsURL("/og/about-us-v1.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    const DEFAULT_IMAGE = {
      url: `https://loukdo.com${aboutImageUrl}`,
      width: 588,
      height: 384,
      alt: t("about.seoDescription")
    };
    usePageSeo({
      titleKey: "about.seoTitle",
      descriptionKey: "about.seoDescription",
      path: "/about",
      image: DEFAULT_IMAGE
    });
    const { isLoading } = useSkeleton();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SkeletonBlock = __nuxt_component_0;
      const _component_StorySection = __nuxt_component_1;
      const _component_BeliefsSection = __nuxt_component_2;
      const _component_WhatWeDoSection = __nuxt_component_3;
      const _component_CompanySection = __nuxt_component_4;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-[var(--surface-light)] text-center dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"><div class="shell">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_component_SkeletonBlock, { "heading-width": "24rem" }, null, _parent));
      } else {
        _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ class: "font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}>${ssrInterpolate(unref(t)("about.title"))}</div><p${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-5 max-w-2xl text-base text-ink-500 dark:text-ink-300 md:text-lg" }, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: 100 })))}>${ssrInterpolate(unref(t)("about.subtitle"))}</p><!--]-->`);
      }
      _push(`</div></section>`);
      if (!unref(isLoading)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_StorySection, null, null, _parent));
        _push(ssrRenderComponent(_component_BeliefsSection, null, null, _parent));
        _push(ssrRenderComponent(_component_WhatWeDoSection, null, null, _parent));
        _push(ssrRenderComponent(_component_CompanySection, null, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DONySf8D.mjs.map
