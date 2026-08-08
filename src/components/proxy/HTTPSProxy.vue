<template>
  <Address v-model="model.BindAddress" :default-port="443" label="Bind Address" />

  <UFormField label="Certificate File" class="grow">
    <FilePicker v-model="model.CertFile" :filters="[{ name: '', extensions: ['crt'] }]" />
  </UFormField>

  <UFormField label="Key File" class="grow">
    <FilePicker v-model="model.KeyFile" :filters="[{ name: '', extensions: ['key'] }]" />
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPSProxy } from '../../types';

const model = defineModel<HTTPSProxy>({ required: true });
</script>
