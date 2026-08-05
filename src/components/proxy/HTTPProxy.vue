<template>
  <Address v-model="model.BindAddress" :default-port="80" label="Bind Address" class="w-full" />

  <UFormField label="Username" class="min-w-24 max-w-64">
    <UInput v-model="model.Username" />
  </UFormField>

  <UFormField label="Password" class="min-w-24 max-w-64">
    <UInput v-model="model.Password" />
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPProxy } from '../../types';

const model = defineModel<HTTPProxy>({ required: true });
</script>
