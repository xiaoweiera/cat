// import { ViteSSG } from 'vite-ssg'
import { createApp } from 'vue'
// @ts-ignore
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
// import 'element-plus/lib/theme-chalk/index.css'
// @ts-ignore
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import App from './app.vue'
import './styles/main.css'
import login from '~/utils/directive/login'

const routes = setupLayouts(generatedRoutes)

const app = createApp(App)
app.use(createHead())
const router = createRouter({
  history: createWebHistory(routes.base),
  routes,
})
app.use(router)
app.use(login)
const ctx = { app }
Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
  i.install?.(ctx),
)
app.mount('#app')
