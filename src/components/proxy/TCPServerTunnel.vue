<template>
  <pre>{{ portError }}</pre>
  <PortInput v-model="port" label="Listen Port" :error="portError" :disabled="props.disabled" />
  <Address v-model="model.Target" label="Target" :disabled="props.disabled" />
</template>

<script setup lang="ts">
import type { TCPServerTunnel } from '../../types';

import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<TCPServerTunnel>({ required: true });
const port = ref(1025);
const portError = computed(() => props.portError ? 'Port in use' : undefined);

watchEffect(() => {
  model.value.Port = port.value;
});
</script>
