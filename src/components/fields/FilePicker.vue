<template>
  <UFieldGroup>
    <UInput
      v-model="model"
      placeholder="No file selected"
      :disabled="props.disabled"
      :ui="{ base: 'group-not-only:group-last:rounded-s-md' }"
    />
    <UButton
      trailing-icon="i-lucide-file"
      variant="subtle"
      size="sm"
      class="whitespace-nowrap"
      :disabled="props.disabled"
      @click="openDialog"
    >
      Choose file
    </UButton>
  </UFieldGroup>
</template>

<script setup lang="ts">
import type { DialogFilter } from '@tauri-apps/plugin-dialog';

import { open } from '@tauri-apps/plugin-dialog';

const props = defineProps<{
  filters?: DialogFilter[];
  disabled?: boolean;
}>();

const model = defineModel<string>();

async function openDialog() {
  const path = await open({
    multiple: false,
    directory: false,
    filters: props.filters ?? [],
  });

  if (path) {
    model.value = path;
  }
}
</script>
