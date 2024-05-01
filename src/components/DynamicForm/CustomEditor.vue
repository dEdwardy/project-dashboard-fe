<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
// @ts-expect-error
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

defineOptions({
  name: 'CustomEditor',
})
const props = defineProps<IProps>()
const emits = defineEmits(['update:modelValue'])
interface IProps {
  modelValue: string
}
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = 'default'
// 内容 HTML
const valueHtml = ref(props.modelValue)
watch(valueHtml, (v) => {
  console.error('v', v)
  emits('update:modelValue', v)
})
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: unknown) {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml" style="height: 300px; overflow-y: auto;" :default-config="editorConfig" :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>
