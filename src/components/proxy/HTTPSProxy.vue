<template>
  <div class="flex items-center gap-4">
    <Address v-model="model.bind" :default-port="443" label="Bind Address" class="w-full" />

    <UFormField label="Certificate File" class="min-w-24">
      <UInput v-model="model.certFile" :ui="{ trailing: 'pe-0.5' }">
        <template #trailing>
          <UButton variant="ghost" icon="i-lucide-file" size="sm" />
        </template>
      </UInput>
    </UFormField>

    <UFormField label="Key File" class="min-w-24">
      <UInput v-model="model.keyFile" :ui="{ trailing: 'pe-0.5' }">
        <template #trailing>
          <UButton variant="ghost" icon="i-lucide-file" size="sm" />
        </template>
      </UInput>
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { HTTPSProxy } from '../../types';

const model = defineModel<HTTPSProxy>({ required: true });
</script>
