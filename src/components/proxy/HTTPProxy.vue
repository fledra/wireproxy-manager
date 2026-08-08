<template>
  <Address v-model="model.BindAddress" :default-port="80" label="Bind Address" />

  <UFormField label="Username">
    <UInput v-model="model.Username" />
  </UFormField>

  <UFormField label="Password">
    <UInput v-model="model.Password" />
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPProxy } from '../../types';

const model = defineModel<HTTPProxy>({ required: true });
</script>
