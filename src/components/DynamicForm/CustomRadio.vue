<script setup lang="ts">
import { ElRadioGroup, ElRadio } from 'element-plus'
import type { RadioProps } from './types'

const props = defineProps<RadioProps>()
const emits = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue)
watch(modelValue, v => {
  emits('update:modelValue', v)
})
const layoutStyle = computed(
  () =>  props.layout === 'block' ? 'display:flex;flex-direction:column;align-items:flex-start;width:100%' : ''
)
</script>

<template>
  <ElRadioGroup class="custom-radio" v-model="modelValue" :style="layoutStyle">
    <ElRadio v-for="(item, index) of props.options"
      :value="item.value" :key="index">{{ item.label
      }}</ElRadio>
  </ElRadioGroup>
</template>
