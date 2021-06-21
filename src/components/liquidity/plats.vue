<script lang="ts" setup>
// @ts-ignore
import { reactive, ref, toRefs, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as R from 'ramda'
import { platStore, pairStore, updateData } from '~/store/liquidity/state'
import { exchange_list } from '~/api/liquidity'
import { changeRoute } from '~/lib/tool'
const route = useRoute()
const router = useRouter()
const plats = reactive({ select: {}, data: {} })
const platShow = ref(false)
const routeQuery = reactive(route.query)
// 获取plat列表
const getPlat = async() => {
  const {
    data: { data },
  } = await exchange_list()
  plats.data = data
  plats.select = R.find((item) => item.name === routeQuery.plat, plats.data) || plats.data[0]
  updateData(platStore, plats.select)
}
const selectPlatChange = (status: boolean) => {
  platShow.value = status
}
const mouseover = () => selectPlatChange(true)
const mouseLeave = () => selectPlatChange(false)
const changePlat = (plat: any) => {
  updateData(platStore, plat)
  plats.select = plat
  // 更改路由
  changeRoute(route, router, 'plat', plat.name)
  selectPlatChange(false)
}
onBeforeMount(() => {
  getPlat()
})
</script>

<template>
  <div class="flex w-23.75 px-3 relative h-full" @mouseleave="mouseLeave()">
    <div class="flex items-center hand" @mouseover="mouseover()">
      <img class="w-5 h-5" :src="plats.select.logo" alt="" />
      <span class="ml-1.5">{{ plats.select.name }}</span>
      <img
        class="w-2 h-1 ml-2"
        src="https://res.ikingdata.com/nav/logoList.png"
        alt=""
      />
      <div
        v-show="platShow"
        class="w-27.25 absolute top-14 left-0 z-2 py-1.5 showContainer"
      >
        <ul>
          <template v-for="item in plats.data">
            <li
              class="itemLi hand"
              :class="{ selectBg: plats.select.name === item.name }"
              @click="changePlat(item)"
            >
              <div class="flex items-center">
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
              </div>
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
