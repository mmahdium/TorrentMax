<script setup lang="ts">
const emit = defineEmits(["submit"]);
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  // TODO: add file size verification
  if (target.files?.length) {
    emit("submit", target.files[0]);
  }
}
</script>

<template>
  <div class="flex justify-center">
    <fieldset class="fieldset w-full max-w-2/3">
      <legend class="fieldset-legend">Pick a file</legend>
      <input
        id="torrent-file"
        type="file"
        class="file-input file-input-bordered w-full border-primary bg-base-100 file-input-md"
        accept=".torrent,application/x-bittorrent"
        @change="handleFileChange"
      />
      <label class="label">Max size 1MB</label>
    </fieldset>
  </div>
</template>
