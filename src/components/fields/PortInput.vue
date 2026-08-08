<template>
  <UFormField label="Port" name="port">
    <UInputNumber
      v-model="model"
      :min="1"
      :max="65535"
      :disabled="props.disabled"
      :format-options="{ useGrouping: false }"
    />
  </UFormField>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>();
const model = defineModel<number>();
</script>
