import { createMD5, md5 } from 'hash-wasm'
import type { Fn } from '~/utils'
import { DEFAULT_CHUNK_SIZE } from '~/utils'

export default function useFileHash(file: File) {
  let hash
  let error
  let loading = false
  let percent = 0
  const MAX_CHUNK_SIZE = DEFAULT_CHUNK_SIZE
  let currentChunk = 0
  const total = Math.ceil(file.size / MAX_CHUNK_SIZE)

  const calculateHash = (callback: Fn<void> | undefined = undefined) => {
    return new Promise(async (resolve, reject) => {
      loading = true
      error = null
      const spark = await createMD5()
      spark.init()
      const fileReader = new FileReader()

      fileReader.onload = async (event) => {
        const buffer = event.target!.result as unknown as ArrayBuffer
        const uint8Array = new Uint8Array(buffer)
        percent = 1 / total + percent
        const sliceHash = await md5(uint8Array)
        const start = currentChunk * MAX_CHUNK_SIZE
        const end
          = start + MAX_CHUNK_SIZE >= file.size
            ? file.size
            : start + MAX_CHUNK_SIZE
        const slice = file.slice(start, end)
        spark.update(uint8Array)
        if (currentChunk < total) {
          if (callback) {
            callback(sliceHash, {
              current: currentChunk,
              percent,
              file: slice,
              uint8Array,
            })
          }

          currentChunk++
          loadNextChunk()
        }
        else {
          percent = 1
          hash = spark.digest()
          loading = false
          resolve(hash)
        }
      }

      fileReader.onerror = () => {
        error = 'Oops, something went wrong.'
        loading = false
        reject(new Error(error))
      }

      function loadNextChunk() {
        const start = currentChunk * MAX_CHUNK_SIZE
        const end
          = start + MAX_CHUNK_SIZE >= file.size
            ? file.size
            : start + MAX_CHUNK_SIZE
        fileReader.readAsArrayBuffer(file.slice(start, end))
      }
      loadNextChunk()
    })
  }
  return {
    hash,
    error,
    loading,
    calculateHash,
    percent,
    current: currentChunk,
    total,
  }
}
