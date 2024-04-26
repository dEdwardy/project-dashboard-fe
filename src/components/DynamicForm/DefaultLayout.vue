<script setup lang="tsx" generic="T extends { default: any; label: any; bottom: any }">
import { useSlots } from 'vue'
defineSlots<T>()
const slots = useSlots()

function DefaultLayoutApp () {
  const labelSlot = slots?.label?.()
  const bottomSlot = slots?.bottom?.()
  const labelContent = labelSlot
    ? (
      <div class="ml-2 mt-2 text-left">{labelSlot}</div>
    )
    : undefined
  const bottomContent = bottomSlot
    ? (
      <div class="m-2">{bottomSlot}</div>
    )
    : undefined
  return <div class="m-4 bg-slate-50 p-4">
    {labelContent}
    {slots?.default?.()}
    {bottomContent}
  </div>
}
</script>

<template>
  <DefaultLayoutApp />
</template>
