<template>
  <UForm :schema="schema" :state="state" class="flex max-[505px]:flex-col gap-4 grow">
    <UFormField :label="props.label" name="addr" class="grow">
      <UInput v-model.trim="state.addr" :disabled="props.disabled" />
    </UFormField>
    <PortInput v-model="state.port" name="port" :error="portError" :disabled="props.disabled" />
  </UForm>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import z from 'zod';

const props = defineProps<{
  label?: string;
  defaultPort?: number;
  portError?: boolean;
  disabled?: boolean;
}>();

const model = defineModel<string>();
const portError = computed(() => props.portError ? 'Port in use' : undefined);

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
