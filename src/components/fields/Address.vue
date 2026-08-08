<template>
  <UForm :schema="schema" :state="state" class="flex max-[505px]:flex-col gap-4 grow">
    <UFormField :label="props.label" name="addr" class="grow">
      <UInput v-model.trim="state.addr" />
    </UFormField>
    <PortInput v-model="state.port" name="port" />
  </UForm>
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
    { error: 'Invalid domain or an IPv4 or IPv6 address' },
  ),
  port: z.number().min(1).max(65535),
});

const state = reactive<z.output<typeof schema>>({
  addr: '127.0.0.1',
  port: props.defaultPort ?? 1025,
});

watchEffect(() => {
  model.value = `${state.addr}:${state.port}`;
});
</script>
