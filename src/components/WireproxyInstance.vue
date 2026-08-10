<template>
  <UCollapsible class="flex flex-col group">
    <UCard
      variant="soft"
      class="grow transition-all hover:bg-elevated/80 group-data-[state=open]:rounded-bl-none group-data-[state=open]:rounded-br-none"
    >
      <div class="flex items-center gap-1 max-[330px]:flex-col overflow-hidden">
        <div class="flex items-center gap-4 grow truncate text-clip max-[330px]:self-start">
          <UTooltip>
            <div class="flex">
              <UChip :color="model.running ? 'success' : 'error'" standalone inset />
            </div>
            <template #content>
              {{ status }} <span v-if="pid">(pid: {{ pid }})</span>
            </template>
          </UTooltip>
          <div class="font-semibold grow">
            {{ name }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UTooltip :ui="{ content: 'h-full p-2' }">
            <UButton
              variant="ghost"
              :icon="model.running ? 'i-lucide-pause' : 'i-lucide-play'"
              :loading="busy"
              :disabled="startErrors.length > 0"
              @click.stop="toggleWireproxy"
            />

            <template #content>
              <ul v-if="startErrors.length > 0" class="space-y-1 list-disc list-inside">
                <li v-for="(err, idx) in startErrors" :key="idx" class="text-error">
                  {{ err }}
                </li>
              </ul>
              <span v-else>{{ `${model.running ? 'Stop' : 'Start'} instance` }}</span>
            </template>
          </UTooltip>
          <UTooltip text="Delete instance">
            <UButton
              icon="i-lucide-x"
              variant="ghost"
              color="error"
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
          <UFormField label="WireGuard Config" orientation="horizontal">
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

import { computed, onUnmounted, ref } from 'vue';

import { createProxyInstance } from '../utils/proxy';
import { launchWireproxy, stopWireproxy } from '../utils/wireproxy';

const { usedPorts = [] } = defineProps<{
  usedPorts?: boolean[];
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const model = defineModel<WireproxyInstance>({ required: true });

const busy = ref(false);
const pid = ref<number>();
const status = computed(() => model.value.running ? 'Running' : 'Stopped');
const name = computed(() => model.value.name || '(unnamed instance)');
const disabled = computed(() => busy.value || model.value.running);

const startErrors = computed(() => {
  const errors: string[] = [];

  if (!model.value.wgConfigPath) {
    errors.push('Invalid WireGuard config path');
  }
  if (model.value.proxies.length === 0) {
    errors.push('Instance does not have any proxies');
  }
  if (usedPorts.includes(true)) {
    errors.push('Some proxy ports are already in use');
  }

  return errors;
});

function addProxy(type: ProxyType) {
  const proxy = createProxyInstance(type);
  model.value.proxies.push(proxy);
}

function removeProxy(idx: number) {
  model.value.proxies.splice(idx, 1);
}

async function start() {
  busy.value = true;

  try {
    pid.value = await launchWireproxy(model.value);
    model.value.running = true;
  } catch (error) {
    console.error(error);
  }

  busy.value = false;
}

async function stop() {
  busy.value = true;

  try {
    await stopWireproxy(model.value);
    pid.value = undefined;
    model.value.running = false;
  } catch (error) {
    console.error(error);
  }

  busy.value = false;
}

async function toggleWireproxy() {
  if (model.value.running) {
    await stop();
  } else {
    await start();
  }
}

onUnmounted(stop);
</script>
