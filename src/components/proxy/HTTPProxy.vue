<template>
  <div>
    <UFormField label="Bind Address">
      <UInput v-model="model.bind" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { HTTPProxy } from '../../types';

const model = defineModel<HTTPProxy>({ required: true });
</script>
