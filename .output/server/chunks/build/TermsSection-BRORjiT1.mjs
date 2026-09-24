import { defineComponent, resolveDirective, mergeProps, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { u as useOwnI18n } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TermsDefinitionsTable",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useOwnI18n();
    const rows = computed(() => {
      const pairs = [];
      for (let i = 0; i < props.items.length; i += 2) {
        const termKey = props.items[i];
        const defKey = props.items[i + 1];
        if (!termKey || !defKey) continue;
        pairs.push({ term: t(termKey), def: t(defKey) });
      }
      return pairs;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto rounded-xl border border-ink-900/10 dark:border-white/10" }, _attrs))}><table class="w-full text-left text-sm"><thead class="bg-ink-50 dark:bg-white/5"><tr><th class="px-4 py-3 font-semibold text-ink-900 dark:text-white"> Term </th><th class="px-4 py-3 font-semibold text-ink-900 dark:text-white"> Meaning </th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(rows), (row) => {
        _push(`<tr class="border-t border-ink-900/5 dark:border-white/5"><td class="px-4 py-3 font-semibold text-ink-700 dark:text-ink-100">${ssrInterpolate(row.term)}</td><td class="px-4 py-3 text-ink-500 dark:text-ink-300">${ssrInterpolate(row.def)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/terms/TermsDefinitionsTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "TermsDefinitionsTable" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TermsTable",
  __ssrInlineRender: true,
  props: {
    table: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useOwnI18n();
    const headers = computed(() => props.table.headerKeys.map((key) => t(key)));
    const rows = computed(
      () => props.table.rows.map((row) => row.map((key) => t(key)))
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto rounded-xl border border-ink-900/10 dark:border-white/10" }, _attrs))}><table class="w-full text-left text-sm"><thead class="bg-ink-50 dark:bg-white/5"><tr><!--[-->`);
      ssrRenderList(unref(headers), (header, index) => {
        _push(`<th class="px-4 py-3 font-semibold text-ink-900 dark:text-white">${ssrInterpolate(header)}</th>`);
      });
      _push(`<!--]--></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(rows), (row, rowIndex) => {
        _push(`<tr class="border-t border-ink-900/5 dark:border-white/5"><!--[-->`);
        ssrRenderList(row, (cell, cellIndex) => {
          _push(`<td class="${ssrRenderClass([cellIndex === 0 ? "font-semibold text-ink-700 dark:text-ink-100" : "", "px-4 py-3 align-top text-ink-500 dark:text-ink-300"])}">${ssrInterpolate(cell)}</td>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/terms/TermsTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "TermsTable" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TermsSection",
  __ssrInlineRender: true,
  props: {
    section: {},
    company: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useOwnI18n();
    function translate(key) {
      return t(key, { company: props.company });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TermsDefinitionsTable = __nuxt_component_0;
      const _component_TermsTable = __nuxt_component_1;
      const _directive_reveal = resolveDirective("reveal");
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: __props.section.id,
        class: "scroll-mt-24 border-t border-ink-900/10 py-8 first:border-t-0 first:pt-0 dark:border-white/10"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_reveal, "up")))}><h2 class="text-xl font-bold text-primary dark:text-primary-medium">${ssrInterpolate(unref(t)(__props.section.titleKey))}</h2><div class="mt-4 space-y-4"><!--[-->`);
      ssrRenderList(__props.section.subsections, (sub, index) => {
        _push(`<!--[-->`);
        if (__props.section.id === "definitions" && sub.list) {
          _push(ssrRenderComponent(_component_TermsDefinitionsTable, {
            items: sub.list
          }, null, _parent));
        } else if (sub.table) {
          _push(`<!--[-->`);
          if (sub.titleKey) {
            _push(`<h3 class="text-base font-bold text-ink-900 dark:text-white">${ssrInterpolate(unref(t)(sub.titleKey))}</h3>`);
          } else {
            _push(`<!---->`);
          }
          if (sub.introKey) {
            _push(`<p class="text-sm leading-relaxed text-ink-600 dark:text-ink-200">${ssrInterpolate(translate(sub.introKey))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_TermsTable, {
            table: sub.table
          }, null, _parent));
          if (sub.outroKey) {
            _push(`<p class="text-sm leading-relaxed text-ink-600 dark:text-ink-200">${ssrInterpolate(translate(sub.outroKey))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          if (sub.titleKey) {
            _push(`<h3 class="text-base font-bold text-ink-900 dark:text-white">${ssrInterpolate(unref(t)(sub.titleKey))}</h3>`);
          } else {
            _push(`<!---->`);
          }
          if (sub.introKey) {
            _push(`<p class="text-sm leading-relaxed text-ink-600 dark:text-ink-200">${ssrInterpolate(translate(sub.introKey))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(sub.paragraphs, (para) => {
            _push(`<p class="text-sm leading-relaxed text-ink-600 dark:text-ink-200">${ssrInterpolate(translate(para))}</p>`);
          });
          _push(`<!--]-->`);
          if (sub.list) {
            _push(`<ul class="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-600 dark:text-ink-200"><!--[-->`);
            ssrRenderList(sub.list, (item) => {
              _push(`<li>${ssrInterpolate(unref(t)(item))}</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          if (sub.outroKey) {
            _push(`<p class="text-sm leading-relaxed text-ink-600 dark:text-ink-200">${ssrInterpolate(translate(sub.outroKey))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/terms/TermsSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "TermsSection" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=TermsSection-BRORjiT1.mjs.map
