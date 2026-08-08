<template>
  <UFieldGroup>
    <UInput v-model="model" placeholder="No file selected" :ui="{ base: 'group-not-only:group-last:rounded-s-md' }" />
    <UButton trailing-icon="i-lucide-file" variant="subtle" size="sm" class="whitespace-nowrap">
      Choose file
    </UButton>
  </UFieldGroup>
</template>

<script setup lang="ts">
const model = defineModel<string>();
</script>
