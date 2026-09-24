import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { toRef, isRef, hasInjectionContext, getCurrentInstance, inject, computed, readonly, getCurrentScope, defineAsyncComponent, defineComponent, h, unref, shallowRef, provide, shallowReactive, ref, useSSRContext, createApp, isVNode, createCommentVNode, withCtx, createVNode, mergeProps, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, reactive, effectScope, Suspense, nextTick, Fragment, isReadonly, watch, isShallow, isReactive, toRaw } from 'vue';
import { p as parseURL, e as encodePath, k as decodePath, l as hasProtocol, m as isScriptProtocol, n as joinURL, w as withQuery, s as sanitizeStatusCode, o as getContext, $ as $fetch, q as defu, r as createHooks, c as createError$1, t as executeAsync, v as klona, x as parse, y as getRequestHeader, a as destr, z as isEqual, A as setCookie, B as getCookie, C as deleteCookie } from '../nitro/nitro.mjs';
import { u as useSeoMeta$1, a as useHead$1, h as headSymbol, b as baseURL } from '../routes/renderer.mjs';
import { useRoute as useRoute$1, RouterView, START_LOCATION, createMemoryHistory, createRouter } from 'vue-router';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.11";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
function isScopeWithinInstance(instance) {
  const instanceScope = instance.scope;
  let scope = getCurrentScope();
  while (scope) {
    if (scope === instanceScope) {
      return true;
    }
    scope = scope.parent;
  }
  return false;
}
const useRoute = () => {
  if (hasInjectionContext()) {
    const instance = getCurrentInstance();
    if (!instance || isScopeWithinInstance(instance)) {
      return inject(PageRouteSymbol, useNuxtApp()._route);
    }
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
  const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
function sanitizeTag(tag, fallback) {
  return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function _mergeTransitionProps(routeProps) {
  const _props = [];
  for (const prop of routeProps) {
    if (!prop) {
      continue;
    }
    _props.push({
      ...prop,
      onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0,
      onBeforeLeave: prop.onBeforeLeave ? toArray(prop.onBeforeLeave) : void 0
    });
  }
  return defu(..._props);
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const router = useRouter();
    const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => {
          if (router.currentRoute.value.fullPath !== to.fullPath) {
            resolve(false);
            return;
          }
          resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        });
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const sensitiveMatcher = (m, p) => {
  return [];
};
const foldedMatcher = sensitiveMatcher;
const decodeRoutePath = function decodeRoutePath2(path) {
  if (!path.includes("%")) return path;
  const queryIndex = path.indexOf("?");
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
  try {
    return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
  } catch {
    return path;
  }
};
const normalizePath = (path, fold) => {
  if (typeof path !== "string") {
    return path;
  }
  const decoded = decodeRoutePath(path);
  return fold ? decoded.toLowerCase() : decoded;
};
const _routeRulesMatcher = (path) => routerOptions.sensitive ? defu({}, ...sensitiveMatcher("", normalizePath(path, false)).map((r) => r.data).reverse()) : defu({}, ...foldedMatcher("", normalizePath(path, true)).map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "about",
    path: "/about",
    component: () => import('./about-DONySf8D.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-C-M_yiLb.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import('./contact-QJocmt72.mjs')
  },
  {
    name: "features",
    path: "/features",
    component: () => import('./features-B7dJCylA.mjs')
  },
  {
    name: "privacy-policy",
    path: "/privacy-policy",
    component: () => import('./privacy-policy-V63Wb_U7.mjs')
  },
  {
    name: "terms-conditions",
    path: "/terms-conditions",
    component: () => import('./terms-conditions-D1Ici2HY.mjs')
  },
  {
    name: "terms-of-service",
    path: "/terms-of-service",
    component: () => import('./terms-of-service-CTnh1_KO.mjs')
  },
  {
    name: "user-code-of-conduct",
    path: "/user-code-of-conduct",
    component: () => import('./user-code-of-conduct-BX1dyzxb.mjs')
  }
];
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
Object.assign(/* @__PURE__ */ Object.create(null), {});
const pageIslandRoutes = Object.assign(/* @__PURE__ */ Object.create(null), {});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        const toKey = generateRouteKey$1({ route: to, Component: { type: lastTo } });
        const fromKey = generateRouteKey$1({ route: from, Component: { type: lastFrom } });
        if (toKey === fromKey) {
          syncCurrentRoute();
        }
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
    if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        {
          delete nuxtApp._middlewareTo;
        }
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext && !isServerPage) {
      return { provide: { router } };
    }
    function pushErroredRoute(to) {
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      {
        nuxtApp._middlewareTo = to;
      }
      if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
                pushErroredRoute(to);
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    if (isServerPage) {
      router.beforeResolve((to) => {
        const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
        const actual = to.matched.find((m) => m.components?.default?.__nuxt_island)?.components?.default;
        if (!expected || expected !== actual?.__nuxt_island) {
          nuxtApp.ssrContext["~renderResponse"] = {
            statusCode: 400,
            statusMessage: "Invalid island request path"
          };
          return false;
        }
      });
    }
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      {
        delete nuxtApp._middlewareTo;
      }
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        const pluginNavigatedAway = false;
        if (pluginNavigatedAway) ;
        else if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const preference = "system";
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
class TranslationEngine {
  constructor(messages2, fallbackLocale, warnOnMissingKey = false) {
    this.messages = messages2;
    this.fallbackLocale = fallbackLocale;
    this.warnOnMissingKey = warnOnMissingKey;
  }
  messages;
  fallbackLocale;
  warnOnMissingKey;
  /** All locale codes this engine has messages for. */
  availableLocales() {
    return Object.keys(this.messages);
  }
  hasLocale(locale) {
    return locale in this.messages;
  }
  /**
   * Resolves `key` against `locale`, falling back to `fallbackLocale`,
   * then to the raw key itself. Pure function of its arguments — no
   * internal state, safe to call concurrently for different locales.
   */
  translate(key, locale, params) {
    const direct = this.lookup(this.messages[locale], key);
    if (typeof direct === "string") return this.interpolate(direct, params);
    if (locale !== this.fallbackLocale) {
      const fallback = this.lookup(this.messages[this.fallbackLocale], key);
      if (typeof fallback === "string") {
        return this.interpolate(fallback, params);
      }
    }
    if (this.warnOnMissingKey) {
      console.warn(`[own-i18n] Missing translation key "${key}" (${locale})`);
    }
    return key;
  }
  lookup(dictionary, path) {
    if (!dictionary) return void 0;
    return path.split(".").reduce((node, segment) => {
      if (node && typeof node === "object" && segment in node) {
        return node[segment];
      }
      return void 0;
    }, dictionary);
  }
  interpolate(template, params) {
    if (!params) return template;
    return template.replace(
      /\{(\w+)\}/g,
      (match, token) => Object.prototype.hasOwnProperty.call(params, token) ? String(params[token]) : match
    );
  }
}
const meta$2 = { "siteName": "Loukdo" };
const nav$2 = { "home": "Home", "features": "Features", "about": "About Us", "contact": "Contact Us", "getStarted": "Get Started" };
const a11y$2 = { "openMenu": "Open menu", "themeToggle": "Toggle color theme", "closeMenu": "Close menu", "mobileNav": "Mobile navigation", "scrollToTop": "Scroll to top", "scrollToBottom": "Scroll to bottom" };
const theme$2 = { "light": "Light", "system": "System", "dark": "Dark" };
const footer$2 = { "tagline": "is a social commerce workspace that turns every conversation into a confirmed, paid, delivered order.", "menu": "Menu", "legal": "Legal", "termsConditions": "Terms and Conditions", "termsOfService": "Terms of Service", "userConduct": "User Code of Conduct", "privacy": "Privacy & Cookies Policy", "followUs": "Follow Us", "copyright": "© {year} Loukdo. Local Excellence, Global Standards." };
const home$2 = { "seoTitle": "Chat. Order. Delivered.", "seoDescription": "Loukdo brings Facebook, Instagram, Telegram, TikTok and WhatsApp into one inbox — reply, create the order, take payment and book delivery without switching apps.", "eyebrow": "Built in Cambodia, for Cambodian sellers", "title": "Chat. Order. Delivered.", "description": "Loukdo brings Facebook, Instagram, Telegram, TikTok and WhatsApp into one inbox — so you can reply, create the order, take payment and book delivery without switching apps.", "ctaPrimary": "Start Free Trial", "ctaSecondary": "Book a Demo", "heroImageAlt": "Loukdo unified inbox shown on a tablet and phone overlooking Phnom Penh", "problem": { "title": "You didn't start a business to manage six apps", "subtitle": "The chaos of multi-channel selling is costing you customers and peace of mind.", "lostTitle": "Orders get lost", "lostBody": "A customer asks for a price in a Facebook comment, messages you on Telegram later, and finally tries to buy on Instagram. Without a unified view, their order slips through the cracks, leading to lost revenue and frustration.", "blindTitle": "Your team can't see each other", "blindBody": "Two staff reply to the same customer with two different prices because they are using different devices or looking at different apps. This creates confusion, damages your brand trust, and slows down the sales process." }, "chaos": { "title": "End the Chaos", "subtitle": "Bring everything into one secure, manageable space." } };
const features$2 = { "seoTitle": "Features", "seoDescription": "Everything you need to manage conversations, process orders, and grow your business in one seamless platform.", "title": "Powerful Features for Modern Sellers", "subtitle": "Everything you need to manage conversations, process orders, and grow your business in one seamless platform.", "omnichat": { "title": "Omnichat Inbox", "body": "One inbox. Every channel. Consolidate your customer interactions into a single, powerful interface. Never miss a message again.", "point1": "Unified customer profile", "point2": "Assign chats", "point3": "Saved replies", "point4": "Auto-reply", "point5": "Comment-to-inbox", "cta": "See how Omnichat works" }, "orders": { "title": "Order Management", "body": "Turn a message into an order in three taps. Streamline your sales process from conversation to completed transaction without leaving the chat.", "point1": "Create orders directly in chat", "point2": "KHQR / Bakong / ABA / COD", "point3": "Delivery booking", "cta": "See how orders work" }, "steps": { "title": "From first message to delivered order", "subtitle": "Getting started with Loukdo is simple and straightforward.", "step1Title": "Connect your channels", "step1Body": "Link your Facebook, Instagram, and Telegram accounts in minutes.", "step2Title": "Add your products", "step2Body": "Upload your catalog to start creating orders directly from conversations.", "step3Title": "Sell from the inbox", "step3Body": "Reply, create the order, send the payment link, book delivery. Done." }, "faq": { "title": "FAQ", "q1": "Is Loukdo available in Khmer?", "a1": "Yes — the full interface, help center and support are in Khmer and English.", "q2": "Can my staff use it without seeing everything?", "a2": "Yes. Assign roles so staff can handle chats and orders without seeing financial reports or settings.", "q3": "What if I already have a website?", "a3": "Keep it. Use Loukdo for the inbox and orders.", "q4": "How do I get paid?", "a4": "Payments go directly to your own bank or wallet account through your payment provider. Loukdo never holds your money.", "q5": "What happens to my data if I leave?", "a5": "You can export your products, orders and customers at any time, including after you cancel." } };
const about$2 = { "seoTitle": "About Us", "seoDescription": "Loukdo is made in Phnom Penh for the millions of Cambodians who run real businesses inside chat apps.", "title": "We build tools for the people who actually sell", "subtitle": "Loukdo is made in Phnom Penh for the millions of Cambodians who run real businesses inside chat apps.", "storyTitle": "It started with a notebook", "storyBody": "We watched a local seller managing six different chat apps simultaneously. Orders were coming in from Telegram, Messenger, and Instagram. Her only system? A heavily scribbled notebook. She was losing orders, confusing payments, and stressed beyond belief. We knew there had to be a better way to support the backbone of our digital economy.", "storyImageAlt": "A handwritten Khmer sales notebook next to a phone showing chat orders", "beliefsTitle": "What we believe", "belief1Title": "Sellers own their customers", "belief1Body": "Every contact, every conversation, every order history belongs to the seller. Not to us. Export it whenever you want.", "belief2Title": "Khmer first, not Khmer later", "belief2Body": "Khmer isn't a translation layer bolted on after launch. It's how we design, write and support.", "belief3Title": "Small businesses deserve serious engineering", "belief3Body": "Uptime, security and data protection aren't enterprise features. They're the baseline.", "doTitle": "What we do", "doSubtitle": "Loukdo is a social commerce platform with four things at its core:", "omnichatTitle": "Omnichat", "omnichatBody": "Every channel in one inbox.", "ordersTitle": "Orders", "ordersBody": "Created inside the chat, paid by KHQR, delivered by local couriers.", "productsTitle": "Products", "productsBody": "One catalog that feeds chat, and live selling.", "deliveryTitle": "Delivery", "deliveryBody": "One click and dispatched by delivery partner.", "companyTitle": "Our Company", "companyBody": "Loukdo is a product of {company}, registered in Cambodia.", "companyReg": "Reg No: 00072217", "companyAddress": "Registered office: #St 317, Phumi 7, Sangkat Boeung Kok 1, Khan Toul Kok, Phnom Penh, Cambodia" };
const contact$2 = { "seoTitle": "Contact Us", "seoDescription": "Questions about pricing, integrations or getting started? We reply in Khmer or English, usually within a few hours.", "title": "Talk to us", "subtitle": "Questions about pricing, integrations or getting started? We reply in Khmer or English, usually within a few hours.", "telegramTitle": "Telegram", "telegramBody": "Fastest response time.", "telegramCta": "Message us", "emailTitle": "Email Support", "emailValue": "support@loukdo.com", "phoneTitle": "Phone", "phoneValue": "+855 70 677 666", "formTitle": "Send a message", "formName": "Name", "formNamePlaceholder": "Your full name", "formEmail": "Email", "formEmailPlaceholder": "you{'@'}company.com", "formMessage": "Message", "formMessagePlaceholder": "How can we help?", "formSubmit": "Send Message", "formSuccess": "Thanks — we'll get back to you shortly.", "hqTitle": "Headquarters", "hqBody": "HVMW+CVH Phnom Penh, Cambodia", "hqNote": "Visits by appointment only for enterprise clients.", "mapAlt": "Map showing Loukdo headquarters in Phnom Penh, Cambodia" };
const terms$2 = /* @__PURE__ */ JSON.parse(`{"seoTitle":"Terms and Conditions","title":"Terms and Conditions","updated":"Last updated: 01 AUG 2026","effective":"Effective: 01 AUG 2026","s1Title":"1. Who we are and what these terms cover","s1Body1":"These Terms and Conditions (\\"Terms\\") govern your access to and use of the website at www.loukdo.com and any related pages, applications and services (together, the \\"Platform\\").","s1Body2":"The Platform is operated by [E3Byte Co., Ltd.] (\\"LOUKDO\\", \\"we\\", \\"us\\", \\"our\\"), a company incorporated under the laws of the Kingdom of Cambodia with registered number [00072217] and registered office at [full address], Phnom Penh, Cambodia.","s1Body3":"These Terms form part of the LOUKDO Agreement together with our Terms of Service, User Code of Conduct, Privacy Policy and Cookies Policy, each of which is incorporated by reference.","s1Body4":"By accessing the Platform or creating an account, you accept these Terms. If you do not accept them, do not use the Platform.","s2Title":"2. Definitions","s2Seller":"Seller","s2SellerDef":"A person or business that uses the Platform to sell goods or services","s2Buyer":"Buyer","s2BuyerDef":"A person who purchases from a Seller through a channel managed on the Platform","s2Content":"Seller Content","s2ContentDef":"Product listings, images, descriptions, prices, messages and other material a Seller uploads or transmits","s2ThirdParty":"Third-Party Service","s2ThirdPartyDef":"Any external service connected to the Platform, including messaging channels, payment providers and delivery couriers","s2Account":"Account","s2AccountDef":"A registered user account on the Platform","s3Title":"3. Eligibility","s3Intro":"To create an Account, you must:","s3a":"be at least 18 years old, or the age of majority in your jurisdiction, whichever is higher","s3b":"have the legal capacity to enter into a binding contract","s3c":"if registering on behalf of a business, have authority to bind that business","s3d":"not be barred from using the Platform under any applicable law or sanctions regime","s3e":"not have had a previous Account terminated by us for breach","s3Outro":"If you register on behalf of a business, \\"you\\" means both you and that business, and you both accept these Terms.","s4Title":"4. Your account","s4_1":"You must provide accurate, current and complete registration information and keep it updated.","s4_2":"You are responsible for keeping your credentials confidential and for all activity under your Account, including activity by team members you invite.","s4_3":"You must notify us immediately at support@loukdo.com if you suspect unauthorized access.","s4_4":"We may require identity or business verification, including documents evidencing registration with the Ministry of Commerce, before enabling certain features.","s4_5":"You may not transfer or sell your Account without our written consent.","s5Title":"5. What LOUKDO is — and what it is not","s5_1":"We are a tool, not a marketplace. LOUKDO provides software that Sellers use to manage their own sales conversations, orders, and catalogs. We do not operate a marketplace, we do not list Sellers' goods for sale under our own name, and we do not solicit Buyers on Sellers' behalf.","s5_2":"We are not party to your sales. Every contract of sale is formed directly between the Seller and the Buyer. LOUKDO is not the seller, buyer, agent, broker, importer, exporter, or insurer of any goods or services transacted through the Platform.","s5_3":"We do not hold funds. Payments flow directly between Buyer and Seller through licensed payment service providers. LOUKDO is not a payment institution, does not act as an escrow agent, and does not hold, transmit or settle funds. Payment services are governed by the terms of the relevant provider and are subject to the supervision of the National Bank of Cambodia.","s5_4":"We do not deliver goods. Delivery is performed by third-party couriers under their own terms.","s5_5":"Consequently, all responsibility for product quality, description accuracy, fitness for purpose, pricing, warranties, refunds, returns, tax, and delivery outcomes rests with the Seller.","s6Title":"6. Seller obligations","s6Intro":"If you use the Platform as a Seller, you represent and warrant that:","s6a":"you hold all licenses, permits and registrations required to conduct your business, including any E-Commerce Permit or E-Commerce License required under the Law on E-Commerce (2019), Sub-Decree No. 134 (2020) and Prakas No. 290 (2020), and any sector-specific license applicable to your goods","s6b":"you are registered for tax where required and are solely responsible for calculating, collecting and remitting all applicable taxes, including VAT","s6c":"your listings are accurate, not misleading, and comply with the Law on Consumer Protection (2019)","s6d":"you have the right to sell every item you list and to use every image, mark and description you upload","s6e":"you will provide Buyers with clear pre-contract information: identity, contact details, total price including delivery, payment methods, delivery timeframe, and returns policy","s6f":"you will honor your published returns, refund and warranty policy","s6g":"you will handle Buyer personal data lawfully and only for the purpose of fulfilling the order","s6h":"you will not use the Platform to sell any Prohibited Item under Section 7","s6Outro":"You indemnify LOUKDO against any claim arising from your breach of this Section.","s7Title":"7. Prohibited items and activities","s7Intro":"You may not use the Platform to offer, promote, or transact in:","s7g1Title":"Illegal or restricted goods","s7g1_1":"Narcotics, controlled substances, and drug paraphernalia","s7g1_2":"Weapons, ammunition, explosives, and their components","s7g1_3":"Counterfeit goods or items infringing any trademark, copyright or design right","s7g1_4":"Stolen goods, or goods obtained through fraud","s7g1_5":"Protected wildlife, ivory, endangered species products, and protected cultural artefacts","s7g1_6":"Human remains, organs, or bodily fluids","s7g1_7":"Prescription medicines without valid authorization; unapproved medical devices","s7g1_8":"Tobacco, vaping products and alcohol, except where you hold the required license","s7g2Title":"Financial and regulated activity","s7g2_1":"Unlicensed financial services, lending, insurance, or money transmission","s7g2_2":"Cryptocurrency exchange, token sales, or virtual asset services without NBC authorization","s7g2_3":"Gambling, betting, lotteries, or games of chance","s7g2_4":"Pyramid schemes, multi-level marketing, matrix schemes, or \\"get rich quick\\" programs","s7g3Title":"Harmful content and conduct","s7g3_1":"Sexual content, adult services, or any content sexualizing a minor","s7g3_2":"Content promoting violence, terrorism, or hatred against any group","s7g3_3":"Malware, phishing kits, hacking tools, or stolen credentials","s7g3_4":"Personal data sold, scraped or traded without lawful basis and consent","s7g4Title":"Platform abuse","s7g4_1":"Circumventing rate limits, message limits, or plan restrictions","s7g4_2":"Reverse engineering, decompiling or scraping the Platform","s7g4_3":"Automated bulk messaging that violates the terms of a connected channel","s7g4_4":"Creating multiple accounts to evade suspension, fees or limits","s7g4_5":"Reselling Platform access without a written reseller agreement","s7Outro":"This list is illustrative, not exhaustive. We may update it at any time.","s8Title":"8. Intellectual property","s8_1":"Our IP. The Platform, including its software, design, interface, documentation, and the names \\"LOUKDO\\" and \\"លក់ដូរ\\" and associated logos, is owned by us or our licensors and protected under Cambodian and international law. Nothing in these Terms transfers any of it to you.","s8_2":"Your content stays yours. You retain all rights in your Seller Content. You grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, adapt, transmit and display it solely to operate and improve the Platform and provide the service to you. This license ends when you delete the content or close your Account, except where retention is required by law or for backup cycles.","s8_3":"Feedback. If you send us suggestions, we may use them without obligation or compensation.","s8_4":"Infringement claims. If you believe content on the Platform infringes your rights, email support@loukdo.com with: identification of the work, the URL or Store where it appears, your contact details, a statement of good-faith belief, and a statement that your notice is accurate. We operate a repeat-infringer termination policy.","s9Title":"9. Third-party services","s9_1":"The Platform connects to Third-Party Services, including Meta Platforms (Facebook, Instagram, WhatsApp), Telegram, TikTok, payment providers and couriers.","s9_2":"Your use of a Third-Party Service is governed by that provider's terms and privacy policy. You must comply with them, including their messaging policies and rate limits.","s9_3":"We do not control Third-Party Services. A provider may change, restrict, price, deprecate or discontinue its API at any time. We are not liable for any resulting loss of functionality, and such a change does not entitle you to a refund, though we will make reasonable efforts to notify you and to restore equivalent functionality.","s10Title":"10. Disclaimers","s10Intro":"To the maximum extent permitted by Cambodian law:","s10_1":"The Platform is provided \\"as is\\" and \\"as available\\". We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.","s10_2":"We do not warrant that the Platform will meet your requirements, that defects will be corrected, or that data will never be lost.","s10_3":"We do not vet, endorse or guarantee any Seller, Buyer, product, or transaction.","s10_4":"Nothing in these Terms excludes liability that cannot lawfully be excluded, including liability for fraud, death or personal injury caused by negligence, or statutory rights of consumers under the Law on Consumer Protection.","s11Title":"11. Limitation of liability","s11_1":"We are not liable for indirect, incidental, special, consequential, exemplary or punitive damages, or for loss of profits, revenue, goodwill, business opportunity, or data, however caused.","s11_2":"Our total aggregate liability arising from or connected to the LOUKDO Agreement is limited to the greater of (a) the fees you paid us in the twelve (12) months preceding the event giving rise to the claim, or (b) USD 10.","s11_3":"These limits apply regardless of the legal theory and even if we were advised of the possibility of such damages.","s11_4":"You acknowledge that these limits are a reasonable allocation of risk and are reflected in our pricing.","s12Title":"12. Indemnity","s12Intro":"You will indemnify, defend and hold harmless LOUKDO, its officers, directors, employees and agents from any claim, liability, loss, damage, cost or expense (including reasonable legal fees) arising from:","s12a":"your use of the Platform","s12b":"your breach of the LOUKDO Agreement or of any law","s12c":"your Seller Content","s12d":"any dispute between you and a Buyer, a Seller, or a third party","s12e":"your infringement of any third-party right","s12f":"any tax liability that is properly yours","s13Title":"13. Suspension and termination","s13_1":"By you. Cancel any time from your Account settings or by emailing support@loukdo.com. See the Terms of Service for the effect on billing.","s13_2Intro":"By us. We may suspend or terminate your Account, with or without notice, if:","s13_2a":"you breach the LOUKDO Agreement or the User Code of Conduct","s13_2b":"we reasonably suspect fraud, illegality, or risk to other users","s13_2c":"you fail to pay fees when due","s13_2d":"a Third-Party Service or regulator requires it","s13_2e":"required by law or court order","s13_3":"Effect. On termination, your right to use the Platform ends immediately and connected Stores go offline. You may export your data for [30] days after termination. After that we may delete it, subject to legal retention obligations.","s13_4":"Survival. Sections 5, 8, 10, 11, 12, 14 survive termination.","s14Title":"14. Governing law and disputes","s14_1":"These Terms are governed by the laws of the Kingdom of Cambodia, without regard to conflict of law rules.","s14_2":"Talk to us first. Before formal proceedings, contact support@loukdo.com. Most disputes resolve within 30 days at this stage.","s14_3":"Consumer Buyers retain any rights they have to bring proceedings in their local courts under the Law on Consumer Protection.","s15Title":"15. General","s15_1":"Changes. We may amend these Terms. Material changes will be notified by email or in-product at least [14] days before they take effect. Continuing to use the Platform after that date means you accept them. If you don't, stop using the Platform and cancel.","s15_3":"Assignment. You may not assign these Terms without our consent. We may assign them in connection with a merger, acquisition or sale of assets.","s15_4":"Severability. If a provision is held unenforceable, the rest remains in force.","s15_5":"No waiver. Failure to enforce a provision is not a waiver of it.","s15_6":"Entire agreement. The LOUKDO Agreement is the entire agreement between us on its subject matter.","s15_7":"Force majeure. Neither party is liable for failure caused by events beyond reasonable control, including natural disaster, war, epidemic, government action, internet or telecommunications failure, or third-party platform outage.","s16Title":"16. Contact","s16Body":"[E3Byte Co., Ltd.], #St 317, Phumi 7, Sangkat Beoung Kok 1, Khan Toul Kok, Phnom Penh, Cambodia], Phnom Penh, Cambodia support@loukdo.com Contact number: [+855 70 677 666]"}`);
const tos$2 = { "seoTitle": "Terms of Service", "title": "Terms of Service", "updated": "Last updated: 01 AUG 2026", "effective": "Effective: 01 AUG 2026", "s1Intro": 'These Terms of Service ("ToS") describe how the LOUKDO service is delivered, billed and supported. They form part of the LOUKDO Agreement together with the Terms and Conditions, User Code of Conduct, Privacy Policy and Cookies Policy. Where the Terms and Conditions and this ToS conflict, the Terms and Conditions prevail.', "s1Title": "1. The service", "tModule": "Module", "tWhatItDoes": "What it does", "s1RowInboxName": "Omnichat Inbox", "s1RowInboxDesc": "Unified messaging across connected channels, with assignment, notes and customer history", "s1RowOrdersName": "Order Management", "s1RowOrdersDesc": "Order creation, payment request, status tracking, delivery booking, COD reconciliation", "s1RowCatalogName": "Product Catalog", "s1RowCatalogDesc": "Products, variants, pricing, inventory, bulk import", "s1RowReportingName": "Reporting", "s1RowReportingDesc": "Sales, channel, product and team performance reporting", "s1RowApiName": "API & Webhooks", "s1RowApiDesc": "Programmatic access, subject to plan limits", "s2Title": "2. Usage limits and fair use", "s2_1": "Each plan carries limits on users, connected channels, orders, messages, storage and API calls. Current limits are published on the pricing page.", "s2_2": "Exceeding a limit may result in throttling, an upgrade prompt, or overage charges as disclosed at the time.", "s2_3": 'Fair use. Even on "unlimited" plans, usage must be consistent with normal operation of a single business. We may contact you about usage that materially exceeds typical patterns, degrades service for others, or indicates account sharing across unrelated businesses.', "s2_4": "You may not use the Platform to send unsolicited bulk messages. Messaging must comply with the policies of each connected channel, and it is your responsibility to have a lawful basis to message each recipient.", "s3Title": "3. Availability and support", "s3_1": "Target availability. We target [99.5]% monthly uptime, excluding scheduled maintenance and force majeure.", "s3_2": "Maintenance. Scheduled maintenance is normally performed between [00:00 and 04:00 ICT] with at least [48] hours' notice for anything expected to cause downtime. Emergency maintenance may be performed without notice.", "s3_4Intro": "Support.", "tPlan": "Plan", "tChannels": "Channels", "tTargetResponse": "Target first response", "s3RowBusinessName": "Business", "s3RowBusinessChannels": "Email, Telegram, phone, account manager", "s3RowBusinessTarget": "[1] business hours", "s3_5": "Support hours are [Mon–Sat, 8:00 AM – 8:00 PM ICT], excluding Cambodian public holidays.", "s4Title": "4. Your data", "s4_1": "Ownership. You own your Customer Data — products, orders, customers, messages and files you create or upload.", "s4_2": "Our role. We process Customer Data on your instructions to provide the service. Where the draft Cambodian Law on Personal Data Protection applies once enacted, you are the data controller and we are the data processor in respect of your Buyers' personal data.", "s4_3": "Export. You may export products, orders and customers in [CSV] at any time during your subscription and for [30] days after termination.", "s4_4": "Deletion. On request we will delete Customer Data within [30] days, except where retention is required by law or where data exists in backups, which cycle out within [90] days.", "s4_5": "Backups. We take [daily] backups retained for [30] days. Backups are a disaster-recovery measure for us — they are not a substitute for your own records. Keep your own copies of anything you cannot afford to lose.", "s4_7": "Confidentiality. We will not access your messages or Customer Data except to provide support you request, to investigate a suspected breach or security incident, or where required by law.", "s5Title": "5. Security", "s5_1": "We maintain administrative, technical and physical safeguards including encryption in transit (TLS), encryption at rest, role-based access control, audit logging, and periodic vulnerability assessment and penetration testing.", "s5_2": "You are responsible for: strong unique passwords, enabling two-factor authentication where offered, managing your team's access, and revoking access promptly when staff leave.", "s5_3": "If we become aware of a personal data breach affecting your data, we will notify you without undue delay and in any event within [72] hours of becoming aware, and will provide the information you reasonably need to meet your own obligations.", "s5_4": "Report vulnerabilities to support@loukdo.com. We do not pursue legal action against good-faith researchers who follow our disclosure policy at [loukdo.com/security].", "s6Title": "6. Integrations, custom domains and API", "s6_1": "Connecting a channel or provider requires you to authorize access. You may revoke it at any time; revoking will disable the related features.", "s6_2": "Custom domains. You are responsible for registering and maintaining your domain and pointing DNS correctly. We provision TLS certificates for connected domains. We are not liable for downtime caused by your registrar or DNS configuration.", "s6_3": "API. API access is subject to plan rate limits and the API documentation. We may version, deprecate or change the API with [90] days' notice for breaking changes.", "s7Title": "7. Changes to the service", "s7_1": "We continuously develop the Platform and may add, change or remove features.", "s7_2": "If we materially reduce or remove a core feature you actively use, we will give at least [30] days' notice. If the change materially harms your use, you may cancel and receive a pro-rated refund of prepaid, unused fees for the affected period.", "s7_3": 'Beta and "Early Access" features are provided as-is, may change or be withdrawn without notice, and are excluded from availability targets.' };
const conduct$2 = { "seoTitle": "User Code of Conduct", "title": "User Code of Conduct", "updated": "Last updated: 01 AUG 2026", "introTitle": "Why this exists", "introBody1": "LOUKDO is used by thousands of sellers, their teams and their customers. This Code sets out what we expect from everyone on the Platform. It applies to Sellers, their staff, and anyone contacting our support team.", "introBody2": "It's short on purpose. The principle is simple: sell honestly, treat people decently, don't damage the Platform.", "introBody3": "Breaching it can cost you your Account.", "s1Title": "1. Sell honestly", "s1DoTitle": "Do:", "s1Do1": "Describe products accurately — real photos, real condition, real specifications", "s1Do2": "Display the full price, including delivery, before checkout", "s1Do3": "State realistic delivery timeframes", "s1Do5": "Answer questions about your product truthfully", "s1Do6": "Tell the customer promptly if an item is out of stock", "s1DontTitle": "Don't:", "s1Dont1": "Use photos of products you aren't actually selling", "s1Dont2": 'Post fake "was" prices or invented discounts', "s1Dont4": "Sell counterfeit, replica or unlicensed branded goods", "s1Dont5": "Take payment for stock you don't have and can't get", "s1Dont6": "Add fees at checkout that weren't disclosed", "s2Title": "2. Treat people with respect", "s2Intro": "Whether you're messaging a customer, a supplier, a colleague or our support team:", "s2ListTitle": "Not allowed, ever:", "s2_1": "Harassment, threats, intimidation or stalking", "s2_2": "Hate speech or discrimination based on ethnicity, nationality, religion, gender, sexual orientation, disability, or age", "s2_3": "Sexual harassment or unwanted sexual content", "s2_4": "Doxxing — publishing someone's private information without consent", "s2_5": "Encouraging or coordinating harm against any person or group", "s2_6": "Impersonating another person, business or LOUKDO itself", "s2Outro": "Disagreements happen. A customer complaint that is angry is not abuse. Sustained personal attacks are. Use the block and report tools rather than escalating.", "s3Title": "3. Respect privacy", "s3Intro": "Your customers trust you with their names, phone numbers and addresses.", "s3_1": "Collect only what you need to complete the order", "s3_2": "Use it only to fulfil that order and provide support", "s3_3": "Never sell, rent or trade your customer list", "s3_4": "Never share a customer's details in a group chat, a screenshot or a public post", "s3_5": "Don't add customers to broadcast lists without their agreement", "s3_6": "Delete data you no longer need", "s3_7": "Keep your account secure — an unlocked account is a data breach waiting to happen", "s4Title": "4. Message responsibly", "s4_1": "Message people who have contacted you or agreed to hear from you", "s4_2": "Honour opt-outs immediately and permanently", "s4_3": "Follow the messaging rules of each channel — Meta, Telegram and TikTok each have their own, and breaking them can get your business page banned, not just your LOUKDO account", "s4_4": "Don't send bulk unsolicited promotions", "s4_5": "Don't use automation to evade a channel's rate limits", "s5Title": "5. Protect the Platform", "s5ListTitle": "Don't:", "s5_1": "Attempt to access another user's account or data", "s5_2": "Probe, scan or test the security of the Platform without written permission", "s5_3": "Introduce malware, or use the Platform to distribute it", "s5_4": "Scrape the Platform or its users' data", "s5_5": "Create multiple accounts to evade limits, fees or suspension", "s5_6": "Reverse engineer, decompile or copy the Platform", "s5_7": "Use the Platform in a way that degrades performance for others", "s5Outro": "Found a security flaw? Report it to support@loukdo.com. We'll work with you and we won't come after you for good-faith research.", "s6Title": "6. Follow the law", "s6Intro": "You are responsible for complying with Cambodian law and any other law that applies to your business, including:", "s6_1": "Law on E-Commerce (2019) — licensing, electronic contracts, consumer information", "s6_2": "Law on Consumer Protection (2019) — fair trading, accurate representation, unfair contract terms", "s6_3": "Law on Taxation — VAT registration and remittance where applicable", "s6_4": "Law on Trademarks and copyright law — sell only what you have the right to sell", "s6_5": "Any sector-specific licensing for your goods — cosmetics, food, health products, alcohol", "s6Outro": "If you sell across borders, the destination country's rules apply too.", "s7Title": "7. Support our team fairly", "s7_1": "Our support staff are people. They will be patient, honest and will escalate what they can't solve.", "s7_2": "We do not tolerate abuse of support staff. Threats, slurs or sustained aggression will end the conversation and may end the Account. This is not negotiable.", "s8Title": "8. Reporting", "s8_1": "Report a Seller, or illegal content or security issue: support@loukdo.com", "s8Outro1": "Include: what happened, who was involved, when, and any screenshots or order references. We acknowledge reports within [1] business day.", "s8Outro2": "We do not tolerate retaliation against anyone who reports in good faith. We also act against bad-faith reports made to harm a competitor.", "s9Title": "9. What happens when someone breaches this Code", "s9Intro": "We aim to be proportionate. Depending on severity, history and intent, we may:", "tLevel": "Level", "tAction": "Action", "s9Level1": "1", "s9Action1": "Warning and guidance on what to fix", "s9Level2": "2", "s9Action2": "Feature restriction — e.g. messaging or store publishing paused", "s9Level3": "3", "s9Action3": "Temporary suspension pending investigation", "s9Level4": "4", "s9Action4": "Permanent termination of the Account", "s9Level5": "5", "s9Action5": "Referral to law enforcement or the relevant regulator", "s9Straight": "We may move straight to termination for serious breaches: fraud, child safety violations, threats of violence, or serious illegality.", "s9Appeals": "Appeals. If you believe we got it wrong, email support@loukdo.com within [14] days with your Account details and an explanation. A team member not involved in the original decision will review it and respond within [10] business days.", "s10Title": "10. Changes", "s10_1": "We may update this Code. Material changes are notified in-product or by email at least [14] days in advance.", "s10_2": "Questions: support@loukdo.com" };
const privacy$2 = /* @__PURE__ */ JSON.parse(`{"seoTitle":"Privacy Policy","title":"Privacy Policy","updated":"Last updated: 01 AUG 2026","effective":"Effective: 01 AUG 2026","summaryTitle":"Summary","summaryBody1":"We collect the information we need to run LOUKDO and nothing more. We don't sell your data. Sellers own their customer data — we only process it on their instructions. You can access, correct, export or delete your data by emailing support@loukdo.com.","s1Title":"1. Who is responsible for your data","s1_1":"[E3Byte Co., Ltd.], #St 317, Phumi 7, Sangkat Beoung Kok 1, Khan Toul Kok, Phnom Penh, Cambodia], Phnom Penh, Cambodia, operates www.loukdo.com.","s1_3":"Note on Cambodian law: As of the date above, Cambodia's Law on Personal Data Protection remains in draft, with a verification workshop held by the Ministry of Posts and Telecommunications in August 2026. In the meantime, personal data in Cambodia is protected under the Constitution, the Civil Code, the Criminal Code, and sector-specific laws including the Law on E-Commerce (2019). We have chosen to build our practices to the standard of the draft law and international norms rather than the current minimum. We will update this policy when the law is promulgated.","s2Title":"2. Our two roles — these matters","s2_1":"LOUKDO handles personal data in two distinct capacities:","s2_2":"As a controller — for data about our own users: the sellers and staff who hold LOUKDO accounts, website visitors, and people who contact us. We decide why and how this data is used, and this policy governs it.","s2_3":"As a processor — for data about our sellers' customers: the buyers whose names, phone numbers and addresses flow through a seller's inbox and orders. The seller is the controller of that data. We process it only on the seller's instructions, to deliver the service.","s3Title":"3. What we collect","s3_1Title":"3.1 Information you give us","tCategory":"Category","tExamples":"Examples","tWhy":"Why","s3RowAccountName":"Account","s3RowAccountExamples":"Name, email, phone, password hash, language","s3RowAccountWhy":"Create and secure your account","s3RowBusinessName":"Business","s3RowBusinessExamples":"Business name, address, business type, registration/licence numbers, VAT TIN","s3RowBusinessWhy":"Verification, invoicing, legal compliance","s3RowBillingName":"Billing","s3RowBillingExamples":"Plan, billing address, payment method token, invoice history","s3RowBillingWhy":"Process your subscription","s3RowContentName":"Content","s3RowContentExamples":"Products, images, prices, orders, messages, notes","s3RowContentWhy":"Deliver the service","s3RowSupportName":"Support","s3RowSupportExamples":"Enquiries, correspondence, call notes","s3RowSupportWhy":"Answer your questions","s3RowMarketingName":"Marketing","s3RowMarketingExamples":"Newsletter subscription, event registration","s3RowMarketingWhy":"Send what you asked for","s3_1Note":"We do not store full card numbers. Payment card data is handled by our payment processor; we store only a token and the last four digits.","s3_2Title":"3.2 Information collected automatically","s3_2a":"Device and connection: IP address, browser type and version, operating system, device identifiers, screen resolution","s3_2b":"Usage: pages viewed, features used, timestamps, session duration, referring URL, clicks","s3_2d":"Approximate location: derived from IP address, at city level, for security and localization","s3_3Title":"3.3 Information from third parties","s3_3a":"Connected channels (Meta, Telegram, TikTok): messages, profile names and IDs, and the permissions you granted","s3_3b":"Payment providers: transaction status, confirmation references","s3_3c":"Couriers: shipment status and tracking","s3_3d":"Fraud and security vendors: risk signals","s3_3e":"Public registries: business registration verification","s3_4Title":"3.4 What we don't collect","s3_4Body":"We do not intentionally collect sensitive personal data — health data, biometric data, political opinions, religious beliefs, trade union membership, or sexual orientation. Do not upload it. If you must handle such data for your business, you are the controller and must have your own lawful basis. We do not knowingly collect data from anyone under 18. If we learn we have, we delete it. Contact support@loukdo.com if you believe this has happened.","s4Title":"4. Why we use it, and on what basis","tPurpose":"Purpose","tLawfulBasis":"Lawful basis","s4Row1Purpose":"Provide the Platform and its features","s4Row1Basis":"Performance of contract","s4Row2Purpose":"Create and manage your account","s4Row2Basis":"Performance of contract","s4Row3Purpose":"Process subscriptions and invoices","s4Row3Basis":"Performance of contract; legal obligation","s4Row4Purpose":"Provide customer support","s4Row4Basis":"Performance of contract","s4Row5Purpose":"Send service and security notices","s4Row5Basis":"Legitimate interests; legal obligation","s4Row6Purpose":"Detect and prevent fraud and abuse","s4Row6Basis":"Legitimate interests; legal obligation","s4Row7Purpose":"Improve and develop the Platform","s4Row7Basis":"Legitimate interests","s4Row8Purpose":"Analytics and performance measurement","s4Row8Basis":"Consent (non-essential cookies)","s4Row9Purpose":"Marketing emails and product announcements","s4Row9Basis":"Consent (withdrawable any time)","s4Row10Purpose":"Comply with tax, accounting and licensing law","s4Row10Basis":"Legal obligation","s4Row11Purpose":"Establish, exercise or defend legal claims","s4Row11Basis":"Legitimate interests","s4Outro":"Where we rely on legitimate interests, we have assessed that our interest does not override your rights. You can ask for that assessment at support@loukdo.com.","s5Title":"5. What we never do","s5_1":"We do not sell your personal data. Not to advertisers, not to data brokers, not to anyone.","s5_2":"We do not sell or share sellers' customer lists.","s5_3":"We do not use the content of your customer conversations to market to your customers.","s5_4":"We do not use your Customer Data to train third-party AI models.","s5_5":"We do not run advertising on the Platform.","s6Title":"6. Who we share it with","s6Intro":"We share personal data only as described here:","s6ProvidersTitle":"Service providers acting on our instructions","s6ProvidersIntro":"— under written contracts requiring confidentiality and equivalent protection:","tProviderType":"Provider type","tPurposeShort":"Purpose","tLocation":"Location","s6RowHostingType":"Cloud hosting","s6RowHostingPurpose":"Run the Platform","s6RowHostingLocation":"[Singapore / Cambodia]","s6RowPaymentType":"Payment processing","s6RowPaymentPurpose":"Handle subscriptions","s6RowPaymentLocation":"[Cambodia]","s6RowEmailType":"Email delivery","s6RowEmailPurpose":"Transactional and marketing email","s6RowEmailLocation":"[Cambodia]","s6RowAnalyticsType":"Analytics","s6RowAnalyticsPurpose":"Understand product usage","s6RowAnalyticsLocation":"[Cambodia]","s6RowSupportType":"Customer support tooling","s6RowSupportPurpose":"Manage support conversations","s6RowSupportLocation":"[Cambodia]","s6RowSmsType":"SMS / OTP delivery","s6RowSmsPurpose":"Verification and alerts","s6RowSmsLocation":"[Cambodia]","s6Authorised":"Connected services you authorize — messaging channels, payment providers and couriers you choose to connect. Data flows to them under their own terms.","s6Legal":"Legal and safety disclosures — where required by law, court order, or a valid request from a Cambodian authority, or where necessary to protect the rights, safety or property of LOUKDO, our users, or the public. Where legally permitted, we will notify you first.","s6BusinessTransfers":"Business transfers — in a merger, acquisition or sale of assets, subject to the acquirer honoring this policy. We will notify you before your data becomes subject to a different policy.","s7Title":"7. International transfers","s7_1":"Some of our providers operate outside Cambodia. Where data is transferred abroad, we ensure appropriate safeguards: contractual protections including standard data protection clauses, a due-diligence assessment of the recipient, and encryption in transit and at rest.","s7_2":"If you are a bank or financial institution, note that the National Bank of Cambodia's outsourcing and risk management guidance may impose additional requirements on cross-border processing of your data — tell us before onboarding so we can address it.","s8Title":"8. How long we keep it","tData":"Data","tRetention":"Retention","s8Row1Data":"Account data","s8Row1Retention":"Life of the account + [12] months","s8Row2Data":"Customer Data (products, orders)","s8Row2Retention":"Life of the account + [30] days for export","s8Row3Data":"Invoices and financial records","s8Row3Retention":"[10] years — Cambodian tax and accounting law","s8Row4Data":"Support correspondence","s8Row4Retention":"[3] years from resolution","s8Row5Data":"Security and access logs","s8Row5Retention":"[12] months","s8Row6Data":"Marketing consent records","s8Row6Retention":"Until withdrawn + [3] years as proof","s8Row7Data":"Backups","s8Row7Retention":"Cycle out within [90] days","s8Row8Data":"Data relating to a legal claim","s8Row8Retention":"Until the claim is fully resolved","s8Outro":"Confirm the tax retention period with your accountant — this drives the whole table.","s9Title":"9. Your rights","s9Intro":"You may:","s9_1":"Access — get a copy of the personal data we hold about you","s9_2":"Correct — have inaccurate data fixed","s9_3":"Delete — have your data erased, where we have no overriding legal basis to keep it","s9_4":"Restrict — limit how we use your data while a dispute is resolved","s9_5":"Object — object to processing based on legitimate interests, including profiling","s9_6":"Port — receive your data in a structured, machine-readable format","s9_7":"Withdraw consent — at any time, without affecting processing already carried out","s9_8":"Complain — to us, and to the relevant Cambodian authority once a data protection regulator is established under the Law on Personal Data Protection","s9Outro1":"To exercise any right: email support@loukdo.com from your registered address.","s9Outro2":"We respond within [30] days. Complex requests may take longer — we'll tell you if so and why. We may ask you to verify your identity. There is no charge unless a request is manifestly unfounded or repetitive.","s10Title":"10. Security","s10Intro":"We protect personal data with:","s10_1":"Encryption in transit (TLS 1.2+) and at rest","s10_2":"Role-based access control, with staff access on a least-privilege basis","s10_3":"Two-factor authentication for administrative access","s10_4":"Audit logging of access to personal data","s10_5":"Regular vulnerability assessment and penetration testing","s10_6":"Vetted, contractually bound sub-processors","s10_7":"Documented incident response procedures","s10_8":"Staff training on data protection and security","s10Outro1":"No system is perfectly secure. Your role matters: use a strong unique password, enable two-factor authentication, and remove team access promptly when someone leaves.","s10Outro2":"In a breach affecting your personal data, we will notify you and the relevant authority without undue delay and in any event within [72] hours of becoming aware, describing what happened, what data was involved, what we're doing, and what you should do.","s11Title":"11. Automated decision-making","s11_1":"We use automated systems to detect fraud, spam and abuse. These may flag an account for review. Decisions with a significant effect on you — such as suspension — are reviewed by a person before they take effect, except where an immediate automated action is necessary to prevent ongoing harm, in which case human review follows promptly.","s11_2":"You may request human review of any automated decision at support@loukdo.com","s12Title":"12. Cookies","s12Body":"See our Cookies Policy for full detail on cookies and similar technologies, and how to control them.","s13Title":"13. Changes to this policy","s13Body":"We may update this policy. Material changes will be notified by email or in-product at least [14] days before they take effect. The \\"Last updated\\" date always reflects the current version. We keep previous versions available at [loukdo.com/privacy].","s14Title":"14. Contact","s14_1":"Data Protection Officer support@LOUKDO.com","s14_2":"[E3Byte Co., Ltd.], Address [#st 317 , Phumi 7 , Sangkat Beoung Kok 1, Khan Toul Kok, Phnom Penh, Cambodia","s14_3":"Contact number [+855 70 677 666]"}`);
const cookies$2 = { "title": "Cookies Policy", "updated": "Last updated: 01 AUG 2026", "s1Title": "1. What cookies are", "s1_1": "Cookies are small text files a website stores on your device. They let a site remember you between pages and visits — keeping you logged in, remembering your language, and measuring how the site is used.", "s1_2": 'This policy also covers similar technologies: local storage, session storage, pixels/web beacons, and software development kits (SDKs) in our mobile apps. We call them all "cookies" here.', "s2Title": "2. How we use them", "s2Intro": "We use cookies to:", "s2_1": "Keep you signed in and secure your session", "s2_2": "Remember your language and display preferences", "s2_3": "Protect against fraud and automated attacks", "s2_4": "Understand which features are used, so we can improve them", "s2_5": "Measure whether our marketing works", "s3Title": "3. Categories", "s3NecessaryTitle": "Strictly necessary — always on", "s3NecessaryIntro": "The Platform cannot function without these. They don't require consent and can't be turned off in our banner.", "tCookie": "Cookie", "tPurpose": "Purpose", "tDuration": "Duration", "s3RowSessionName": "LOUKDO_session", "s3RowSessionPurpose": "Maintains your logged-in session", "s3RowSessionDuration": "Session", "s3RowCsrfName": "LOUKDO_csrf", "s3RowCsrfPurpose": "Prevents cross-site request forgery", "s3RowCsrfDuration": "Session", "s3RowAuthName": "LOUKDO_auth", "s3RowAuthPurpose": "Authentication token", "s3RowAuthDuration": "[30] days", "s3RowConsentName": "LOUKDO_consent", "s3RowConsentPurpose": "Remembers your cookie choices", "s3RowConsentDuration": "[12] months", "s3RowBotName": "__cf_bm", "s3RowBotPurpose": "Bot protection (Cloudflare)", "s3RowBotDuration": "30 minutes", "s4Title": "4. Third-party cookies", "s4Intro": "Some cookies are set by others: analytics providers, advertising platforms, our CDN and bot protection, embedded video players, and payment provider frames. We don't control them. Check their own privacy policies:", "s4_1": "https://www.facebook.com/privacy/policy", "s4_2": "https://www.tiktok.com/legal/page/us/privacy-policy/en", "s4_3": "https://www.cloudflare.com/privacypolicy", "s5Title": "5. Your choices", "s5BannerTitle": "Our banner.", "s5BannerBody": "On your first visit you can Accept all, reject all (non-essential), or choose by category. Change your mind any time via Cookie Settings in the footer.", "s5BrowserTitle": "Your browser. Most browsers let you block or delete cookies:", "s5_1": "Chrome: Settings → Privacy and security → Third-party cookies", "s5_2": "Safari: Settings → Safari → Privacy & Security", "s5_3": "Firefox: Settings → Privacy & Security → Cookies and Site Data", "s5_4": "Edge: Settings → Cookies and site permissions", "s5Note": "Note: blocking strictly necessary cookies will break sign-in and checkout.", "s5Dnt": "Do Not Track. There is no common standard for DNT, so we do not currently respond to DNT signals. Use our banner instead — it works.", "s6Title": "6. Cookies on seller stores", "s6_1": "If you visit a store hosted on loukdo.com or a connected custom domain, cookies are set for cart and checkout functionality. The seller may also add their own tracking tags — for example a Meta Pixel or Google tag. Those are the seller's responsibility and are governed by the seller's own privacy notice.", "s6_2": "Sellers: if you add tracking to your store, you must disclose it and obtain consent where required. That's your obligation, not ours.", "s7Title": "7. Changes", "s7_1": "We'll update this policy as our cookie use changes. Material changes reset the consent banner so you can review your choices.", "s8Title": "8. Contact", "s8_1": "support@loukdo.com" };
const en = {
  meta: meta$2,
  nav: nav$2,
  a11y: a11y$2,
  theme: theme$2,
  footer: footer$2,
  home: home$2,
  features: features$2,
  about: about$2,
  contact: contact$2,
  terms: terms$2,
  tos: tos$2,
  conduct: conduct$2,
  privacy: privacy$2,
  cookies: cookies$2
};
const meta$1 = { "siteName": "លូកដូ" };
const nav$1 = { "home": "ទំព័រដើម", "features": "មុខងារ", "about": "អំពីយើង", "contact": "ទាក់ទងយើង", "getStarted": "ចាប់ផ្តើម" };
const a11y$1 = { "openMenu": "បើកម៉ឺនុយ", "themeToggle": "ប្តូរផ្ទាំងពណ៌", "closeMenu": "បិទម៉ឺនុយ", "mobileNav": "ម៉ឺនុយចល័ត", "scrollToTop": "រំកិលទៅលើគេ", "scrollToBottom": "រំកិលទៅក្រោមគេ" };
const theme$1 = { "light": "ភ្លឺ", "system": "ប្រព័ន្ធ", "dark": "ងងឹត" };
const footer$1 = { "tagline": "គឺជាកន្លែងធ្វើការពាណិជ្ជកម្មសង្គម ដែលបំប្លែងរាល់ការសន្ទនាទៅជាការបញ្ជាទិញដែលបានបញ្ជាក់ បង់ប្រាក់ និងដឹកជញ្ជូនរួចរាល់។", "menu": "ម៉ឺនុយ", "legal": "លក្ខខណ្ឌច្បាប់", "termsConditions": "លក្ខខណ្ឌប្រើប្រាស់", "termsOfService": "លក្ខខណ្ឌសេវាកម្ម", "userConduct": "ក្រមសីលធម៌អ្នកប្រើប្រាស់", "privacy": "គោលការណ៍ភាពឯកជន និងខូគី", "followUs": "តាមដានយើង", "copyright": "© {year} លូកដូ។ ឧត្តមភាពក្នុងស្រុក ស្តង់ដារអន្តរជាតិ។" };
const home$1 = { "seoTitle": "ជជែក។ បញ្ជាទិញ។ ដឹកជញ្ជូន។", "seoDescription": "លូកដូនាំយក Facebook, Instagram, Telegram, TikTok និង WhatsApp មកបញ្ចូលគ្នាក្នុងប្រអប់សារតែមួយ ដើម្បីអ្នកអាចឆ្លើយតប បង្កើតការបញ្ជាទិញ ទទួលការទូទាត់ និងកក់ការដឹកជញ្ជូន ដោយមិនចាំបាច់ប្តូរកម្មវិធី។", "eyebrow": "សាងសង់នៅកម្ពុជា សម្រាប់អ្នកលក់កម្ពុជា", "title": "ជជែក។ បញ្ជាទិញ។ ដឹកជញ្ជូន។", "description": "លូកដូនាំយក Facebook, Instagram, Telegram, TikTok និង WhatsApp មកបញ្ចូលគ្នាក្នុងប្រអប់សារតែមួយ ដើម្បីអ្នកអាចឆ្លើយតប បង្កើតការបញ្ជាទិញ ទទួលការទូទាត់ និងកក់ការដឹកជញ្ជូន ដោយមិនចាំបាច់ប្តូរកម្មវិធី។", "ctaPrimary": "សាកល្បងឥតគិតថ្លៃ", "ctaSecondary": "កក់ការបង្ហាញ", "heroImageAlt": "ប្រអប់សាររបស់លូកដូបង្ហាញនៅលើថេប្លេត និងទូរស័ព្ទ ក្រឡេកទៅភ្នំពេញ", "problem": { "title": "អ្នកមិនបានចាប់ផ្តើមអាជីវកម្មដើម្បីគ្រប់គ្រងកម្មវិធីប្រាំមួយឡើយ", "subtitle": "ភាពច្របូកច្របល់នៃការលក់ច្រើនប៉ុស្តិ៍កំពុងធ្វើឲ្យអ្នកបាត់បង់អតិថិជន និងភាពស្ងប់ចិត្ត។", "lostTitle": "ការបញ្ជាទិញបាត់បង់", "lostBody": "អតិថិជនម្នាក់សួរតម្លៃតាមមតិយោបល់លើហ្វេសប៊ុក ក្រោយមកផ្ញើសារតាមតេឡេក្រាម ហើយចុងក្រោយព្យាយាមទិញតាមអ៊ីនស្តាក្រាម។ ដោយគ្មានទិដ្ឋភាពរួម ការបញ្ជាទិញនោះអាចរអិលចេញ បណ្តាលឲ្យបាត់បង់ចំណូល និងភាពខកចិត្ត។", "blindTitle": "ក្រុមការងាររបស់អ្នកមើលមិនឃើញគ្នា", "blindBody": "បុគ្គលិកពីរនាក់ឆ្លើយតបទៅអតិថិជនតែម្នាក់ដោយតម្លៃខុសគ្នា ព្រោះពួកគេប្រើឧបករណ៍ខុសគ្នា ឬមើលកម្មវិធីខុសគ្នា។ វាបង្កភាពច្របូកច្របល់ ធ្វើឲ្យខូចទំនុកចិត្តលើម៉ាក និងធ្វើឲ្យដំណើរការលក់យឺតយ៉ាវ។" }, "chaos": { "title": "បញ្ចប់ភាពច្របូកច្របល់", "subtitle": "នាំយកអ្វីៗទាំងអស់មកកន្លែងតែមួយ ដែលមានសុវត្ថិភាព និងងាយស្រួលគ្រប់គ្រង។" } };
const features$1 = { "seoTitle": "មុខងារ", "seoDescription": "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការសម្រាប់គ្រប់គ្រងការសន្ទនា ដំណើរការការបញ្ជាទិញ និងពង្រីកអាជីវកម្មរបស់អ្នកក្នុងវេទិកាតែមួយ។", "title": "មុខងារដ៏មានឥទ្ធិពលសម្រាប់អ្នកលក់សម័យទំនើប", "subtitle": "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការសម្រាប់គ្រប់គ្រងការសន្ទនា ដំណើរការការបញ្ជាទិញ និងពង្រីកអាជីវកម្មរបស់អ្នកក្នុងវេទិកាតែមួយ។", "omnichat": { "title": "ប្រអប់សារបញ្ចូលគ្នា", "body": "ប្រអប់សារតែមួយ។ គ្រប់ប៉ុស្តិ៍ទាំងអស់។ បញ្ចូលការទំនាក់ទំនងអតិថិជនរបស់អ្នកទៅជាចំណុចប្រទាក់តែមួយ។ កុំខកខានសារណាមួយទៀត។", "point1": "ព័ត៌មានអតិថិជនរួម", "point2": "ចាត់តាំងការសន្ទនា", "point3": "ចម្លើយរក្សាទុក", "point4": "ឆ្លើយតបស្វ័យប្រវត្តិ", "point5": "មតិយោបល់ទៅប្រអប់សារ", "cta": "មើលរបៀបដែលប្រអប់សារបញ្ចូលគ្នាដំណើរការ" }, "orders": { "title": "ការគ្រប់គ្រងការបញ្ជាទិញ", "body": "ប្តូរសារមួយទៅជាការបញ្ជាទិញក្នុងបីជំហាន។ សម្រួលដំណើរការលក់ពីការសន្ទនារហូតដល់ប្រតិបត្តិការបញ្ចប់ ដោយមិនចាំបាច់ចាកចេញពីការជជែក។", "point1": "បង្កើតការបញ្ជាទិញផ្ទាល់ក្នុងការជជែក", "point2": "KHQR / Bakong / ABA / បង់ប្រាក់ពេលទទួល", "point3": "កក់ការដឹកជញ្ជូន", "cta": "មើលរបៀបដែលការបញ្ជាទិញដំណើរការ" }, "steps": { "title": "ពីសារដំបូងរហូតដល់ការបញ្ជាទិញបានដឹកជញ្ជូន", "subtitle": "ការចាប់ផ្តើមប្រើលូកដូគឺសាមញ្ញ និងត្រង់ៗ។", "step1Title": "ភ្ជាប់ប៉ុស្តិ៍របស់អ្នក", "step1Body": "ភ្ជាប់គណនី Facebook, Instagram និង Telegram របស់អ្នកក្នុងរយៈពេលប៉ុន្មាននាទី។", "step2Title": "បន្ថែមផលិតផលរបស់អ្នក", "step2Body": "អាប់ឡូតកាតាឡុករបស់អ្នកដើម្បីចាប់ផ្តើមបង្កើតការបញ្ជាទិញផ្ទាល់ពីការសន្ទនា។", "step3Title": "លក់ពីប្រអប់សារ", "step3Body": "ឆ្លើយតប បង្កើតការបញ្ជាទិញ ផ្ញើតំណទូទាត់ កក់ការដឹកជញ្ជូន។ រួចរាល់។" }, "faq": { "title": "សំណួរញឹកញាប់", "q1": "តើលូកដូមានជាភាសាខ្មែរដែរឬទេ?", "a1": "បាទ/ចាស៎ — ចំណុចប្រទាក់ទាំងមូល មជ្ឈមណ្ឌលជំនួយ និងការគាំទ្រមានទាំងភាសាខ្មែរ និងអង់គ្លេស។", "q2": "តើបុគ្គលិករបស់ខ្ញុំអាចប្រើដោយមិនឃើញអ្វីៗទាំងអស់បានទេ?", "a2": "បាទ/ចាស៎។ ចាត់តាំងតួនាទីដើម្បីឲ្យបុគ្គលិកអាចដោះស្រាយការជជែក និងការបញ្ជាទិញ ដោយមិនឃើញរបាយការណ៍ហិរញ្ញវត្ថុ ឬការកំណត់។", "q3": "ចុះបើខ្ញុំមានវេបសាយរួចហើយ?", "a3": "រក្សាវាទុក។ ប្រើលូកដូសម្រាប់ប្រអប់សារ និងការបញ្ជាទិញ។", "q4": "តើខ្ញុំទទួលបានប្រាក់យ៉ាងដូចម្តេច?", "a4": "ការទូទាត់ចូលដោយផ្ទាល់ទៅគណនីធនាគារ ឬកាបូបរបស់អ្នកតាមរយៈអ្នកផ្តល់សេវាទូទាត់របស់អ្នក។ លូកដូមិនដែលកាន់កាប់ប្រាក់របស់អ្នកឡើយ។", "q5": "ចុះទិន្នន័យរបស់ខ្ញុំនឹងទៅជាយ៉ាងណា បើខ្ញុំចាកចេញ?", "a5": "អ្នកអាចនាំចេញផលិតផល ការបញ្ជាទិញ និងអតិថិជនរបស់អ្នកគ្រប់ពេល រួមទាំងក្រោយពេលលុបចោលផងដែរ។" } };
const about$1 = { "seoTitle": "អំពីយើង", "seoDescription": "លូកដូត្រូវបានបង្កើតនៅភ្នំពេញ សម្រាប់ជនជាតិខ្មែររាប់លាននាក់ដែលដំណើរការអាជីវកម្មពិតប្រាកដក្នុងកម្មវិធីជជែក។", "title": "យើងសាងសង់ឧបករណ៍សម្រាប់អ្នកដែលលក់ជាក់ស្តែង", "subtitle": "លូកដូត្រូវបានបង្កើតនៅភ្នំពេញ សម្រាប់ជនជាតិខ្មែររាប់លាននាក់ដែលដំណើរការអាជីវកម្មពិតប្រាកដក្នុងកម្មវិធីជជែក។", "storyTitle": "វាចាប់ផ្តើមជាមួយសៀវភៅកត់ត្រា", "storyBody": "យើងបានឃើញអ្នកលក់ម្នាក់នៅមូលដ្ឋានគ្រប់គ្រងកម្មវិធីជជែកប្រាំមួយក្នុងពេលតែមួយ។ ការបញ្ជាទិញចូលមកពីតេឡេក្រាម ម៉េសិនជើរ និងអ៊ីនស្តាក្រាម។ ប្រព័ន្ធតែមួយគត់របស់នាងគឺសៀវភៅកត់ត្រាដែលសរសេរដៃយ៉ាងច្រើន។ នាងបាត់បង់ការបញ្ជាទិញ ច្រឡំការទូទាត់ និងតានតឹងខ្លាំង។ យើងដឹងថាត្រូវមានវិធីល្អជាងនេះ ដើម្បីគាំទ្រឆ្អឹងខ្នងសេដ្ឋកិច្ចឌីជីថលរបស់យើង។", "storyImageAlt": "សៀវភៅកត់ត្រាលក់ជាភាសាខ្មែរសរសេរដៃនៅជាប់នឹងទូរស័ព្ទបង្ហាញការបញ្ជាទិញ", "beliefsTitle": "អ្វីដែលយើងជឿជាក់", "belief1Title": "អ្នកលក់ជាម្ចាស់អតិថិជនរបស់ខ្លួន", "belief1Body": "ការទំនាក់ទំនង គ្រប់ការសន្ទនា និងប្រវត្តិការបញ្ជាទិញទាំងអស់ជាកម្មសិទ្ធិរបស់អ្នកលក់ មិនមែនរបស់យើងទេ។ នាំចេញបានគ្រប់ពេលដែលអ្នកចង់បាន។", "belief2Title": "ភាសាខ្មែរជាមុន មិនមែនជាបន្ទាប់ទេ", "belief2Body": "ភាសាខ្មែរមិនមែនជាស្រទាប់បកប្រែបន្ថែមក្រោយពេលដាក់ឲ្យប្រើនោះទេ។ វាជារបៀបដែលយើងរចនា សរសេរ និងគាំទ្រ។", "belief3Title": "អាជីវកម្មតូចៗសមនឹងទទួលបានវិស្វកម្មដ៏ជាក់ស្តែង", "belief3Body": "ពេលដំណើរការជាប់លាប់ សុវត្ថិភាព និងកិច្ចការពារទិន្នន័យ មិនមែនជាមុខងារសម្រាប់សហគ្រាសធំនោះទេ។ វាជាមូលដ្ឋានគ្រឹះ។", "doTitle": "អ្វីដែលយើងធ្វើ", "doSubtitle": "លូកដូជាវេទិកាពាណិជ្ជកម្មសង្គមដែលមានចំណុចស្នូលបួន៖", "omnichatTitle": "ប្រអប់សារបញ្ចូលគ្នា", "omnichatBody": "គ្រប់ប៉ុស្តិ៍ក្នុងប្រអប់សារតែមួយ។", "ordersTitle": "ការបញ្ជាទិញ", "ordersBody": "បង្កើតក្នុងការជជែក បង់ប្រាក់តាម KHQR ដឹកជញ្ជូនដោយក្រុមហ៊ុនដឹកជញ្ជូនក្នុងស្រុក។", "productsTitle": "ផលិតផល", "productsBody": "កាតាឡុកតែមួយដែលផ្គត់ផ្គង់ការជជែក និងការលក់ផ្ទាល់។", "deliveryTitle": "ការដឹកជញ្ជូន", "deliveryBody": "ចុចតែម្តង ហើយបញ្ជូនតាមដៃគូដឹកជញ្ជូន។", "companyTitle": "ក្រុមហ៊ុនរបស់យើង", "companyBody": "លូកដូជាផលិតផលរបស់ {company} ដែលបានចុះបញ្ជីនៅកម្ពុជា។", "companyReg": "លេខចុះបញ្ជី៖ 00072217", "companyAddress": "ការិយាល័យបានចុះបញ្ជី៖ #ផ្លូវ 317 ភូមិ 7 សង្កាត់បឹងកក់ 1 ខណ្ឌទួលគោក ភ្នំពេញ កម្ពុជា" };
const contact$1 = { "seoTitle": "ទាក់ទងយើង", "seoDescription": "មានសំណួរអំពីតម្លៃ ការភ្ជាប់ប្រព័ន្ធ ឬការចាប់ផ្តើម? យើងឆ្លើយតបជាភាសាខ្មែរ ឬអង់គ្លេស ជាធម្មតាក្នុងរយៈពេលប៉ុន្មានម៉ោង។", "title": "ទាក់ទងមកកាន់យើង", "subtitle": "មានសំណួរអំពីតម្លៃ ការភ្ជាប់ប្រព័ន្ធ ឬការចាប់ផ្តើម? យើងឆ្លើយតបជាភាសាខ្មែរ ឬអង់គ្លេស ជាធម្មតាក្នុងរយៈពេលប៉ុន្មានម៉ោង។", "telegramTitle": "តេឡេក្រាម", "telegramBody": "ពេលវេលាឆ្លើយតបលឿនបំផុត។", "telegramCta": "ផ្ញើសារមកយើង", "emailTitle": "ការគាំទ្រតាមអ៊ីមែល", "emailValue": "support@loukdo.com", "phoneTitle": "ទូរស័ព្ទ", "phoneValue": "+855 70 677 666", "formTitle": "ផ្ញើសារមួយ", "formName": "ឈ្មោះ", "formNamePlaceholder": "ឈ្មោះពេញរបស់អ្នក", "formEmail": "អ៊ីមែល", "formEmailPlaceholder": "you{'@'}company.com", "formMessage": "សារ", "formMessagePlaceholder": "តើយើងអាចជួយអ្វីបាន?", "formSubmit": "ផ្ញើសារ", "formSuccess": "អរគុណ — យើងនឹងឆ្លើយតបទៅអ្នកឆាប់ៗនេះ។", "hqTitle": "ការិយាល័យកណ្តាល", "hqBody": "HVMW+CVH Phnom Penh, Cambodia", "hqNote": "ការទស្សនាដោយការណាត់ជួបជាមុន សម្រាប់តែអតិថិជនសហគ្រាសប៉ុណ្ណោះ។", "mapAlt": "ផែនទីបង្ហាញទីស្នាក់ការកណ្តាលរបស់លូកដូនៅភ្នំពេញ កម្ពុជា" };
const terms$1 = { "seoTitle": "លក្ខខណ្ឌប្រើប្រាស់", "seoDescription": "លក្ខខណ្ឌគ្រប់គ្រងការចូលប្រើ និងការប្រើប្រាស់វេទិកាលូកដូ។", "title": "លក្ខខណ្ឌប្រើប្រាស់", "updated": "កាលបរិច្ឆេទកែសម្រួលចុងក្រោយ៖ {date}", "effective": "មានប្រសិទ្ធភាពចាប់ពី៖ {date}", "note": "ខ្លឹមសារពេញលេញនៃលក្ខខណ្ឌនេះមានជាភាសាអង់គ្លេសខាងក្រោម។ សម្រាប់ច្បាប់ចម្លងជាភាសាខ្មែរជាផ្លូវការ សូមទាក់ទង legal{'@'}loukdo.com។" };
const tos$1 = { "seoTitle": "លក្ខខណ្ឌនៃសេវាកម្ម", "seoDescription": "របៀបដែលសេវាកម្មលូកដូត្រូវបានផ្តល់ជូន គិតថ្លៃ និងគាំទ្រ។", "title": "លក្ខខណ្ឌនៃសេវាកម្ម", "updated": "កាលបរិច្ឆេទកែសម្រួលចុងក្រោយ៖ {date}", "effective": "មានប្រសិទ្ធភាពចាប់ពី៖ {date}", "note": "ខ្លឹមសារពេញលេញនៃលក្ខខណ្ឌនេះមានជាភាសាអង់គ្លេសខាងក្រោម។ សម្រាប់ច្បាប់ចម្លងជាភាសាខ្មែរជាផ្លូវការ សូមទាក់ទង legal{'@'}loukdo.com។" };
const conduct$1 = { "seoTitle": "ក្រមសីលធម៌អ្នកប្រើប្រាស់", "seoDescription": "អ្វីដែលយើងរំពឹងទុកពីអ្នកគ្រប់គ្នាដែលប្រើប្រាស់វេទិកាលូកដូ។", "title": "ក្រមសីលធម៌អ្នកប្រើប្រាស់", "updated": "កាលបរិច្ឆេទកែសម្រួលចុងក្រោយ៖ {date}", "note": "ខ្លឹមសារពេញលេញនៃក្រមនេះមានជាភាសាអង់គ្លេសខាងក្រោម។ សម្រាប់ច្បាប់ចម្លងជាភាសាខ្មែរជាផ្លូវការ សូមទាក់ទង conduct{'@'}loukdo.com។" };
const privacy$1 = { "seoTitle": "គោលការណ៍ភាពឯកជន និងខូគី", "seoDescription": "របៀបដែលលូកដូប្រមូល ប្រើប្រាស់ និងការពារទិន្នន័យផ្ទាល់ខ្លួន ព្រមទាំងការប្រើប្រាស់ខូគីនៅលើវេទិកា។", "title": "គោលការណ៍ភាពឯកជន និងខូគី", "updated": "កាលបរិច្ឆេទកែសម្រួលចុងក្រោយ៖ {date}", "effective": "មានប្រសិទ្ធភាពចាប់ពី៖ {date}", "note": "ខ្លឹមសារពេញលេញនៃគោលការណ៍នេះមានជាភាសាអង់គ្លេសខាងក្រោម។ សម្រាប់ច្បាប់ចម្លងជាភាសាខ្មែរជាផ្លូវការ សូមទាក់ទង privacy{'@'}loukdo.com។" };
const cookies$1 = { "title": "គោលការណ៍ខូគី" };
const km = {
  meta: meta$1,
  nav: nav$1,
  a11y: a11y$1,
  theme: theme$1,
  footer: footer$1,
  home: home$1,
  features: features$1,
  about: about$1,
  contact: contact$1,
  terms: terms$1,
  tos: tos$1,
  conduct: conduct$1,
  privacy: privacy$1,
  cookies: cookies$1
};
const meta = { "siteName": "Loukdo" };
const nav = { "home": "首页", "features": "功能", "about": "关于我们", "contact": "联系我们", "getStarted": "立即开始" };
const a11y = { "openMenu": "打开菜单", "themeToggle": "切换主题", "closeMenu": "关闭菜单", "mobileNav": "移动导航", "scrollToTop": "滚动到顶部", "scrollToBottom": "滚动到底部" };
const theme = { "light": "浅色", "system": "跟随系统", "dark": "深色" };
const footer = { "tagline": "是一个社交电商工作台，将每一次对话转化为已确认、已付款、已送达的订单。", "menu": "菜单", "legal": "法律条款", "termsConditions": "条款与条件", "termsOfService": "服务条款", "userConduct": "用户行为准则", "privacy": "隐私与Cookie政策", "followUs": "关注我们", "copyright": "© {year} Loukdo。本地卓越，全球标准。" };
const home = { "seoTitle": "聊天。下单。送达。", "seoDescription": "Loukdo 将 Facebook、Instagram、Telegram、TikTok 和 WhatsApp 汇聚到一个收件箱，让你无需切换应用即可回复消息、创建订单、收款并预约配送。", "eyebrow": "在柬埔寨打造，为柬埔寨卖家而生", "title": "聊天。下单。送达。", "description": "Loukdo 将 Facebook、Instagram、Telegram、TikTok 和 WhatsApp 汇聚到一个收件箱，让你无需切换应用即可回复消息、创建订单、收款并预约配送。", "ctaPrimary": "免费试用", "ctaSecondary": "预约演示", "heroImageAlt": "Loukdo 统一收件箱在平板和手机上的展示，背景为金边", "problem": { "title": "创业不是为了同时管理六个应用", "subtitle": "多渠道销售的混乱正在让你失去客户和内心的平静。", "lostTitle": "订单容易遗失", "lostBody": "客户在 Facebook 评论区询问价格，随后又在 Telegram 发消息，最后又想在 Instagram 上下单。没有统一视图，订单就会从缝隙中溜走，造成收入损失和困扰。", "blindTitle": "团队之间互相看不到", "blindBody": "两名员工因为使用不同设备或查看不同应用，给同一位客户报出了不同的价格。这会造成混乱，损害品牌信任，并拖慢销售流程。" }, "chaos": { "title": "结束混乱", "subtitle": "把一切都集中到一个安全、易于管理的空间。" } };
const features = { "seoTitle": "功能", "seoDescription": "在一个无缝平台中管理对话、处理订单、发展业务所需的一切。", "title": "为现代卖家打造的强大功能", "subtitle": "在一个无缝平台中管理对话、处理订单、发展业务所需的一切。", "omnichat": { "title": "全渠道收件箱", "body": "一个收件箱，覆盖所有渠道。将客户互动整合到单一强大的界面中，再也不会错过任何一条消息。", "point1": "统一客户档案", "point2": "分配对话", "point3": "常用回复", "point4": "自动回复", "point5": "评论转收件箱", "cta": "了解全渠道收件箱如何运作" }, "orders": { "title": "订单管理", "body": "三步即可将一条消息变成一笔订单。从对话到完成交易，全程无需离开聊天窗口。", "point1": "在聊天中直接创建订单", "point2": "支持 KHQR / Bakong / ABA / 货到付款", "point3": "预约配送", "cta": "了解订单流程如何运作" }, "steps": { "title": "从第一条消息到订单送达", "subtitle": "开始使用 Loukdo 简单又直接。", "step1Title": "连接你的渠道", "step1Body": "几分钟内即可关联 Facebook、Instagram 和 Telegram 账号。", "step2Title": "添加你的商品", "step2Body": "上传商品目录，即可直接从对话中创建订单。", "step3Title": "在收件箱中完成销售", "step3Body": "回复消息、创建订单、发送付款链接、预约配送，一步到位。" }, "faq": { "title": "常见问题", "q1": "Loukdo 支持高棉语吗？", "a1": "支持——完整的界面、帮助中心和客户支持都提供高棉语和英语。", "q2": "员工能在不看到全部数据的情况下使用吗？", "a2": "可以。你可以分配角色，让员工处理对话和订单，同时无法查看财务报表或系统设置。", "q3": "如果我已经有自己的网站怎么办？", "a3": "继续使用即可，把 Loukdo 用于收件箱和订单管理。", "q4": "货款如何到账？", "a4": "款项通过你的支付服务商直接进入你自己的银行或电子钱包账户，Loukdo 从不经手你的资金。", "q5": "如果我离开，数据会怎样？", "a5": "你可以随时导出你的商品、订单和客户数据，即便在取消账户之后也是如此。" } };
const about = { "seoTitle": "关于我们", "seoDescription": "Loukdo 诞生于金边，为数百万在聊天应用中经营真实业务的柬埔寨人而打造。", "title": "我们为真正的卖家打造工具", "subtitle": "Loukdo 诞生于金边，为数百万在聊天应用中经营真实业务的柬埔寨人而打造。", "storyTitle": "一切始于一本笔记本", "storyBody": "我们曾观察到一位本地卖家同时管理六个不同的聊天应用。订单来自 Telegram、Messenger 和 Instagram，她唯一的系统是一本写满字迹的笔记本。她不断丢单、混淆付款，压力巨大。我们意识到，必须有更好的方式来支持数字经济的中坚力量。", "storyImageAlt": "一本手写的高棉语销售笔记本，旁边放着显示聊天订单的手机", "beliefsTitle": "我们的理念", "belief1Title": "卖家拥有自己的客户", "belief1Body": "每一位联系人、每一次对话、每一条订单记录都属于卖家，而不属于我们。你可以随时导出。", "belief2Title": "高棉语优先，而非事后添加", "belief2Body": "高棉语不是上线后再叠加的翻译层，而是我们设计、写作与支持的方式。", "belief3Title": "小企业理应获得认真的技术投入", "belief3Body": "系统正常运行、安全性与数据保护不是企业版专属功能，而是基本标准。", "doTitle": "我们的核心业务", "doSubtitle": "Loukdo 是一个社交电商平台，核心包含四大要素：", "omnichatTitle": "全渠道收件箱", "omnichatBody": "所有渠道汇聚于一个收件箱。", "ordersTitle": "订单", "ordersBody": "在聊天中创建，通过 KHQR 付款，由本地快递公司配送。", "productsTitle": "商品", "productsBody": "一个商品目录，同时服务于聊天和直播带货。", "deliveryTitle": "配送", "deliveryBody": "一键操作，交由配送合作伙伴调度。", "companyTitle": "我们的公司", "companyBody": "Loukdo 是 {company} 旗下产品，已在柬埔寨注册。", "companyReg": "注册编号：00072217", "companyAddress": "注册地址：柬埔寨金边吐廓区滨湖1坊7村317街" };
const contact = { "seoTitle": "联系我们", "seoDescription": "有关于价格、系统集成或如何开始使用的问题？我们通常在几小时内以高棉语或英语回复。", "title": "联系我们", "subtitle": "有关于价格、系统集成或如何开始使用的问题？我们通常在几小时内以高棉语或英语回复。", "telegramTitle": "Telegram", "telegramBody": "响应速度最快。", "telegramCta": "给我们发消息", "emailTitle": "邮件支持", "emailValue": "support@loukdo.com", "phoneTitle": "电话", "phoneValue": "+855 70 677 666", "formTitle": "发送消息", "formName": "姓名", "formNamePlaceholder": "请输入您的全名", "formEmail": "邮箱", "formEmailPlaceholder": "you{'@'}company.com", "formMessage": "留言", "formMessagePlaceholder": "我们能为您提供什么帮助？", "formSubmit": "发送消息", "formSuccess": "谢谢——我们会尽快回复您。", "hqTitle": "总部", "hqBody": "HVMW+CVH Phnom Penh, Cambodia", "hqNote": "仅接受企业客户预约到访。", "mapAlt": "显示 Loukdo 位于柬埔寨金边总部的地图" };
const terms = { "seoTitle": "条款与条件", "seoDescription": "管理 Loukdo 平台访问与使用的条款与条件。", "title": "条款与条件", "updated": "最近更新：{date}", "effective": "生效日期：{date}", "note": "本条款的完整正文以下方英文版本为准。如需正式中文版本，请联系 legal{'@'}loukdo.com。" };
const tos = { "seoTitle": "服务条款", "seoDescription": "Loukdo 服务的交付、计费与支持方式。", "title": "服务条款", "updated": "最近更新：{date}", "effective": "生效日期：{date}", "note": "本条款的完整正文以下方英文版本为准。如需正式中文版本，请联系 legal{'@'}loukdo.com。" };
const conduct = { "seoTitle": "用户行为准则", "seoDescription": "我们对所有使用 Loukdo 平台的用户的期望。", "title": "用户行为准则", "updated": "最近更新：{date}", "note": "本准则的完整正文以下方英文版本为准。如需正式中文版本，请联系 conduct{'@'}loukdo.com。" };
const privacy = { "seoTitle": "隐私与Cookie政策", "seoDescription": "Loukdo 如何收集、使用和保护个人数据，以及平台上 Cookie 的使用方式。", "title": "隐私与Cookie政策", "updated": "最近更新：{date}", "effective": "生效日期：{date}", "note": "本政策的完整正文以下方英文版本为准。如需正式中文版本，请联系 privacy{'@'}loukdo.com。" };
const cookies = { "title": "Cookie政策" };
const zh = {
  meta,
  nav,
  a11y,
  theme,
  footer,
  home,
  features,
  about,
  contact,
  terms,
  tos,
  conduct,
  privacy,
  cookies
};
const FALLBACK_LOCALE = "en";
const STATE_KEY = "own-i18n-locale";
const LOCALE_NAMES = {
  en: "English",
  km: "ខ្មែរ",
  zh: "中文"
};
const messages = { en, km, zh };
const engine = new TranslationEngine(messages, FALLBACK_LOCALE, false);
function useOwnI18n() {
  const locale = useState(STATE_KEY, () => FALLBACK_LOCALE);
  function t(key, params) {
    return engine.translate(key, locale.value, params);
  }
  function setLocale(next) {
    if (!engine.hasLocale(next) || next === locale.value) return;
    locale.value = next;
  }
  const locales = computed(
    () => engine.availableLocales().map((code) => ({
      code,
      name: LOCALE_NAMES[code] ?? code
    }))
  );
  return {
    locale: readonly(locale),
    locales,
    t,
    setLocale
  };
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies2 = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies2[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies2[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const SUPPORTED_LOCALES = ["en", "km", "zh"];
function isSupportedLocale(value) {
  return !!value && SUPPORTED_LOCALES.includes(value);
}
const locale_60pM3mfJT6KPvw9Qv_gvakZZItYDDjVdp8MqDxbGMks = /* @__PURE__ */ defineNuxtPlugin({
  name: "locale",
  setup() {
    const { locale, setLocale } = useOwnI18n();
    const localeCookie = useCookie("loukdo_locale", {
      default: () => null,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
    if (isSupportedLocale(localeCookie.value)) {
      setLocale(localeCookie.value);
    }
    watch(
      locale,
      (value) => {
        localeCookie.value = value;
      },
      { immediate: true }
    );
  }
});
function resolveRevealVariant(value) {
  return typeof value === "string" ? value : value?.type ?? "up";
}
function resolveRevealDelay(value) {
  return typeof value === "object" ? value.delay : void 0;
}
const reveal_DkfC2QoBUDm0je9o6kUSnkBVK9__iuC_hBh1xQmFb6k = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", {
    getSSRProps(binding) {
      const variant = resolveRevealVariant(binding.value);
      const delay = resolveRevealDelay(binding.value);
      return {
        class: `reveal reveal-${variant}`,
        style: delay ? { "--reveal-delay": `${delay}ms` } : void 0,
        // The classes above are only known to the server via this hook —
        // the client vnode's own class binding never includes them, so
        // Vue's hydration diff flags a (harmless, cosmetic) class
        // mismatch. This tells Vue to skip that specific check instead
        // of logging a false-positive warning on every revealed element.
        "data-allow-mismatch": "class"
      };
    },
    mounted(el, binding) {
      const variant = resolveRevealVariant(binding.value);
      const delay = resolveRevealDelay(binding.value);
      el.classList.add("reveal", `reveal-${variant}`);
      if (delay) {
        el.style.setProperty("--reveal-delay", `${delay}ms`);
      }
      {
        el.classList.add("is-revealed");
        return;
      }
    },
    unmounted(el) {
    }
  });
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A,
  locale_60pM3mfJT6KPvw9Qv_gvakZZItYDDjVdp8MqDxbGMks,
  reveal_DkfC2QoBUDm0je9o6kUSnkBVK9__iuC_hBh1xQmFb6k
];
const layouts = {
  default: defineAsyncComponent(() => import('./default-BH93Z3uy.mjs').then((m) => m.default || m))
};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = !!layout.value && layout.value in layouts;
      const hasTransition = hasLayout && !!(route?.meta.layoutTransition ?? appLayoutTransition);
      const transitionProps = hasTransition && _mergeTransitionProps([
        route?.meta.layoutTransition,
        appLayoutTransition,
        {
          onBeforeLeave() {
            nuxtApp["~transitionPromise"] = new Promise((resolve) => {
              nuxtApp["~transitionFinish"] = resolve;
            });
          },
          onAfterLeave() {
            nuxtApp["~transitionFinish"]?.();
            delete nuxtApp["~transitionFinish"];
            delete nuxtApp["~transitionPromise"];
          }
        }
      ]);
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(transitionProps, {
        default: () => h(
          Suspense,
          {
            suspensible: true,
            onResolve: async () => {
              await nextTick(done);
            }
          },
          {
            default: () => h(
              LayoutProvider,
              {
                layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
                key: layout.value || void 0,
                name: layout.value,
                shouldProvide: !props.name,
                isRenderingNewLayout: (name) => {
                  return name !== previouslyRenderedLayout && name === layout.value;
                },
                hasTransition
              },
              context.slots
            )
          }
        )
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    const enclosingLayout = inject(LayoutMetaSymbol, null);
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            const useEagerRoute = props.isRenderingNewLayout(props.name) && (!enclosingLayout || enclosingLayout.isCurrent(vueRouterRoute));
            return useEagerRoute ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: markStableSlot((routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        })
      });
    };
  }
});
function markStableSlot(fn) {
  const wrapped = ((routeProps) => {
    const result = fn(routeProps);
    if (Array.isArray(result)) {
      return result;
    }
    if (result == null || !isVNode(result)) {
      return [createCommentVNode()];
    }
    return [result];
  });
  wrapped._n = true;
  return wrapped;
}
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale } = useOwnI18n();
    useHead({
      htmlAttrs: { lang: locale }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center bg-[var(--surface-light)] px-6 text-center dark:bg-[var(--surface-dark)]" }, _attrs))}><p class="text-sm font-bold uppercase tracking-widest text-brand-500">${ssrInterpolate(props.error?.statusCode ?? 404)}</p><h1 class="mt-3 font-display text-3xl font-extrabold text-ink-900 dark:text-white">${ssrInterpolate(props.error?.statusCode === 404 ? "This page doesn't exist" : "Something went wrong")}</h1><p class="mt-3 max-w-md text-sm text-ink-500 dark:text-ink-300">${ssrInterpolate(props.error?.message || "Let's get you back to Loukdo.")}</p><button type="button" class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"> Back to home </button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { useSeoMeta as a, useHead as b, useState as c, useRoute as d, entry_default as default, useRouter as e, encodeRoutePath as f, useNuxtApp as g, useRuntimeConfig as h, nuxtLinkDefaults as i, navigateTo as n, resolveRouteObject as r, sanitizeTag as s, useOwnI18n as u };
//# sourceMappingURL=server.mjs.map
