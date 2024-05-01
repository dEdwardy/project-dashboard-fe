<script setup lang="ts">
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { ref } from 'vue'
import type { CheckboxGroupProps } from './types'

defineOptions({
  name: 'CustomCheckbox',
})
const props = defineProps<CheckboxGroupProps>()
const emit = defineEmits(['update:modelValue'])
const layoutStyle = computed(
  () => props.layout == 'block' ? 'display:flex;flex-direction:column;align-items:flex-start;width:100%' : '',
)
const modelValue = ref(props.modelValue ?? [])
watch(modelValue, (v) => {
  emit('update:modelValue', v)
})
</script>

<template>
  <ElCheckboxGroup v-model="modelValue" :style="layoutStyle">
    <ElCheckbox v-for="(item, index) of props.options" :key="index" :value="item.value">
      {{ item.label }}
    </ElCheckbox>
  </ElCheckboxGroup>
</template>
