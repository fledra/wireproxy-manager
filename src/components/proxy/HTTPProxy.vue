<template>
  <Address v-model="model.BindAddress" :default-port="80" label="Bind Address" :port-error="props.portError" />

  <UFormField label="Username">
    <UInput v-model="model.Username" :disabled="props.disabled" />
  </UFormField>

  <UFormField label="Password">
    <UInput v-model="model.Password" :disabled="props.disabled" />
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPProxy } from '../../types';

const props = defineProps<{ portError?: boolean; disabled?: boolean }>();
const model = defineModel<HTTPProxy>({ required: true });
</script>
