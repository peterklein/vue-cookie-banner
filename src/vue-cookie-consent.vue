<template>
	<div
		class="Cookie__Banner"
		:class="[cookieBannerType, cookieBannerPosition, cookieBannerTheme]"
		v-if="!cookiesAccepted"
	>
		<div class="Cookie__Banner-content">
			<h3 v-if="bannerHeadline">{{ bannerHeadline }}</h3>
			<p>
				{{ bannerMessage }}
				<a href v-if="target">Learn more</a>
			</p>
		</div>

		<div class="Cookie__Banner-actions">
			<button @click.prevent="discard" class="Cookie__Banner-button">
				Discard
			</button>
			<button @click.prevent="closeBanner" class="Cookie__Banner-button">
				Allow Cookies
			</button>
		</div>
	</div>
</template>

<script>
const STORAGE = {
	localStorage: 'localStorage',
	cookies: 'cookies',
};

export default {
	name: 'cookie-banner',

	data() {
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

		type: {
			type: String,
			required: false,
			default: 'box',
		},

		storageType: {
			type: String,
			required: true,
			default: STORAGE.localStorage,
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

	created() {
		if (this.storageType === STORAGE.localStorage) {
			try {
				const localStorageTest = 'vue-cookie-consent__test';

				window.localStorage.setItem('test', localStorageTest);
				window.localStorage.removeItem('test');
				console.log('Test was successful. Local Storage can be used.');
			} catch (error) {
				console.warn(
					'Localstorage is not supported. Cookies will be used.'
				);
			}
		}

		if (!!this.getPageVisited() === true) {
			this.cookiesAccepted = true;
		}
	},

	computed: {
		cookieBannerType() {
			return `Cookie__Banner-${this.type}`;
		},

		cookieBannerPosition() {
			return `Cookie__Banner-${this.position}`;
		},

		cookieBannerTheme() {
			return `Cookie__Banner-${this.theme}`;
		},
	},

	methods: {
		closeBanner() {
			this.setPageVisited();
			this.cookiesAccepted = true;
		},

		setPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.setItem('cookiesAccepted', true);
			} else {
				// return this.$cookie
			}
		},

		getPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.getItem('cookiesAccepted');
			}
		},

		discard() {},
	},
};
</script>

<style lang="scss" scoped>
.Cookie__Banner {
	--font-size: 18px;
	--main-color: #237afc;
	--white: #ffffff;

	background: var(--main-color);
	color: var(--white);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20px;
	font-size: var(--font-size);
	font-family: inherit;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10000;

	&-headline {
		color: var(--white);
	}

	&-content {
		display: flex;
		flex-direction: column;
	}

	&-button {
		background-color: #fff;
		color: #237afc;
		cursor: pointer;
		border: 0;
		padding: 20px;
		font-size: var(--font-size);
	}
}
</style>
