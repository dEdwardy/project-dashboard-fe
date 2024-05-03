<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import CustomCodeEditor from './CustomCodeEditor.vue'

interface IProps {
  modelValue: any
  editable?: boolean
  label?: string
}
defineOptions({
  name: 'CustomJson',
  inheritAttrs: false,
})
const props = defineProps<IProps>()
const emits = defineEmits(['update:modelValue', 'input'])
const defaultValue = [
  {
    value: 'Option 1',
    label: 'Option 1',
    children: [
      {
        value: 'Option 1 - children',
        label: 'Option 1 - children',
      },
    ],
  },
  {
    value: 'Option 2',
    label: 'Option 2',
    children: [
      {
        value: 'Option 2 - children',
        label: 'Option 2 - children',
      },
    ],
  },
  {
    value: 'Option 3',
    label: 'Option 3',
  },
]
const modelValue = ref(props.modelValue)
const editor = ref()
const visible = ref(false)
watch(modelValue, (v) => {
  emits('update:modelValue', v)
}, {
  deep: true,
})
function handleShow() {
  if (!modelValue.value?.length) {
    modelValue.value = defaultValue
    nextTick(() => {
      visible.value = true
    })
    return
  }
  visible.value = true
}
const jsonError = ref()
const jsonStr = computed({
  get() {
    return JSON.stringify(modelValue.value, null, 2)
  },
  set(v) {
    console.log(editor.value)
    try {
      const val = JSON.parse(v)
      emits('update:modelValue', val)
      jsonError.value = ''
    }
    catch (err: any) {
      jsonError.value = err.message
    }
  },
})
</script>

<template>
  <div>
    <ElButton @click="handleShow">
      {{ props.label ?? '设置' }}
    </ElButton>
    <ElDialog v-model="visible" append-to-body class="position-relative">
      <span v-copy="jsonStr" class="inline-flex cursor-pointer bg-blue p-1">
        <span class="i-carbon:copy bg-white" />
      </span>
      <CustomCodeEditor v-model="jsonStr" />
    </ElDialog>
  </div>
</template>
