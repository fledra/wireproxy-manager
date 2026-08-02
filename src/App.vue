<template>
  <UApp>
    <UMain class="flex flex-col gap-4 p-4">
      <UEmpty v-if="instances.length === 0" description="There are no Wireproxy instances yet">
        <template #actions>
          <UButton leading-icon="i-lucide-plus" @click="addInstance">
            Add instance
          </UButton>
        </template>
      </UEmpty>
      <div v-else class="ml-auto">
        <UButton leading-icon="i-lucide-plus" @click="addInstance">
          Add instance
        </UButton>
      </div>

      <Wireproxy
        v-for="instance in instances"
        :key="instance"
        :instance="instance"
        @delete="removeInstance(instance)"
      />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import { ref } from 'vue';

const instances = ref<string[]>([]);

function addInstance() {
  const id = nanoid();
  instances.value.push(id);
}

function removeInstance(id: string) {
  const idx = instances.value.findIndex((instance) => instance === id);
  if (idx !== -1) {
    instances.value.splice(idx, 1);
  }
}
</script>
