<script lang="tsx" setup>
import { Form, FormItem } from '@arco-design/web-vue'
import { get, set } from 'lodash'
import type { IFormItem, IFormProps } from './types'
import DefaultLayout from './DefaultLayout.vue'
import { ComponentMaps } from './ComponentMaps'

defineOptions({
  name: 'DynamicForm',
})
const props = defineProps<IFormProps>()
const emits = defineEmits(['update:model', 'submit'])
const slots = useSlots()
const formData = ref(props.model)
watch(formData, (v: unknown) => {
  emits('update:model', v)
})
const schema = shallowRef(props.schema)
const formRef = ref<InstanceType<typeof Form> | undefined>()
defineExpose({
  form: formRef,
})
function renderForm() {
  return schema.value.map(({ type, label, key, component, children, show, rules, required, max }: IFormItem) => {
    if (type === 'list') {
      if (!children) {
        console.warn('list must have children')
        return <></>
      }
      const listValue = props.model[key as keyof typeof props.model]
      if (!Array.isArray(listValue)) {
        console.warn('list initial value must be array')
        return <></>
      }
      const getListItemDefault = () => children.reduce((pre: any, cur: any) => {
        pre[cur.key] = undefined
        return pre
      }, {})
      const handleAdd = (e: MouseEvent) => {
        e.preventDefault()
        formData.value[key].push(getListItemDefault())
      }
      const len = formData.value[key].length
      const buttonContent = (max && max <= len) ? undefined : <button onClick={handleAdd}>添加</button>
      const components = ({ index }: { index: number }) => {
        // children key 拼接
        return children.map(child => renderFormItem({ ...child, key: `${key}.${index}.${child.key}` }))
      }

      return (
        <DefaultLayout>
          {{
            default: () => [formData.value[key].map((_: any, index: number) => components({ index })), buttonContent],
            label: () => label,
          }}
        </DefaultLayout>
      )
    }
    else if (type === 'group') {
      if (!children) {
        console.warn('group must have children')
        return <></>
      }
      // children key 拼接
      const compoennts = children.map(child => renderFormItem({ ...child, key: key ? `${key}.${child.key}` : child.key }))
      return (
        <DefaultLayout>
          {{
            default: () => compoennts,
            label: () => label,
          }}
        </DefaultLayout>
      )
    }
    else {
      const node = renderFormItem({ label, key, component, show, rules, required })
      return node ? <DefaultLayout>{node}</DefaultLayout> : undefined
    }
  })
}
function renderFormItem({ label, key, component, show, rules, required }: IFormItem) {
  if (!component) {
    console.warn('基础组件需要 component')
    return
  }
  if (typeof component === 'string')
    component = ComponentMaps[component]
  if (!component) {
    console.warn(`ComponentMaps 无对应的 ${component} Component,请现在DynamicForm/ComponentMaps下配置对应的组件`)
    return
  }
  const data = formData.value
  const value = get(formData.value, key)
  const realRequried = typeof required === 'function' ? required({ data, value }) : required
  let realRules = typeof rules === 'function' ? rules({ data, value }) : rules
  if (realRequried) {
    const requiredRule = [{ required: true, message: `${label}必填` }]
    realRules = (realRules && realRules.length > 0) ? [...requiredRule, ...realRules] : requiredRule
  }
  const isShow = typeof show === 'function' ? show({ data, value }) : show
  if (isShow === false)
    return

  return (
    <div>
      <FormItem label={label} field={key} required={realRequried} rules={realRules}>
        <component
          modelValue={get(formData.value, key)}
          onUpdate:modelValue={(v: any): void => {
            set(formData.value, key, v)
          }}
        >
        </component>
      </FormItem>
    </div>
  )
}
function FormApp() {
  return (
    <Form ref={formRef} model={props.model} rules={props.rules}>
      {
        renderForm()
      }
      {slots.default?.()}
    </Form>
  )
}
</script>

<template>
  <FormApp />
</template>
