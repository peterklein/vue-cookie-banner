/*!
 * vue-cookie-banner v1.2.1
 * (c) 
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.mjs'));

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
  data: {
    localStorageAllowed: true,
    bannerIsOpen: false
  },
  props: {
    theme: {
      type: String,
      "default": 'dark'
    },
    position: {
      type: String,
      "default": 'bottom'
    },
    bannerHeadline: {
      type: Boolean,
      "default": false,
      message: 'This is the ultimate vue cookie banner'
    },
    bannerMessage: {
      type: String,
      "default": 'Lorem ipsum dolor sit amet'
    },
    cookieName: {
      type: String,
      "default": 'wfh'
    }
  },
  created: function created() {
    // If there is no cookie or localstorage entry set bannerIsOpen to true
    this.bannerIsOpen = true;
  },
  computed: {
    cookieBannerPosition: function cookieBannerPosition() {
      // value can be left, right, top, bottom
      return "Cookie__Banner-".concat(this.position);
    },
    cookieBannerTheme: function cookieBannerTheme() {
      return "Cookie__Banner-".concat(this.theme);
    }
  },
  methods: {
    close: function close() {
      console.log('closed the banner');
      this.bannerIsOpen = false;
    },
    accept: function accept() {},
    open: function open() {
      this.bannerIsOpen = true;
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.bannerIsOpen ? _c('div', {
    staticClass: "Cookie__Banner",
    "class": [_vm.cookieBannerPosition, _vm.cookieBannerTheme]
  }, [_vm.bannerHeadline ? _c('h3', [_vm._v(_vm._s(_vm.bannerHeadline))]) : _vm._e(), _vm._v(" "), _c('p', [_vm._v("This is my awesome cookie banner plugin")]), _vm._v(" "), _c('div', {
    staticClass: "Cookie__Banner-actions"
  })]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-55c05ccc";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    Vue.component('cookie-banner', __vue_component__);
  }
};

module.exports = index;
