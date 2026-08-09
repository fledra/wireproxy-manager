<template>
  <UApp>
    <UMain class="space-y-4 p-4">
      <UEmpty v-if="instances.length === 0" description="There are no Wireproxy instances yet">
        <template #actions>
          <UButton leading-icon="i-lucide-plus" @click="addWireproxyInstance">
            Add instance
          </UButton>
        </template>
      </UEmpty>
      <UButton v-else class="flex ml-auto" leading-icon="i-lucide-plus" @click="addWireproxyInstance">
        Add instance
      </UButton>

      <WireproxyInstance
        v-for="(instance, idx) in instances"
        :key="instance.id"
        :model-value="instance"
        :used-ports="usedPorts[idx]"
        @delete="removeWireproxyInstance(idx)"
      />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import type { WireproxyInstance } from './types';

import { computed, onBeforeMount, ref, watch } from 'vue';

import { readConfig, writeConfig } from './utils/config';
import { getProxyInstancePort } from './utils/proxy';
import { createWireproxyInstance, deleteWireproxyInstance } from './utils/wireproxy';

const instances = ref<WireproxyInstance[]>([]);
const usedPorts = computed(() => {
  const ports = new Map<number, number>();

  for (const instance of instances.value) {
    for (const proxy of instance.proxies) {
      const port = getProxyInstancePort(proxy);
      ports.set(port, (ports.get(port) ?? 0) + 1);
    }
  }

  return instances.value.map((instance) => instance.proxies.map((proxy) => (ports.get(getProxyInstancePort(proxy)) ?? 0) > 1));
});

onBeforeMount(async () => {
  try {
    const config = await readConfig();
    instances.value = config.instances;
  } catch {
    instances.value = [];
  }
});

function addWireproxyInstance() {
  const instance = createWireproxyInstance();
  instances.value.push(instance);
}

async function removeWireproxyInstance(idx: number) {
  const instance = instances.value[idx];
  await deleteWireproxyInstance(instance);
  instances.value.splice(idx, 1);
}

let debounce: ReturnType<typeof setTimeout>;
watch(instances, (value) => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    writeConfig(value);
  }, 500);
}, { deep: true });
</script>
