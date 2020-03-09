import './VueCookieCoinsent.scss';

export default {
	name: 'Cookie__Banner',

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
			// required: true,
			default: STORAGE.localStorage,
		},
	},

	created() {
		console.log('this.$slots', this.$slots)
	},

	render(h) {
		const wrapper = h('div', {
			staticClass: 'Cookie__Banner'
		},
		this.$slots.default);

		const content = h('div', {
			staticClass: 'Cookie__Banner-content'
		},
		'foo'),

		return h('div', { domProps: { id: this.id || null }}, [wrapper]);
	},
};
