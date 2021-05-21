<script lang="ts" setup>
// @ts-ignore
import { reactive, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as R from 'ramda'
import { exchange_list } from '~/api/liquidity'
import * as lang from '~/utils/lang'
const router = useRoute()
const logos = reactive({ select: {}, data: {} })
const logoShow = ref(true)
const routeQuery = reactive(router.query)
// 获取logo列表
const getLogo = async() => {
  const {
    data: { data },
  } = await exchange_list()
  logos.data = data
  console.log(R.find((item) => item.name === routeQuery.plat, logos.data))
  logos.select
    = R.find((item) => item.name === routeQuery.plat, logos.data) || logos.data[0]
  console.log(logos)
}
const selectLogo = (item: any) => {
  logos.select = item
}
const getHref = (plat: any) => {
  const utm_source = 'https://apy.kingdata.com'
  const query = {
    ...router.query,
    plat: plat.name,
    utm_source,
  }
  return '/liquidity?plat=test'
}

onBeforeMount(() => {
  getLogo()
})
const selectLogoChange = (status: boolean) => {
  logoShow.value = status
}
const mouseover = () => {
  selectLogoChange(true)
}
const mouseLeave = () => {
  selectLogoChange(true)
}
</script>

<template>
  <div class="flex w-23.75 px-3 relative h-full" @mouseleave="mouseLeave()">
    <div class="flex items-center hand" @click="mouseover()">
      <img class="w-5 h-5" :src="logos.select.logo" alt="" />
      <span class="ml-1.5">{{ logos.select.name }}</span>
      <img
        class="w-2 h-1 ml-2"
        src="https://res.ikingdata.com/nav/logoList.png"
        alt=""
      />
      <div
        v-show="logoShow"
        class="w-27.25 absolute top-14 left-0 z-2 py-1.5 showContainer"
      >
        <ul>
          <template v-for="item in logos.data">
            <li
              class="itemLi hand"
              :class="{ selectBg: logos.select.name === item.name }"
            >
              <router-link class="flex items-center" :to="getHref(item)">
                <img class="w-4 h-4" :src="item.logo" alt="" />
                <div
                  class="
                    ml-1
                    text-kd14px20px text-global-default
                    opacity-65
                    font-kdExp
                    py-1.5
                  "
                >
                  {{ item.name }}
                </div>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.selectBg {
  background: rgba(43, 141, 254, 0.08);
}
.itemLi {
  @apply flex items-center  px-3;
}
.showContainer {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(43, 140, 255, 0.16);
  border-radius: 4px;
}
</style>
