<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElDialog, ElUpload } from 'element-plus'
import type { UploadUserFile } from 'element-plus'

interface IProps {
  modelValue: UploadUserFile[] | any[]
  multiple?: boolean
  limit?: number
  action: string
  width?: number
  height?: number
  useAliOss?: boolean
}
defineOptions({
  name: 'CustomUploader',
})
const props = withDefaults(defineProps<IProps>(), {
  action: '#',
  multiple: false,
  width: 100,
  height: 100,
  useAliOss: true,
})
const emits = defineEmits(['update:modelValue'])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const modelValue = ref<UploadUserFile[]>(props.modelValue ?? [])

watch(modelValue, (v) => {
  emits('update:modelValue', v)
}, {
  deep: true,
})
</script>

<template>
  <div>
    <ElUpload :action="props.action" list-type="picture-card" :auto-upload="true">
      <i class="i-carbon:add" />
    </ElUpload>

    <ElDialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image">
    </ElDialog>
  </div>
</template>
