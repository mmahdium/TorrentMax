import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint','@vueuse/motion/nuxt'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/tailwind.css"],
})