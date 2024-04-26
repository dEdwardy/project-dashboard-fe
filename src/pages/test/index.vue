<script setup lang="tsx">
import { reactive } from 'vue';
import A from './A.vue'
const b = {
  model: reactive({ a: true }),
  show: ({ data }) => data.a === true
}
const change = () => {
  b.model.a = !b.model.a
}
const LocalApp = () => {

  return <div>
    <button onClick={change}>Change</button>
    <A a={b}></A>
  </div>
}
</script>

<template>
  <LocalApp />
</template>
