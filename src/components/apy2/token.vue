<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { onMounted, toRaw } from 'vue'
import { tokenList } from '~/store/apy2/state'
// @ts-ignore
import { ready } from '~/logic/apy2/token'
import { useProvide } from '~/utils/use/state'
import { useRoute } from 'vue-router'
// @ts-ignore
const [ date ] = useProvide('uiDate')

// 获取当前路由对象
const router = useRoute()

// @ts-ignore
const radios = [
  { label: '单币', value: 1 },
  { label: 'LP', value: 2 }
]

const onSumbit = function(value: Array<string | number>) {

}

const isRouterActive = function(item: any) {
  const $router = toRaw(router)
  const query: Query = $router.query.value as any
  return query.id === item.id;
}

onMounted(ready)

</script>

<template>
  <UiLayoutMenu>
    <template #menu>
      <el-container class="h-full text-kdFang">
        <el-header height="initial" class="p-0">
          <div class="pt-5">
            <el-input class="search-box" placeholder="请输入内容" value="">
              <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </el-header>
        <el-main class="p-0 overflow-auto">
          <div class="pt-3 pb-10">
            <template v-for="(item, index) in tokenList" :key="index">
              <div class="cursor-pointer">
                <router-link class="flex items-center p-1.5" :to="item.href" :class="{'menu-active': isRouterActive(item)}">
                  <div class="inline-flex">
                    <!-- rounded-xl overflow-hidden -->
                    <IconFont rounded :type="item.icon" size="24"></IconFont>
                  </div>
                  <div class="ml-1.5">
                    <span class="text-sm text-global-highTitle">{{ item.name }}</span>
                  </div>
                </router-link>
              </div>
            </template>
          </div>
        </el-main>
      </el-container>
    </template>

    <template #content>
      <div class="p-8 text-kdFang">
        <div class="flex justify-between">
          <div class="flex items-center">
            <IconFont type="icon-facebook-circle-fill" size="40" rounded/>
            <b class="title ml-2 font-bold text-global-highTitle text-opacity-85">BTC</b>
            <span class="ml-4 text-xl text-global-highTitle text-opacity-85">$21312.2</span>
            <span class="ml-2 bg-global-numRed inline-block py-0.5 px-1 rounded">
              <span class="text-base text-global-white">-3.23%</span>
            </span>
          </div>
          <div class="flex items-center rounded-xl bg-global-highTitle bg-opacity-6 p-1">
            <router-link class="page-switch active" to="?type=1">
              <IconFont type="icon-danbi" size="24"/>
              <span class="ml-2">挖矿收益</span>
              <IconFont class="ml-1.5" type="icon-star-xuanzhong" size="16"/>
            </router-link>
            <router-link class="page-switch" to="?type=2">
              <IconFont type="icon-jiekuan-da" size="24"/>
              <span class="ml-2">利率收益</span>
              <IconFont class="ml-1.5" type="icon-star-weixuanzhong" size="16"/>
            </router-link>
          </div>
        </div>

        <div class="mt-8 pt-0.5">
          <div class="flex justify-between items-center">
            <p class="flex-1 w-1">
              <span class="inline-block leading-6 align-middle text-global-highTitle text-opacity-85 text-xl">BTC 挖矿 APY TOP 10</span>
              <span class="inline-block leading-6 ml-1.5 text-xs text-global-highTitle text-opacity-45">更新时间：1分钟前</span>
            </p>
            <div class="ml-5">
              <div class="cursor-pointer text-global-highTitle text-opacity-65">
                <IconFont class="flex" type="icon-xiazai" size="24"/>
              </div>
            </div>
          </div>
          <p class="mt-1.5">
            <span class="leading-6 text-xs text-global-highTitle text-opacity-45">指标描述：展示选定币种/交易对在单位时间内的资金净流入情况，该指标是使用单位时间内主动买入-主动卖出进行计算的，异常的资金变化可能导致行情出现剧烈波动。</span>
          </p>
        </div>
        <div class="mt-3">
          <div class="flex justify-between items-center">
            <div>
              <el-button plain size="small">
                <div class="inline-flex items-center px-3 py-0.5">
                  <IconFont class="flex mr-1" type="icon-plus" size="16"/>
                  <span class="text-sm">添加矿池</span>
                </div>
              </el-button>
            </div>
            <div>
              <UiDateDay :shortcuts="[{ value: '7', 'default': true }, '30', '180']"/>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
<!--      <div class="p-5">-->
<!--        <UiDateDay :shortcuts="['7', { value: '30', 'default': true }, '180']"></UiDateDay>-->
<!--      </div>-->

<!--      <div>{{ date }}</div>-->

<!--      <UiTransfer title="添加币种 & LP" sub-title="已选" :radios="radios" @submit="onSumbit">-->
<!--        <template #item="scope">-->
<!--          <span class="text-global-highTitle text-xs font-normal">BTC/ETH-{{ scope.data }}</span>-->
<!--        </template>-->

<!--        <template #result="scope">-->
<!--          <span>BTC/ETH-{{ scope.id }}</span>-->
<!--        </template>-->
<!--      </UiTransfer>-->

    </template>
  </UiLayoutMenu>

</template>

<style scoped lang="scss">
.search-box {
  border-bottom: 1px solid rgba(#033666, 0.06);
  ::v-deep(input) {
    border: 0;
    background: none;
  }
}
.menu-active {
  @apply bg-global-highTitle bg-opacity-6 rounded;
}
.title {
  font-size: 1.75rem;
}
.page-switch {
  @apply inline-block h-9 flex items-center px-3.5 rounded-lg overflow-hidden text-global-highTitle text-opacity-65;
  &.active {
    @apply bg-global-white text-global-primary text-opacity-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

.el-button--small {
  @apply rounded-md text-global-highTitle text-opacity-85;
}
</style>
