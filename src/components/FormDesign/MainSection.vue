<script setup lang="jsx">
import Draggable from 'vuedraggable'
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
import { componentMap, componentConfigMap } from './componentMap'
import { formConfigSymbol, setCurrentSymbol, setFormItemPropsSymbol } from './utils'
import { cloneDeep } from 'lodash';

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
    if (index === len - 1) {
      item.active = true
    } else {
      if (item.active) item.active = false
    }
  })
  current.value = len - 1
  // set added active
  setFormItemsProps(list.value)
  setCurrent(len - 1)
},)
function handleSelect (index) {
  const len = list.value.length
  const oldIndex = list.value.findIndex(item => item.active === true)
  list.value.splice(oldIndex, 1, { ...list.value[oldIndex], active: false })
  list.value.splice(index, 1, { ...list.value[index], active: true })
  current.value = index
  setCurrent(index)
}
function MainSectionApp () {
  const renderComponent = (type, componentProps) => {
    const { key, ...props } = componentProps
    return h(componentMap[type], {
      ...props,
      style: { width: '100%' },
      //readonly: true,
    })
  }
  return (
    <Form
      class="form px-4 py-3"
      model={formModel}
      disabled={true}
      labelPosition={formConfig?.formProps?.labelPosition}
      labelWidth={formConfig?.formProps?.labelWidth}
    >
      <Draggable
        class="dragArea list-group h-100% p-4"
        ghost-class="ghost"
        v-model={list.value}
        group="material"
        item-key="id"
      >
        {{
          item: ({ element, index }) => {
            const disabled = element.active !== true
            const activeClass = disabled
              ? 'border-1px border-transparent'
              : 'border-1px border-blue border-dashed'
            const type = element.key.split('-').shift()
            const defaultProps
              = element.props ?? componentConfigMap[type]?.model ?? {}
            const currentFormItem = formConfig.formItemProps[index] ?? {}
            const { id, props: currentProps } = currentFormItem
            let { key, ...addedProps } = currentProps
            return (
              <div class="list-group-item">
                <FormItem
                  label={element.name}
                  disabled={disabled}
                  class={[activeClass, 'hover:cursor-pointer']}
                  onClick={() => handleSelect(index)}
                >
                  {
                    renderComponent(type, {
                      key: id,
                      size: formConfig.formProps.size,
                      ...defaultProps,
                      ...addedProps
                    })
                  }
                </FormItem>
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

<style scoped>
.form {
  height: 100% !important;
}

.ghost {
  opacity: 0.5;
}
</style>
