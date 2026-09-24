import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './BaseCard-_Bf1gK1_.mjs';
import { _ as __nuxt_component_2 } from './TermsSection-BRORjiT1.mjs';
import { defineComponent, computed, resolveDirective, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useOwnI18n } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

class TermsOfServiceDocument {
  constructor(sections) {
    this.sections = sections;
  }
  sections;
  static build() {
    return new TermsOfServiceDocument([
      {
        id: "the-service",
        titleKey: "tos.s1Title",
        subsections: [
          { paragraphs: ["tos.s1Intro"] },
          {
            table: {
              headerKeys: ["tos.tModule", "tos.tWhatItDoes"],
              rows: [
                ["tos.s1RowInboxName", "tos.s1RowInboxDesc"],
                ["tos.s1RowOrdersName", "tos.s1RowOrdersDesc"],
                ["tos.s1RowCatalogName", "tos.s1RowCatalogDesc"],
                ["tos.s1RowReportingName", "tos.s1RowReportingDesc"],
                ["tos.s1RowApiName", "tos.s1RowApiDesc"]
              ]
            }
          }
        ]
      },
      {
        id: "usage-limits",
        titleKey: "tos.s2Title",
        subsections: [
          {
            paragraphs: ["tos.s2_1", "tos.s2_2", "tos.s2_3", "tos.s2_4"]
          }
        ]
      },
      {
        id: "availability-support",
        titleKey: "tos.s3Title",
        subsections: [
          {
            paragraphs: [
              "tos.s3_1",
              "tos.s3_2",
              // "tos.s3_3",
              "tos.s3_4Intro"
            ]
          },
          {
            table: {
              headerKeys: ["tos.tPlan", "tos.tChannels", "tos.tTargetResponse"],
              rows: [
                ["tos.s3RowBusinessName", "tos.s3RowBusinessChannels", "tos.s3RowBusinessTarget"]
              ]
            }
          },
          {
            paragraphs: [
              "tos.s3_5"
              // "tos.s3_6"
            ]
          }
        ]
      },
      {
        id: "your-data",
        titleKey: "tos.s4Title",
        subsections: [
          {
            paragraphs: [
              "tos.s4_1",
              "tos.s4_2",
              "tos.s4_3",
              "tos.s4_4",
              "tos.s4_5",
              // "tos.s4_6",
              "tos.s4_7"
            ]
          }
        ]
      },
      {
        id: "security",
        titleKey: "tos.s5Title",
        subsections: [
          {
            paragraphs: ["tos.s5_1", "tos.s5_2", "tos.s5_3", "tos.s5_4"]
          }
        ]
      },
      {
        id: "integrations",
        titleKey: "tos.s6Title",
        subsections: [
          {
            paragraphs: ["tos.s6_1", "tos.s6_2", "tos.s6_3"]
          }
        ]
      },
      {
        id: "changes",
        titleKey: "tos.s7Title",
        subsections: [
          {
            paragraphs: ["tos.s7_1", "tos.s7_2", "tos.s7_3"]
          }
        ]
      }
    ]);
  }
}
const companyName = "E3Byte Co., Ltd.";
const lastUpdated = "August 2026";
const effectiveDate = "August 2026";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "terms-of-service",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useOwnI18n();
    usePageSeo({
      titleKey: "tos.seoTitle",
      descriptionKey: "tos.seoDescription",
      path: "/terms-of-service"
    });
    const termsDocument = TermsOfServiceDocument.build();
    const showLocalNotice = computed(() => locale.value !== "en");
    const { isLoading } = useSkeleton();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SkeletonBlock = __nuxt_component_0;
      const _component_BaseCard = __nuxt_component_1;
      const _component_TermsSection = __nuxt_component_2;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28" }, _attrs))}><div class="shell max-w-4xl">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_component_SkeletonBlock, {
          "heading-width": "16rem",
          "subtitle-lines": 1
        }, null, _parent));
      } else {
        _push(`<!--[--><header${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><div class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl">${ssrInterpolate(unref(t)("tos.title"))}</div><p class="mt-3 text-sm text-ink-400">${ssrInterpolate(unref(t)("tos.updated", { date: lastUpdated }))} · ${ssrInterpolate(unref(t)("tos.effective", { date: effectiveDate }))}</p></header>`);
        if (unref(showLocalNotice)) {
          _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200" }, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: 80 })))}>${ssrInterpolate(unref(t)("tos.note"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_BaseCard, { class: "mt-8 divide-y divide-transparent" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(termsDocument).sections, (section) => {
                _push2(ssrRenderComponent(_component_TermsSection, {
                  key: section.id,
                  section,
                  company: companyName
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(termsDocument).sections, (section) => {
                  return openBlock(), createBlock(_component_TermsSection, {
                    key: section.id,
                    section,
                    company: companyName
                  }, null, 8, ["section"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-of-service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=terms-of-service-CTnh1_KO.mjs.map
