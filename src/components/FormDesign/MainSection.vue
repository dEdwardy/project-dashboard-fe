<script setup lang="jsx">
import Draggable from 'vuedraggable'
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
import { componentConfigMap, componentMap } from './componentMap'
import { formConfigSymbol, setCurrentSymbol, setFormItemPropsSymbol } from './utils'

defineOptions({
  name: 'MainSection',
})
const list = ref([])
const formModel = reactive({})
const current = ref()
const formConfig = inject(formConfigSymbol)
const setFormItemsProps = inject(setFormItemPropsSymbol)
const setCurrent = inject(setCurrentSymbol)
watch(list, () => {
  console.log('list change')
  const len = list.value.length
  list.value.forEach((item, index) => {
    if (index === len - 1)
      item.active = true
    else
      if (item.active)
        item.active = false
  })
  current.value = len - 1
  // set added active
  setFormItemsProps(list.value)
  setCurrent(len - 1)
})
function handleSelect (index) {
  const len = list.value.length
  const oldIndex = list.value.findIndex(item => item.active === true)
  list.value.splice(oldIndex, 1, { ...list.value[oldIndex], active: false })
  list.value.splice(index, 1, { ...list.value[index], active: true })
  current.value = index
  setCurrent(index)
}
function handleRemove (index) {
  list.value.splice(index, 1)
  setFormItemsProps(list.value)
  if (list.value[index - 1]) setCurrent(index - 1)
  else setCurrent(-1)
}
function MainSectionApp () {
  const renderComponent = (type, componentProps) => {
    const { key, ...props } = componentProps
    return h(componentMap[type], {
      ...props,
      disabled: true,
      style: {
        cursor: 'initail !important'
      }
    })
    // const Component = componentMap[type]
    // return <Component { ...props }></Component>
  }
  return (
    <Form
      class="form px-4 py-3"
      model={formModel}
      disabled={false}
      labelPosition={formConfig?.formProps?.labelPosition}
      labelWidth={formConfig?.formProps?.labelWidth}
    >
      <Draggable
        class="dragArea list-group h-100% p-4"
        ghost-class="ghost"
        v-model={list.value}
        group="material"
        handle=".handle"
        item-key="id"
      >
        {{
          item: ({ element, index }) => {
            const disabled = element.active !== true
            const activeClass = disabled
              ? 'border-1px border-transparent outline-2px outline-transparent outline-solid'
              : 'border-1px border-blue outline-2px outline-blue  outline-solid'
            const type = element.key.split('-').shift()
            const defaultProps
              = element.componentProps ?? componentConfigMap[type]?.model ?? {}
            const currentFormItem = formConfig.formItemProps[index] ?? {}
            const { id, componentProps: currentProps } = currentFormItem
            const { key, ...addedProps } = currentProps
            return (
              <div class={[activeClass, 'hover:cursor-pointer', 'p-1', 'overflow-hidden']}>
                <FormItem
                  label={element.name}
                  disabled={disabled}
                  onClick={() => handleSelect(index)}
                >
                  {
                    renderComponent(type, {
                      key: id,
                      size: formConfig.formProps.size,
                      ...defaultProps,
                      ...addedProps,
                    })
                  }
                </FormItem>
                <div v-show={element.active} class="flex justify-end items-center gap-2">
                  <span class="handle i-carbon:move float-right  hover:bg-blue"
                    onClick={() => handleRemove(index)} />
                  <span class="i-carbon:trash-can float-right  hover:bg-red"
                    onClick={() => handleRemove(index)} />
                </div>
              </div>
            )
          },
        }}
      </Draggable>
    </Form>
  )
}
</script>

<template>
  <MainSectionApp />
</template>

<style lang="scss" scoped>
.form {
  height: 100% !important;

}

.ghost {
  opacity: 0.5;
}
</style>
<style lang="scss" >
.form {
  [disabled] {
    cursor: initial !important;
  }
}
</style>
