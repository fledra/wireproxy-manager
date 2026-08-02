<template>
  <div>
    <UFormField label="Bind Address">
      <UInput v-model="model.bind" />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import type { SOCKS5Proxy } from '../../types';

const model = defineModel<SOCKS5Proxy>({ required: true });
</script>
