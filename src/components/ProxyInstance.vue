<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <span class="font-medium text-primary">{{ proxy.label }}</span>
      <UTooltip text="Delete proxy instance">
        <UButton color="error" variant="soft" :disabled="props.disabled" @click="emit('delete')">
          Delete instance
        </UButton>
      </UTooltip>
    </div>
    <div class="flex flex-col gap-4 pb-1 grow overflow-auto">
      <UTheme
        :ui="{
          fieldGroup: { base: 'w-full' },
          inputNumber: { base: 'w-30' },
          input: { root: 'min-w-24 w-full' },
        }"
      >
        <component :is="proxy.component" v-model="(model as any)" :port-error="props.portError" :disabled="props.disabled" />
      </UTheme>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProxyConfig, ProxyType } from '../types';

import { computed } from 'vue';

import { proxyRegistry } from '../utils/registry';

const props = defineProps<{
  type: ProxyType;
  portError?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const model = defineModel<ProxyConfig>({ required: true });
const proxy = computed(() => proxyRegistry[props.type]);
</script>
