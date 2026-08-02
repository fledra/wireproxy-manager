<template>
  <div class="flex gap-4">
    <Address v-model="model.bind" :default-port="80" label="Bind Address" class="w-full" />

    <UFormField label="Username" class="min-w-24 max-w-64">
      <UInput v-model="model.username" />
    </UFormField>

    <UFormField label="Password" class="min-w-24 max-w-64">
      <UInput v-model="model.password" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { HTTPProxy } from '../../types';

const model = defineModel<HTTPProxy>({ required: true });
</script>
