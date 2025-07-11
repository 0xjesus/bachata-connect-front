// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	css: [ '~/assets/css/main.css' ],

	modules: [
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],

	// ----- INICIO DEL CAMBIO -----
	components: [
		{
			path: '~/components/ui',
			pathPrefix: false
		},
		{
			path: '~/components/global',
			pathPrefix: false,
		},
		'~/components',
	],
	// ----- FIN DEL CAMBIO -----

	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:1337',
		},
	},
})
