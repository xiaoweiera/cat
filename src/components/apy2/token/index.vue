<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { onMounted, toRaw, computed } from 'vue'
import { tokenList } from '~/store/apy2/state'
// @ts-ignore
import makeRouterPath from '~/utils/router'
// @ts-ignore
import { ready } from '~/logic/apy2/token'
import { useProvide } from '~/utils/use/state'
import { useRoute } from 'vue-router'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import { uuid, equalsIgnoreCase } from '~/utils'
import DBList from '@fengqiaogang/dblist'

// @ts-ignore
const [ date ] = useProvide('uiDate')

const TabData = {
  mining: 'mining',
  deposit: 'deposit'
}

const tabList = [
  {
    id: TabData.mining,
    name: '挖矿收益'
  }, {
    id: TabData.deposit,
    name: '利率收益'
  }
]

// 获取当前路由对象
const router = useRoute()

const getActiveToken = function() {
  const $router = toRaw(router)
  const query = $router.query.value as any
  const list = toRaw(tokenList.value)
  if (query && query.id) {
    const db = new DBList(list, 'id')
    const where = { id: query.id }
    const item = db.selectOne(where)
    if (item) {
      return item.id
    }
  }
  return safeGet(list, '[0].id') || uuid()
}

const currentTokenId = computed(getActiveToken)

const isRouterActive = function(item: any, type: string) {
  const $router = toRaw(router)
  const query = $router.query.value as any
  // 处理默认值
  if (!safeGet(query, type)) {
    if (type === 'type') {
      safeSet(query, type, safeGet(tabList, '[0].id'))
    }
    if (type === 'id') {
      safeSet(query, type, getActiveToken())
    }
  }
  return equalsIgnoreCase(query[type], item[type]);
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
          <div class="pt-3 pb-10" v-if="tokenList.length > 0">
            <template v-for="(item, index) in tokenList" :key="index">
              <div class="cursor-pointer">
                <router-link class="flex items-center p-1.5" :to="item.href" :class="{'menu-active': isRouterActive(item, 'id')}">
                  <span class="inline-flex">
                    <!-- rounded-xl overflow-hidden -->
                    <IconFont rounded :type="item.icon" size="24"></IconFont>
                  </span>
                  <span class="ml-1.5">
                    <span class="text-sm text-global-highTitle">{{ item.name }}</span>
                  </span>
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
            <template v-for="item in tabList" :key="item.id">
              <router-link class="page-switch" :class="{'active': isRouterActive({ type: item.id }, 'type')}" :to="makeRouterPath({query: { type: item.id }})">
                <IconFont type="icon-danbi" size="24"/>
                <span class="ml-2">{{ item.name }}</span>
                <IconFont class="ml-1.5" type="icon-star-xuanzhong" size="16"/>
              </router-link>
            </template>
          </div>
        </div>

        <div class="mt-8 pt-0.5" :key="currentTokenId">
          <!--挖矿收益-->
          <div v-if="isRouterActive({ type: TabData.mining }, 'type')">
            <Apy2TokenMining/>
          </div>
          <!--利率收益-->
          <div v-else-if="isRouterActive({ type: TabData.deposit }, 'type')">
            <Apy2TokenDeposit/>
          </div>
        </div>
      </div>
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
  &.is-plain {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
}
</style>
