<template>
  <Address v-model="model.BindAddress" label="Bind Address" :port-error="props.portError" />
</template>

<script setup lang="ts">
import type { SOCKS5Proxy } from '../../types';

const props = defineProps<{ portError?: boolean }>();
const model = defineModel<SOCKS5Proxy>({ required: true });
</script>
