import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/tailwind.css"],
  app: {
    head: {
      title: "TorrentMax", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [
        {
          name: "description",
          content:
            "Boost torrent performance with TorrentMax. Paste any magnet link and instantly enrich it with the latest high-quality trackers for faster peer discovery.",
        },
        { name: "theme-color", content: "#4bb3a1" },

        // Open Graph
        {
          property: "og:title",
          content:
            "TorrentMax – Enrich Your Magnet Links with Trackers Instantly",
        },
        {
          property: "og:description",
          content:
            "Paste a magnet link and let TorrentMax supercharge it with fresh trackers. Improve availability, speed up downloads, and get the best torrenting experience.",
        },
        // { property: "og:type", content: "website" },
        // { property: "og:url", content: "https://yourdomain.com" },
        // {
        //   property: "og:image",
        //   content: "https://yourdomain.com/og-image.png",
        // },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "TorrentMax – Enrich Your Magnet Links with Trackers Instantly",
        },
        {
          name: "twitter:description",
          content:
            "TorrentMax enriches your magnet links with the latest trackers for maximum speed and availability.",
        },
        // {
        //   name: "twitter:image",
        //   content: "https://yourdomain.com/og-image.png",
        // },
      ],
    },
  },
});
