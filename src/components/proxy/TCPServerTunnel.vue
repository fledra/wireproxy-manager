<template>
  <PortInput v-model="port" label="Listen Port" :port-error="props.portError" />
  <Address v-model="model.Target" label="Target" />
</template>

<script setup lang="ts">
import type { TCPServerTunnel } from '../../types';

import { ref, watchEffect } from 'vue';

const props = defineProps<{ portError?: boolean }>();
const model = defineModel<TCPServerTunnel>({ required: true });
const port = ref(1025);

watchEffect(() => {
  model.value.Port = port.value;
});
</script>
