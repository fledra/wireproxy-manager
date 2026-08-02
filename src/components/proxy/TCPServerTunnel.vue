<template>
  <div class="flex items-center gap-4">
    <UFormField label="Listen Port">
      <UInput v-model="model.port" />
    </UFormField>

    <UFormField label="Target">
      <UInput v-model="model.target" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { TCPServerTunnel } from '../../types';

const model = defineModel<TCPServerTunnel>({ required: true });
</script>
