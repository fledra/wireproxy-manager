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
        @delete="removeWireproxyInstance(idx)"
      />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import type { WireproxyInstance } from './types';

import { nanoid } from 'nanoid';
import { ref } from 'vue';

const instances = ref<WireproxyInstance[]>([]);

function addWireproxyInstance() {
  const id = nanoid();
  instances.value.push({
    id,
    name: 'Instance',
    running: false,
    wireproxyPath: '',
    wgConfigPath: '',
    proxies: [],
  });
}

function removeWireproxyInstance(idx: number) {
  instances.value.splice(idx, 1);
}
</script>
