<script setup lang="ts">
defineOptions({
  name: 'CustomText',
})
const props = defineProps<{ modelValue: string, defaultValue?: string }>()
</script>

<template>
  <div>
    {{ props.modelValue ?? props.defaultValue }}
  </div>
</template>
