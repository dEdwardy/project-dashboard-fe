<script setup lang="ts">
import Draggable from 'vuedraggable'
defineOptions({
  name: 'FormTest'
})
const list = [
  {
    name: '1',
    id: '1',
  },
  {
    name: '2',
    id: '2'
  },
  {
    name: 'layout',
    id: '3',
    children:[ { name:'col',id:'4' }  ]
  },
]
const a = ref([])
watch(a, (v) => {
  console.log(v)
})
function handleAdded (e) {
  console.log(e)
}
function handleChange (...args) {
  console.log(args)
}
</script>

<template>
  <div class="flex">
    <div class="flex-1">
      <Draggable v-model="list" item-key="id" :sort="false" :group="{ name: 'cmp', pull: 'clone' }"
        class="border-1px border-solid h-100%">
        <template #item="{ element }">
          <div class="btn m-2 p-2">
            {{ element.name }}
          </div>
        </template>
      </Draggable>
    </div>
    <div class="flex-1">

      <Draggable v-model="a" item-key="id" :group="{ name: 'cmp' }" class="border-1px border-solid h-100%"
        @added="handleAdded" @change="handleChange">
        <template #item="{ element }">
          <div v-if="element?.children" class="p-4 bg-red m-2">
            layout
            <Draggable class="h-100% w-100%" :list="element.children" :group="{ name: 'cmp' }" item-key="id">
              <template #item="{ element }">
                <div class="p-4 bg-red m-2">
                  {{ element.name }}
                </div>
              </template>
            </Draggable>
          </div>
          <div v-else class="p-4 bg-red m-2 ">
            {{ element.name }}
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>
