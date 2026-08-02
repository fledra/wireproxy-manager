<template>
  <div>
    <UFormField label="Bind Address">
      <UInput v-model="model.bind" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { SNIProxy } from '../../types';

const model = defineModel<SNIProxy>({ required: true });
</script>
