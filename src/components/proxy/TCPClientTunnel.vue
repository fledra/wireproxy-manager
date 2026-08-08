<template>
  <Address v-model="model.BindAddress" label="Bind Address" :port-error="props.portError" :disabled="props.disabled" />
  <Address v-model="model.Target" label="Target" :disabled="props.disabled" />
</template>

<script setup lang="ts">
import type { TCPClientTunnel } from '../../types';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<TCPClientTunnel>({ required: true });
</script>
