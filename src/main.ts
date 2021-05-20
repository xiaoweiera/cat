import { ViteSSG } from 'vite-ssg'
// @ts-ignore
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
// import 'element-plus/lib/theme-chalk/index.css'
// @ts-ignore
import App from './app.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes }, (ctx) => {
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    i.install?.(ctx),
  )
})
