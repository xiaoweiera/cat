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
import {watch} from 'vue'
// 获取当前路由对象
const router = useRoute()
const titleName=computed(()=>{
  let name=''
  if(!pairStore.id){
    name= `${symbolStore.name}_${platStore.name} | ${I18n.liquidity.webTitle}`
  }else{
    name= `${pairStore.orderTokenName}_${platStore.name} | ${I18n.liquidity.webTitle}`
  }
  return name
})
watch(titleName,(n)=>wxShare(n, I18n.liquidity.share))
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
        content:I18n.liquidity.description
      },
    ],
  })
})
</script>
<template>

  <HeaderNav>
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
