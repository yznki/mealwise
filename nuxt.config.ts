import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@nuxt/fonts", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-lucide-icons"],

	app: {
		head: {
			viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
			link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]
		}
	},

	vite: {
		plugins: [tailwindcss()]
	},

	devtools: {
		enabled: true
	},

	css: ["~/assets/css/main.css"],

	routeRules: {
		"/": { prerender: true }
	},

	compatibilityDate: "2025-01-15",

	runtimeConfig: {
		anthropicApiKey: process.env.ANTHROPIC_API_KEY
	},

	eslint: {
		config: {
			stylistic: false
		}
	}
});
