import { describe, expect, it } from 'vitest'
import useFileHash from '~/composables/file-hash'
import { readFileChunk } from '~/utils'
import { md5 } from 'hash-wasm'

describe('test file-hash hooks', async () => {
  const file = new File(['1'.repeat(20000000)], 'test.txt', { type: 'text/plain' })
  const size = (file.size / 1024 / 1024).toFixed(2) + 'mb'
  const buffer = await readFileChunk(file)
  const readHash = await md5(new Uint8Array(buffer))
  it('Computed hash should be OK', async () => {
    const { hash, calculateHash } = useFileHash(file);
    await calculateHash()
    expect(hash.value).toBe(readHash)
  })
  it(`size ${size}大小的文件calculateHash callback 执行次数正确`, async () => {
    const { calculateHash, total } = useFileHash(file);
    expect(total.value).toBe(Math.ceil(file.size / (2 * 1024 * 1024)))
    let counter = 0;
    await calculateHash((hash, currentIndex, percent) => {
      counter++
      // console.log(current.value/total.value)
      // expect(current.value).toBe(counter)
      // expect(current.value/total.value).toBe(percent)
    }).then(res => {
      console.log('xxxxxxxxxxxxxxx')
      console.log(res)
    })
    expect(counter).toBe(total.value)
  })
})
