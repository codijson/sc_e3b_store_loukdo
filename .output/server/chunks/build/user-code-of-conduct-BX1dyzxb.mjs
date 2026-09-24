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

class CodeOfConductDocument {
  constructor(sections) {
    this.sections = sections;
  }
  sections;
  static build() {
    return new CodeOfConductDocument([
      {
        id: "why-this-exists",
        titleKey: "conduct.introTitle",
        subsections: [
          {
            paragraphs: ["conduct.introBody1", "conduct.introBody2", "conduct.introBody3"]
          }
        ]
      },
      {
        id: "sell-honestly",
        titleKey: "conduct.s1Title",
        subsections: [
          {
            titleKey: "conduct.s1DoTitle",
            list: [
              "conduct.s1Do1",
              "conduct.s1Do2",
              "conduct.s1Do3",
              // "conduct.s1Do4",
              "conduct.s1Do5",
              "conduct.s1Do6"
            ]
          },
          {
            titleKey: "conduct.s1DontTitle",
            list: [
              "conduct.s1Dont1",
              "conduct.s1Dont2",
              // "conduct.s1Dont3",
              "conduct.s1Dont4",
              "conduct.s1Dont5",
              "conduct.s1Dont6"
            ]
          }
        ]
      },
      {
        id: "treat-people-with-respect",
        titleKey: "conduct.s2Title",
        subsections: [
          {
            introKey: "conduct.s2Intro",
            titleKey: "conduct.s2ListTitle",
            list: [
              "conduct.s2_1",
              "conduct.s2_2",
              "conduct.s2_3",
              "conduct.s2_4",
              "conduct.s2_5",
              "conduct.s2_6"
            ],
            outroKey: "conduct.s2Outro"
          }
        ]
      },
      {
        id: "respect-privacy",
        titleKey: "conduct.s3Title",
        subsections: [
          {
            introKey: "conduct.s3Intro",
            list: [
              "conduct.s3_1",
              "conduct.s3_2",
              "conduct.s3_3",
              "conduct.s3_4",
              "conduct.s3_5",
              "conduct.s3_6",
              "conduct.s3_7"
            ]
          }
        ]
      },
      {
        id: "message-responsibly",
        titleKey: "conduct.s4Title",
        subsections: [
          {
            list: [
              "conduct.s4_1",
              "conduct.s4_2",
              "conduct.s4_3",
              "conduct.s4_4",
              "conduct.s4_5"
            ]
          }
        ]
      },
      {
        id: "protect-the-platform",
        titleKey: "conduct.s5Title",
        subsections: [
          {
            titleKey: "conduct.s5ListTitle",
            list: [
              "conduct.s5_1",
              "conduct.s5_2",
              "conduct.s5_3",
              "conduct.s5_4",
              "conduct.s5_5",
              "conduct.s5_6",
              "conduct.s5_7"
            ],
            outroKey: "conduct.s5Outro"
          }
        ]
      },
      {
        id: "follow-the-law",
        titleKey: "conduct.s6Title",
        subsections: [
          {
            introKey: "conduct.s6Intro",
            list: [
              "conduct.s6_1",
              "conduct.s6_2",
              "conduct.s6_3",
              "conduct.s6_4",
              "conduct.s6_5"
            ],
            outroKey: "conduct.s6Outro"
          }
        ]
      },
      {
        id: "support-our-team",
        titleKey: "conduct.s7Title",
        subsections: [
          { paragraphs: ["conduct.s7_1", "conduct.s7_2"] }
        ]
      },
      {
        id: "reporting",
        titleKey: "conduct.s8Title",
        subsections: [
          {
            list: ["conduct.s8_1"],
            outroKey: "conduct.s8Outro1"
          },
          { paragraphs: ["conduct.s8Outro2"] }
        ]
      },
      {
        id: "breach-consequences",
        titleKey: "conduct.s9Title",
        subsections: [
          {
            introKey: "conduct.s9Intro",
            table: {
              headerKeys: ["conduct.tLevel", "conduct.tAction"],
              rows: [
                ["conduct.s9Level1", "conduct.s9Action1"],
                ["conduct.s9Level2", "conduct.s9Action2"],
                ["conduct.s9Level3", "conduct.s9Action3"],
                ["conduct.s9Level4", "conduct.s9Action4"],
                ["conduct.s9Level5", "conduct.s9Action5"]
              ]
            }
          },
          { paragraphs: ["conduct.s9Straight", "conduct.s9Appeals"] }
        ]
      },
      {
        id: "changes",
        titleKey: "conduct.s10Title",
        subsections: [{ paragraphs: ["conduct.s10_1", "conduct.s10_2"] }]
      }
    ]);
  }
}
const companyName = "E3Byte Co., Ltd.";
const lastUpdated = "August 2026";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user-code-of-conduct",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useOwnI18n();
    usePageSeo({
      titleKey: "conduct.seoTitle",
      descriptionKey: "conduct.seoDescription",
      path: "/user-code-of-conduct"
    });
    const conductDocument = CodeOfConductDocument.build();
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
        _push(`<!--[--><header${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><div class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl">${ssrInterpolate(unref(t)("conduct.title"))}</div><p class="mt-3 text-sm text-ink-400">${ssrInterpolate(unref(t)("conduct.updated", { date: lastUpdated }))}</p></header>`);
        if (unref(showLocalNotice)) {
          _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200" }, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: 80 })))}>${ssrInterpolate(unref(t)("conduct.note"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_BaseCard, { class: "mt-8 divide-y divide-transparent" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(conductDocument).sections, (section) => {
                _push2(ssrRenderComponent(_component_TermsSection, {
                  key: section.id,
                  section,
                  company: companyName
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(conductDocument).sections, (section) => {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user-code-of-conduct.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user-code-of-conduct-BX1dyzxb.mjs.map
