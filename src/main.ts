import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
import App from './App.vue'
import copy from './directives/copy'
import DefaultImg from '~/assets/default.png'

import 'vue-json-pretty/lib/styles.css'
// import {Promise} from 'bluebird';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import lazyLoad from '~/plugins/lazyload'
import '@arco-design/web-vue/dist/arco.css'
import 'element-plus/dist/index.css'
// import 'default-passive-events'

const app = createApp(App)
app.config.errorHandler = (err) => {
  console.error(err)
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const pinia = createPinia()
// globalThis.Promise = Promise as unknown as typeof  globalThis.Promise
app.directive('copy', copy as any)
app.use(pinia)
app.use(lazyLoad, { default: DefaultImg })
app.use(router)
app.mount('#app')
