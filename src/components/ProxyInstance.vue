<template>
  <div class="flex items-center gap-4 p-2 rounded hover:bg-elevated/50">
    <span class="min-w-29 text-right font-medium text-sm">{{ proxy.label }}</span>
    <div class="flex max-[728px]:flex-col gap-4 pb-1 grow overflow-auto">
      <UTheme
        :ui="{
          inputNumber: { base: 'w-30' },
          input: { root: 'min-w-24 w-full' },
        }"
      >
        <component :is="proxy.component" v-model="(model as any)" />
      </UTheme>
    </div>
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
