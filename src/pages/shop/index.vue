<script setup lang="ts">
import DynamicForm from '~/components/DynamicForm/index.vue'
import type { DynamicFormProps } from '~/components/DynamicForm/types'
import VirtualList from '~/components/VirtualList/VirtualList.vue'

// defineOptions({
//   name: 'ShopPage',
// })
const formRef = ref<InstanceType<typeof DynamicForm>>()
// no type
const props: DynamicFormProps = {
  schema: [
    { label: '输入1', component: 'input', key: 'a', required: true },
    {
      label: '输入2',
      component: 'input',
      key: 'b',
      show: ({ data }) => data.a === '123',
      required: true,
    },
    {
      label: 'Group1',
      key: 'c',
      type: 'group',
      children: [
        { label: '输入1', component: 'input', key: 'a', required: true },
        {
          label: '输入2',
          component: 'input',
          key: 'b',
          show: ({ data }) => (data.c as unknown as any).a === '234',
          required: true,
        },
      ],
    },
    {
      label: 'Array',
      type: 'list',
      key: 'd',
      max: 2,
      children: [
        { label: '输入1', component: 'input', key: 'e', required: true },
        { label: '输入2', component: 'input', key: 'f', required: true },
      ],
    },
  ],
  model: reactive({
    a: '',
    b: '',
    c: { a: '', b: '' },
    d: [{ e: '', f: '' }],
  }),
  // rules: {
  //   a: [{ required: true, message: 'a is required' }],
  // },
}
const handleReset = (): void => formRef.value!.form!.resetFields()
const handleClearValidate = (): void => formRef.value!.form?.clearValidate()
function handleSubmit () {
  return formRef.value!.form!.validate().then((err) => {
    if (!err)
      console.log(props.model)

    else
      console.error(err)
  })
}
const list: Array<{ id: number, content: string }> = Array.from({ length: 100 }).fill(undefined).map((_, index) => {
  const height = Math.random() * 40 + 20
  const randomContent = 'xxx <br> xx'.repeat(Math.ceil(Math.random() * 5))
  const content = `${index + 1} :${randomContent}xxx`
  return { content, style: { height: `${height}px`, lineHeight: `${height}px` }, id: index }
})
</script>

<template>
  <div class="mx-auto min-w-160">
    <div>shop</div>
    <div>1.DynamicForm </div>
    <div>2.Virtual List </div>
    <div>3.首屏优化 </div>
    <div>
      <a-tabs>
        <a-tab-pane key="1" title="1.DynamicForm">
          <div>
            <DynamicForm ref="formRef" v-model:model="props.model" :schema="props.schema" />
            <div>
              <button @click="handleSubmit">
                提交
              </button>
              <button @click="handleReset">
                Reset
              </button>
              <button @click="handleClearValidate">
                清除验证
              </button>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" title="2.VirtualList">
          <div style="height:200px">
            <VirtualList :data-source="list" :estimated-height="20">
              <template #item="{ item }">
                <div v-html="item.content"></div>
              </template>
            </VirtualList>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" title="3.首屏优化">
          首屏优化
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
