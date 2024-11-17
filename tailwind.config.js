// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--primary))',
				accent: 'rgb(var(--accent))'
			}
		},
	},
	plugins: [],
}

