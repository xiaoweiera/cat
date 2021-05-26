<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'
import I18n from '~/utils/i18n/index'
import { href } from '~/utils/lang'

// 获取当前路由对象
const router = useRoute()

const navIsSelect = (path: string): string => {
  const $router = toRaw(router)
  const pathname: string = $router.path.value
  if (pathname && pathname.includes(path)) {
    return 'text-global-primary'
  }
  return 'text-global-default opacity-85'
}
</script>
<template>
  <HeaderNav>
    <template #nav>
      <div class="flex font-normal text-base items-center whitespace-nowrap">
        <router-link :to="href('/growthpad')" :class="navIsSelect('growthpad')">
          <span>{{ I18n.growthpad.title }}</span>
        </router-link>
        <router-link
          class="ml-8"
          :to="href('/growthpad/examples')"
          :class="navIsSelect('growthpad/examples')"
        >
          <span>{{ I18n.growthpad.case }}</span>
        </router-link>
        <a
          class="ml-8 opacity-85"
          target="_blank"
          href="http://ikingdata.mikecrm.com/kbZDdCb"
        >
          <span>{{ I18n.common.nav.apply }}</span>
        </a>
        <a
          class="ml-8 opacity-85"
          target="_blank"
          href="https://www.yuque.com/kingdata_growthpad/tlll4r/blz39c"
        >
          <span>{{ I18n.common.nav.about }}</span>
        </a>
      </div>
    </template>
  </HeaderNav>
</template>
