<template>
  <UFormField label="Port" name="port">
    <UInputNumber v-model="model" :min="1" :max="65535" :format-options="{ useGrouping: false }" />
  </UFormField>
</template>

<script setup lang="ts">
const model = defineModel<number>();
</script>
