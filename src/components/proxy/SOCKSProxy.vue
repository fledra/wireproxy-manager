<template>
  <Address v-model="model.BindAddress" label="Bind Address" />
</template>

<script setup lang="ts">
import type { SOCKS5Proxy } from '../../types';

const model = defineModel<SOCKS5Proxy>({ required: true });
</script>
