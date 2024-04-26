<script lang="tsx" setup>
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
import { get, omit, set } from 'lodash'
import type { IFormItem, IFormProps } from './types'
import DefaultLayout from './DefaultLayout.vue'
import { ComponentMaps } from './ComponentMaps'
import { WatchStopHandle } from 'vue'

defineOptions({
  name: 'DynamicForm',
})
const props = defineProps<IFormProps>()
const emits = defineEmits(['update:model', 'submit'])
const slots = useSlots()
const formData = ref<Record<string, any>>(props.model ?? {})
watch(formData, (v: unknown) => {
  emits('update:model', v)
})
const schema = shallowRef(props.schema)
const formRef = ref<InstanceType<typeof Form> | undefined>()
const dependenciesRef = ref<Set<string>>(new Set())
let stopWatch: WatchStopHandle[] = []
const hiddenKeys: Ref<Set<string>> = ref(new Set())
const handleValidate = () => new Promise((resolve, reject) => {
  formRef.value?.validate((valid,err) => {
    if (!valid) {
      reject(err)
    } else {
      const hiddenKeysArray = Array.from(hiddenKeys.value)
      const visibleData = omit(formData.value, hiddenKeysArray)
      resolve(visibleData)
    }
  })
})
defineExpose({
  form: formRef,
  validate: handleValidate
})
// onMounted(() => {
//   const keys: [string[], string][] = Array.from(dependenciesRef.value.keys()).map(k => JSON.parse(k))
//   keys.map(([dep, k], index) => {
//     const watchSource = dep.map(depK => () => get(formData.value, depK))
//     stopWatch[index] = watch(watchSource, () => {
//       // TODO dependencies change component should reset
//       // TODO key format like placeholder:string|string[] or same key with 互斥条件的渲染
//       if(!hiddenKeys.value.has(k))return
//       console.error('source改变了',k +'也得变了')
//       set(formData.value, k, undefined)
//     })
//   })
// })
onUnmounted(() => {
  stopWatch.length && stopWatch.forEach(stop => stop())
})
function renderSchema () {
  return schema.value.map((child: IFormItem) => renderSchemaItem(child))
}
function renderFormItem ({ label, key ='', component, componentProps, show, rules, required, children, dependencies, max }: IFormItem) {
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
  const value = get(formData.value, key!)
  if (dependencies && dependencies.length) {
    const depStr: string = JSON.stringify([dependencies, key])
    dependenciesRef.value.add(depStr)
  }

  const realRequried = typeof required === 'function' ? required({ data, value }) : required
  let realRules = typeof rules === 'function' ? rules({ data, value }) : rules
  if (realRequried) {
    const requiredRule = [{ required: true, message: `${label}必填` }]
    realRules = (realRules && realRules.length > 0) ? [...requiredRule, ...realRules] : requiredRule
  }
  const isShow = typeof show === 'function' ? show({ data, value }) : show
  if (isShow === false) {
    if (key) hiddenKeys.value.add(key)
    return
  }
  if (key) hiddenKeys.value.delete(key)
  return (
    <FormItem label={label} prop={key} required={realRequried} rules={realRules}>
      <component
        modelValue={get(formData.value, key)}
        onUpdate:modelValue={(v: any): void => {
          set(formData.value, key, v)
        }}
        size={props.size}
        {
        ...componentProps
        }
      >
        {{
          default: () => children?.map(item => renderChildNodes(item))
        }}
      </component>
    </FormItem>
  )
}
function renderChildNodes ({ component, componentProps }: Pick<IFormItem, 'component' | 'componentProps'>) {
  const Cmp:any = typeof component === 'string' ? ComponentMaps[component] : component
  return <Cmp {...componentProps}></Cmp>
}
function renderSchemaItem ({ type, label, key, component, componentProps, show, rules, required, children, dependencies, max }: IFormItem) {
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
      return children.map(child => renderSchemaItem({ ...child, key: `${key}.${index}.${child.key}` }))
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
    return (
      <DefaultLayout>
        {{
          default: () => children.map(
            child => renderSchemaItem({ ...child, key: key ? `${key}.${child.key}` : child.key })
          ),
          label: () => label,
        }}
      </DefaultLayout>
    )
  }
  else {
    const node = computed(() => renderFormItem({ label, key, component, componentProps, children, show, rules, required, dependencies }))
    return node.value ? <DefaultLayout>{node.value}</DefaultLayout> : undefined
  }
}

function FormApp () {
  return (
    <Form ref={formRef} model={props.model} rules={props.rules}>
      {
        renderSchema()
      }
      {slots.default?.()}
    </Form>
  )
}
</script>

<template>
  <FormApp />
</template>
