<template>
  <Address v-model="model.bind" label="Bind Address" class="w-full" />
</template>

<script setup lang="ts">
import type { SOCKS5Proxy } from '../../types';

const model = defineModel<SOCKS5Proxy>({ required: true });
</script>
