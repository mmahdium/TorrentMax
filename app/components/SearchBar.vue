<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const magnetUrl = ref("");
const error = ref("");

function isMagnetLink(url: string): boolean {
  const magnetRegex =
    /^magnet:\?xt=urn:btih:(?:[A-F0-9]{40}|[A-Z2-7]{32})(?:&[a-z0-9]+=[^&]*)*$/i;
  return magnetRegex.test(url.trim());
}

function handleSubmit() {
  if (!isMagnetLink(magnetUrl.value)) {
    error.value = "Invalid magnet URL";
    return;
  }
  error.value = "";
  emit("submit", magnetUrl.value);
}
</script>

<template>
  <div class="w-full">
    <div
      class="flex items-center w-full rounded-2xl shadow-lg px-4 py-2 transition-all duration-500 focus-within:ring-2"
      :class="
        error
          ? 'border-2 border-red-500 bg-base-200'
          : 'border border-primary bg-base-100 focus-within:ring-primary'
      "
    >
      <!-- Left icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 mr-3 transition-colors duration-500"
        :class="error ? 'text-red-500' : 'text-gray-400'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>

      <!-- Input -->
      <input
        v-model="magnetUrl"
        type="text"
        placeholder="Enter magnet URL"
        class="flex-1 bg-transparent outline-none text-base"
      />

      <!-- Right circular button -->
      <button
        class="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-accent hover:scale-110 transition-transform duration-300 shadow-md"
        aria-label="Submit magnet link"
        @click="handleSubmit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </button>
    </div>

    <!-- Error text -->
    <p v-motion-fade v-if="error" class="mt-2 text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>
