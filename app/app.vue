<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
useSeoMeta({
  title: "TorrentMax – Enrich Your Magnet Links with Trackers Instantly",
  description:
    "Boost torrent performance with TorrentMax. Paste any magnet link and instantly enrich it with the latest high-quality trackers for faster peer discovery.",
  ogTitle: "TorrentMax – Enrich Your Magnet Links with Trackers Instantly",
  ogDescription:
    "Paste a magnet link and let TorrentMax supercharge it with fresh trackers. Improve availability, speed up downloads, and get the best torrenting experience.",
  ogType: "website",
  ogUrl: "https://notyet.com",
  ogImage: "https://nothet.com/og-image.png",
  twitterCard: "summary_large_image",
  twitterTitle: "TorrentMax – Enrich Your Magnet Links with Trackers Instantly",
  twitterDescription:
    "TorrentMax enriches your magnet links with the latest trackers for maximum speed and availability.",
  twitterImage: "https://notyet.com/og-image.png",
});
</script>
<template>
  <Analytics />
  <NuxtPage />
</template>
