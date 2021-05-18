import { RouteLocationNormalizedLoaded } from 'vue-router'

export const currentLang = (route: RouteLocationNormalizedLoaded): string => {
  const v = route.query?.lang || 'en'
  // @ts-ignore
  return ['en', 'cn'].includes(v)
    ? v
    : 'en'
}
