<template>
  <div>
    <UFormField label="Target">
      <UInput v-model="model.target" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { STDIOTunnel } from '../../types';

const model = defineModel<STDIOTunnel>({ required: true });
</script>
