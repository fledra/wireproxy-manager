<template>
  <Address v-model="model.BindAddress" :default-port="443" label="Bind Address" :port-error="props.portError" />
</template>

<script setup lang="ts">
import type { SNIProxy } from '../../types';

const props = defineProps<{ portError?: boolean }>();
const model = defineModel<SNIProxy>({ required: true });
</script>
