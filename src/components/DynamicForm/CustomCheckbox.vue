<script setup lang="ts">
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { ref } from 'vue'
import { CheckboxGroupProps } from './types';

defineOptions({
  name: 'CustomSelect'
})
const props = defineProps<CheckboxGroupProps>()
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)
watch(modelValue, v => {
  emit('update:modelValue', v)
})
</script>

<template>
  <ElCheckboxGroup v-model="modelValue">
    <ElCheckbox v-for="(item, index) of props.options" :value="item.value" :key="index">{{ item.label }}</ElCheckbox>
  </ElCheckboxGroup>
</template>
