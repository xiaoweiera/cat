<script setup lang="ts">
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'
import I18n from '~/utils/i18n/index'
import { href } from '~/utils/lang'
import { headerConfig } from '~/logic/apy/config'

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
      <nav
        class="
          xshidden
          flex
          items-center
          relative
          z-2
          i8n-font-inter
          h-18
          font-kdFang
        "
      >
        <div class="flex-grow mt-2 h-full">
          <div
            class="
              flex
              font-normal
              h-full
              items-center
              text-base text-navItem-default
            "
          >
            <template v-for="(item, i) in headerConfig">
              <a
                :class="
                  i === 0
                    ? 'oneHeaderItem'
                    : headerConfig.length - 1 === i
                      ? 'headerItem hfull'
                      : 'headerItem'
                "
                target="_blank"
                :href="item.url"
              ><span :class="headerConfig.length - 1 === i ? 'mt-0.5' : ''">{{
                item.name
              }}</span></a>
            </template>
          </div>
        </div>
      </nav>
    </template>
  </HeaderNav>
</template>
<style lang="postcss" scoped>
.toolItem:hover {
  @apply text-global-primary;
}

.headerItem {
  @apply text-global-default opacity-85 mb-2 ml-8 flex items-center;
}

.oneHeaderItem {
  @apply text-global-default opacity-85 mb-2 flex items-center;
}

.tool {
  padding: 6px 0px;
}

.hfull {
  height: 100%;
  border-bottom: 2px solid #2b8cff;
}

.navLogoBg {
  background: #eaf3fe;
}
</style>
