<template>
  <Address
    v-model="model.BindAddress"
    :default-port="443"
    :port-error="props.portError"
    :disabled="props.disabled"
    label="Bind Address"
  />
</template>

<script setup lang="ts">
import type { SNIProxy } from '../../types';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<SNIProxy>({ required: true });
</script>
