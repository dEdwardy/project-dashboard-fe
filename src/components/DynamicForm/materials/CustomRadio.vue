<script setup lang="ts">
import { ElRadio, ElRadioGroup } from 'element-plus'
import type { RadioProps } from '../types'
import { computed, ref, watch } from 'vue';

const props = defineProps<RadioProps>()
const emits = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue)
watch(modelValue, (v) => {
  emits('update:modelValue', v)
})
const layoutStyle = computed(
  () => props.layout == 'block' ? 'display:flex;flex-direction:column;align-items:flex-start;width:100%' : '',
)
</script>

<template>
  <ElRadioGroup v-model="modelValue" :style="layoutStyle">
    <ElRadio
      v-for="(item, index) of props.options"
      :key="index" :value="item.value"
    >
      {{ item?.label ?? item?.value }}
    </ElRadio>
  </ElRadioGroup>
</template>
