// to test
export function set(obj: any, path: string | string[], val: any) {
  let pathArray = []
  if (Array.isArray(path))
    pathArray = path
  else pathArray = path.replaceAll('[', '.').replaceAll(']', '').split('.')
  let temp = obj as any
  const len = pathArray.length
  pathArray.forEach((key, index) => {
    if (index === len - 1) {
      temp[key] = val
    }
    else {
      if (!temp.hasOwnProperty(key) || typeof temp[key] !== 'object')
        temp[key] = {}

      temp = temp?.[key] ?? {}
    }
  })
}
// to test
export function get(
  obj: any,
  path: string | string[],
  defaultValue: any = undefined,
) {
  let pathArray = []
  if (Array.isArray(path))
    pathArray = path
  else pathArray = path.replaceAll('[', '.').replaceAll(']', '').split('.')
  return (
    pathArray.reduce((initial, current) => {
      return (initial || {})[current as unknown as keyof typeof initial]
    }, obj) || defaultValue
  )
}
// to test
export function pick(obj: any, keys: string[]) {
  return keys.reduce((initial: any, key) => {
    initial[key] = get(obj, key)
    return initial
  }, {})
}
// to do
// export function omit(obj: Object, keys: string[]) { }
export function getType(res: any) {
  return Object.prototype.toString.call(res).slice(8, -1).toLowerCase()
}

export function isObject(data: any) {
  return typeof data === 'object' || typeof data === 'function'
}
export function cloneDeep(source: any, map = new WeakMap()) {
  // 判断source是不是对象
  if (source instanceof Object === false)
    return source

  // 根据source类型初始化结果变量
  let target: any = {}
  if (map.get(source)) {
    // 已存在则直接返回
    return map.get(source)
  }
  // 不存在则第一次设置
  map.set(source, target)
  // date
  if (source instanceof Date)
    return new Date(source)

  // reg
  if (source instanceof RegExp)
    return new RegExp(source.source, source.flags)

  // 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。
  // function error 以及不可迭代 同lodash 返回空对象
  if (
    source instanceof Function
    || source instanceof Error
    || source instanceof WeakMap
    || source instanceof WeakSet
  )
    return Object.create(null)

  // map
  if (source instanceof Map) {
    target = new Map()
    for (const [key, v] of source) target.set(key, cloneDeep(v, map))

    return target
  }
  if (source instanceof Set) {
    target = new Set()
    for (const item of source) target.add(cloneDeep(item, map))

    return target
  }
  // array
  if (Array.isArray(source)) {
    target = source.map(item => cloneDeep(item, map))
    return target
  }
  // object
  for (const key in source) {
    if (source.hasOwnProperty(key))
      target[key] = cloneDeep(source[key], map)
  }
  return target
}
