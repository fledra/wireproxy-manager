<template>
  <div class="flex flex-col grow">
    <UForm :schema="schema" :state="state" class="flex items-center gap-4">
      <UFormField :label="props.label" name="bind" class="min-w-24">
        <UInput v-model.trim="state.addr" />
      </UFormField>
      <div>
        <UFormField label="Port" name="port" class="min-w-28">
          <UInputNumber v-model="state.port" :min="1" :max="65535" :format-options="{ useGrouping: false }" />
        </UFormField>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import z from 'zod';

const props = defineProps<{ label?: string; defaultPort?: number }>();
const model = defineModel<string>();

const schema = z.object({
  addr: z.union(
    [
      z.string().regex(z.regexes.domain),
      z.ipv4(),
      z.ipv6(),
    ],
    { error: `${props.label} is not a valid domain or an IPv4 or IPv6 address` },
  ),
  port: z.number().min(1).max(65535),
});

const state = reactive<Partial<z.output<typeof schema>>>({
  addr: '127.0.0.1',
  port: props.defaultPort ?? 1025,
});

watchEffect(() => {
  model.value = `${state.addr}:${state.port}`;
});
</script>
