module.exports = {
	plugins: [
		require('@fullhuman/postcss-purgecss')({
			content: ['themes/mct/layouts/**/*.html'],
			whitelist: [
				'c-module--analysis',
				'c-module--code',
				'c-module--connect',
				'c-module--design',
				'c-module--integrate',
				'c-module--link',
				'h1',
				'h2',
				'h3',
				'h4',
				'p',
				'ul',
				'li',
			],
		}),
	],
	// autoprefixer: {},
	// ],
};
