import { _ as __nuxt_component_0, a as __nuxt_component_1$1 } from './BaseCard-_Bf1gK1_.mjs';
import { _ as __nuxt_component_3$1 } from './BaseButton-Cgy_bc0x.mjs';
import { defineComponent, resolveDirective, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, renderSlot, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { u as useOwnI18n } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FeatureShowcase",
  __ssrInlineRender: true,
  props: {
    titleKey: {},
    bodyKey: {},
    points: {},
    ctaKey: {},
    iconPath: {},
    reverse: { type: Boolean, default: false },
    icon: {}
  },
  setup(__props) {
    const { t } = useOwnI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseCard = __nuxt_component_1$1;
      const _component_BaseButton = __nuxt_component_3$1;
      _push(ssrRenderComponent(_component_BaseCard, mergeProps({ class: "overflow-hidden" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([__props.reverse ? "md:[&>*:first-child]:order-2" : "", "grid gap-10 md:grid-cols-2 md:items-center"])}"${_scopeId}><div${_scopeId}><div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"${_scopeId}><span${_scopeId}>${__props.icon ?? ""}</span></div><h3 class="mt-5 text-2xl font-bold text-ink-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)(__props.titleKey))}</h3><p class="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300"${_scopeId}>${ssrInterpolate(unref(t)(__props.bodyKey))}</p><ul class="mt-5 space-y-2.5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.points, (point) => {
              _push2(`<li class="flex items-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-100"${_scopeId}><svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 shrink-0 text-primary"${_scopeId}><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6"${_scopeId}></circle><path d="M8.5 12.5l2.2 2.2 4.8-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg> ${ssrInterpolate(unref(t)(point))}</li>`);
            });
            _push2(`<!--]--></ul>`);
            _push2(ssrRenderComponent(_component_BaseButton, {
              to: "/contact",
              class: "mt-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)(__props.ctaKey))} → `);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)(__props.ctaKey)) + " → ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center rounded-xl2 bg-transparent"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "visual", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["grid gap-10 md:grid-cols-2 md:items-center", __props.reverse ? "md:[&>*:first-child]:order-2" : ""]
              }, [
                createVNode("div", null, [
                  createVNode("div", { class: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium" }, [
                    createVNode("span", { innerHTML: __props.icon }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("h3", { class: "mt-5 text-2xl font-bold text-ink-900 dark:text-white" }, toDisplayString(unref(t)(__props.titleKey)), 1),
                  createVNode("p", { class: "mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300" }, toDisplayString(unref(t)(__props.bodyKey)), 1),
                  createVNode("ul", { class: "mt-5 space-y-2.5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.points, (point) => {
                      return openBlock(), createBlock("li", {
                        key: point,
                        class: "flex items-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-100"
                      }, [
                        (openBlock(), createBlock("svg", {
                          viewBox: "0 0 24 24",
                          fill: "none",
                          class: "h-5 w-5 shrink-0 text-primary"
                        }, [
                          createVNode("circle", {
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "1.6"
                          }),
                          createVNode("path", {
                            d: "M8.5 12.5l2.2 2.2 4.8-5",
                            stroke: "currentColor",
                            "stroke-width": "1.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(unref(t)(point)), 1)
                      ]);
                    }), 128))
                  ]),
                  createVNode(_component_BaseButton, {
                    to: "/contact",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)(__props.ctaKey)) + " → ", 1)
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex items-center justify-center rounded-xl2 bg-transparent" }, [
                  renderSlot(_ctx.$slots, "visual")
                ])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/FeatureShowcase.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$5, { __name: "FeatureShowcase" });
const _imports_0$1 = "" + __buildAssetsURL("1.CiZwBTJ8.svg");
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><img${ssrRenderAttr("src", _imports_0$1)} alt="" class="rounded-xl">`);
  {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/InboxMockup.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]), { __name: "InboxMockup" });
const _imports_0 = "" + __buildAssetsURL("2.Cdw5toXP.svg");
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><img${ssrRenderAttr("src", _imports_0)} alt="" class="rounded-xl max-w-[400px]">`);
  {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/OrderMockup.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]), { __name: "OrderMockup" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StepsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    const steps = [
      {
        titleKey: "features.steps.step1Title",
        bodyKey: "features.steps.step1Body"
      },
      {
        titleKey: "features.steps.step2Title",
        bodyKey: "features.steps.step2Body"
      },
      {
        titleKey: "features.steps.step3Title",
        bodyKey: "features.steps.step3Body"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHeading = __nuxt_component_0$1;
      const _component_BaseCard = __nuxt_component_1$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell">`);
      _push(ssrRenderComponent(_component_SectionHeading, mergeProps({
        title: unref(t)("features.steps.title"),
        subtitle: unref(t)("features.steps.subtitle")
      }, ssrGetDirectiveProps(_ctx, _directive_reveal)), null, _parent));
      _push(`<div class="mt-14 grid gap-6 md:grid-cols-3"><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(ssrRenderComponent(_component_BaseCard, mergeProps({
          key: step.titleKey,
          class: "text-center"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, { type: "up", delay: index * 100 })), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-lg font-extrabold text-primary-dark dark:bg-primary-dark dark:text-primary-medium"${_scopeId}>${ssrInterpolate(index + 1)}</span><h3 class="mt-4 text-lg font-bold text-ink-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(t)(step.titleKey))}</h3><p class="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300"${_scopeId}>${ssrInterpolate(unref(t)(step.bodyKey))}</p>`);
            } else {
              return [
                createVNode("span", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-lg font-extrabold text-primary-dark dark:bg-primary-dark dark:text-primary-medium" }, toDisplayString(index + 1), 1),
                createVNode("h3", { class: "mt-4 text-lg font-bold text-ink-900 dark:text-white" }, toDisplayString(unref(t)(step.titleKey)), 1),
                createVNode("p", { class: "mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300" }, toDisplayString(unref(t)(step.bodyKey)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/StepsSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "StepsSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FaqSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    const faqs = [1, 2, 3, 4, 5].map((n) => ({
      q: `features.faq.q${n}`,
      a: `features.faq.a${n}`
    }));
    const openIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHeading = __nuxt_component_0$1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-0 md:pt-0 md:pb-28" }, _attrs))}><div class="shell">`);
      _push(ssrRenderComponent(_component_SectionHeading, mergeProps({
        title: unref(t)("features.faq.title")
      }, ssrGetDirectiveProps(_ctx, _directive_reveal)), null, _parent));
      _push(`<div class="mx-auto mt-10 max-w-3xl space-y-3"><!--[-->`);
      ssrRenderList(unref(faqs), (faq, index) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: faq.q,
          class: "card overflow-hidden"
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, { type: "up", delay: index * 70 })))}><button type="button" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"${ssrRenderAttr("aria-expanded", unref(openIndex) === index)}><span class="font-semibold text-ink-900 dark:text-white">${ssrInterpolate(unref(t)(faq.q))}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${ssrRenderClass([unref(openIndex) === index ? "rotate-45" : "", "h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200"])}"><path d="M12 5v14M5 12h14" stroke-linecap="round"></path></svg></button><div class="grid transition-all duration-200" style="${ssrRenderStyle(unref(openIndex) === index ? "grid-template-rows: 1fr" : "grid-template-rows: 0fr")}"><div class="overflow-hidden"><p class="px-5 pb-4 text-sm leading-relaxed text-ink-500 dark:text-ink-300">${ssrInterpolate(unref(t)(faq.a))}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/FaqSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "FaqSection" });
const featureImageUrl = publicAssetsURL("/og/feature-1-v1.png");
const omichat1Icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20L16 16H6C5.45 16 4.97917 15.8042 4.5875 15.4125C4.19583 15.0208 4 14.55 4 14V13H15C15.55 13 16.0208 12.8042 16.4125 12.4125C16.8042 12.0208 17 11.55 17 11V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V20ZM2 10.175L3.175 9H13V2H2V10.175ZM0 15V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V9C15 9.55 14.8042 10.0208 14.4125 10.4125C14.0208 10.8042 13.55 11 13 11H4L0 15ZM2 9V2V9Z" fill="currentColor"/></svg>`;
const omichat2Icon = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 8L9.6 6.6L11.175 5H7V3H11.175L9.575 1.4L11 0L15 4L11 8ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20ZM16 20C15.45 20 14.9792 19.8042 14.5875 19.4125C14.1958 19.0208 14 18.55 14 18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16C16.55 16 17.0208 16.1958 17.4125 16.5875C17.8042 16.9792 18 17.45 18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20ZM0 2V0H3.275L7.525 9H14.525L18.425 2H20.7L16.3 9.95C16.1167 10.2833 15.8708 10.5417 15.5625 10.725C15.2542 10.9083 14.9167 11 14.55 11H7.1L6 13H18V15H6C5.25 15 4.67917 14.675 4.2875 14.025C3.89583 13.375 3.88333 12.7167 4.25 12.05L5.6 9.6L2 2H0Z" fill="currentColor"/></svg>`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "features",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useOwnI18n();
    const DEFAULT_IMAGE = {
      url: `https://loukdo.com${featureImageUrl}`,
      width: 539,
      height: 405,
      alt: t("features.seoDescription")
    };
    usePageSeo({
      titleKey: "features.seoTitle",
      descriptionKey: "features.seoDescription",
      path: "/features",
      image: DEFAULT_IMAGE
    });
    const omnichatPoints = [
      "features.omnichat.point1",
      "features.omnichat.point2",
      "features.omnichat.point3",
      "features.omnichat.point4",
      "features.omnichat.point5"
    ];
    const orderPoints = ["features.orders.point1", "features.orders.point2", "features.orders.point3"];
    const { isLoading } = useSkeleton();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SkeletonBlock = __nuxt_component_0;
      const _component_FeatureShowcase = __nuxt_component_1;
      const _component_InboxMockup = __nuxt_component_2;
      const _component_OrderMockup = __nuxt_component_3;
      const _component_StepsSection = __nuxt_component_4;
      const _component_FaqSection = __nuxt_component_5;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="bg-[var(--surface-light)] text-center dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"><div class="shell">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_component_SkeletonBlock, { "heading-width": "20rem" }, null, _parent));
      } else {
        _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ class: "font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}>${ssrInterpolate(unref(t)("features.title"))}</div><p${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-5 max-w-2xl text-base text-ink-500 dark:text-ink-300 md:text-lg" }, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: 100 })))}>${ssrInterpolate(unref(t)("features.subtitle"))}</p><!--]-->`);
      }
      _push(`</div></section>`);
      if (!unref(isLoading)) {
        _push(`<section class="pb-20 pt-0 md:pt-0 md:pb-28"><div class="shell space-y-20 md:space-y-28">`);
        _push(ssrRenderComponent(_component_FeatureShowcase, mergeProps({
          "title-key": "features.omnichat.title",
          "body-key": "features.omnichat.body",
          points: omnichatPoints,
          "cta-key": "features.omnichat.cta",
          "icon-path": "M8 12h8m-8 4h5m-9 5l1.7-3.4A9 9 0 1112 21c-1.5 0-2.9-.4-4.1-1L4 21l1-4z",
          icon: omichat1Icon
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, "left")), {
          visual: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_InboxMockup, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_InboxMockup)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_FeatureShowcase, mergeProps({
          "title-key": "features.orders.title",
          "body-key": "features.orders.body",
          points: orderPoints,
          "cta-key": "features.orders.cta",
          "icon-path": "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.98-4.684 2.57-7.152.107-.45-.238-.898-.7-.898H5.106M7.5 14.25L5.106 5.272M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
          reverse: "",
          icon: omichat2Icon
        }, ssrGetDirectiveProps(_ctx, _directive_reveal, "right")), {
          visual: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_OrderMockup, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_OrderMockup)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isLoading)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_StepsSection, null, null, _parent));
        _push(ssrRenderComponent(_component_FaqSection, null, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/features.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=features-B7dJCylA.mjs.map
