import CookieBanner from './CookieBanner.vue';

export default {
	install(Vue, options) {
		Vue.component('cookie-banner', CookieBanner);
	},
};
