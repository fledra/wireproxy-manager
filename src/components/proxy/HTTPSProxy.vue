<template>
  <div class="flex items-center gap-4">
    <UFormField label="Bind Address">
      <UInput v-model="model.bind" />
    </UFormField>

    <UFormField label="Certificate File">
      <UInput v-model="model.certFile" />
    </UFormField>

    <UFormField label="Key File">
      <UInput v-model="model.keyFile" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { HTTPSProxy } from '../../types';

const model = defineModel<HTTPSProxy>({ required: true });
</script>
