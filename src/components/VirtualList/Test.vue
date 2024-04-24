<script setup lang="ts" generic="T extends { id: number }">
import {
  type CSSProperties,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { throttle } from 'lodash'
import type { IEstimatedListProps, IPosInfo } from './types'

const props = defineProps<IEstimatedListProps<T>>()

const emit = defineEmits<{
  getMoreData: []
}>()

defineSlots<{
  item: (props: { item: T }) => any
}>()

const contentRef = ref<HTMLDivElement>()

const listRef = ref<HTMLDivElement>()

const positions = ref<IPosInfo[]>([])

const state = reactive({
  viewHeight: 0,
  listHeight: 0,
  startIndex: 0,
  maxCount: 0,
  preLen: 0,
  scrollTop: 0,
})

const endIndex = computed(() =>
  Math.min(props.dataSource.length, state.startIndex + state.maxCount),
)

const renderList = computed(() =>
  props.dataSource.slice(state.startIndex, endIndex.value),
)

const offsetDis = computed(() =>
  state.startIndex > 0 ? positions.value[state.startIndex - 1].bottom : 0,
)

const scrollStyle = computed(
  () =>
    ({
      height: `${state.listHeight - offsetDis.value}px`,
      transform: `translate3d(0, ${offsetDis.value}px, 0)`,
    }) as CSSProperties,
)

onMounted(() => {
  initPosition()
  nextTick(() => {
    setPosition()
  })
})
// watch(
//   () => props.dataSource.length,
//   () => {
//     console.log('dataSourceLength')
//     initPosition();
//     nextTick(() => {
//       setPosition();
//     });
//   }
// );

watch(
  () => state.startIndex,
  () => {
    console.log('watcher2')
    setPosition()
  },
)

// 初始化：拿到数据源初始化 pos 数组
function initPosition() {
  const pos: IPosInfo[] = []
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

// 数据 item 渲染完成后，更新数据item的真实高度
function setPosition() {
  const nodes = listRef.value?.children
  if (!nodes || !nodes.length)
    return
  Array.from(nodes).forEach((node) => {
    const rect = node.getBoundingClientRect()
    const item = positions.value[+node.id]
    const dHeight = item.height - rect.height
    if (dHeight) {
      item.height = rect.height
      item.bottom = item.bottom - dHeight
      item.dHeight = dHeight
    }
  })

  const startId = +nodes[0].id
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

const handleScroll = throttle(() => {
  const { scrollTop, clientHeight, scrollHeight } = contentRef.value!
  state.scrollTop = scrollTop
  state.startIndex = binarySearch(positions.value, scrollTop)
  const bottom = scrollHeight - clientHeight - scrollTop
  if (bottom <= 20)
    !props.loading && emit('getMoreData')
})
function init() {
  state.viewHeight = contentRef.value ? contentRef.value.offsetHeight : 0
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1
  contentRef.value && contentRef.value.addEventListener('scroll', handleScroll)
}
function destory() {
  contentRef.value && contentRef.value.removeEventListener('scroll', handleScroll)
}

function binarySearch(list: IPosInfo[], value: number) {
  let left = 0
  let right = list.length - 1
  let templateIndex = -1
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2)
    const midValue = list[midIndex].bottom
    if (midValue === value) { return midIndex + 1 }
    else if (midValue < value) { left = midIndex + 1 }
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
})

onUnmounted(() => {
  destory()
})
</script>

<template>
  <div class="fs-estimated-virtuallist-container" :loading="props.loading">
    <div ref="contentRef" class="fs-estimated-virtuallist-content">
      <div ref="listRef" class="fs-estimated-virtuallist-list" :style="scrollStyle">
        <div v-for="i in renderList" :id="String(i.id)" :key="i.id" class="fs-estimated-virtuallist-list-item">
          <slot name="item" :item="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fs-estimated-virtuallist {
  &-container {
    width: 100%;
    height: 100%;
  }

  &-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  &-list-item {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
