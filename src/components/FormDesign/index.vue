<script setup lang="tsx">
import MainSection from './MainSection.vue'
import MaterialSection from './MaterialSection.vue'
import PropsSection from './PropsSection.vue'
import type { FormConfig } from './utils'
import { formConfigSymbol, setCurrentSymbol, setFormItemPropsSymbol, setFormPropsSymbol } from './utils'

const formConfig = reactive<FormConfig>({
  formProps: {
    labelPosition: 'right',
    labelWidth: 100,
    size: 'small',
  },
  formItemProps: [],
})
function setFormProps(data: any) {
  formConfig.formProps = data
}
function setFormItemProps(data: any) {
  formConfig.formItemProps = data
}
function setCurrent(idx: number) {
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

function FormDesignApp() {
  return (
    <div class="flex flex-col">
      <h3>Form Design</h3>
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
    </div>
  )
}
</script>

<template>
  <FormDesignApp />
</template>
