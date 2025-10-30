<script setup lang="ts">
import MagnetCard from "~/components/MagnetCard.vue";
import { ref } from "vue";

interface MaxedMagnetResponse {
  totalTrackers: number;
  name?: string;
  id: string;
  maxedMagnet: string;
}

const maxedMagnet = ref<MaxedMagnetResponse | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

async function getMaxedMagnetUrl(magnet: string) {
  error.value = null; // Clear any previous error
  loading.value = true; // Set loading to true

  try {
    const response = await fetch("/api/magnet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ magnet }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      error.value =
        errorData.message || `HTTP error! status: ${response.status}`;
      console.error("API error:", error.value);
      return;
    }

    maxedMagnet.value = await response.json();
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Network error:", err);
  } finally {
    loading.value = false; // Reset loading state
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-base-300">
    <div class="grow flex items-start justify-center pt-40 px-4">
      <div class="w-full max-w-2xl space-y-6">
        <div class="hero">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold drop-shadow-xl">TorrentMax</h1>
              <p class="py-6">
                Paste a magnet link below and TorrentMax will enrich it with
                additional trackers
              </p>
            </div>
          </div>
        </div>
        <SearchBar @submit="getMaxedMagnetUrl" />

        <!-- Loading indicator -->
        <div
          v-motion-fade
          v-if="loading"
          class="flex justify-center items-center p-8"
        >
          <span class="loading loading-infinity loading-lg"></span>
        </div>

        <!-- Error message display -->
        <div v-if="error && !loading" class="max-w-2xl mx-auto p-4">
          <div class="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>

        <MagnetCard
          v-motion-fade
          v-if="maxedMagnet && !loading"
          :name="maxedMagnet.name || 'Unknown Torrent'"
          :total-trackers="maxedMagnet.totalTrackers"
          :magnet-url="maxedMagnet.maxedMagnet"
        />
      </div>
    </div>
  </div>
</template>
