<template>
  <Address v-model="model.BindAddress" :default-port="443" label="Bind Address" class="w-full" />

  <UFormField label="Certificate File" class="min-w-24">
    <FilePicker v-model="model.CertFile" />
  </UFormField>

  <UFormField label="Key File" class="min-w-24">
    <FilePicker v-model="model.KeyFile" />
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPSProxy } from '../../types';

const model = defineModel<HTTPSProxy>({ required: true });
</script>
