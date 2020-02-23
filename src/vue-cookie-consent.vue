<template>
	<div
		class="Cookie__Banner"
		:class="[cookieBannerType, cookieBannerTheme]"
		:style="[...cookieBannerStyle]"
		v-if="!cookiesAccepted"
	>
		<div class="Cookie__Banner-content">
			<template v-if="hasSlotData">
				<slot />
			</template>

			<template v-else>
				<h3 v-if="bannerHeadline">{{ bannerHeadline }}</h3>
				<p>
					{{ bannerMessage }}
					<a href v-if="target">Learn more</a>
				</p>
			</template>
		</div>

		<div class="Cookie__Banner-actions">
			<button
				@click.prevent="discard"
				:class="['Cookie__Banner-button', setButtonStyle]"
			>
				{{ buttonDiscardText }}
			</button>
			<button
				@click.prevent="accept"
				:class="['Cookie__Banner-button', setButtonStyle]"
			>
				{{ buttonAcceptText }}
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
		dark: Boolean,

		toast: Boolean,

		rounded: Boolean,

		storageType: {
			type: String,
			required: true,
			default: STORAGE.localStorage,
		},

		position: {
			type: Object,
			required: false,
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

		buttonDiscardText: {
			type: String,
			required: false,
			default: 'Discard',
		},

		buttonAcceptText: {
			type: String,
			required: false,
			default: 'Accept',
		},

		cookieName: {
			type: String,
			required: false,
			default: 'vue-cookie-banner',
		},

		/* pageOverlay: {
			type: Boolean,
			required: false,
			default: false,
		},

		target: {
			type: String,
			required: false,
			default: null,
		}, */
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
		} else if (this.storageType === STORAGE.cookies) {
			this.localStorageAllowed = false;
		} else {
			console.error(
				"At least you have to define one option. Either 'localStorage' or 'cookies'"
			);
		}

		if (!!this.getPageVisited() === true) {
			this.cookiesAccepted = true;
		}
	},

	computed: {
		cookieBannerType() {
			return this.toast ? `Cookie__Banner-toast` : null;
		},

		cookieBannerTheme() {
			return this.dark ? `Cookie__Banner-dark` : null;
		},

		cookieBannerStyle() {
			return {
				'border-radius': this.rounded ? '0.5rem' : null,
				...this.position,
			};
		},

		setButtonStyle() {
			return this.toast ? 'transparent' : null;
		},
	},

	methods: {
		accept() {
			this.setPageVisited();
			this.cookiesAccepted = true;
		},

		setPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.setItem('cookiesAccepted', true);
			} else {
				// return this.$cookie
				console.log('set cookie comes here');
			}
		},

		getPageVisited() {
			if (this.localStorageAllowed) {
				return localStorage.getItem('cookiesAccepted');
			}
		},

		hasSlotData() {
			return !!this.$slots.default;
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

	--dark-theme-background: #272727;
	--dark-theme-button-color: #bb86fc;

	background: var(--main-color);
	color: var(--white);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 14px 16px;
	font-size: var(--font-size);
	font-family: inherit;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10000;
	font-family: Roboto, sans-serif;

	&-toast {
		margin: 8px;
	}

	&-dark {
		background-color: var(--dark-theme-background);
		color: var(--white);
	}

	h3 {
		color: var(--white);
		margin: 0;
	}

	&-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--white);
	}

	&-actions {
		display: flex;
		justify-content: center;
	}

	&-button {
		background-color: #fff;
		color: var(--white);
		cursor: pointer;
		border: 0;
		padding: 10px 20px;
		font-size: var(--font-size);
		margin: 0 0 0 10px;
		text-transform: uppercase;

		.Cookie__Banner-dark & {
			color: var(--dark-theme-button-color);
		}

		&.transparent {
			background-color: transparent;
		}
	}
}
</style>
