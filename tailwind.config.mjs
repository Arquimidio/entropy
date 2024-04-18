/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			default: [
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"\"Apple Color Emoji\"",
				"\"Segoe UI Emoji\"",
				"Segoe UI Symbol",
				"\"Noto Color Emoji\""
			]
		},
		extend: {},
		applyBaseStyles: false
	},
	plugins: [
		require("@tailwindcss/typography")
	],
}
