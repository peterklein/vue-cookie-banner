<template>
	<div
		class="Cookie__Banner"
		:class="[cookieBannerPosition, cookieBannerTheme]"
		v-if="bannerIsOpen"
	>
		<h3 v-if="bannerHeadline">{{ bannerHeadline }}</h3>
		<p>This is my awesome cookie banner plugin</p>

		<div class="Cookie__Banner-actions"></div>
	</div>
</template>

<script>
export default {
	name: 'cookie-banner',

	data: {
		localStorageAllowed: true,
		bannerIsOpen: false
	},

	props: {
		theme: {
			type: String,
			default: 'dark'
		},

		position: {
			type: String,
			default: 'bottom'
		},

		bannerHeadline: {
			type: Boolean,
			default: false,
			message: 'This is the ultimate vue cookie banner'
		},

		bannerMessage: {
			type: String,
			default: 'Lorem ipsum dolor sit amet'
		},

		cookieName: {
			type: String,
			default: 'wfh'
		}
	},

	created() {
		// If there is no cookie or localstorage entry set bannerIsOpen to true
		this.bannerIsOpen = true;
	},

	computed: {
		cookieBannerPosition() {
			// value can be left, right, top, bottom
			return `Cookie__Banner-${this.position}`;
		},

		cookieBannerTheme() {
			return `Cookie__Banner-${this.theme}`;
		}
	},

	methods: {
		close() {
			console.log('closed the banner');
			this.bannerIsOpen = false;
		},

		accept() {},

		open() {
			this.bannerIsOpen = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.Cookie {
	&__Banner {
	}
}
</style>
