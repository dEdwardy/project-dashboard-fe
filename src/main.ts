import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import App from './App.vue'
import DefaultImg from '~/assets/default.png'

// import {Promise} from 'bluebird';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import lazyLoad from '~/plugins/lazyload'
import '@arco-design/web-vue/dist/arco.css'
import 'element-plus/dist/index.css'

hljs.registerLanguage('javascript', javascript)
const app = createApp(App)
app.use(hljsVuePlugin)
app.config.errorHandler = (err) => {
  console.error(err)
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
// globalThis.Promise = Promise as unknown as typeof  globalThis.Promise
app.use(lazyLoad, { default: DefaultImg })
app.use(router)
app.mount('#app')
