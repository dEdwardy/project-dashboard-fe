import localforage from "localforage"

export default function useLocalForage (name: string) {
  const store = localforage.createInstance({ name })
  const setItem = store.setItem
  const getItem = store.getItem
  return { setItem, getItem }
}
