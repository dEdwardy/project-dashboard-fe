import { md5 } from 'hash-wasm'
import type { Socket } from 'socket.io-client'
import useFileHash from '~/composables/file-hash'
// import useLocalForage from '~/composables/localforage'
import { DEFAULT_CHUNK_SIZE, readFileChunk } from '~/utils'
import type { FileChunk } from '~/components/CustomUploader/types'

let socket: Socket
globalThis.onmessage = async (e) => {
  const file = e.data.file as unknown as File
  const isChunk = e.data.isChunk as unknown as boolean
  const { calculateHash } = useFileHash(file)
  if (isChunk || file.size < DEFAULT_CHUNK_SIZE) {
    // 切片md5最直接计算
    const buffer = await readFileChunk(file)
    const hash = await md5(new Uint8Array(buffer))
    globalThis.postMessage({ hash, isChunk, type: 'hash' })
  }
  else {
    // const { setItem } = useLocalForage('cachedHashes')
    // 非切片md5 增量计算
    const total = Math.ceil(file.size / DEFAULT_CHUNK_SIZE)
    const toUploadSlice: Omit<FileChunk, 'binary'>[] = []
    const hash = await calculateHash((hash, { current, file }) => {
      globalThis.postMessage({ type: 'chunk', file, index: current, hash })
      toUploadSlice.push({ hash, index: current, file })
      // setItem(hash, current)
    })
    socket = await (await import('~/utils/socket')).socket
    toUploadSlice.forEach(chunkFileCallbackV2)
    // chunkFileCallbackV2({ hash,index:current,file })
    function chunkFileCallbackV2(chunk: Omit<FileChunk, 'binary'>) {
      const data = {
        hash,
        name: file.name,
        chunkHash: chunk.hash,
        index: `${chunk.index}`,
        file: chunk.file,
        total,
      }
      socket
        .compress(true)
        .emit('chunk', data, ({ current, total }: { current: number, total: number }) => {
          globalThis.postMessage({
            type: 'progress',
            percent: current / total,
          })
        })
    }

    globalThis.postMessage({ type: 'hash', hash, isChunk })
  }
}
