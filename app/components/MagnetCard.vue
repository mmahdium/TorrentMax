<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  name: string;
  totalTrackers: number;
  magnetUrl: string;
}>();

const copied = ref(false);

function copyMagnet() {
  navigator.clipboard.writeText(decodeURIComponent(props.magnetUrl));
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto ">
    <div class="rounded-2xl border bg-base-100 shadow-lg p-6 space-y-4">
      <!-- Title and trackers -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold wrap-break-word flex-1">
          {{ name }}
        </h2>
        <span class="badge badge-outline whitespace-nowrap ml-3">
          {{ totalTrackers }} trackers
        </span>
      </div>

      <!-- Magnet link with copy -->
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Maxed Out Magnet Link</span>
        </label>
        <div class="flex items-center gap-2">
          <input
            type="url"
            :value="decodeURIComponent(props.magnetUrl)"
            readonly
            class="input input-bordered w-full font-medium text-xs"
          />
          <button
          v-auto-animate
            class="btn btn-square btn-primary text-accent"
            @click="copyMagnet"
            :title="copied ? 'Copied!' : 'Copy magnet link'"
          >
            <!-- Default copy icon -->
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 
                       2.25h-3c-1.03 0-1.9.693-2.166 
                       1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 
                       0 0 1-.75.75H9a.75.75 0 0 
                       1-.75-.75v0c0-.212.03-.418.084-.612m7.332 
                       0c.646.049 1.288.11 1.927.184 1.1.128 
                       1.907 1.077 1.907 2.185V19.5a2.25 
                       2.25 0 0 1-2.25 2.25H6.75A2.25 
                       2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 
                       1.907-2.185a48.208 48.208 0 0 1 
                       1.927-.184" />
            </svg>

            <!-- Success icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 
                       0 .414.336.75.75.75h4.5a.75.75 
                       0 0 0 .75-.75 2.25 2.25 0 0 
                       0-.1-.664m-5.8 0A2.251 2.251 
                       0 0 1 13.5 2.25H15c1.012 0 
                       1.867.668 2.15 1.586m-5.8 
                       0c-.376.023-.75.05-1.124.08C9.095 
                       4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 
                       1.124.08 1.131.094 1.976 1.057 
                       1.976 2.192V16.5A2.25 2.25 
                       0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 
                       0-1.125.504-1.125 1.125v11.25c0 
                       .621.504 1.125 1.125 1.125h9.75c.621 
                       0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 
                       0 1.125.504 1.125 1.125v9.375m-8.25-3 
                       1.5 1.5 3-3.75" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Info alert -->
      <div class="alert alert-soft mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24"
             class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 
                   12a9 9 0 11-18 0 9 9 0 0118 
                   0z"/>
        </svg>
        <span>
          This magnet link has been enriched with additional trackers for better availability.
        </span>
      </div>
    </div>
  </div>
</template>
