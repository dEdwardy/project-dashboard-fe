<script setup lang="tsx">
import type { Component } from 'vue'
import {
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  TabPane,
  Tabs,
} from '@arco-design/web-vue'
import { formConfigSymbol } from './utils'
import { componentConfigMap } from './componentMap'

defineOptions({
  name: 'PropsSection',
})
const formConfig = inject(formConfigSymbol)
console.error('formConfig', formConfig)
const current = ref()
const currentIndex = ref(-1)
const model = reactive({
  formProps: {
    align: 'right',
    labelWidth: '100',
    size: 'small',
  },
  formItemProps: {
    id: undefined,
  },
})
watch(
  () => formConfig!.formItemProps,
  () => {
    currentIndex.value = formConfig!.formItemProps!.findIndex(
      i => i.active === true,
    )
    const res: any = formConfig!.formItemProps![currentIndex.value]
    if (!model.formItemProps.id && res)
      model.formItemProps = { id: res.id, ...res.props }
    current.value = res
  },
  {
    deep: true,
  },
)
watch(current, (v: any) => {
  const { id, props } = v
  model.formItemProps = { id, ...props }
})
// 修改当前项目
watch(
  () => model.formItemProps,
  (v: any) => {
    console.log('修改当前项 配置')
    const { id, ...props } = v
    formConfig!.formItemProps![currentIndex.value].props = props
  },
  {
    deep: true,
  },
)
// 修改form配置
watch(
  () => model.formProps,
  (v: any) => {
    formConfig!.formProps = v
  },
)

const schema = computed(() => {
  if (!current.value)
    return []
  const map: any
    = componentConfigMap[current.value!.key as keyof typeof componentConfigMap]
  return Object.entries(map.props ?? {}).map(([k, v]) => ({
    field: k,
    component: markRaw(v as Component),
  }))
})
function PropsSectionApp() {
  const FormItemConfigs: Component = () =>
    schema.value.map(
      ({
        component: FormItemComponent,
        field,
      }: {
        component: any
        field: string
      }) => {
        return (
          <FormItem field={field} label={field}>
            <FormItemComponent
              v-model={
                model.formItemProps[field as keyof typeof model.formItemProps]
              }
            >
            </FormItemComponent>
          </FormItem>
        )
      },
    )
  return (
    <div>
      <Form
        class="p-3"
        model={model}
        labelColProps={{ col: 6, offfset: 0 }}
        wrapperColProps={{ col: 18, offset: 0 }}
        layout="vertical"
      >
        <Tabs default-active-key="1" lazyLoad>
          <TabPane title="字段属性" key="0">
            {model.formItemProps.id
              ? (
                <>
                  <FormItem label="ID" field="id">
                    <Input v-model={model.formItemProps.id} />
                  </FormItem>
                  <FormItemConfigs></FormItemConfigs>
                </>
                )
              : undefined}
          </TabPane>
          <TabPane title="表单属性" key="1">
            <FormItem label="标签对齐方式" field="formProps.align">
              <RadioGroup type="button" v-model={model.formProps.align}>
                <Radio value="left">左对齐</Radio>
                <Radio value="right">右对齐</Radio>
                <Radio value="top">顶部对齐</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="表单标签宽度" field="formProps.labelWidth">
              <Input v-model={model.formProps.labelWidth} />
            </FormItem>
            <FormItem label="组件尺寸" field="formProps.size">
              <RadioGroup type="button" v-model={model.formProps.size}>
                <Radio value="large">large</Radio>
                <Radio value="medium">medium</Radio>
                <Radio value="small">small</Radio>
                <Radio value="mini">mini</Radio>
              </RadioGroup>
            </FormItem>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  )
}
</script>

<template>
  <PropsSectionApp />
</template>
