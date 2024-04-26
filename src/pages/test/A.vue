<script setup lang="tsx">
import { ref } from 'vue';
// {
//   model:{ a:true },
//   show:({ data }) => data.a === true
// }
interface IPops {
  a:{
    model:any;
    show:any;
  }
}
const props = defineProps<IPops>()
const formData = ref(props.a.model ?? {})
const data = formData.value
const renderNodes = () =>{
 const res =  props.a.show({ data })
 if(res)return <div>show</div>
 else return <div>hide</div>
}
const TestComponent= () => {
const nodes = renderNodes()
  return nodes
}
</script>

<template>
  <TestComponent></TestComponent>
</template>
