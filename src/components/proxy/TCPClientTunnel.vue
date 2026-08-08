<template>
  <Address v-model="model.BindAddress" label="Bind Address" />
  <Address v-model="model.Target" label="Target" />
</template>

<script setup lang="ts">
import type { TCPClientTunnel } from '../../types';

const model = defineModel<TCPClientTunnel>({ required: true });
</script>
