<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import localforage from 'localforage'
import { reactive, ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import VueJsonPretty from 'vue-json-pretty'
import { DynamicForm } from '~/components/DynamicForm'

const route = useRoute()
const router = useRouter()
const id = route.params.id as unknown as string
if (!id)
  router.replace('/form-design')

const visible = ref(false)
const formConfigs = reactive<any>({
  model: {},
  schema: [],
  time: '',
})
async function getFormConfig() {
  const jsonStr = await localforage.getItem(id)
  const { model, schema, time }: any = JSON.parse(jsonStr as unknown as string)
  formConfigs.schema = schema
  formConfigs.time = time
  Object.keys(model).forEach((key) => {
    formConfigs.model![key] = model[key]
  })
}
function getFormData() {
  getFormConfig().then(() => {
    visible.value = true
  })
}
getFormConfig()
</script>

<template>
  <div>
    <div>
      {{ id }} {{ formConfigs.time }}
      <ElButton @click="getFormData">
        获取表单数据
      </ElButton>
    </div>
    <div class="mx-0 my-auto w-800px">
      <DynamicForm
        v-if="formConfigs.time" v-model:model="formConfigs.model" class="w-100%"
        :schema="formConfigs.schema"
      />
    </div>
    <ElDialog v-model="visible">
      <VueJsonPretty class="h-400px overflow-auto" :data="formConfigs.model" />
    </ElDialog>
  </div>
</template>
