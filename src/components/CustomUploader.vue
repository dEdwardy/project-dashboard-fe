<!-- 大文件上传组件 -->
<script setup lang="ts">
import { createMd5, promiseAllLimit, createHashWorker } from '~/utils'
import { mergeChunks, uploadChunk } from '~/api/upload'
import { DEFAULT_CHUNK_SIZE } from '~/utils'
import Bluebird from 'bluebird';
import useFileHash from '~/composables/file-hash'
import { md5 } from 'hash-wasm';
// :TODO 大文件hash web-worker  md5（wasm）   finished
// :TODO hash percent finished
export type FileChunk = { file: Blob, cur?: number, index: number, hash: string };
const visible = ref(false)
let worker = createHashWorker()
function handleChunk (e: MessageEvent) {
  if (e.data.type !== 'chunk') return
  hashPercent.value = e.data.percent
  toUploadFiles.value.push(e.data)
  if (e.data.percent === 1) {
    visible.value = false
  }
}
worker.addEventListener('message', handleChunk)
onUnmounted(() => {
  worker.removeEventListener('message', handleChunk)
  worker.terminate()
})
const DEFAULT_SIZE = DEFAULT_CHUNK_SIZE // 切片大小 2M
const DEFAULT_CONCURRENCY = 6 // 默认并发数量
const file = ref<File>()
const isUploading = ref(false)
const hash = ref()
const hashPercent = ref(0)
const percent = ref(0)
const percentArr = ref<number[]>([])
const toUploadFiles = ref<FileChunk[]>([])
const progress = computed(() => percentArr.value.length > 0 ? +Math.max(...percentArr.value).toFixed(4) : 0)
const isStop = ref(false)
let controller = new AbortController()
const getUploadChunks = (): Record<string, string> => {
  return localStorage.getItem('uploadedChunks') ? JSON.parse(localStorage.getItem('uploadedChunks')!) : {}
}

const uploadedChunks: Record<string, string> = getUploadChunks()
const cacheUploadedChunk = (key: string) => {
  let cache = getUploadChunks()
  cache[key] = '1'
  localStorage.setItem('uploadedChunks', JSON.stringify(cache))
}
// 生成切片文件
const createFileChunks = async (file: File, size = DEFAULT_SIZE) => {
  const fileChunkList = []
  let cur = 0
  while (file.size > cur) {
    const chunk = file.slice(cur, cur + size)
    const hash = await createMd5(chunk, worker, true)
    if (!uploadedChunks[hash]) fileChunkList.push({
      file: chunk,
      hash,
      cur,
      index: Math.floor(cur / size),
    })
    cur += size
  }
  return fileChunkList

}
const handleChange = async (e: any) => {
  const [fileObj] = e.target.files;
  if(!fileObj)return
  console.time('upload')
  console.time('md5耗时')
  visible.value = true
  percent.value = 0
  percentArr.value = []
  file.value = fileObj
  hash.value = await createMd5(file.value!, worker)
  console.log('md5:', hash.value)
  console.timeEnd('md5耗时')
  // const cache = getUploadChunks()
  // if (cache[hash.value]) {
  //   percentArr.value.push(1)
  //   return
  // }
  await handleUpload()
}

const handleUpload = async () => {
  if (file.value === undefined) return
  if (!isUploading.value) isUploading.value = true
  // :TODO 此处待优化 md5计算时已经分片hash了 前端存储再indexDb里 可将createFileChunks 移入promiseAllLimit回调内 ！！！
  // toUploadFiles.value = await createFileChunks(file.value!) 此处不再计算hash
  // if(!hash.value)hash.value = await createMd5(file.value, worker)
  const chunkFileCallback = (chunk: FileChunk) => new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('hash', hash.value)
    formData.append('name', file.value?.name!)
    formData.append('chunkHash', chunk.hash)
    formData.append('index', chunk.index + '')
    formData.append('file', chunk.file)
    return uploadChunk(formData, { signal: controller.signal }).then((res) => {
      // cacheUploadedChunk(chunk.hash)
      resolve(res.data)
      percent.value += (+(1 / toUploadFiles.value.length))
      percentArr.value.push(percent.value >= 1 ? 0.9999 : percent.value)
    })
  })
  console.time('slice upload')
  Bluebird.Promise.map(toUploadFiles.value, chunkFileCallback, { concurrency: DEFAULT_CONCURRENCY }).then((res) => {
    console.timeEnd('slice upload')
    console.time('merge slice')
    handleMerge()
  })
  // promiseAllLimit(toUploadFiles.value, chunkFileCallback, DEFAULT_CONCURRENCY).then(() => {
  //   console.timeEnd('slice upload')
  //   console.time('merge slice')
  //   handleMerge()
  // })
}
const handleHash = async () => {
  hash.value = await createMd5(file.value as File, worker)
  console.error('md5', hash.value)
}
const handleMerge = async () => {
  const fileData = file.value as unknown as File
  if (!fileData) return
  if (!hash.value) {
    hash.value = await createMd5(fileData, worker)
  }
  mergeChunks({ hash: hash.value, name: fileData.name }, { signal: controller.signal }).then(() => {
    console.timeEnd('merge slice')
    console.timeEnd('upload')
    // cacheUploadedChunk(hash.value)
    isUploading.value = false
    percent.value = 1
    percentArr.value.push(percent.value)
  })
}
const handleChangeUploadStatus = () => {
  isStop.value = !isStop.value
  if (isStop.value) {
    controller.abort()
  } else {
    controller = new AbortController()
    handleUpload()
  }
}
</script>
<template>
  <div>
    <input type="file" @change="handleChange" />
    <a-progress v-if="!!file" :percent="progress" animation />
    <a-button v-if="!!file" @click="handleChangeUploadStatus" :disabled="!isUploading">{{ isStop ? '恢复' : '暂停'
      }}</a-button>
    <a-button @click="handleHash">计算hash</a-button>
    <a-button @click="handleUpload">上传</a-button>
    <div>
      hash进度: {{ hashPercent ? (hashPercent * 100).toFixed(2) + '%' : '' }}
    </div>
    <div>
      md5: {{ hash }}
    </div>
    <div>
      size: {{ file?.size ? (file.size / 1024 / 1024).toFixed(2) + 'mb' : '' }}
    </div>
    <a-modal v-model:visible="visible">
      <template #title>
        Title
      </template>
      <template #content>
        <div>

        </div>
      </template>
      <div>hash进度: {{ hashPercent ? (hashPercent * 100).toFixed(2) + '%' : '' }}</div>
    </a-modal>
  </div>
</template>
