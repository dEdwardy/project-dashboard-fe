<script setup lang="tsx">
import DynamicForm from '~/components/DynamicForm/index.vue'
import type { DynamicFormProps } from '~/components/DynamicForm/types'

defineOptions({
  name: 'ShopPage',
})
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
function handleSubmit() {
  return formRef.value!.form!.validate().then((err) => {
    if (!err)
      console.log(props.model)

    else
      console.error(err)
  })
}
</script>

<template>
  <div class="mx-auto w-960px">
    <div>shop</div>
    <div>1.DynamicForm </div>
    <div>2.Virtual List </div>
    <div>3.首屏优化 </div>
    <div>
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
    </div>
  </div>
</template>
