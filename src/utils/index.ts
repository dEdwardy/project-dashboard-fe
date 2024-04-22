// import SparkMD5 from 'spark-md5'
import { md5 } from 'hash-wasm'
import HashWorker from '~/worker/hash.worker?worker'

export const DEFAULT_CHUNK_SIZE = 1 * 1024 * 1024
export type Fn<T> = (...args: any) => T
export async function promiseAllLimit(arr: any[], fn: (arg: any) => Promise<any>, limit: number) {
  const result = []
  const executing: any[] = []
  for (let i = 0; i < arr.length; i++) {
    const p = Promise.resolve().then(() => fn(arr[i]))
    result[i] = p

    const e: any = p.then(() => executing.splice(executing.indexOf(e), 1))

    executing.push(e)

    if (executing.length >= limit)
      await Promise.race(executing)
  }
  return Promise.all(result)
}
export function readFileChunk(blob: Blob | File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = () => {
    // resolve(e.target!.result)
      resolve(reader.result as unknown as ArrayBuffer)
    }
    reader.onerror = reject
  })
}
export function createMd5(file: File | Blob, worker: Worker, isChunk = false): Promise<string> {
  return new Promise((resolve, reject) => {
  // chunk或小文件直接hash
    if (isChunk || file.size < DEFAULT_CHUNK_SIZE) {
      readFileChunk(file).then(async (buffer: ArrayBuffer) => {
        const hash = await md5(new Uint8Array(buffer))
        resolve(hash)
      })
    }
    else {
    // 大文件 md5 worker增量计算
      worker.onmessage = (e) => {
        if (e.data.type === 'hash')
          resolve(e.data.hash)
      }
      worker.postMessage({ file, isChunk })
      worker.onerror = reject
    }
  })
}

export const createHashWorker = () => new HashWorker()
