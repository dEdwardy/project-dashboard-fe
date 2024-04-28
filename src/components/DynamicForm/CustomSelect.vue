<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { ref, withDefaults } from 'vue'
import { SelectProps } from './types';

defineOptions({
  name: 'CustomSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  multiple: false,
  clearable: true,
}
)
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)
watch(modelValue, v => {
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
    <ElOption v-for="(item, index) of props.options" :value="item.value" :key="index">{{ item.label }}</ElOption>
  </ElSelect>
</template>
