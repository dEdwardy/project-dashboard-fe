import { md5 } from 'hash-wasm'
import useFileHash from '~/composables/file-hash'
import useLocalForage from '~/composables/localforage'
import { DEFAULT_CHUNK_SIZE, readFileChunk } from '~/utils'

globalThis.onmessage = async (e) => {
  const file = e.data.file as unknown as File
  const isChunk = e.data.isChunk as unknown as boolean
  const { hash, calculateHash, percent } = useFileHash(file)
  if (isChunk || file.size < DEFAULT_CHUNK_SIZE) {
    // 切片md5最直接计算
    const buffer = await readFileChunk(file)
    const hash = await md5(new Uint8Array(buffer))
    globalThis.postMessage({ hash, isChunk, percent, type: 'hash' })
  }
  else {
    const { setItem } = useLocalForage('cachedHashes')
    // 非切片md5 增量计算
    await calculateHash((hash, { current, percent, file }) => {
      globalThis.postMessage({ type: 'chunk', percent, file, index: current, hash })
      setItem(hash, current)
    })
    globalThis.postMessage({ type: 'hash', hash: hash.value, isChunk, percent })
  }
}
