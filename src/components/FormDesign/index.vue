<script setup lang="tsx">
import MainSection from './MainSection.vue'
import MaterialSection from './MaterialSection.vue'
import PropsSection from './PropsSection.vue'
import type { FormConfig } from './utils'
import { formConfigSymbol } from './utils'

const formConfig = reactive<FormConfig>({
  formProps: {
    align: 'right',
    labelWidth: '100',
    size: 'small',
  },
  formItemProps: [],
})
provide(formConfigSymbol, formConfig)

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
