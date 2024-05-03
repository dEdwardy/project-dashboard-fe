<script setup lang="tsx">
import Draggable from 'vuedraggable'
import { ElForm as Form, ElFormItem as FormItem } from 'element-plus'
// import { get, set } from 'lodash'
// import { componentConfigMap } from './componentMap'
import { useFormConfigStore } from './store'
import { ComponentMaps } from '~/components/DynamicForm/ComponentMaps'
import { h } from 'vue'
import { FormItemProps } from './utils'

// TODO 数据结构变了 从list => tree 应为有layout 组件 会存在嵌套的可能
// TODO index貌似就没用了  就需要记录currentId 了 还要根据idz=查找节点 fk

const store = useFormConfigStore()
const formModel = reactive({})
const list = computed({
  get () {
    return store.itemsConifg
  },
  set (v: any[]) {
    store.setItemsConifg(v)
    // store.setCurrentIndex(list.value[v.length - 1]?.id)
    store.setCurrentId(v[v.length - 1]?.id)
  },
})
function handleSelect (e: PointerEvent, id: string) {
  e.stopPropagation()
  // store.setCurrentIndex(element)
  store.setCurrentId(id)
  // elment.active = true
}
function handleMove (evt: any) {
  const { from, to } = evt
  const isMoveInLocalList = (from.parentNode).contains(to)
  return isMoveInLocalList
}
function handleRemove (e: Event, el:any) {
  e.stopPropagation()
  // list.value.splice(index, 1)
  // store.setCurrentIndex(0)
  console.error('el', el)
}
// function handleEnd ({ newDraggableIndex }: { newDraggableIndex: number }) {
//   store.setCurrentIndex(newDraggableIndex)
// }
function handleCopy (e: Event, ele:any) {
  e.stopPropagation()
  console.error('copy', ele)
}
function renderActions ({ index, disabled, element }: any) {
  return <div v-show={!disabled} class="absolute bottom-0 right-0 flex items-end justify-end">
    <div
      class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
      onClick={handleMove}
    >
      <i class="handle i-carbon:move bg-white" />
    </div>
    <div class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
      onClick={(e) => handleCopy(e, element)}>
      <i class="i-carbon:copy bg-white"></i>
    </div>
    <div
      class="inline-flex bg-blue p-6px opacity-60 hover:opacity-100"
      onClick={(e) => handleRemove(e, element)}
    >
      <i class="i-carbon:trash-can bg-white" />
    </div>
  </div>

}
function renderComponent (item: any, index: number) {
  let { label, type, children, componentProps } = item
  const Component = ComponentMaps[type as keyof typeof ComponentMaps]
  const layoutCmpProps = ['col'].includes(item.type) ? { class: "min-h-50px" } : {}
  const slots = item.type === 'col' ? {
    default: () => renderDraggablelList(children)
  } : {
    default: () => children.length && renderDraggablelList(children)
  }
  let cmpNode = h(Component, {
    ...componentProps,
    ...layoutCmpProps,
    class: "w-100%"
  }, slots)
  const layoutFormItemProps = ['row', 'col'].includes(item.type) ? { label: undefined, labelWidth: '0' } : {}
  console.log('layoutFormItemProps', layoutFormItemProps)
  const combineProps = {
    label,
    ...componentProps,
    // ...layoutFormItemProps,
    class: "border-1px border-solid m-2 p-2 w-100% min-h-50px",
    onClick: (e: PointerEvent) => {
      console.error('item', item)
      handleSelect(e, item.id)
    }
  }
  // let Parent  = item.type === 'col' ? 'div' : FormItem
  const disabled = store.currentId !== item.id
  return <>
    {h(FormItem, combineProps, { default: () => cmpNode })}
    {renderActions({ index, disabled, element: item })}
  </>
}
type RenderConfig = {
  addClass?: string;
  min?: number;
  max?: number;
}
function renderDraggablelList (list: FormItemProps[], config?: RenderConfig) {
  return <Draggable
    list={list}
    //@ts-ignore
    group="material"
    handle=".handle"
    item-key="id"
    class={["dragArea undraggable list-group h-100% flex-1 min-h-50px", config?.addClass]} >
    {{
      item: ({ element, index }: any) => {
      const disabled = store.currentId !== element.id
        const activeClass = disabled
          ? 'border-2px border-transparent outline-2px outline-transparent'
          : 'border-2px border-blue outline-2px outline-blue  outline-solid'
        return (<div class={[activeClass, 'hover:cursor-pointer', 'p-1', 'overflow-hidden', 'relative']}>
          {renderComponent(element, index)}
          {/* {renderActions({ index, disabled, element })} */}
        </div>)
      }
    }}
  </Draggable>

}
function MainSectionV2 () {
  return <Form class="form px-4 py-3" model={formModel} disabled={true} labelPosition={store.configModel.labelPosition}
    labelWidth="store.configModel.labelWidth ?? 'auto'">
    {/* <Draggable
      v-model={list.value}
      //@ts-ignore
      group="material"
      handle=".handle"
      item-key="id"
      class="dragArea undraggable list-group h-100%" >
      {{
        item: ({ element, index }: any) => {
          const disabled = store.currentId !== element.id
          const activeClass = disabled
            ? 'border-2px border-transparent outline-2px outline-transparent'
            : 'border-2px border-blue outline-2px outline-blue  outline-solid'
          return (<div class={[activeClass, 'hover:cursor-pointer', 'p-1', 'overflow-hidden', 'relative']}>
            {renderComponent(element, index)}
            {renderActions({ index, disabled, element })}
          </div>)
        }
      }}
    </Draggable> */}
    {
      renderDraggablelList(list.value)
    }
  </Form >
}
</script>

<template>
  <MainSectionV2></MainSectionV2>
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
