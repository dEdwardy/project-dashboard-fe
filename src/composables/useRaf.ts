import { onUnmounted, ref } from 'vue'

export function useRafThrottle(callback: any) {
  const timer = ref()

  const fn = () => {
    timer.value = requestAnimationFrame(() => {
      callback()
      timer.value = null
    })
  }

  onUnmounted(() => {
    cancelAnimationFrame(timer.value)
  })

  return fn
}
