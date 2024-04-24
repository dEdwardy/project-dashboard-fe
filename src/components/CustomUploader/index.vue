<!-- 大文件上传组件 -->
<script setup lang="tsx">
import Bluebird from 'bluebird'
import type { Socket } from 'socket.io-client'
import type { FileChunk, IProps } from './types'
import { DEFAULT_CHUNK_SIZE, createHashWorker, createMd5 } from '~/utils'
import { uploadChunk } from '~/api/upload'
// import { socket } from '~/utils/socket'

// :TODO 大文件hash web-worker  md5（wasm）   finished
// :TODO hash percent finished
const props = withDefaults(defineProps<IProps>(), {
  useWebsocket: false,
})
let socket: Socket
if (props.useWebsocket) {
  import('~/utils/socket').then(({ socket: io }) => {
    socket = io
  })
}
const visible = ref(false)
const worker = createHashWorker()
const DEFAULT_CONCURRENCY = 6 // 默认并发数量
const file = shallowRef<File>()
const isUploading = ref(false)
const hash = ref()
const hashPercent = ref(0)
const percent = ref(0)
const percentArr = ref<number[]>([])
const toUploadFiles: FileChunk[] = []
const progress = computed(() =>
  percentArr.value.length > 0 ? +Math.max(...percentArr.value).toFixed(4) : 0,
)
const isStop = ref(false)
let controller = new AbortController()
let totalSliceLen: number
function handleChunk(e: MessageEvent) {
  if (e.data.type === 'progress') {
    percentArr.value.push(e.data.percent as number)
    return
  }
  if (e.data.type !== 'chunk')
    return
  hashPercent.value = (e.data.index + 1) / totalSliceLen
  toUploadFiles.push(e.data)
  if (e.data.percent === 1)
    visible.value = false
}
worker.addEventListener('message', handleChunk)

onUnmounted(() => {
  worker.removeEventListener('message', handleChunk)
  worker.terminate()
  if (socket)
    socket.close()
})
// const getUploadChunks = (): Record<string, string> => {
//   return localStorage.getItem('uploadedChunks') ? JSON.parse(localStorage.getItem('uploadedChunks')!) : {}
// }

// const uploadedChunks: Record<string, string> = getUploadChunks()
// const cacheUploadedChunk = (key: string) => {
//   let cache = getUploadChunks()
//   cache[key] = '1'
//   localStorage.setItem('uploadedChunks', JSON.stringify(cache))
// }
async function handleChange(e: any) {
  const [fileObj] = e.target.files
  if (!fileObj)
    return
  console.time('upload')
  console.time('md5耗时')
  totalSliceLen = Math.ceil(fileObj.size / DEFAULT_CHUNK_SIZE)
  visible.value = true
  percent.value = 0
  percentArr.value = []
  file.value = fileObj
  hash.value = await createMd5(file.value!, worker)
  console.log('md5:', hash.value)
  console.timeEnd('md5耗时')
  console.log(toUploadFiles)
  // const cache = getUploadChunks()
  // if (cache[hash.value]) {
  //   percentArr.value.push(1)
  //   return
  // }
  await handleUpload()
}

async function handleUpload() {
  if (file.value === undefined)
    return
  if (!isUploading.value)
    isUploading.value = true
  // :TODO 此处待优化 md5计算时已经分片hash了 前端存储再indexDb里 可将createFileChunks 移入promiseAllLimit回调内 ！！！
  // http
  const total = toUploadFiles.length
  const chunkFileCallback = (chunk: FileChunk) =>
    new Promise((resolve) => {
      const formData = new FormData()
      formData.append('hash', hash.value)
      formData.append('name', file.value!.name)
      formData.append('chunkHash', chunk.hash)
      formData.append('index', `${chunk.index}`)
      formData.append('file', chunk.file)
      formData.append('total', `${total}`)
      return uploadChunk(formData, { signal: controller.signal }).then(
        (res) => {
          // cacheUploadedChunk(chunk.hash)
          resolve(res.data)
          percent.value += +(1 / toUploadFiles.length)
          percentArr.value.push(percent.value >= 1 ? 0.9999 : percent.value)
        },
      )
    })
  // socketio
  // const chunkFileCallbackV2 = (chunk: FileChunk) => new Promise((resolve) =>  {
  //   const data = {
  //     hash: hash.value,
  //     name: file.value!.name,
  //     'chunkHash': chunk.hash,
  //     'index': `${chunk.index}`,
  //     'file': chunk.file,
  //     total,
  //   }
  //   console.time('slice upload')
  //   socket.compress(true).emit('chunk', data, ({ current, total }: { current: number; total: number }) => {
  //     resolve({ current, total })
  //     percent.value += (+(1 / toUploadFiles.length))
  //     if (current == total - 1) {
  //       console.time('merge slice')
  //       console.timeEnd('slice upload')
  //     }
  //     if (current === total) {
  //       console.timeEnd('merge slice')
  //       console.timeEnd('upload')
  //       isUploading.value = false
  //       percent.value = 1
  //       percentArr.value.push(percent.value)
  //     }
  //     percentArr.value.push(percent.value >= 1 ? 0.99999 : percent.value)
  //   })
  // })
  // plan A http promsie all + concurrency 控制 上传+ 合并
  if (!props.useWebsocket) {
    console.log('useWebsocket', props.useWebsocket)
    Bluebird.Promise.map(toUploadFiles, chunkFileCallback, {
      concurrency: DEFAULT_CONCURRENCY,
    })
      .then(({ current, toatal }: any) => {
        console.timeEnd('slice upload')
        console.time('merge slice')
        // handleMerge()
        percent.value += +(1 / toUploadFiles.length)
        if (current == total - 1) {
          console.time('merge slice')
          console.timeEnd('slice upload')
        }
        percentArr.value.push(percent.value >= 1 ? 0.99999 : percent.value)
      })
      .then(() => {
        console.timeEnd('merge slice')
        console.timeEnd('upload')
        isUploading.value = false
        percent.value = 1
        percentArr.value.push(percent.value)
      })
  }
  else {
    console.log('useWebsocket', props.useWebsocket)
    // plan b socket.io 还是得限制下并发量 不然 longtask cpu短时间内暴涨
    // Bluebird.Promise.map(toUploadFiles,chunkFileCallbackV2,{ concurrency:6 })
    // plan b+ 扔web-worker中 不然cpu短时间内还是占用很高
    // toUploadFiles.forEach(chunkFileCallbackV2)
  }
  // promiseAllLimit(toUploadFiles, chunkFileCallback, DEFAULT_CONCURRENCY).then(() => {
  //   console.timeEnd('slice upload')
  //   console.time('merge slice')
  //   handleMerge()
  // })
}
async function handleHash() {
  hash.value = await createMd5(file.value as File, worker)
  console.error('md5', hash.value)
}
// async function handleMerge() {
//   const fileData = file.value as unknown as File
//   if (!fileData) return
//   if (!hash.value) hash.value = await createMd5(fileData, worker)

//   mergeChunks(
//     { hash: hash.value, name: fileData.name },
//     { signal: controller.signal },
//   ).then(() => {
//     console.timeEnd('upload')
//     // cacheUploadedChunk(hash.value)
//     isUploading.value = false
//     percent.value = 1
//     percentArr.value.push(percent.value)
//   })
// }
function handleChangeUploadStatus() {
  isStop.value = !isStop.value
  if (isStop.value) {
    controller.abort()
  }
  else {
    controller = new AbortController()
    handleUpload()
  }
}
</script>

<template>
  <div>
    <input type="file" @change="handleChange">
    <a-progress v-if="!!file" :percent="progress" animation />
    <a-button
      v-if="!!file"
      :disabled="!isUploading"
      @click="handleChangeUploadStatus"
    >
      {{ isStop ? '恢复' : '暂停' }}
    </a-button>
    <a-button @click="handleHash">
      计算hash
    </a-button>
    <a-button @click="handleUpload">
      上传
    </a-button>
    <div>
      hash进度: {{ hashPercent ? `${(hashPercent * 100).toFixed(2)}%` : '' }}
    </div>
    <div>md5: {{ hash }}</div>
    <div>
      size: {{ file?.size ? `${(file.size / 1024 / 1024).toFixed(2)}mb` : '' }}
    </div>
    <a-modal v-model:visible="visible">
      <template #title>
        Title
      </template>
      <template #content>
        <div />
      </template>
      <div>
        hash进度: {{ hashPercent ? `${(hashPercent * 100).toFixed(2)}%` : '' }}
      </div>
    </a-modal>
  </div>
</template>
