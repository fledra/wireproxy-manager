<template>
  <Address v-model="model.BindAddress" label="Bind Address" :port-error="props.portError" :disabled="props.disabled" />
</template>

<script setup lang="ts">
import type { SOCKS5Proxy } from '../../types';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<SOCKS5Proxy>({ required: true });
</script>
