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

class PrivacyPolicyDocument {
  constructor(sections) {
    this.sections = sections;
  }
  sections;
  static build() {
    return new PrivacyPolicyDocument([
      {
        id: "summary",
        titleKey: "privacy.summaryTitle",
        subsections: [{ paragraphs: ["privacy.summaryBody1"] }]
      },
      {
        id: "who-is-responsible",
        titleKey: "privacy.s1Title",
        subsections: [
          { paragraphs: ["privacy.s1_1", "privacy.s1_3"] }
        ]
      },
      {
        id: "our-two-roles",
        titleKey: "privacy.s2Title",
        subsections: [
          {
            paragraphs: ["privacy.s2_1", "privacy.s2_2", "privacy.s2_3"]
          }
        ]
      },
      {
        id: "what-we-collect",
        titleKey: "privacy.s3Title",
        subsections: [
          {
            titleKey: "privacy.s3_1Title",
            table: {
              headerKeys: ["privacy.tCategory", "privacy.tExamples", "privacy.tWhy"],
              rows: [
                ["privacy.s3RowAccountName", "privacy.s3RowAccountExamples", "privacy.s3RowAccountWhy"],
                ["privacy.s3RowBusinessName", "privacy.s3RowBusinessExamples", "privacy.s3RowBusinessWhy"],
                ["privacy.s3RowBillingName", "privacy.s3RowBillingExamples", "privacy.s3RowBillingWhy"],
                ["privacy.s3RowContentName", "privacy.s3RowContentExamples", "privacy.s3RowContentWhy"],
                ["privacy.s3RowSupportName", "privacy.s3RowSupportExamples", "privacy.s3RowSupportWhy"],
                ["privacy.s3RowMarketingName", "privacy.s3RowMarketingExamples", "privacy.s3RowMarketingWhy"]
              ]
            },
            outroKey: "privacy.s3_1Note"
          },
          {
            titleKey: "privacy.s3_2Title",
            list: ["privacy.s3_2a", "privacy.s3_2b", "privacy.s3_2d"]
          },
          {
            titleKey: "privacy.s3_3Title",
            list: ["privacy.s3_3a", "privacy.s3_3b", "privacy.s3_3c", "privacy.s3_3d", "privacy.s3_3e"]
          },
          {
            titleKey: "privacy.s3_4Title",
            paragraphs: ["privacy.s3_4Body"]
          }
        ]
      },
      {
        id: "why-we-use-it",
        titleKey: "privacy.s4Title",
        subsections: [
          {
            table: {
              headerKeys: ["privacy.tPurpose", "privacy.tLawfulBasis"],
              rows: [
                ["privacy.s4Row1Purpose", "privacy.s4Row1Basis"],
                ["privacy.s4Row2Purpose", "privacy.s4Row2Basis"],
                ["privacy.s4Row3Purpose", "privacy.s4Row3Basis"],
                ["privacy.s4Row4Purpose", "privacy.s4Row4Basis"],
                ["privacy.s4Row5Purpose", "privacy.s4Row5Basis"],
                ["privacy.s4Row6Purpose", "privacy.s4Row6Basis"],
                ["privacy.s4Row7Purpose", "privacy.s4Row7Basis"],
                ["privacy.s4Row8Purpose", "privacy.s4Row8Basis"],
                ["privacy.s4Row9Purpose", "privacy.s4Row9Basis"],
                ["privacy.s4Row10Purpose", "privacy.s4Row10Basis"],
                ["privacy.s4Row11Purpose", "privacy.s4Row11Basis"]
              ]
            },
            outroKey: "privacy.s4Outro"
          }
        ]
      },
      {
        id: "what-we-never-do",
        titleKey: "privacy.s5Title",
        subsections: [
          {
            list: [
              "privacy.s5_1",
              "privacy.s5_2",
              "privacy.s5_3",
              "privacy.s5_4",
              "privacy.s5_5"
            ]
          }
        ]
      },
      {
        id: "who-we-share-it-with",
        titleKey: "privacy.s6Title",
        subsections: [
          { paragraphs: ["privacy.s6Intro"] },
          {
            titleKey: "privacy.s6ProvidersTitle",
            introKey: "privacy.s6ProvidersIntro",
            table: {
              headerKeys: ["privacy.tProviderType", "privacy.tPurposeShort", "privacy.tLocation"],
              rows: [
                ["privacy.s6RowHostingType", "privacy.s6RowHostingPurpose", "privacy.s6RowHostingLocation"],
                ["privacy.s6RowPaymentType", "privacy.s6RowPaymentPurpose", "privacy.s6RowPaymentLocation"],
                ["privacy.s6RowEmailType", "privacy.s6RowEmailPurpose", "privacy.s6RowEmailLocation"],
                ["privacy.s6RowAnalyticsType", "privacy.s6RowAnalyticsPurpose", "privacy.s6RowAnalyticsLocation"],
                ["privacy.s6RowSupportType", "privacy.s6RowSupportPurpose", "privacy.s6RowSupportLocation"],
                ["privacy.s6RowSmsType", "privacy.s6RowSmsPurpose", "privacy.s6RowSmsLocation"]
              ]
            }
          },
          { paragraphs: ["privacy.s6Authorised", "privacy.s6Legal", "privacy.s6BusinessTransfers"] }
        ]
      },
      {
        id: "international-transfers",
        titleKey: "privacy.s7Title",
        subsections: [
          { paragraphs: ["privacy.s7_1", "privacy.s7_2"] }
        ]
      },
      {
        id: "how-long-we-keep-it",
        titleKey: "privacy.s8Title",
        subsections: [
          {
            table: {
              headerKeys: ["privacy.tData", "privacy.tRetention"],
              rows: [
                ["privacy.s8Row1Data", "privacy.s8Row1Retention"],
                ["privacy.s8Row2Data", "privacy.s8Row2Retention"],
                ["privacy.s8Row3Data", "privacy.s8Row3Retention"],
                ["privacy.s8Row4Data", "privacy.s8Row4Retention"],
                ["privacy.s8Row5Data", "privacy.s8Row5Retention"],
                ["privacy.s8Row6Data", "privacy.s8Row6Retention"],
                ["privacy.s8Row7Data", "privacy.s8Row7Retention"],
                ["privacy.s8Row8Data", "privacy.s8Row8Retention"]
              ]
            },
            outroKey: "privacy.s8Outro"
          }
        ]
      },
      {
        id: "your-rights",
        titleKey: "privacy.s9Title",
        subsections: [
          {
            introKey: "privacy.s9Intro",
            list: [
              "privacy.s9_1",
              "privacy.s9_2",
              "privacy.s9_3",
              "privacy.s9_4",
              "privacy.s9_5",
              "privacy.s9_6",
              "privacy.s9_7",
              "privacy.s9_8"
            ],
            outroKey: "privacy.s9Outro1"
          },
          { paragraphs: ["privacy.s9Outro2"] }
        ]
      },
      {
        id: "security",
        titleKey: "privacy.s10Title",
        subsections: [
          {
            introKey: "privacy.s10Intro",
            list: [
              "privacy.s10_1",
              "privacy.s10_2",
              "privacy.s10_3",
              "privacy.s10_4",
              "privacy.s10_5",
              "privacy.s10_6",
              "privacy.s10_7",
              "privacy.s10_8"
            ],
            outroKey: "privacy.s10Outro1"
          },
          { paragraphs: ["privacy.s10Outro2"] }
        ]
      },
      {
        id: "automated-decisions",
        titleKey: "privacy.s11Title",
        subsections: [{ paragraphs: ["privacy.s11_1", "privacy.s11_2"] }]
      },
      {
        id: "cookies-link",
        titleKey: "privacy.s12Title",
        subsections: [{ paragraphs: ["privacy.s12Body"] }]
      },
      {
        id: "changes",
        titleKey: "privacy.s13Title",
        subsections: [{ paragraphs: ["privacy.s13Body"] }]
      },
      {
        id: "contact",
        titleKey: "privacy.s14Title",
        subsections: [
          { paragraphs: ["privacy.s14_1", "privacy.s14_2", "privacy.s14_3"] }
        ]
      }
    ]);
  }
}
class CookiesPolicyDocument {
  constructor(sections) {
    this.sections = sections;
  }
  sections;
  static build() {
    return new CookiesPolicyDocument([
      {
        id: "what-cookies-are",
        titleKey: "cookies.s1Title",
        subsections: [{ paragraphs: ["cookies.s1_1", "cookies.s1_2"] }]
      },
      {
        id: "how-we-use-them",
        titleKey: "cookies.s2Title",
        subsections: [
          {
            introKey: "cookies.s2Intro",
            list: ["cookies.s2_1", "cookies.s2_2", "cookies.s2_3", "cookies.s2_4", "cookies.s2_5"]
          }
        ]
      },
      {
        id: "categories",
        titleKey: "cookies.s3Title",
        subsections: [
          {
            titleKey: "cookies.s3NecessaryTitle",
            introKey: "cookies.s3NecessaryIntro",
            table: {
              headerKeys: ["cookies.tCookie", "cookies.tPurpose", "cookies.tDuration"],
              rows: [
                ["cookies.s3RowSessionName", "cookies.s3RowSessionPurpose", "cookies.s3RowSessionDuration"],
                ["cookies.s3RowCsrfName", "cookies.s3RowCsrfPurpose", "cookies.s3RowCsrfDuration"],
                ["cookies.s3RowAuthName", "cookies.s3RowAuthPurpose", "cookies.s3RowAuthDuration"],
                ["cookies.s3RowConsentName", "cookies.s3RowConsentPurpose", "cookies.s3RowConsentDuration"],
                ["cookies.s3RowBotName", "cookies.s3RowBotPurpose", "cookies.s3RowBotDuration"]
              ]
            }
          }
        ]
      },
      {
        id: "third-party-cookies",
        titleKey: "cookies.s4Title",
        subsections: [
          {
            introKey: "cookies.s4Intro",
            list: ["cookies.s4_1", "cookies.s4_2", "cookies.s4_3"]
          }
        ]
      },
      {
        id: "your-choices",
        titleKey: "cookies.s5Title",
        subsections: [
          {
            titleKey: "cookies.s5BannerTitle",
            paragraphs: ["cookies.s5BannerBody"]
          },
          {
            titleKey: "cookies.s5BrowserTitle",
            list: ["cookies.s5_1", "cookies.s5_2", "cookies.s5_3", "cookies.s5_4"]
          },
          { paragraphs: ["cookies.s5Note", "cookies.s5Dnt"] }
        ]
      },
      {
        id: "cookies-on-seller-stores",
        titleKey: "cookies.s6Title",
        subsections: [{ paragraphs: ["cookies.s6_1", "cookies.s6_2"] }]
      },
      {
        id: "cookies-changes",
        titleKey: "cookies.s7Title",
        subsections: [{ paragraphs: ["cookies.s7_1"] }]
      },
      {
        id: "cookies-contact",
        titleKey: "cookies.s8Title",
        subsections: [{ paragraphs: ["cookies.s8_1"] }]
      }
    ]);
  }
}
const companyName = "E3Byte Co., Ltd.";
const lastUpdated = "August 2026";
const effectiveDate = "August 2026";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "privacy-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const { t, locale } = useOwnI18n();
    usePageSeo({
      titleKey: "privacy.seoTitle",
      descriptionKey: "privacy.seoDescription",
      path: "/privacy-policy"
    });
    const privacyDocument = PrivacyPolicyDocument.build();
    const cookiesDocument = CookiesPolicyDocument.build();
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
        _push(`<!--[--><header${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><div class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl">${ssrInterpolate(unref(t)("privacy.title"))}</div><p class="mt-3 text-sm text-ink-400">${ssrInterpolate(unref(t)("privacy.updated", { date: lastUpdated }))} · ${ssrInterpolate(unref(t)("privacy.effective", { date: effectiveDate }))}</p></header>`);
        if (unref(showLocalNotice)) {
          _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200" }, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: 80 })))}>${ssrInterpolate(unref(t)("privacy.note"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_BaseCard, { class: "mt-8 divide-y divide-transparent" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(privacyDocument).sections, (section) => {
                _push2(ssrRenderComponent(_component_TermsSection, {
                  key: section.id,
                  section,
                  company: companyName
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(privacyDocument).sections, (section) => {
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
        _push(`<h2 class="mt-14 text-center font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-xl sm:text-2xl">${ssrInterpolate(unref(t)("cookies.title"))}</h2>`);
        _push(ssrRenderComponent(_component_BaseCard, { class: "mt-8 divide-y divide-transparent" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(cookiesDocument).sections, (section) => {
                _push2(ssrRenderComponent(_component_TermsSection, {
                  key: section.id,
                  section,
                  company: companyName
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(cookiesDocument).sections, (section) => {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-policy-V63Wb_U7.mjs.map
