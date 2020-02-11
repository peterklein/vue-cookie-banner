//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: "cookie-banner",

    data: function data() {
        return {
            localStorageAllowed: true,
            bannerIsOpen: false
        };
    },

    props: {
        theme: {
            type: String,
            default: "dark"
        },

        position: {
            type: String,
            default: "bottom"
        },

        bannerHeadline: {
            type: Boolean,
            default: false,
            message: "This is the ultimate vue cookie banner"
        },

        bannerMessage: {
            type: String,
            default: "Lorem ipsum dolor sit amet"
        },

        cookieName: {
            type: String,
            default: "wfh"
        }
    },

    created: function created() {
        // If there is no cookie or localstorage entry set bannerIsOpen to true
        this.bannerIsOpen = true;
    },

    computed: {
        cookieBannerPosition: function cookieBannerPosition() {
            // value can be left, right, top, bottom
            return ("Cookie__Banner-" + (this.position));
        },

        cookieBannerTheme: function cookieBannerTheme() {
            return ("Cookie__Banner-" + (this.theme));
        }
    },

    methods: {
        close: function close() {
            console.log("closed the banner");
            this.bannerIsOpen = false;
        },

        accept: function accept() {},

        open: function open() {
            this.bannerIsOpen = true;
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.bannerIsOpen)?_c('div',{staticClass:"Cookie__Banner",class:[_vm.cookieBannerPosition, _vm.cookieBannerTheme]},[(_vm.bannerHeadline)?_c('h3',[_vm._v(_vm._s(_vm.bannerHeadline))]):_vm._e(),_vm._v(" "),_c('p',[_vm._v("This is my awesome cookie banner plugin")]),_vm._v(" "),_c('div',{staticClass:"Cookie__Banner-actions"})]):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-17b96482";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component("CookieBanner", __vue_component__);
}

var plugin = {
	install: install
};

var GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

__vue_component__.install = install;

export default __vue_component__;
