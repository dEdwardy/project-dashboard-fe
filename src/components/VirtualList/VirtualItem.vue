<script setup lang="ts">
const props = defineProps<{ item: any }>()
const itemHeight = inject<number>('itemHeight')
const scrollTop = inject<Ref<number>>('scrollTop')
</script>

<template>
  <!-- <div :style="{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px`, transform: `translateY(${scrollTop ?? 0}px)` }"> -->
  <slot :item="props.item" :style="{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px`, transform: `translateY(${scrollTop ?? 0}px)` }" />
  <!-- </div> -->
</template>
