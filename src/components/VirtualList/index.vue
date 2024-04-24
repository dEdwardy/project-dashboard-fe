<script setup lang="ts" generic="T extends { id: number }">
// import { throttle } from 'lodash';
import type { CSSProperties } from 'vue'
import type { IPostions, IProps } from './types'

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
  scrollTop: 0,
  loading: props.loading,
  viewHeight: 0,
  listHeight: 0,
  startIndex: 0,
  maxCount: 0,
  preLen: 0,
})
const endIndex = computed(() =>
  Math.min(props.dataSource.length, state.startIndex + state.maxCount),
)
const renderList = computed(() =>
  props.dataSource.slice(state.startIndex, endIndex.value),
)
const offsetDistance = computed(() =>
  state.startIndex > 0 ? positions.value[state.startIndex - 1].bottom : 0,
)
const scrollStyle = computed(
  () =>
    ({
      height: `${state.listHeight - offsetDistance.value}px`,
      transform: `transform3d(0,${offsetDistance.value}px,0)`,
    }) as CSSProperties,
)

// watch([() => listRef.value, () => props.dataSource.length], () => {
//   console.log('watch1 触发')
//   props.dataSource.length && initPosition()
//   nextTick(() => {
//     props.dataSource.length && setPosition()
//   })
// })
watch(
  () => state.startIndex,
  () => {
    console.log('watch2 触发')
    nextTick(() => {
      setPosition()
    })
  },
)
const handleScroll = function () {
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value!
  state.scrollTop = scrollTop
  state.startIndex = binarySearch(positions.value, scrollTop)
  console.log('scroll触发 state.startIndex', state.startIndex)
  const bottom = scrollHeight - clientHeight - scrollTop
  if (bottom <= 20)
    !state.loading && emits('handleMore')
}
function init() {
  state.viewHeight = contentRef.value ? contentRef.value!.offsetHeight : 0
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1
  contentRef.value && contentRef.value.addEventListener('scroll', handleScroll)
}
function destory() {
  contentRef.value && contentRef.value.removeEventListener('scroll', handleScroll)
}
// 初始化：拿到数据源初始化 pos 数组
function initPosition() {
  const pos: IPostions[] = []
  const disLen = props.dataSource.length - state.preLen
  const currentLen = positions.value.length
  const preBottom = positions.value[currentLen - 1]
    ? positions.value[currentLen - 1].bottom
    : 0
  console.error('disLen', disLen)
  for (let i = 0; i < disLen; i++) {
    const item = props.dataSource[state.preLen + i]
    pos.push({
      index: item.id,
      height: props.estimatedHeight,
      top: preBottom
        ? preBottom + i * props.estimatedHeight
        : item.id * props.estimatedHeight,
      bottom: preBottom
        ? preBottom + (i + 1) * props.estimatedHeight
        : (item.id + 1) * props.estimatedHeight,
      dHeight: 0,
    })
  }
  console.error(pos)
  positions.value.push(...pos)
  state.preLen = props.dataSource.length
}
// 数据item渲染后 更新item真实高度
function setPosition() {
  const nodes = listRef.value!.children
  if (!nodes || nodes.length === 0)
    return
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
    if (item.dHeight !== 0) {
      startDHeight += item.dHeight
      item.dHeight = 0
    }
  }
  state.listHeight = positions.value[len - 1].bottom
}
// 二分查找
function binarySearch(list: IPostions[], value: number) {
  let left = 0
  let right = list.length - 1
  let templateIndex = -1
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2)
    const midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex + 1
    }
    else if (midValue < value) {
      left = midIndex + 1
    }
    else if (midValue > value) {
      if (templateIndex === -1 || templateIndex > midIndex)
        templateIndex = midIndex
      right = midIndex
    }
  }
  return templateIndex
}
onMounted(() => {
  initPosition()
  nextTick(() => {
    setPosition()
  })
})
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
      <div ref="listRef" class="virtual-list" :style="scrollStyle">
        <div
          v-for="item of renderList" :key="item.id" class="virtual-list-item box-border w-100%"
          :data-id="String(item.id)"
        >
          <slot name="item" :item />
        </div>
      </div>
    </div>
  </div>
</template>
