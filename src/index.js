import CookieBanner from './vue-cookie-consent.vue';
import VueCookies from 'vue-cookies';

function install(Vue, options = {}) {
	if (this.installed) return;
	this.installed = true;

	Vue.prototype.$banner = {
		close() {
			console.log('close banner');
		},
	};

	Vue.component('CookieBanner', CookieBanner);
}

const Plugin = {
	install,
};

export default Plugin;
