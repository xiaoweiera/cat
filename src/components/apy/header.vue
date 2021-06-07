<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, toRaw } from 'vue'
import { useHead } from '@vueuse/head'
import I18n from '~/utils/i18n/index'
import { href } from '~/utils/lang'
import { headerConfig } from '~/logic/apy/config'
import { menu } from '~/logic/menu'
import { headerTag } from '~/store/header/login'
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
onBeforeMount(() => {
  useHead({
    title: I18n.apy.webTitle,
    meta: [
      {
        name: 'keywords',
        content:
          'Heco生态币,BSC生态币,ETH生态币,挖矿收益,生态币年化收益,DeFi挖矿,Heco挖矿,BSC挖矿,ETH挖矿,挖矿收益APY大全',
      },
      {
        name: 'description',
        content:
          '本站收集整理了Heco、ETH、BSC三条公链各借贷平台和机枪池的挖矿收益APY数据，根据类型将其分类方便您的查看',
      },
    ],
  })
})
</script>
<template>
  <HeaderNav>
    <template #nav>
      <nav class="itemContainer">
        <div class="h-full">
          <div class="flex font-normal h-full items-center">
            <template v-for="(item, i) in menu" :key="i">
              <el-popover placement="bottom-start" width="auto" trigger="hover">
                <template #reference>
                  <div
                    class="
                      flex
                      items-center
                      text-kd16px24px text-global-default
                      opacity-85
                    "
                    :class="i === 0 ? '' : ' ml-8'"
                  >
                    <span v-if="headerTag.name && headerTag.index === i">
                      {{ headerTag.name }}</span>
                    <span v-else>{{ item.name }}</span>
                    <img
                      class="w-3 ml-1.5"
                      src="https://res.ikingdata.com/nav/navDown.png"
                      alt=""
                    />
                  </div>
                </template>
                <div
                  class="flex py-3.25 font-kdFang hand"
                  :class="i === 0 ? 'pl-3 pr-8' : 'px-3'"
                >
                  <div class="flex flex-col">
                    <template v-for="child in item.children">
                      <a
                        :href="child.href ? child.href : 'javascript:void(0)'"
                        :target="child.href ? '_blank' : '_self'"
                        class="mtNthOne flex items-center relative hoverHover"
                      >
                        <img :src="child.icon" alt="" />
                        <div class="flex flex-col ml-2.5">
                          <img
                            v-if="child.badge"
                            class="w-13 absolute -top-4 -right-6"
                            src="https://res.ikingdata.com/nav/navOnLineTip.jpg"
                            alt=""
                          />
                          <div class="flex items-center">
                            <span class="childName">{{ child.name }}</span>
                            <img
                              class="w-3 ml-1 imgShow"
                              src="https://res.ikingdata.com/nav/navRight.jpg"
                              alt=""
                            />
                          </div>
                          <span class="desc">{{ child.desc }}</span>
                        </div>
                      </a>
                    </template>
                  </div>
                </div>
              </el-popover>
            </template>
          </div>
        </div>
      </nav>
    </template>
  </HeaderNav>
</template>
<style lang="postcss" scoped>
.hoverShow {
  display: block;
}
.imgShow {
  display: none;
}
::v-deep(.el-popover) {
  padding: 100px !important;
}
.mtNthOne:nth-child(n + 2) {
  @apply mt-5.25;
}
.desc {
  @apply text-global-default opacity-65 text-kd12px16px font-normal;
}
.selectName {
  @apply text-global-primary  font-medium text-kd15px150;
}
.name {
  @apply text-global-default opacity-65 text-kd14px18px;
}
.childName {
  @apply text-global-default opacity-85 text-kd15px150;
}
.itemContainer {
  @apply xshidden flex items-center relative z-2 i8n-font-inter h-18 font-kdFang;
}
.toolItem:hover {
  @apply text-global-primary;
}
.headerItem {
  @apply text-global-default opacity-85 mb-2 ml-8 flex items-center;
}

.oneHeaderItem {
  @apply text-global-default opacity-85 mb-2 flex items-center;
}
.hoverHover:hover {
  .imgShow {
    display: block;
  }
  .childName {
    @apply text-global-primary  font-medium text-kd15px150;
  }
  @apply text-global-primary  font-medium text-kd15px150;
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
