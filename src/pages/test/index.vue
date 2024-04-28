<script setup lang="ts">
import { reactive } from 'vue'
import A from './A.vue'
import CustomSelect from '~/components/DynamicForm/CustomSelect.vue';

const b = {
  model: reactive({ a: true }),
  show: ({ data }: any) => data.a === true,
}
function change () {
  b.model.a = !b.model.a
}
enum Layout {
  BLOCK = 'block',
  INLINE = 'inline'
}
const layout = ref<Layout>(Layout.BLOCK)
const selectV = ref()
const layoutOptions = ['block', 'inline'].map(value => ({ label: value, value }))
const options = [1, 2, 3].map(value => ({ label: value, value }))
</script>

<template>
  <div>
    <CustomSelect v-model="layout" :options="layoutOptions" />
    <CustomRadio v-model="selectV" :options="options" :layout="layout" />
    <!-- <CustomRadio v-model="layout" :options="layoutOptions" /> -->
    <div>{{ selectV }}</div>
    <button @click="change">Change</button>
    <A :a="b"></A>
  </div>
</template>
