<script setup>
import draggable from 'vuedraggable'
import { generateId } from './utils'
import { componentConfigMap } from './componentMap'

defineOptions({
  name: 'MaterialSection',
})
const materials = {
  base: [
    { name: '单行文本', key: 'input' },
    { name: '多行文本', key: 'textarea' },
    { name: '计数器', key: 'counter' },
    { name: '单选框组', key: 'radio' },
    { name: '多选框组', key: 'checkbox' },
    { name: '时间选择器', key: 'timepicker' },
    { name: '日期选择器', key: 'datepicker' },
    { name: '评分', key: 'rate' },
    { name: '颜色选择器', key: 'colorpicker' },
    { name: '下拉选择框', key: 'select' },
    { name: '开关', key: 'switch' },
    { name: '滑块', key: 'slider' },
    { name: '文字', key: 'text' },
  ],
  addition: [
    { name: '自定义区域', key: 'customarea' },
    { name: '图片', key: 'uploader' },
    { name: '编辑器', key: 'editor' },
    { name: '级联选择器', key: 'cascader' },
  ],
  layout: [{ name: '栅格布局', key: 'layout' }],
}
function handleClick(element) {
  console.log(element)
}
function handleClone(item) {
  const id = generateId()
  const key = `${item.key}-${id}`
  return {
    ...item,
    label: item.name,
    type: item.key,
    id, //  用于渲染
    key, // 用于form提交
    component: item.key,
    componentProps: {
      // key,
      label: item.name,
      key,
      id,
      ...Object.fromEntries(
        Object.entries(componentConfigMap[item.key].model ?? {}).map(([k, v]) => [
          k,
          markRaw(v),
        ]),
      ),
    },
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div v-for="(item, index) of Object.keys(materials)" :key="index" class="flex-1">
      <draggable
        tag="div" :list="materials[item]" ghost-class="ghost" :group="{ name: 'material', pull: 'clone' }
        " class="grid-template grid gap-1 p-3" item-key="id" filter=".undraggable" :sort="false" :clone="handleClone"
      >
        <template #item="{ element }">
          <div
            hover-border="dashed blue"
            class="h-30px flex cursor-pointer items-center justify-center border-1px bg-#f4f6fc text-12px"
            :title="element.name" @click="() => handleClick(element)"
          >
            <div class="w-70px overflow-hidden text-ellipsis whitespace-nowrap px-5px">
              {{ element.name }}
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.grid-template {
  grid-template-columns: 1fr 1fr 1fr;
}

.ghost {
  opacity: 0.2;
}
</style>
