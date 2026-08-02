<template>
  <div class="flex gap-4 justify-between items-center p-4 rounded overflow-hidden hover:bg-elevated/50">
    <span class="min-w-36">{{ info.label }}</span>
    <UTheme
      :ui="{
        input: { root: 'w-full' },
        formField: { root: 'w-full' },
      }"
    >
      <component :is="info.component" v-model="model" class="w-full" />
    </UTheme>
    <UTooltip text="Delete proxy instance">
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        color="error"
        class="self-end"
        @click="emit('delete')"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import type { ProxyType } from '../types';

import { computed } from 'vue';

import { proxyRegistry } from '../proxies';

const props = defineProps<{
  type: ProxyType;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

// eslint-disable-next-line ts/no-explicit-any -- try to fix this later
const model = defineModel<any>({ required: true });
const info = computed(() => proxyRegistry[props.type]);
</script>
