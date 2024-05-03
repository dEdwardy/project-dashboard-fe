<script setup lang="tsx">
import Draggable from 'vuedraggable'
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
import { get, set } from 'lodash'
import { componentConfigMap } from './componentMap'
import { useFormConfigStore } from './store'
import { ComponentMaps } from '~/components/DynamicForm/ComponentMaps'

defineOptions({
  name: 'MainSection',
})
const store = useFormConfigStore()
const formModel = reactive({})
const list = computed({
  get () {
    return store.itemsConifg
  },
  set (v: any[]) {
    store.setItemsConifg(v)
    store.setCurrentIndex(v.length - 1)
  },
})

function handleSelect (index: number) {
  store.setCurrentIndex(index)
}
function handleMove (evt: any) {
  const { from, to } = evt
  const isMoveInLocalList = (from.parentNode).contains(to)
  return isMoveInLocalList
}
function handleRemove (index: number) {
  list.value.splice(index, 1)
  store.setCurrentIndex(0)
}
function handleEnd ({ newDraggableIndex }: { newDraggableIndex: number }) {
  store.setCurrentIndex(newDraggableIndex)
}
function handleAdd (arr: any) {
  console.error(arr)
}
function handleCopy (index: number) {
  console.error('copy', index)
}
function MainSectionApp () {
  const renderComponent = (type: keyof typeof ComponentMaps, componentProps: any, children?: any) => {
    const { key, ...props } = componentProps || {}
    const Component = ComponentMaps[type]
    const extractNullValue = Object.keys(props ?? {}).reduce((inital: any, current) => {
      const val = props?.[current]
      if (val !== undefined && val !== null && val !== '')
        inital[current] = val
      return inital
    }, {}) ?? {}

    const { defaultValue, ...othersProps } = extractNullValue
    if (defaultValue !== void 0)
      set(formModel, key, defaultValue)
    return (
      <Component
        {...othersProps}
        disabled={true}
        style="cursor: initail !important"
        modelValue={get(formModel, key)}
        onUpdate:modelValue={(v: any) => {
          set(formModel, key, v)
        }}
      >
      </Component>
    )
  }
  return (
    <Form
      class="form px-4 py-3"
      model={formModel}
      disabled={true}
      labelPosition={store.configModel.labelPosition}
      labelWidth={store.configModel.labelWidth ?? 'auto'}
    >
      {/* undraggable */}
      <Draggable
        class={["dragArea list-group h-100%"]}
        ghost-class="ghost"
        v-model={list.value}
        // @ts-ignore
        group="material"
        handle=".handle"
        item-key="id"
        move={handleMove}
        onEnd={handleEnd}
        onAdded={handleAdd}
      >
        {{
          item: ({ element, index }: { element: any, index: number }) => {
            const disabled = store.currentIndex !== index
            const activeClass = disabled
              ? 'border-2px border-transparent outline-2px outline-transparent'
              : 'border-2px border-blue outline-2px outline-blue  outline-solid'
            const type = element.type
            const defaultProps
              = element.componentProps ?? componentConfigMap[type]?.model ?? {}
            const currentFormItem = store.itemsConifg[index] ?? {}
            const { id, label: _l, key: _k, componentProps: currentProps } = currentFormItem
            const { label, key, ...addedProps } = currentProps ?? {}
            return (
              <div class={[activeClass, 'hover:cursor-pointer', 'p-1', 'overflow-hidden', 'relative']}>
                {
                  element.children ? renderComponent(type, {
                    key: id,
                    size: store.configModel.size,
                    ...defaultProps,
                    ...addedProps,
                  }, element.children) : <FormItem
                    label={element.componentProps.label}
                    labelWidth={store.configModel?.labelWidth ?? 'auto'}
                    // @ts-expect-error
                    onClick={() => handleSelect(index)}
                  >
                    {
                      renderComponent(type, {
                        key: id,
                        size: store.configModel.size,
                        ...defaultProps,
                        ...addedProps,
                      })
                    }
                  </FormItem>
                }
                <div v-show={!disabled} class="absolute bottom-0 right-0 flex items-end justify-end">
                  <div
                    class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
                    onClick={() => handleRemove(index)}
                  >
                    <i class="handle i-carbon:move bg-white" />
                  </div>
                  <div class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
                    onClick={() => handleCopy(index)}>
                    <i class="i-carbon:copy bg-white"></i>
                  </div>
                  <div
                    class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
                    onClick={() => handleRemove(index)}
                  >
                    <i class="i-carbon:trash-can bg-white" />
                  </div>
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

<style lang="scss">
.form {
  [disabled] {
    cursor: initial !important;
  }
}
</style>
