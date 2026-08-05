<template>
  <Address v-model="model.BindAddress" :default-port="443" label="Bind Address" class="w-full" />

  <UFormField label="Certificate File" class="min-w-24">
    <UInput v-model="model.CertFile" :ui="{ trailing: 'pe-0.5' }">
      <template #trailing>
        <UButton variant="ghost" icon="i-lucide-file" size="sm" />
      </template>
    </UInput>
  </UFormField>

  <UFormField label="Key File" class="min-w-24">
    <UInput v-model="model.KeyFile" :ui="{ trailing: 'pe-0.5' }">
      <template #trailing>
        <UButton variant="ghost" icon="i-lucide-file" size="sm" />
      </template>
    </UInput>
  </UFormField>
</template>

<script setup lang="ts">
import type { HTTPSProxy } from '../../types';

const model = defineModel<HTTPSProxy>({ required: true });
</script>
