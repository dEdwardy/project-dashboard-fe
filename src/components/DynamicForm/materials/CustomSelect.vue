<script setup lang="ts">
import { ElOption, ElSelect } from 'element-plus'
import { ref, watch, withDefaults } from 'vue'
import type { SelectProps } from '../types'

defineOptions({
  name: 'CustomSelect',
})
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  clearable: true,
  filterable:undefined,
  filterMethod:undefined,
})
const emit = defineEmits(['update:modelValue'])

// @ts-ignore
const modelValue = ref(props.modelValue)
watch(modelValue, (v) => {
  emit('update:modelValue', v)
})
</script>

<template>
  <ElSelect
    v-model="modelValue"
    :multiple="props.multiple"
    :clearable="props.clearable"
    :filterable="props.filterable"
    :filter-method="props.filterMethod"
  >
    <ElOption v-for="(item, index) of props.options" :key="index" :value="item.value">
      {{ item.label }}
    </ElOption>
  </ElSelect>
</template>
