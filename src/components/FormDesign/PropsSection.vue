<script setup lang="tsx">
import {
  ElTabPane as TabPane,
  ElTabs as Tabs,
} from 'element-plus'
import { componentConfigMap } from './componentMap'
import CustomLayout from './CustomLayout.vue'
import { useFormConfigStore } from './store'
import DynamicForm from '~/components/DynamicForm/index.vue'

defineOptions({
  name: 'PropsSection',
})
const currentTab = ref('1')
const formStore = useFormConfigStore()
const formItemModels = computed({
  get() {
    const res = formStore.itemsConifg[formStore.currentIndex]?.componentProps ?? {}
    return res
  },
  set(v) {
    formStore.setCurrentProps(v)
  },
})
const formConfigModels = computed({
  get() {
    // return formConfig?.formProps ?? {}
    return formStore.configModel ?? {}
  },
  set(v) {
    // setFormProps!(v)
    formStore.setConfigModel(v)
  },
})
const defaultItems = [
  {
    label: 'Key',
    key: 'key',
    component: 'input',
  },
  {
    label: 'label',
    key: 'label',
    component: 'input',
  },
]
// 字段配置
const formItemConfigSchema = computed(() => {
  if (!formStore.itemsConifg[formStore.currentIndex])
    return []
  const { schema } = componentConfigMap[formStore.itemsConifg[formStore.currentIndex].type]
  return [...defaultItems, ...schema]
})
function PropsSectionApp() {
  return (
  // v-model:model={formItemModels.value}
    <div class="props-section">
      <Tabs v-model={currentTab.value} type="card">
        <TabPane label="字段属性" class="h-500px overflow-auto" name="0">
          { formStore.currentConfig.id
            ? (
              <DynamicForm
                labelPosition="top"
                label-width={(currentTab.value && formStore.currentConfig.id) === '0' ? 'auto' : '100px'}
                key={formStore.currentConfig.id}
                model={formItemModels.value}
                v-model:model={formItemModels.value}
                schema={formItemConfigSchema.value as any}
                layout={CustomLayout}
                showMessage={false}
              />
              )
            : <div class="mt-120px text-16px text-#a8abb2">请添加字段</div>}
        </TabPane>
        <TabPane label="表单属性" class="h-500px overflow-auto" name="1" lazy>
          <DynamicForm
            labelPosition="top"
            label-width={currentTab.value === '1' ? 'auto' : '100px'}
            model={formConfigModels.value}
            v-model:model={formConfigModels.value}
            schema={formStore.config as any}
            layout={CustomLayout}
            showMessage={false}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}
</script>

<template>
  <PropsSectionApp />
</template>

<style lang="scss">
.props-section {
  .el-tabs__nav.is-top {
    display: flex !important;
    width: 100%;
  }

  .el-tabs__item {
    flex: 1 !important;
  }

  .el-form-item {
    margin-bottom: unset;
  }
}
</style>
