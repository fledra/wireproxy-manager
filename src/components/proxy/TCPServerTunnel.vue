<template>
  <UFormField label="Listen Port" class="w-fit">
    <UInputNumber v-model="port" :min="1" :max="65535" :format-options="{ useGrouping: false }" />
  </UFormField>
  <Address v-model="model.Target" label="Target" class="w-full" />
</template>

<script setup lang="ts">
import type { TCPServerTunnel } from '../../types';

import { ref, watchEffect } from 'vue';

const model = defineModel<TCPServerTunnel>({ required: true });
const port = ref(1025);

watchEffect(() => {
  model.value.Port = port.value;
});
</script>
