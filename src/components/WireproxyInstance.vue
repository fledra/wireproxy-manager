<template>
  <UCollapsible class="flex flex-col group">
    <UCard
      variant="soft"
      class="grow transition-all hover:bg-elevated/80 group-data-[state=open]:rounded-bl-none group-data-[state=open]:rounded-br-none"
    >
      <div class="flex items-center gap-1 max-[330px]:flex-col overflow-hidden">
        <div class="flex gap-4 grow truncate text-clip max-[330px]:self-start">
          <UChip :color="model.running ? 'success' : 'error'" standalone inset />
          <div class="font-semibold grow">
            {{ name }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UTooltip :text="`${model.running ? 'Stop' : 'Start'} instance`">
            <UButton
              variant="ghost"
              :icon="model.running ? 'i-lucide-pause' : 'i-lucide-play'"
              :loading="busy"
              :disabled="usedPorts.includes(true)"
              @click.stop="toggleWireproxy"
            />
          </UTooltip>
          <UTooltip text="Delete instance">
            <UButton
              icon="i-lucide-x"
              variant="ghost"
              color="error"
              :disabled="disabled"
              @click.stop="emit('delete')"
            />
          </UTooltip>
          <UIcon
            name="i-lucide-chevron-down"
            class="group-data-[state=open]:rotate-180 transition-transform duration-200"
            size="24"
          />
        </div>
      </div>
    </UCard>

    <template #content>
      <div class="p-4 space-y-4 border border-default border-t-0 rounded-b-lg overflow-hidden">
        <UTheme
          :ui="{
            input: { root: 'w-full' },
            fieldGroup: { base: 'w-full' },
            formField: {
              root: 'gap-4',
              container: 'grow',
              labelWrapper: 'min-w-29 justify-end',
            },
          }"
        >
          <UFormField label="Instance Name" orientation="horizontal">
            <UInput v-model="model.name" placeholder="Enter instance name" :disabled="disabled" />
          </UFormField>
          <UFormField label="Wireproxy Path" orientation="horizontal">
            <FilePicker v-model="model.wireproxyPath" :disabled="disabled" />
          </UFormField>
          <UFormField label="Wireguard Config" orientation="horizontal">
            <FilePicker
              v-model="model.wgConfigPath"
              :disabled="disabled"
              :filters="[{ name: '', extensions: ['conf'] }]"
            />
          </UFormField>
        </UTheme>

        <template v-if="model.proxies.length === 0">
          <p class="text-sm text-muted text-center">
            This instance does not have any proxies
          </p>
          <ProxyTypePicker class="flex mx-auto" :disabled="disabled" @select="addProxy" />
        </template>
        <template v-else>
          <ProxyTypePicker class="flex ml-auto" :disabled="disabled" @select="addProxy" />
          <USeparator />
          <ProxyInstance
            v-for="(proxy, idx) in model.proxies"
            :key="proxy.id"
            v-model="proxy.config"
            :type="proxy.type"
            :port-error="usedPorts[idx]"
            :disabled="disabled"
            @delete="removeProxy(idx)"
          />
        </template>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
import type { ProxyType, WireproxyInstance } from '../types';

import { computed, ref } from 'vue';

import { createProxyInstance } from '../utils/proxy';

const { usedPorts = [] } = defineProps<{
  usedPorts?: boolean[];
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const model = defineModel<WireproxyInstance>({ required: true });

const busy = ref(false);
const name = computed(() => model.value.name || '(unnamed instance)');
const disabled = computed(() => busy.value || model.value.running);

function addProxy(type: ProxyType) {
  const proxy = createProxyInstance(type);
  model.value.proxies.push(proxy);
}

function removeProxy(idx: number) {
  model.value.proxies.splice(idx, 1);
}

async function toggleWireproxy() {
  busy.value = true;
  model.value.running = !model.value.running;
  busy.value = false;
}
</script>
