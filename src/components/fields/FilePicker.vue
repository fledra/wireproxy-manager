<template>
  <UFieldGroup class="w-full">
    <UInput placeholder="No file selected" class="grow" :ui="{ base: 'group-not-only:group-last:rounded-s-md' }" />
    <UButton trailing-icon="i-lucide-file" variant="subtle" size="sm" class="whitespace-nowrap">
      Choose file
    </UButton>
  </UFieldGroup>
</template>
