<template>
  <div class="flex items-center gap-4">
    <UFormField label="Bind Address">
      <UInput v-model="model.bind" />
    </UFormField>

    <UFormField label="Target">
      <UInput v-model="model.target" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { TCPClientTunnel } from '../../types';

const model = defineModel<TCPClientTunnel>({ required: true });
</script>
