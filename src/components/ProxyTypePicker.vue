<template>
  <USelect
    v-model="type"
    placeholder="Add a proxy"
    :items="proxyTypes"
    :ui="{
      placeholder: 'text-default',
      content: 'min-w-fit',
    }"
  />
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

import type { ProxyType } from '../types';

import { nextTick, ref, watch } from 'vue';

import { proxyRegistry } from '../proxies';

const emit = defineEmits<{
  (e: 'select', type: ProxyType): void;
}>();

const proxyTypes = Object.entries(proxyRegistry).map(([value, { label }]) => ({
  label,
  value,
} satisfies SelectItem));

const type = ref<ProxyType>();

watch(type, (val) => {
  if (!val) return;
  emit('select', val);
  nextTick(() => {
    type.value = undefined;
  });
});
</script>
