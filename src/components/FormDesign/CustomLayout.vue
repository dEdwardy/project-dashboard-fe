<script setup lang="ts">
defineOptions({
  name: 'CustomLayout',
})
const slots = useSlots()
const instance = getCurrentInstance()
// to avoid <Layout><Layout></Layout> </Layout>
const isRepeatLayout = instance?.parent?.exposed?.l
defineExpose({
  l: 'v',
})
</script>

<template>
  <div class="mx-1 my-2 p-b-2 p-t-1" :class="[isRepeatLayout ? '' : 'border-b-1px border-solid']">
    <div v-if="slots.label" class="mx-8 my-4 text-left font-bold">
      <slot name="label" />
    </div>
    <div v-if="slots.default" class="mx-4">
      <slot />
    </div>
  </div>
</template>
