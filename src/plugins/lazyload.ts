import type { App } from 'vue'
import loadingImg from '~/assets/loading.png'
import ErrorImg from '~/assets/error.png'

let obsever: IntersectionObserver | undefined
interface Options {
  default?: string
  loading?: string
  error?: string
}
//  1<img loading="lazy"> 原生属性 兼容性不好而且不能控制具体逻辑
//  2. onScroll + 计算可视区域offsetTop  scrollTop innerHeight
//  3. onScroll + 计算可视区域 getBoundingRect
//  4. IntercetionObserver 交叉观察器
const lazyLoad = {
  install(app: App, options: Options) {
    // 默认图
    const defaultSrc = options?.loading || loadingImg
    app.directive('lazy', {
      beforeMount(el: HTMLImageElement, binding) {
        lazyLoad.init(el, binding.value, defaultSrc)
      },
      mounted(el: HTMLImageElement) {
        // 兼容处理
        if ('IntersectionObserver' in window)
          lazyLoad.observe(el, options)
      },
      unmounted() {
        lazyLoad.unobserve()
      },
    })
  },
  // 初始化
  init(el: HTMLImageElement, val: string, defaultImgSrc: string) {
    // data-src 存储真实src
    el.setAttribute('data-src', val)
    // 将src设为默认图
    el.setAttribute('src', defaultImgSrc)
  },
  // 监听
  observe(el: HTMLImageElement, options: Options) {
    obsever = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
      else {
        if (el.complete && el.src !== options.loading)
          el.src = options.error as string || ErrorImg
        el.alt = '图片加载失败'
      }
    })
    obsever.observe(el)
  },
  unobserve() {
    console.error('unobserve')
    obsever && obsever.disconnect()
  },
}
export default lazyLoad
