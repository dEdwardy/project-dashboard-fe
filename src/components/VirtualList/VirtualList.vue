<script setup lang="ts" generic="T extends { id: number }">
import type { IPostions, IProps } from './types'

const props = defineProps<IProps<T>>()
const state = reactive({
  startIndex: 0,
  maxCount: 0,
  viewHeight: 0,
  listHeight: 0,
  scrollTop: 0,
})
const endIndex = computed(() =>
  Math.min(props.dataSource.length, state.startIndex + state.maxCount),
)
const contentRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()
const positions = ref<IPostions[]>([])
const renderList = computed(() =>
  props.dataSource.slice(state.startIndex, endIndex.value),
)

const offsetDistance = computed(() =>
  state.startIndex > 0 ? positions.value[state.startIndex - 1].bottom : 0,
)
const scrollStyle = computed(() => {
  return {
    height: `${state.listHeight - offsetDistance.value}px`,
    transform: `translate3d(0,${offsetDistance.value}px,0)`,
  }
})
watch(
  () => state.startIndex,
  () => {
    setPostions()
  },
)
function initPositions() {
  const data = props.dataSource
  const len = data.length
  const estimatedHeight = props.estimatedHeight!
  for (let i = 0; i < len; i++) {
    const index = data[i].id
    const posInfo = {
      index,
      height: estimatedHeight,
      top: index * estimatedHeight,
      bottom: (index + 1) * estimatedHeight,
      dHeight: 0,
      over: false,
    }
    positions.value.push(posInfo)
  }
}
// !
function setPostions() {
  const { children } = listRef.value!
  Array.from(children).forEach((child) => {
    const rect = child.getBoundingClientRect()
    const id = Number(child.id)
    const positionInfo = positions.value[id]
    const dHeight = positionInfo.height - rect.height
    if (dHeight !== 0) {
      // 更新postions
      positionInfo.height = rect.height
      positionInfo.bottom = positionInfo.bottom - dHeight
      positionInfo.dHeight = dHeight
    }
  })

  const startId = +children[0].id
  const len = positions.value.length
  let startHeight = positions.value[startId].dHeight
  positions.value[startId].dHeight = 0
  for (let i = startId + 1; i < len; i++) {
    const item = positions.value[i]
    item.top = positions.value[i - 1].bottom
    item.bottom = item.bottom - startHeight
    if (item.dHeight !== 0) {
      startHeight += item.dHeight
      item.dHeight = 0
    }
  }

  state.listHeight = positions.value[len - 1].bottom
}
function init() {
  state.viewHeight = contentRef.value ? contentRef.value!.offsetHeight : 0
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight!) + 1
  contentRef.value && contentRef.value.addEventListener('scroll', handleScroll)
}
function destory() {
  contentRef.value && contentRef.value.removeEventListener('scroll', handleScroll)
}
const handleScroll = useRafThrottle(() => {
  console.log('scroll,startIndex', state.startIndex)
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value!
  state.scrollTop = scrollTop
  state.startIndex = binarySearch(positions.value, scrollTop)
  const bottom = scrollHeight - clientHeight - scrollTop
  if (bottom <= 20)
    console.log('触底加载')
})
// !
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
  init()
  initPositions()
  nextTick(() => {
    setPostions()
  })
})
onUnmounted(() => {
  destory()
})
</script>

<template>
  <div class="virtual-list-container h-100% w-100%">
    <div ref="contentRef" class="virtual-list-content h-100% w-100% overflow-auto">
      <div ref="listRef" class="virtual-list" :style="scrollStyle">
        <div
          v-for="item of renderList" :id="String(item.id)" :key="item.id"
          class="virtual-list-item box-border w-100%"
        >
          <slot name="item" :item />
        </div>
      </div>
    </div>
  </div>
</template>
