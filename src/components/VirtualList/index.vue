<script setup lang="ts" generic="T extends { id:number }">
import { throttle } from 'lodash';
import type { IPostions, IProps } from './types'
import { CSSProperties } from 'vue';

const props = withDefaults(defineProps<IProps<T>>(), {
  // viewHeight:300,
  estimatedHeight: 10,
})
const emits = defineEmits<{ handleMore: [] }>()
defineSlots<{ item: (props: { item: T }) => any }>()
const contentRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()
const positions = ref<IPostions[]>([])
const state = reactive({
  loading: props.loading,
  viewHeight: 0,
  listHeight: 0,
  startIndex: 0,
  maxCount: 0,
  preLen: 0,
})
const endIndex = computed(() => Math.min(props.dataSource.length, state.startIndex + state.maxCount))
const renderList = computed(() => props.dataSource.slice(state.startIndex, endIndex.value))
const offsetDistance = computed(() => state.startIndex > 0 ? positions.value[state.startIndex - 1].bottom : 0)
const scrollStyle = computed(() => ({
  height: (state.listHeight - offsetDistance.value) + 'px',
  transform: `transform3d(0,${offsetDistance}px,0)`
} as CSSProperties))

watch([() => listRef.value, () => props.dataSource.length], () => {
  console.log('initPosition && setPosition')
  props.dataSource.length && initPosition()
  nextTick(() => {
    props.dataSource.length && setPosition()
  })
})
watch(
  () => state.startIndex,
  () => {
    setPosition()
  })
const handleScroll = throttle(function () {
  console.log('scroll')
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value!
  console.log('scrollHeight',scrollHeight)
  console.log('clientHeight',clientHeight)
  state.startIndex = binarySearch(positions.value, scrollTop)
  console.log('state.startIndex',state.startIndex)
  const bottom = scrollHeight - clientHeight - scrollTop
  if (bottom <= 20)
    !state.loading && emits('handleMore')
}, 50)
const init = () => {
  state.viewHeight = contentRef.value ? contentRef.value!.offsetHeight : 0
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1
  console.error('init',state.viewHeight, state.maxCount)
  contentRef.value && contentRef.value.addEventListener('scroll', handleScroll)
}
const destory = () => {
  contentRef.value && contentRef.value.removeEventListener('scroll', handleScroll)
}
function initPosition () {
  const pos: IPostions[] = []
  const len = props.dataSource.length
  for (let i = 0; i < len; i++) {
    pos.push({
      index: i,
      height: props.estimatedHeight,
      top: i * props.estimatedHeight,
      bottom: (i + 1) * props.estimatedHeight,
      dHeight: 0,
    })
  }
  positions.value = [...positions.value, ...pos]
}
// 数据item渲染后 更新item真实高度
function setPosition () {
  const nodes = listRef.value!.children
  if (!nodes || nodes.length === 0)
    return
  console.log('computing')
  Array.from(nodes).forEach((node) => {
    const rect = node.getBoundingClientRect()
    const id = Number(node.getAttribute('data-id'))
    const item = positions.value[id]
    const dHeight = item.height - rect.height
    if (dHeight) {
      item.height = rect.height
      item.bottom = item.bottom - dHeight
      item.dHeight = dHeight
    }
  })
  const startId = Number(nodes[0].getAttribute('data-id'))
  let startDHeight = positions.value[startId].dHeight
  const len = positions.value.length
  positions.value[startId].dHeight = 0
  for (let i = startId + 1; i < len; i++) {
    const item = positions.value[i]
    item.top = positions.value[i - 1].bottom
    item.bottom = item.bottom - startDHeight
    if (item.dHeight) {
      startDHeight += item.dHeight
      item.dHeight = 0
    }
  }
  state.listHeight = positions.value[len - 1].bottom
}

// 二分查找
function binarySearch (list: IPostions[], value: number) {
  let left = 0
  let right = list.length - 1
  let templateIndex = -1
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2)
    const midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex
    }
    else if (midValue < value) {
      left = midIndex + 1
    }
    else if (midIndex > value) {
      if (templateIndex === -1 || templateIndex > midIndex)
        templateIndex = midIndex
      right = midIndex
    }
  }
  return templateIndex
}
onMounted(() => {
    init()
})
onUnmounted(() => {
  destory()
})
</script>

<template>
  <div class="virtual-list-container h-100% w-100%" :loading="state.loading">
    <div ref="contentRef" class="virtual-list-content h-100% w-100% overflow-auto">
      <div ref="listRef" class="virtual-list " :style="scrollStyle">
        <div v-for="item of renderList" :key="item.id" class="virtual-list-item box-border w-100%"
          :data-id="String(item.id)">
          <slot name="item" :item />
        </div>
      </div>
    </div>
  </div>
</template>
