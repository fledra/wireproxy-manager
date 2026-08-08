<template>
  <PortInput v-model="port" label="Listen Port" :port-error="props.portError" :disabled="props.disabled" />
  <Address v-model="model.Target" label="Target" :disabled="props.disabled" />
</template>

<script setup lang="ts">
import type { TCPServerTunnel } from '../../types';

import { ref, watchEffect } from 'vue';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<TCPServerTunnel>({ required: true });
const port = ref(1025);

watchEffect(() => {
  model.value.Port = port.value;
});
</script>
