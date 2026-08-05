<template>
  <UCollapsible class="flex flex-col group">
    <UCard variant="soft" class="grow transition-all hover:bg-elevated/80 group-data-[state=open]:rounded-bl-none group-data-[state=open]:rounded-br-none">
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <UChip :color="model.running ? 'success' : 'error'" standalone inset />
          <span class="font-semibold">{{ name }}</span>
        </div>
        <div class="flex items-center gap-4">
          <UTooltip :text="`${model.running ? 'Stop' : 'Start'} instance`">
            <UButton :icon="model.running ? 'i-lucide-pause' : 'i-lucide-play'" variant="ghost" :loading="busy" @click.stop="toggleWireproxy" />
          </UTooltip>
          <UTooltip text="Delete instance">
            <UButton icon="i-lucide-x" variant="ghost" color="error" class="justify-self-end" @click.stop="emit('delete')" />
          </UTooltip>
          <UIcon name="i-lucide-chevron-down" class="group-data-[state=open]:rotate-180 transition-transform duration-200" size="24" />
        </div>
      </div>
    </UCard>

    <template #content>
      <div class="flex flex-col gap-4 p-4 border border-default border-t-0 rounded-b-lg">
        <UTheme
          :ui="{
            formField: {
              root: 'gap-4',
              container: 'grow',
              labelWrapper: 'min-w-32 justify-end',
            },
          }"
        >
          <div class="grid grid-cols-10 gap-4">
            <UFormField label="Instance Name" orientation="horizontal" class="col-span-9">
              <UInput v-model="model.name" placeholder="Enter instance name" class="w-full" />
            </UFormField>
            <ProxyTypePicker class="row-span-2 self-center" @select="addProxy" />
            <UFormField label="Wireguard Config" orientation="horizontal" class="col-span-9">
              <FilePicker v-model="model.wgConfig" class="w-full" />
            </UFormField>
          </div>
        </UTheme>

        <p v-if="model.proxies.length === 0" class="py-4 text-sm text-muted text-center">
          This instance does not have any proxies
        </p>
        <template v-else>
          <USeparator />
          <ProxyInstance
            v-for="(proxy, idx) in model.proxies"
            :key="proxy.id"
            v-model="proxy.config"
            :type="proxy.type"
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

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const model = defineModel<WireproxyInstance>({ required: true });
const name = computed(() => model.value.name || '(unnamed instance)');
const busy = ref(false);

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
