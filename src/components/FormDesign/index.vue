<script setup lang="tsx">
import { ElButton, ElDialog } from 'element-plus'
import MainSection from './MainSection.vue'
import MaterialSection from './MaterialSection.vue'
import PropsSection from './PropsSection.vue'
import type { FormConfig } from './utils'
import { formConfigSymbol, setCurrentSymbol, setFormItemPropsSymbol, setFormPropsSymbol } from './utils'
import { cloneDeep } from 'lodash'
import DynamicForm from '~/components/DynamicForm/index.vue'
import { js } from 'js-beautify'

const showDialog = ref(false)
const showeExport = ref(false)
const configStr = ref('')
const formConfig = reactive<FormConfig>({
  formProps: {
    labelPosition: 'right',
    labelWidth: 100,
    size: 'small',
  },
  formItemProps: [],
})
const previewData = {
  model: ref(),
  schema: shallowRef<any>([])
}
const previewModelStr = computed(
  () => js(JSON.stringify(previewData.model.value, (_, v) => {
    if (v === undefined) return String(v)
    return v
  }), { jslint_happy: true, })
)
function setFormProps (data: any) {
  formConfig.formProps = data
}
function setFormItemProps (data: any) {
  formConfig.formItemProps = data
}
function setCurrent (idx: number) {
  formConfig.formItemProps?.forEach((item, index) => {
    if (index === idx && !item.active)
      item.active = true
    if (index !== idx && item.active)
      item.active = false
  })
}
provide(formConfigSymbol, formConfig)
provide(setFormPropsSymbol, setFormProps)
provide(setFormItemPropsSymbol, setFormItemProps)
provide(setCurrentSymbol, setCurrent)
function handlePreview () {
  showDialog.value = true
  const { model, schema } = getFormConfigs()
  previewData.schema.value = schema
  previewData.model.value = model
}
function handleExport () {
  showeExport.value = true
  const { model, schema } = getFormConfigs()
  configStr.value = js(JSON.stringify({
    model: model,
    schema
  }, (_, v) => {
    if (v === undefined) return String(v)
    return v
  }), {
    jslint_happy: true
  })
}
function getFormConfigs () {
  const schema = formConfig.formItemProps?.map(({ name, active, id, ...others }) => ({ ...others }))
  const models = formConfig.formItemProps?.reduce((initial: any, current: any) => {
    initial[`${current.key}`] = current.componentProps.defaultValue
    return initial
  }, {})
  const model = cloneDeep(models)
  return {
    model, schema
  }
}
function FormDesignApp () {
  return (
    <div class="flex flex-col">
      <h3>Form Design</h3>
      <div>
        <ElButton onClick={handlePreview}>预览</ElButton>
        <ElButton onClick={handleExport}>导出</ElButton>
      </div>
      <div class="grid grid-cols-sp my-4 flex-1 gap-4">
        <div class="border-1px border-gray">
          <MaterialSection></MaterialSection>
        </div>
        <div class="h-100% border-1px border-gray">
          <MainSection></MainSection>
        </div>
        <div class="border-1px border-gray">
          <PropsSection></PropsSection>
        </div>
      </div>
      <ElDialog v-model={showDialog.value} destroy-on-close>
        <div>
          <DynamicForm model={previewData.model.value} schema={previewData.schema.value} />
          <highlightjs
            style={'text-align:left'}
            language="js"
            code={previewModelStr.value}
          />
        </div>
      </ElDialog>
      <ElDialog v-model={showeExport.value}>
        <highlightjs
          style={'text-align:left'}
          language="js"
          code={configStr.value}
        />
      </ElDialog>
    </div>
  )
}
</script>

<template>
  <FormDesignApp />
</template>
