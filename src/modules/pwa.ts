import { UserModule } from '~/types'
// @ts-ignore
const { registerSW } = await import('virtual:pwa-register')

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = ({ isClient, router }) => {
  if (!isClient) {
    return
  }
  router.isReady().then(async() => {
    registerSW({ immediate: true })
  })
}
