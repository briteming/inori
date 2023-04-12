const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require("daisyui"),
		iconsPlugin({
			// Select the icon collections you want to use
			collections: getIconCollections(["mdi", "carbon"]),
		  }),
	],
	daisyui:{
		darkTheme: false
	}
}
