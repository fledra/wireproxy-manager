<template>
  <Address v-model="model.bind" :default-port="443" label="Bind Address" class="w-full" />
</template>

<script setup lang="ts">
import type { SNIProxy } from '../../types';

const model = defineModel<SNIProxy>({ required: true });
</script>
