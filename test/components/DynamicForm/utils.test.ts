import { describe, expect, it } from 'vitest'
import { cloneDeep, get, set } from '~/components/DynamicForm/utils'

describe('dynamicForm utils set function test', () => {
  it('test set function', () => {
    const a: any = {}
    const path = ['b', '0', 'c', '1']
    set(a, path, 1)
    const expectedObj = a.b[0].c[1]
    expect(expectedObj).toBe(1)
  })
})
describe('dynamicForm utils get function test', () => {
  it('test get function', () => {
    const a: any = { b: [{ c: [1] }] }
    expect(get(a, 'b.0.c.0', 'default')).toBe(1)
    expect(get(a, 'b.0.c.3', 'default')).toBe('default')
  })
})

describe('dynamicForm utils cloneDeep function test', () => {
  it('test cloneDeep obj or array', () => {
    const obj = { a: { b: { c: [1, 2, [4, 5]] } } }
    expect(cloneDeep(obj)).toStrictEqual(obj)
  })
  it('test 循环引用', () => {
    const a: any = {}
    a.b = a
    expect(cloneDeep(a)).toStrictEqual(a)
  })
  it('test date', () => {
    const date = new Date()
    expect(cloneDeep(date)).toStrictEqual(date)
  })
  it('test reg', () => {
    const reg = new Date()
    expect(cloneDeep(reg)).toStrictEqual(reg)
  })
  it('test map', () => {
    const map = new Map()
    const a = { c: 1 }
    const b = { d: 2 }
    map.set(a, b)
    expect(cloneDeep(map)).toStrictEqual(map)
  })
  it('test set', () => {
    const set = new Set()
    const a = { c: 1 }
    const b = { d: 2 }
    set.add(a)
    set.add(b)
    expect(cloneDeep(set)).toStrictEqual(set)
  })

  it('test function', () => {
    const a = (m: any, n: any) => m + n
    const cloned = cloneDeep(a)
    console.log('xxxxxxxxxxxxxxxxxxx')
    console.log(cloned)
    expect(cloned).toStrictEqual(Object.create(null))
  })
  it('test should return {}', () => {
    const weakSet = new WeakSet()
    const weakMap = new WeakMap()
    const error = new Error('xxx')
    const res = Object.create(null)
    expect(cloneDeep(weakSet)).toStrictEqual(res)
    expect(cloneDeep(weakMap)).toStrictEqual(res)
    expect(cloneDeep(error)).toStrictEqual(res)
  })
})
