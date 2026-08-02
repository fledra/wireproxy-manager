<template>
  <UCollapsible class="flex flex-col group">
    <UCard variant="soft" class="grow transition-all hover:bg-elevated/80 group-data-[state=open]:rounded-bl-none group-data-[state=open]:rounded-br-none">
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <UChip :color="status ? 'success' : 'error'" standalone inset />
          <span class="font-semibold">{{ name }}</span>
        </div>
        <div class="flex items-center gap-4">
          <UTooltip :text="`${status ? 'Stop' : 'Start'} instance`">
            <UButton :icon="status ? 'i-lucide-pause' : 'i-lucide-play'" variant="ghost" :loading="busy" @click.stop="toggleWireproxy" />
          </UTooltip>
          <UTooltip text="Delete instance">
            <UButton icon="i-lucide-x" variant="ghost" color="error" class="justify-self-end" @click.stop="emit('delete')" />
          </UTooltip>
          <UIcon name="i-lucide-chevron-down" class="group-data-[state=open]:rotate-180 transition-transform duration-200" size="24" />
        </div>
      </div>
    </UCard>

    <template #content>
      <div class="flex flex-col gap-4 p-4 border border-default border-t-0 rounded-bl-lg rounded-br-lg">
        <div class="flex gap-4">
          <UFormField label="Instance Name" orientation="horizontal" class="w-full gap-4" :ui="{ container: 'grow' }">
            <UInput v-model="name" class="w-full" />
          </UFormField>
          <ProxyTypePicker @select="addInstance" />
        </div>

        <p v-if="proxies.length === 0" class="py-4 text-sm text-muted text-center">
          This instance does not have any proxies
        </p>
        <template v-else>
          <USeparator />
          <ProxyInstance
            v-for="proxy in proxies"
            :key="proxy.id"
            v-model="proxy.config"
            :type="proxy.type"
            @delete="removeInstance(proxy.id)"
          />
        </template>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
import type { ProxyInstance, ProxyType } from '../types';

import { nanoid } from 'nanoid';
import { ref } from 'vue';

import { proxyRegistry } from '../proxies';

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const busy = ref(false);
const name = ref('Instance');
const status = ref(false);

const proxies = ref<ProxyInstance[]>([]);

function addInstance<T extends ProxyType>(type: T) {
  const id = nanoid();
  const config = { ...proxyRegistry[type].defaults };

  proxies.value.push({ id, type, config });
}

function removeInstance(id: string) {
  const idx = proxies.value.findIndex((p) => p.id === id);

  if (idx !== -1) {
    proxies.value.splice(idx, 1);
  }
}

async function toggleWireproxy() {
  busy.value = true;
  status.value = !status.value;
  busy.value = false;
}
</script>
