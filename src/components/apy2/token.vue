<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { onMounted, toRaw } from 'vue'
// @ts-ignore
import { tokenList, ready } from '~/logic/apy2/token'
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
      <el-container class="h-full">
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
                  <div class="inline-flex rounded-xl overflow-hidden">
                    <IconFont :type="item.icon" size="24"></IconFont>
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
      <div class="p-5">
        <UiDateDay :shortcuts="['7', { value: '30', 'default': true }, '180']"></UiDateDay>
      </div>

      <div>{{ date }}</div>

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
</style>
