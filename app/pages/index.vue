<script setup lang="ts">
import MagnetCard from "~/components/MagnetCard.vue";
import { ref } from "vue";
import IndexHero from "~/components/IndexHero.vue";
import { getMaxedMagnetFromTorrent, getMaxedMagnetUrl } from "~/lib/api";

interface MaxedMagnetResponse {
  totalTrackers: number;
  name?: string;
  id: string;
  maxedMagnet: string;
  error?: string;
}

const maxedMagnet = ref<MaxedMagnetResponse | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

async function handleMagnetSubmit(magnet: string) {
  loading.value = true;
  error.value = null;
  maxedMagnet.value = null;

  const result = await getMaxedMagnetUrl(magnet);

  loading.value = false;

  if (result.error) {
    error.value = result.error;
  } else {
    maxedMagnet.value = result;
  }
}

async function handleTorrentUpload(file: File) {
  loading.value = true;
  const result = await getMaxedMagnetFromTorrent(file);
  loading.value = false;

  if (result.error) {
    error.value = result.error;
  } else {
    maxedMagnet.value = result;
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-base-300">
    <div class="grow flex items-start justify-center pt-40 px-4">
      <div class="w-full max-w-2xl">
        <IndexHero />
        <div v-if="!maxedMagnet && !loading" class="space-y-6">
          <SearchBar @submit="handleMagnetSubmit" />
          <div class="divider divider-neutral">OR</div>
          <TorrentUpload @submit="handleTorrentUpload" />
        </div>

        <div
          v-if="loading"
          v-motion-fade
          class="flex justify-center items-center p-8"
        >
          <span class="loading loading-infinity loading-xl" />
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
