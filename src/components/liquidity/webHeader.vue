<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, toRaw,computed } from 'vue'
import { useHead } from '@vueuse/head'
import {pairStore, symbolStore,platStore} from '~/store/liquidity/state'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
import { href } from '~/utils/lang'
import { headerConfig } from '~/logic/apy/config'
import { menu } from '~/logic/menu'
import { headerTag } from '~/store/header/login'
import { wxShare } from '~/lib/wxShare'
// 获取当前路由对象
const router = useRoute()
const titleName=computed(()=>{
  let name=''
  if(!pairStore.id){
    name= `${symbolStore.name}_${platStore.name} | ${I18n.liquidity.webTitle}`
  }else{
    name= `${pairStore.name}_${platStore.name} | ${I18n.liquidity.webTitle}`
  }
  wxShare(name, 'liquidity')
  return name
})

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
    title: titleName,
    meta: [
      {
        name: 'keywords',
        content:'MDEX 、PANCAKE、UNISWAP、SHISUSWAP、SWAP、DEX Analysis、流动性份分析、交易数据分析、TVL、liquidity、dextools',
      },
      {
        name: 'description',
        content:'MDEX 、PANCAKE、UNISWAP、SHISUSWAP、SWAP、DEX Analysis、流动性份分析、交易数据分析、TVL、liquidity、dextools',
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
            <!-- 循环菜单 -->
            <template v-for="(item, i) in menu" :key="i">
              <UiNav :class="i === 0 ? 'tip' + i : ' ml-8 tip' + i">
                <template #reference>
                  <div class="flex items-center cursor-pointer">
                    <span
                        v-if="headerTag.name && headerTag.index === i"
                        class="text-global-primary"
                    >{{ headerTag.name }}</span>
                    <span v-else>{{ item.name }}</span>
                    <img
                        class="w-3 ml-1.5"
                        src="https://res.ikingdata.com/nav/navDown.png"
                        alt=""
                    />
                  </div>
                </template>

                <template #content>
                  <div class="flex font-kdFang">
                    <div class="flex flex-col">
                      <template v-for="child in item.children">
                        <a
                            :href="child.href?child.href+'&lang='+lang.current.value:'javascript:void(0);'"
                            :target="child.href?'_blank':'_self'"
                            class="
                            cursor-pointer
                            mtNthOne
                            flex
                            items-center
                            hoverHover
                          "
                        >
                          <img class="max-w-auto" :src="child.icon" alt="" />
                          <div class="relative ml-2.5">
                            <img
                                v-if="child.badge"
                                class="w-13 absolute -top-4 -right-6"
                                :src="I18n.nav.soonLine"
                                alt=""
                            />
                            <div class="flex items-center">
                              <span class="childName whitespace-nowrap">{{
                                  child.name
                                }}</span>
                              <img
                                  class="w-3 ml-1 imgShow"
                                  src="https://res.ikingdata.com/nav/navRight.jpg"
                                  alt=""
                              />
                            </div>
                            <span class="desc whitespace-nowrap">{{
                                child.desc
                              }}</span>
                          </div>
                        </a>
                      </template>
                    </div>
                  </div>
                </template>
              </UiNav>

              <!--              <div class="cursor-pointer flex items-center relative text-kd16px24px text-global-default h-full" :class="i === 0 ? 'tip' + i : ' ml-8 tip' + i">-->
              <!--                -->
              <!--                <div class="absolute bg-global-white top-15 whitespace-nowrap hidden tipContainer">-->
              <!--                  -->
              <!--                </div>-->
              <!--              </div>-->
            </template>
          </div>
        </div>
      </nav>
    </template>
  </HeaderNav>
</template>
<style lang="scss" scoped>
.tipContainer {
  border-radius: 6px;
  box-shadow: inset 0px -1px 0px rgba(37, 62, 111, 0.06);
}
.tip0:hover {
  .tipContainer {
    display: block;
  }
}
.tip1:hover {
  .tipContainer {
    display: block;
  }
}
.tip2:hover {
  .tipContainer {
    display: block;
  }
}
.tip3:hover {
  .tipContainer {
    display: block;
  }
}
img {
  max-width: none !important;
}
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
    @apply text-global-primary  font-medium;
  }

  @apply text-global-primary  font-medium;
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
