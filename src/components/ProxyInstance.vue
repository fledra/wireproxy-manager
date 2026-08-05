<template>
  <div class="flex gap-4 justify-between items-center space-y-4 rounded overflow-hidden">
    <span class="min-w-32 text-right">{{ proxy.label }}</span>
    <UTheme
      :ui="{
        input: { root: 'w-full' },
        formField: { root: 'w-full' },
      }"
    >
      <div class="flex gap-4 w-full">
        <component :is="proxy.component" v-model="(model as any)" />
      </div>
    </UTheme>
    <UTooltip text="Delete proxy instance">
      <UButton
        icon="i-lucide-x"
        color="error"
        variant="ghost"
        @click="emit('delete')"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import type { ProxyConfig, ProxyType } from '../types';

import { computed } from 'vue';

import { proxyRegistry } from '../utils/registry';

const props = defineProps<{
  type: ProxyType;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const model = defineModel<ProxyConfig>({ required: true });
const proxy = computed(() => proxyRegistry[props.type]);
</script>
