<script setup lang="ts">
import DynamicForm from '~/components/DynamicForm/index.vue'
import type { DynamicFormProps } from '~/components/DynamicForm/types'
import VirtualList from '~/components/VirtualList/VirtualList.vue'

// const Layout2 = Layout as unknown as typeof DefaultLayout
// defineOptions({
//   name: 'ShopPage',
// })
const formRef = ref<InstanceType<typeof DynamicForm>>()
// no type
const props: DynamicFormProps = {
  schema: [
    { label: '输入1', component: 'input', key: 'a', show: ({ data }) => data.b == '1' },
    // {
    //   label: '输入2xxxxx',
    //   key: 'b',
    //   required: true,
    //   component: 'select',
    //   componentProps: {
    //     options: ['1', '2', '3'],
    //   },
    //   children: ['a', 'c'].map(k => ({
    //     label:'',
    //     key: k,
    //     component: 'option',
    //     componentProps: {
    //       label: k,
    //       value: k,
    //       key: k,
    //     },
    //   })),
    // },
    {
      label: 'Group1',
      key: 'c',
      type: 'group',
      children: [
        { label: '输入1', component: 'input', key: 'a', required: true },
        {
          label: '输入3-1',
          component: 'input',
          key: 'd',
          show: ({ data }) => (data.c as unknown as any).a === '123',
          required: true,
        },
        {
          label: '输入3-2',
          component: 'input',
          key: 'd',
          show: ({ data }) => (data.c as unknown as any).a !== '123',
          required: true,
        },
        {
          label: 'group2',
          type: 'group',
          key: 'g',
          children: [
            {
              label: '1',
              component: 'input',
              key: 'c',
            },
          ],
        },
      ],
    },
    {
      label: 'Array',
      type: 'list',
      key: 'd',
      children: [
        { label: '输入1', component: 'input', key: 'e', required: true },
        { label: '输入2', component: 'input', key: 'f', show: ({ data }: any) => data?.d[0]?.e === '123', required: true },
      ],
    },
  ],
  model: reactive({
    a: '',
    b: '',
    c: { a: '', b: '', d: '', g: { c: '' } },
    d: [{ e: '', f: '' }],
  }),
  // rules: {
  //   a: [{ required: true, message: 'a is required' }],
  // },
}
const handleReset = (): void => formRef.value!.form!.resetFields()
const handleClearValidate = (): void => formRef.value!.form?.clearValidate()
function handleSubmit() {
  return formRef
    .value!.validate()
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err)
    })
}
const list: Array<{ id: number, content: string }> = Array.from({ length: 100 })
  .fill(undefined)
  .map((_, index) => {
    const height = Math.random() * 40 + 20
    const randomContent = 'xxx <br> xx'.repeat(Math.ceil(Math.random() * 5))
    const content = `${index + 1} :${randomContent}xxx`
    return {
      content,
      style: { height: `${height}px`, lineHeight: `${height}px` },
      id: index,
    }
  })
</script>

<template>
  <div class="mx-auto min-w-160 text-left">
    <div class="mx-auto mb-4 w-300px">
      <div>shop</div>
      <div>
        1.DynamicForm
        <span class="btn" @click="() => $router.push('/form-design')">FormDesign</span>
      </div>
      <div>2.Virtual List</div>
      <div>3.首屏优化</div>
    </div>
    <div>
      <a-tabs>
        <a-tab-pane key="1" title="1.DynamicForm">
          <div>
            <DynamicForm ref="formRef" v-model:model="props.model" :schema="props.schema" />
            <div>
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
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" title="2.VirtualList">
          <div style="height: 200px">
            <VirtualList :data-source="list" :estimated-height="20">
              <template #item="{ item }">
                <div v-html="item.content" />
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
