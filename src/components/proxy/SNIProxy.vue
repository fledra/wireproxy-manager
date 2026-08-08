<template>
  <Address v-model="model.BindAddress" :default-port="443" label="Bind Address" />
</template>

<script setup lang="ts">
import type { SNIProxy } from '../../types';

const model = defineModel<SNIProxy>({ required: true });
</script>
