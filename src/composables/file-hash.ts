import { ref } from 'vue'
import { createMD5, md5 } from 'hash-wasm'
import type { Fn } from '~/utils'
import { DEFAULT_CHUNK_SIZE } from '~/utils'

export default function useFileHash(file: File) {
  const hash = ref()
  const error = ref()
  const loading = ref(false)
  const percent = ref(0)
  const MAX_CHUNK_SIZE = DEFAULT_CHUNK_SIZE
  const currentChunk = ref(0)
  const total = ref(Math.ceil(file.size / MAX_CHUNK_SIZE))

  const calculateHash = (callback: Fn<void> | undefined = undefined) => {
    return new Promise(async (resolve, reject) => {
      loading.value = true
      error.value = null
      const spark = await createMD5()
      spark.init()
      const fileReader = new FileReader()

      fileReader.onload = async (event) => {
        const buffer = event.target!.result as unknown as ArrayBuffer
        const unit8Buffer = new Uint8Array(buffer)
        percent.value = 1 / total.value + percent.value
        const sliceHash = await md5(unit8Buffer)
        const start = currentChunk.value * MAX_CHUNK_SIZE
        const end = ((start + MAX_CHUNK_SIZE) >= file.size) ? file.size : start + MAX_CHUNK_SIZE
        const slice = file.slice(start, end)
        spark.update(unit8Buffer)
        if (currentChunk.value < total.value) {
          if (callback)
            callback(sliceHash, { current: currentChunk.value, percent: percent.value, file: slice })

          currentChunk.value++
          loadNextChunk()
        }
        else {
          percent.value = 1
          hash.value = spark.digest()
          loading.value = false
          resolve(hash.value)
        }
      }

      fileReader.onerror = () => {
        error.value = 'Oops, something went wrong.'
        loading.value = false
        reject(new Error(error.value))
      }

      function loadNextChunk() {
        const start = currentChunk.value * MAX_CHUNK_SIZE
        const end = ((start + MAX_CHUNK_SIZE) >= file.size) ? file.size : start + MAX_CHUNK_SIZE
        fileReader.readAsArrayBuffer(file.slice(start, end))
      }
      loadNextChunk()
    })
  }
  return { hash, error, loading, calculateHash, percent, current: currentChunk, total }
};
