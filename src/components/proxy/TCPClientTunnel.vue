<template>
  <Address v-model="model.bind" label="Bind Address" class="w-full" />
  <Address v-model="model.target" label="Target" class="w-full" />
</template>

<script setup lang="ts">
import type { TCPClientTunnel } from '../../types';

const model = defineModel<TCPClientTunnel>({ required: true });
</script>
