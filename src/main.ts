import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import DefaultImg from '~/assets/default.png'

// import {Promise} from 'bluebird';
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import lazyLoad from '~/plugins/lazyload'
import '@arco-design/web-vue/dist/arco.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
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
