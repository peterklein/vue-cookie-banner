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
//
//
//
//
//
//
//
//

var script = {
    name: 'cookie-banner',

    data: function data() {
        return {
            localStorageAllowed: true,
			cookiesAccepted: false,
        };
    },

    props: {
        theme: {
            type: String,
            required: false,
            default: 'dark',
        },

        position: {
            type: String,
            required: false,
            default: 'bottom',
        },

        bannerHeadline: {
            type: String,
            required: false,
            default: 'This is the ultimate vue cookie banner',
        },

        bannerMessage: {
            type: String,
            required: false,
            default:
                'This website uses cookies to ensure you get the best experience on our website.',
        },

        cookieName: {
            type: String,
            required: false,
            default: 'vue-cookie-banner',
        },

        pageOverlay: {
            type: Boolean,
            required: false,
            default: false,
        },

        target: {
            type: String,
            required: false,
            default: null,
        },
    },

    created: function created() {
		if (!!this.getPageVisited() === true) {
			this.cookiesAccepted = true;
		}
    },

    computed: {
        cookieBannerPosition: function cookieBannerPosition() {
            return ("Cookie__Banner-" + (this.position));
        },

        cookieBannerTheme: function cookieBannerTheme() {
            return ("Cookie__Banner-" + (this.theme));
        },
    },

    methods: {
        closeBanner: function closeBanner() {
			this.setPageVisited();
			this.cookiesAccepted = true;
        },

		setPageVisited: function setPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.setItem('cookiesAccepted', true)
			}
		},

		getPageVisited: function getPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.getItem('cookiesAccepted'); 
			}
		},

		discard: function discard() {},

    },
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

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return !_vm.cookiesAccepted
    ? _c(
        "div",
        {
          staticClass: "Cookie__Banner",
          class: [_vm.cookieBannerPosition, _vm.cookieBannerTheme]
        },
        [
          _c("div", { staticClass: "Cookie__Banner-content" }, [
            _vm.bannerHeadline
              ? _c("h3", [_vm._v(_vm._s(_vm.bannerHeadline))])
              : _vm._e(),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.bannerMessage) +
                  "\n                "
              ),
              _vm.target
                ? _c("a", { attrs: { href: "" } }, [_vm._v("Learn more")])
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "Cookie__Banner-actions" }, [
            _c(
              "button",
              {
                staticClass: "Cookie__Banner-button",
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.discard($event)
                  }
                }
              },
              [_vm._v("Discard")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "Cookie__Banner-button",
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.closeBanner($event)
                  }
                }
              },
              [_vm._v("Allow Cookies")]
            )
          ])
        ]
      )
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-6a74db63_0", { source: ".Cookie__Banner[data-v-6a74db63] {\n  --font-size: 18px;\n  --main-color: #237afc;\n  background: var(--main-color);\n  color: #fff;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 20px;\n  font-size: var(--font-size);\n  font-family: inherit;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie__Banner-content[data-v-6a74db63] {\n  display: flex;\n  flex-direction: column;\n}\n.Cookie__Banner-button[data-v-6a74db63] {\n  background-color: #fff;\n  color: #237afc;\n  cursor: pointer;\n  border: 0;\n  padding: 20px;\n  font-size: var(--font-size);\n}\n\n/*# sourceMappingURL=vue-cookie-consent.vue.map */", map: {"version":3,"sources":["/Users/piet/Workspace/privat/vue-cookie-banner/src/vue-cookie-consent.vue","vue-cookie-consent.vue"],"names":[],"mappings":"AAsHA;EACA,iBAAA;EACA,qBAAA;EAEA,6BAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,aAAA;EACA,2BAAA;EACA,oBAAA;EACA,eAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;ACtHA;ADwHA;EACA,aAAA;EACA,sBAAA;ACtHA;ADyHA;EACA,sBAAA;EACA,cAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;EACA,2BAAA;ACvHA;;AAEA,iDAAiD","file":"vue-cookie-consent.vue","sourcesContent":["<template>\n    <div\n        class=\"Cookie__Banner\"\n        :class=\"[cookieBannerPosition, cookieBannerTheme]\"\n        v-if=\"!cookiesAccepted\"\n    >\n        <div class=\"Cookie__Banner-content\">\n            <h3 v-if=\"bannerHeadline\">{{ bannerHeadline }}</h3>\n            <p>\n                {{ bannerMessage }}\n                <a href v-if=\"target\">Learn more</a>\n            </p>\n        </div>\n\n        <div class=\"Cookie__Banner-actions\">\n\t\t\t<button @click.prevent=\"discard\" class=\"Cookie__Banner-button\">Discard</button>\n            <button @click.prevent=\"closeBanner\" class=\"Cookie__Banner-button\">Allow Cookies</button>\n        </div>\n    </div>\n</template>\n\n<script>\nexport default {\n    name: 'cookie-banner',\n\n    data() {\n        return {\n            localStorageAllowed: true,\n\t\t\tcookiesAccepted: false,\n        };\n    },\n\n    props: {\n        theme: {\n            type: String,\n            required: false,\n            default: 'dark',\n        },\n\n        position: {\n            type: String,\n            required: false,\n            default: 'bottom',\n        },\n\n        bannerHeadline: {\n            type: String,\n            required: false,\n            default: 'This is the ultimate vue cookie banner',\n        },\n\n        bannerMessage: {\n            type: String,\n            required: false,\n            default:\n                'This website uses cookies to ensure you get the best experience on our website.',\n        },\n\n        cookieName: {\n            type: String,\n            required: false,\n            default: 'vue-cookie-banner',\n        },\n\n        pageOverlay: {\n            type: Boolean,\n            required: false,\n            default: false,\n        },\n\n        target: {\n            type: String,\n            required: false,\n            default: null,\n        },\n    },\n\n    created() {\n\t\tif (!!this.getPageVisited() === true) {\n\t\t\tthis.cookiesAccepted = true;\n\t\t}\n    },\n\n    computed: {\n        cookieBannerPosition() {\n            return `Cookie__Banner-${this.position}`;\n        },\n\n        cookieBannerTheme() {\n            return `Cookie__Banner-${this.theme}`;\n        },\n    },\n\n    methods: {\n        closeBanner() {\n\t\t\tthis.setPageVisited();\n\t\t\tthis.cookiesAccepted = true;\n        },\n\n\t\tsetPageVisited() {\n\t\t\tif (this.localStorageAllowed) {\n\t\t\t\treturn localStorage.setItem('cookiesAccepted', true)\n\t\t\t}\n\t\t},\n\n\t\tgetPageVisited() {\n\t\t\tif (this.localStorageAllowed) {\n\t\t\t\treturn localStorage.getItem('cookiesAccepted'); \n\t\t\t}\n\t\t},\n\n\t\tdiscard() {},\n\n    },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.Cookie__Banner {\n    --font-size: 18px;\n    --main-color: #237afc;\n\n    background: var(--main-color);\n    color: #fff;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    padding: 20px;\n    font-size: var(--font-size);\n    font-family: inherit;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n\n\t&-content {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t}\n\n    &-button {\n        background-color: #fff;\n        color: #237afc;\n        cursor: pointer;\n        border: 0;\n        padding: 20px;\n        font-size: var(--font-size);\n    }\n}\n</style>\n",".Cookie__Banner {\n  --font-size: 18px;\n  --main-color: #237afc;\n  background: var(--main-color);\n  color: #fff;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 20px;\n  font-size: var(--font-size);\n  font-family: inherit;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.Cookie__Banner-content {\n  display: flex;\n  flex-direction: column;\n}\n.Cookie__Banner-button {\n  background-color: #fff;\n  color: #237afc;\n  cursor: pointer;\n  border: 0;\n  padding: 20px;\n  font-size: var(--font-size);\n}\n\n/*# sourceMappingURL=vue-cookie-consent.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-6a74db63";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
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
    createInjector,
    undefined,
    undefined
  );

function install(Vue, options) {

	if (this.installed) { return; }
	this.installed = true;

	Vue.prototype.$banner = {
		close: function close() {
			console.log('close banner');
			
		}
	};

	Vue.component('CookieBanner', __vue_component__);
}

var Plugin = {
	install: install
};

export default Plugin;
