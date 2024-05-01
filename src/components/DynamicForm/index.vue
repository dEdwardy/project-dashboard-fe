<script lang="tsx" setup>
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
import { get, omit, set } from 'lodash'
import type { WatchStopHandle } from 'vue'
import type { IFormItem, IFormProps } from './types'
import DefaultLayout from './DefaultLayout.vue'
import { ComponentMaps } from './ComponentMaps'
import { handleDefaultSlot } from './utils'

defineOptions({
  name: 'DynamicForm',
})
const props = defineProps<IFormProps>()
const emits = defineEmits(['update:model', 'submit'])
const slots = useSlots()
const formData = ref<Record<string, any>>(props.model ?? {})
watch(formData, (v: unknown) => {
  emits('update:model', v)
}, {
  deep: true,
})
const schema = ref(props.schema)
const formRef = ref<InstanceType<typeof Form> | undefined>()
const dependenciesRef = ref<Set<string>>(new Set())
const stopWatch: WatchStopHandle[] = []
const hiddenKeys: Ref<Set<string>> = ref(new Set())
function handleValidate() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid, err) => {
      if (!valid) {
        reject(err)
      }
      else {
        const hiddenKeysArray = Array.from(hiddenKeys.value)
        const visibleData = omit(formData.value, hiddenKeysArray)
        resolve(visibleData)
      }
    })
  })
}
defineExpose({
  form: formRef,
  validate: handleValidate,
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
function renderSchema() {
  return schema.value.map((child: IFormItem) => renderSchemaItem(child))
}
function setDefaultValue({ defaultValue, key }: IFormItem) {
  if (defaultValue && key && get(formData.value, key) === undefined)
    set(formData.value, key, defaultValue)
}
function renderFormItem({ label, key = '', component, componentProps, defaultValue, show, rules, required, children, dependencies, max }: IFormItem) {
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
    if (key)
      hiddenKeys.value.add(key)
    return
  }
  if (key)
    hiddenKeys.value.delete(key)
  setDefaultValue({ key, defaultValue })
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
          default: () => handleDefaultSlot({ component, componentProps, children }),
        }}
      </component>
    </FormItem>
  )
}

function renderSchemaItem({ type, label, key, component, componentProps, defaultValue, show, rules, required, children, dependencies, max, layout }: IFormItem) {
  const Layout = layout || props.layout || DefaultLayout
  if (type === 'list') {
    if (!children) {
      console.warn('list must have children')
      return <></>
    }
    setDefaultValue({ key, defaultValue })
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
      // let temp = formData.value[key!]
      // set(formData.value,key!,[...temp,getListItemDefault()])
      formData.value[key!] = [...formData.value[key!], getListItemDefault()]
      console.error(formData.value[key!])
      // console.log(key,formData.value[key!], get(formData.value,key!))
    }
    const len = formData.value[key!].length
    const buttonContent = (max && max <= len) ? undefined : <button class="btn" onClick={handleAdd}>添加</button>
    const handleDelete = ({ key, index }: { key: string, index: number }): void => {
      const listData = get(formData.value, key) as unknown as any[]
      listData.splice(index, 1)
      // const newArr = listData.filter((_, idx) => idx !== index)
      // set(formData.value, key, newArr)
    }
    const renderDeleteButton = ({ key, index }: { key: string, index: number }) => {
      return <span class="cursor-pointer" onClick={() => handleDelete({ key, index })}>delete</span>
    }
    const components = ({ index }: { index: number }) => {
      // children key 拼接
      return h('div', null, [
        ...children.map(child => renderSchemaItem({ ...child, key: `${key}.${index}.${child.key}` })),
        renderDeleteButton({ key, index } as any),
      ])
    }
    return (
      <Layout>
        {{
          default: () => [formData.value[key!].map((_: any, index: number) => components({ index })), buttonContent],
          label: () => label,
        }}
      </Layout>
    )
  }
  else if (type === 'group') {
    if (!children) {
      console.warn('group must have children')
      return <></>
    }
    setDefaultValue({ key, defaultValue })
    // children key 拼接
    return (
      <Layout>
        {{
          default: () => children.map(
            child => renderSchemaItem({ ...child, key: key ? `${key}.${child.key}` : child.key }),
          ),
          label: () => label,
        }}
      </Layout>
    )
  }
  else {
    const node = computed(() => renderFormItem({ label, key, component, componentProps, children, show, rules, required, dependencies }))
    return node.value ? <Layout>{node.value}</Layout> : undefined
  }
}

function FormApp() {
  return (
    <Form
      labelWidth={props.labelWidth}
      labelPosition={props.labelPosition}
      ref={formRef}
      model={props.model}
      rules={props.rules}
      inline={props.inline}
      showMessage={props.showMessage}
    >
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
