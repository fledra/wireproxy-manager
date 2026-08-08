<template>
  <Address v-model="model.Target" label="Target" />
</template>

<script setup lang="ts">
import type { STDIOTunnel } from '../../types';

const model = defineModel<STDIOTunnel>({ required: true });
</script>
