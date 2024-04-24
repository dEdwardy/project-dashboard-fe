import { describe, expect, it } from 'vitest'
import { md5 } from 'hash-wasm'
import useFileHash from '~/composables/file-hash'
import { DEFAULT_CHUNK_SIZE, readFileChunk } from '~/utils'

describe('test file-hash hooks', async () => {
  const file = new File(['1'.repeat(20000000)], 'test.txt', {
    type: 'text/plain',
  })
  const size = `${(file.size / 1024 / 1024).toFixed(2)}mb`
  const buffer = await readFileChunk(file)
  const readHash = await md5(new Uint8Array(buffer))
  it('computed hash should be OK', async () => {
    const { calculateHash } = useFileHash(file)
    const hash = await calculateHash()
    expect(hash).toBe(readHash)
  })
  it(`size ${size}大小的文件calculateHash callback 执行次数正确`, async () => {
    const { calculateHash, total } = useFileHash(file)
    expect(total).toBe(Math.ceil(file.size / DEFAULT_CHUNK_SIZE))
    let counter = 0
    await calculateHash((hash, currentIndex, percent) => {
      counter++
    }).then((res) => {
      console.log('xxxxxxxxxxxxxxx')
      console.log(res)
    })
    expect(counter).toBe(total)
  })
})
