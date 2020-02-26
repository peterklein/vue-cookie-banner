const CookieBanner = {
	name: 'Cookie-banner',
	render(h) {
		return h('div', {
			class: 'Cookie__Banner'
		}, [
			h('div', {
				class: 'Cookie__Banner-content'
			}, [
				'Cookie Banner',
				h('p', 'Cookie Banner Message')
			]),
			h('div', {
				class: 'Cookie__Banner-actions'
			}, 'CookieBanner')
		]);
	}
}

export default CookieBanner;
