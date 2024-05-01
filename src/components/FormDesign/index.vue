<script setup lang="tsx">
import VueJsonPretty from 'vue-json-pretty'
import { ElButton, ElDialog } from 'element-plus'
import { cloneDeep } from 'lodash'
import localforage from 'localforage'
import { useDateFormat } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'
import type { IFormItem } from '../DynamicForm/types'
import type { FormConfig } from './utils'
import PropsSection from './PropsSection.vue'
import MaterialSection from './MaterialSection.vue'
import MainSection from './MainSection.vue'
import { useFormConfigStore } from './store'
import DynamicForm from '~/components/DynamicForm/index.vue'

const showDialog = ref(false)
const showeExport = ref(false)
const configData = reactive<{ model: Record<string, unknown>, schema: IFormItem[] }>({
  model: {},
  schema: [],
})
// TODO 带重构 使用Pinia 代替
const formConfig: FormConfig = reactive<FormConfig>({
  formProps: {
    labelPosition: 'right',
    labelWidth: undefined,
    size: 'small',
  },
  formItemProps: [],
  formItemModel: {},
})
const previewData = {
  model: ref(),
  schema: shallowRef<any>([]),
}

const router = useRouter()
const formStore = useFormConfigStore()
async function handlePreview() {
  const { model, schema } = getFormConfigs()
  const time = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
  const id = nanoid()
  console.log({ id, data: { model, schema, time } })
  const data = schema?.map(i => ({ ...i, componentProps: i.componentProps }))
  await localforage.setItem(id, JSON.stringify({ model, schema: data, time: time.value }))
  router.push(`/form-design/${id}`)
}
function handleExport() {
  showeExport.value = true
  const { model, schema } = getFormConfigs()
  configData.model = model
  configData.schema = schema as unknown as IFormItem[]
}
function getFormConfigs() {
  const schema = formStore.itemsConifg.map(({ label: _l, key: _k, id: _id, type, componentProps, component }: any) => {
    const { label, key, id: _i, ...props } = componentProps
    return { label, key, component, componentProps: props }
  })
  const models = schema.reduce((initial: any, current: any) => {
    initial[`${current.key}`] = formConfig.formItemModel?.[current.id] ?? current.componentProps.defaultValue
    return initial
  }, {})
  const model = cloneDeep(models)
  return {
    model,
    schema,
  }
}
function FormDesignApp() {
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
        <DynamicForm model={previewData.model.value} schema={previewData.schema.value} />
        <VueJsonPretty class="p-4" data={previewData.model.value} />
      </ElDialog>
      <ElDialog v-model={showeExport.value}>
        <VueJsonPretty class="h-400px overflow-auto p-4" data={configData} />
      </ElDialog>
    </div>
  )
}
</script>

<template>
  <FormDesignApp />
</template>
