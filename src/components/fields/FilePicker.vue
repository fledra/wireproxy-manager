<template>
  <UFieldGroup>
    <UInput v-model="model" placeholder="No file selected" :ui="{ base: 'group-not-only:group-last:rounded-s-md' }" />
    <UButton trailing-icon="i-lucide-file" variant="subtle" size="sm" class="whitespace-nowrap" @click="openDialog">
      Choose file
    </UButton>
  </UFieldGroup>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';

const model = defineModel<string>();

async function openDialog() {
  const path = await open({
    multiple: false,
    directory: false,
  });

  if (path) {
    model.value = path;
  }
}
</script>
