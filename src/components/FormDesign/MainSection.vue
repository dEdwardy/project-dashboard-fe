<script setup lang="jsx">
import Draggable from 'vuedraggable'
import { Form, FormItem } from '@arco-design/web-vue'
import { componentMap } from './componentMap'
import { formConfigSymbol } from './utils'

defineOptions({
  name: 'MainSection',
})
const list = ref([])
const formModel = reactive({})
const current = ref()
const formConfig = inject(formConfigSymbol)
watch(
  () => formConfig.formItemProps,
  (v) => {
    list.value = formConfig.formItemProps
  },
  {
    deep: true,
  },
)
watch(list, () => {
  const len = list.value.length
  list.value.forEach((item, index) => {
    if (index === len - 1)
      item.active = true
    else item.active = false
  })
  formConfig.formItemProps = list.value
})
function handleSelect(index) {
  const len = list.value.length
  const oldIndex = list.value.findIndex(item => item.active === true)
  list.value.splice(oldIndex, 1, { ...list.value[oldIndex], active: false })
  list.value.splice(index, 1, { ...list.value[index], active: true })
}
function MainSectionApp() {
  const layout
    = formConfig?.formProps?.align === 'top' ? 'vertical' : 'horizontal'
  return (
    <Form
      class="form px-4 py-3"
      model={formModel}
      disabled={true}
      label-align={formConfig?.formProps?.align}
      layout={layout}
    >
      <Draggable
        class="dragArea list-group h-100% p-4"
        ghost-class="ghost"
        v-model={list.value}
        group="material"
        item-key="key"
      >
        {{
          item: ({ element, index }) => {
            const disabled = element.active !== true
            const activeClass = disabled
              ? 'border-1px border-transparent'
              : 'border-1px border-blue border-dashed'
            const componentProps
              = element.props ?? componentMap[element.key]?.props ?? {}
            return (
              <div class="list-group-item">
                <FormItem
                  label={element.name}
                  disabled={disabled}
                  class={[activeClass, 'hover:cursor-pointer']}
                  onClick={() => handleSelect(index)}
                >
                  {h(componentMap[element.key].component, {
                    ...componentProps,
                    style: { width: '100%' },
                  })}
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
