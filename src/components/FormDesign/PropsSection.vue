<script setup lang="tsx">
import {
  ElTabPane as TabPane,
  ElTabs as Tabs,
} from 'element-plus'
import { cloneDeep } from 'lodash'
import type { IFormItem } from '../DynamicForm/types'
import type { FormConfig } from './utils'
import { formConfigSymbol, generateId, setFormItemPropsSymbol, setFormPropsSymbol } from './utils'
import { componentConfigMap, formConfigMap } from './componentMap'
import DynamicForm from '~/components/DynamicForm/index.vue'

defineOptions({
  name: 'PropsSection',
})
const formConfig = inject(formConfigSymbol)
const setFormProps = inject(setFormPropsSymbol)
const setFormItemProps = inject(setFormItemPropsSymbol)
const current = computed(() => formConfig?.formItemProps?.find(item => item.active === true))
const currentIndex = computed(() => formConfig?.formItemProps?.findIndex(item => item.active === true))
// const model = reactive({
//   formProps: {
//     align: 'right',
//     labelWidth: 100,
//     size: 'small',
//   },
//   formItemProps: {
//     id: undefined,
//   },
// })
// watch(
//   () => formConfig!.formItemProps,
//   () => {
//     currentIndex.value = formConfig!.formItemProps!.findIndex(
//       i => i.active === true,
//     )
//     const res: any = formConfig!.formItemProps![currentIndex.value]
//     if (!model.formItemProps.id && res)
//       model.formItemProps = { id: res.id, ...res.props }
//     current.value = res
//   },
//   {
//     deep: true,
//   },
// )
// watch(current, (v: any) => {
//   console.error('current', v)
//   const { id, props } = v
//   model.formItemProps = { id, ...props }
// },{
//   deep:true
// })
// 修改当前项目 formItemConfig
// watch(
//   () => model.formItemProps,
//   (v: any) => {
//     nextTick(() => {
//       console.log('修改当前项 配置')
//       const { id, ...props } = v
//       formConfig!.formItemProps![currentIndex.value!].props = props
//     })
//   },
//   {
//     deep: true,
//   },
// )
// 修改formConfig
// watch(
//   () => model.formProps,
//   (v: any) => {
//     formConfig!.formProps = v
//   },
//   {
//     deep: true
//   }
// )
const local = reactive<Partial<FormConfig>>({
  formProps: undefined,
  formItemProps: [],
})
local.formProps = cloneDeep(formConfig?.formProps)
watch(currentIndex, () => {
  local.formItemProps = cloneDeep(formConfig?.formItemProps)
})
const schema = computed(() => {
  if (!current.value)
    return []
  const type = current.value!.key.split('-').shift()
  const formItems: any
    = componentConfigMap[type as keyof typeof componentConfigMap].schema
  console.log(formItems)
  const id = generateId()
  const key = {
    label: 'Key',
    key: 'key',
    id,
    component: 'input',
    props: {
      id,
    },
  }
  return [key, ...formItems]
})
watch(() => local.formProps, (v) => {
  setFormProps!(v)
}, {
  deep: true,
})
watch(() => local.formItemProps, (v) => {
  setFormItemProps!(v)
}, {
  deep: true
})
function PropsSectionApp () {
  return (
    <div>
      <Tabs default-active-key="1">
        <TabPane label="字段属性" key="0" lazy>
          {current.value?.id
            ? <DynamicForm key={current.value?.id} model={local!.formItemProps![currentIndex.value!]?.props} schema={schema.value as IFormItem[]}></DynamicForm>
            : undefined}
        </TabPane>
        <TabPane label="表单属性" key="1" lazy>
          <DynamicForm model={local!.formProps} schema={formConfigMap.schema}></DynamicForm>
        </TabPane>
      </Tabs>
    </div>
  )
}
</script>

<template>
  <PropsSectionApp />
</template>
