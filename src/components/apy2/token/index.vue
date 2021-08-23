<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { onBeforeMount, computed, toRaw } from 'vue'
import { tokenList } from '~/store/apy2/state'
// @ts-ignore
import { getParam } from '~/utils/router'
// @ts-ignore
import { ready } from '~/logic/apy2/token'
import { TabCategoryData } from '~/logic/apy2/interface'
import { useProvide } from '~/utils/use/state'
import { uuid, equalsIgnoreCase, toInteger } from '~/utils'
import DBList from '@fengqiaogang/dblist'

// @ts-ignore
const [ date ] = useProvide('uiDate')


// 获取
const getActiveTokenId = function(): string | number {
  const value = getParam<string | number>('id')
  if (value) {
    return value as string
  }
  const list = tokenList.value
  const [ first ] = list
  return first?.id
}

const getTabList = function() {
  const id = getActiveTokenId()
  const db = new DBList(toRaw(tokenList.value), 'id')
  const symbol = db.selectOne<any>({ id: toInteger(id) })
  if (symbol && symbol.category && symbol.category.length > 0) {
    const tab = new DBList([
      {
        id: TabCategoryData.mining,
        name: '挖矿收益',
      }, {
        id: TabCategoryData.deposit,
        name: '利率收益'
      }
    ], 'id')
    return tab.select({ id: symbol.category })
  }
  return []
}

// @ts-ignore
const tabList = computed(getTabList)

// @ts-ignore
const contentKey = computed(function() {
  const id = getActiveTokenId()
  const query = { ...getParam(), id }
  return uuid(JSON.stringify(query))
})

// @ts-ignore
const isRouterActive = function(id: string | number) {
  const value = getActiveTokenId()
  if (value) {
    return equalsIgnoreCase(value, id);
  }
  return false
}

onBeforeMount(ready)

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
                <router-link class="flex items-center p-1.5" :to="item.href" :class="{'menu-active': isRouterActive(item.id)}">
                  <span class="inline-flex">
                    <IconFont rounded v-if="item.icon" :type="item.icon" size="24"></IconFont>
                    <IconFont v-else type="icon-morentoken" size="40"/>
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
      <div class="p-8" v-if="getActiveTokenId()">
        <Apy2TokenContent :key="contentKey" :id="getActiveTokenId()" :category="tabList"/>
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

.el-button--small {
  @apply rounded-md text-global-highTitle text-opacity-85;
  &.is-plain {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
}
</style>
