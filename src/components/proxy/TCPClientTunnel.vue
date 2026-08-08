<template>
  <Address v-model="model.BindAddress" label="Bind Address" :port-error="props.portError" />
  <Address v-model="model.Target" label="Target" />
</template>

<script setup lang="ts">
import type { TCPClientTunnel } from '../../types';

const props = defineProps<{ portError?: boolean }>();
const model = defineModel<TCPClientTunnel>({ required: true });
</script>
