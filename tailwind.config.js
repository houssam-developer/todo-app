const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			'sans': ['Montserrat', ...defaultTheme.fontFamily.sans]
		},
		extend: {},
	},
	plugins: [],
}
