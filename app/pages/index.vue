<script setup lang="ts">
import MagnetCard from "~/components/MagnetCard.vue";
import { ref } from "vue";
import IndexHero from "~/components/IndexHero.vue";

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

async function getMaxedMagnetFromTorrent(file: File) {
  error.value = null; // Clear any previous error
  loading.value = true; // Set loading to true

  try {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/torrent", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

    maxedMagnet.value = data;
  } catch (e: any) {
    error.value = e.message || "Upload failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-base-300">
    <div class="grow flex items-start justify-center pt-40 px-4">
      <div class="w-full max-w-2xl" >
        <IndexHero />
        <div v-if="!maxedMagnet" class="space-y-6">
          <SearchBar @submit="getMaxedMagnetUrl" />
          <div class="divider divider-neutral">OR</div>
          <TorrentUpload @submit="getMaxedMagnetFromTorrent" />
        </div>

        <div
          v-if="loading"
          v-motion-fade
          class="flex justify-center items-center p-8"
        >
          <span class="loading loading-infinity loading-lg" />
        </div>

        <!-- Error message display -->
        <AlertError v-if="error && !loading" :message="error" />

        <MagnetCard
          v-if="maxedMagnet && !loading && !error"
          v-motion-fade
          :name="maxedMagnet.name || 'Unknown Torrent'"
          :total-trackers="maxedMagnet.totalTrackers"
          :magnet-url="maxedMagnet.maxedMagnet"
        />
        <div v-if="maxedMagnet" class="flex justify-center pt-5">
          <button
            class="btn btn-primary text-accent"
            @click="maxedMagnet = null"
          >
            Max Another Torrent
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
