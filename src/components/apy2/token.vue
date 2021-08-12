<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { onMounted, toRaw } from 'vue'
import { tokenList } from '~/store/apy2/state'
// @ts-ignore
import makeRouterPath from '~/utils/router'
// @ts-ignore
import { ready } from '~/logic/apy2/token'
import { useProvide } from '~/utils/use/state'
import { useRoute } from 'vue-router'
import { Position, LegendDirection, colors, seriesType } from '~/logic/echarts/interface'
import safeGet from '@fengqiaogang/safe-get'
import safeSet from '@fengqiaogang/safe-set'
import { equalsIgnoreCase } from '~/utils'

// @ts-ignore
const [ date ] = useProvide('uiDate')

// 获取当前路由对象
const router = useRoute()

// @ts-ignore
const radios = [
  { label: '单币', value: 1 },
  { label: 'LP', value: 2 }
]
const selects = [
  { label: '选择公链', value: 1 },
]

const onSumbit = function(value: Array<string | number>) {

}

const isRouterActive = function(item: any, type: string) {
  const $router = toRaw(router)
  const query: Query = $router.query.value as any
  // 处理默认值
  if (!safeGet(query, type)) {
    if (type === 'type') {
      safeSet(query, type, 1)
    }
    if (type === 'id') {
      const [ item ] = toRaw(tokenList.value)
      safeSet(query, type, item.id)
    }
  }
  return equalsIgnoreCase(query[type], item[type]);
}

onMounted(ready)

const legends = [
  {
    id: 'd-1',
    name: 'BTC', // 名称
    unit: '', // 单位
    kline: false, // 是否为价格线 (价格线会放到右侧显示)
    type: 'line',  // line / bar
    color: '', // 颜色 （为空取系统默认颜色）
  },
  { id: 'd-2', name: 'ETH', unit: '', type: 'line' },
  { id: 'd-3', name: 'HT', unit: '', type: 'line' },
  { id: 'd-4', name: 'BNB', unit: '', type: 'line' },
  { id: 'd-5', name: 'PI', unit: '', type: 'line' },
  { id: 'd-6', name: 'USDT', unit: '', type: 'line', kline: true }
]
const xAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const randomSeriesValue = function() {
  const array: Array<string | number> = []
  for (let i = 0; i < xAxis.length; i++) {
    const value = parseInt(Math.random() * 30 as any)
    array.push({ value })
  }
  return array
}

const series = {
  'd-1': randomSeriesValue(),
  'd-2': randomSeriesValue(),
  'd-3': randomSeriesValue(),
  'd-4': randomSeriesValue(),
  'd-5': randomSeriesValue(),
  'd-6': randomSeriesValue(),
}


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
            <router-link class="page-switch" :class="{'active': isRouterActive({ type: 1 }, 'type')}" :to="makeRouterPath({query: { type: 1 }})">
              <IconFont type="icon-danbi" size="24"/>
              <span class="ml-2">挖矿收益</span>
              <IconFont class="ml-1.5" type="icon-star-xuanzhong" size="16"/>
            </router-link>
            <router-link class="page-switch" :class="{'active': isRouterActive({ type: 2 }, 'type')}" :to="makeRouterPath({query: { type: 2 }})">
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
              <UiTransfer title="添加矿池" sub-title="已选矿池" :radios="radios" :selects="selects" @submit="onSumbit">
                <template #content>
                  <el-button plain size="small">
                    <div class="inline-flex items-center px-3 py-0.5">
                      <IconFont class="flex mr-1" type="icon-plus" size="16"/>
                      <span class="text-sm">添加矿池</span>
                    </div>
                  </el-button>
                </template>

                <!-- 自定义左侧列表显示内容 -->
                <template #item="scope">
                  <span class="text-global-highTitle text-xs font-normal">BTC/ETH-{{ scope.data }}</span>
                </template>
                <!-- 自定义右侧列表显示内容 -->
                <template #result="scope">
                  <span>BTC/ETH-{{ scope.id }}</span>
                </template>
              </UiTransfer>
            </div>
            <div>
              <UiDateDay :shortcuts="[{ value: '7', 'default': true }, '30', '180']"/>
            </div>
          </div>
          <!--挖矿收益-->
          <div v-if="isRouterActive({ type: 1 }, 'type')">
            <div class="h-85">
              <Echarts :legend="LegendDirection.custom">
                <!-- 提示框 trigger: 触发方式 -->
                <EchartsTooltip trigger="axis" />

                <template v-for="(item, index) in legends" :key="index">
                  <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
                </template>

                <EchartsYaxis :index="0" :position="Position.left"/>
                <EchartsYaxis :index="1" :position="Position.right"/>

                <!-- 设置X轴 -->
                <EchartsXaxis :value="xAxis"/>


                <!--数据-->
                <template v-for="(item, index) in legends" :key="index">
                  <!--
                    通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
                    value: 数据
                  -->
                  <EchartsSeries :index="index" :color="item.color" :value="series[item.id]"/>
                </template>
              </Echarts>
            </div>
            <div class="mt-8">
              <h3 class="text-xl text-global-highTitle text-opacity-85">BTC 所有 APY 池子</h3>
            </div>
          </div>

          <!--利率收益-->
          <div v-if="isRouterActive({ type: 2 }, 'type')">
            <div class="h-85">
              <Echarts :legend="LegendDirection.custom">
                <!-- 提示框 trigger: 触发方式 -->
                <EchartsTooltip trigger="axis" />

                <template v-for="(item, index) in legends" :key="index">
                  <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
                </template>

                <EchartsYaxis :index="0" :position="Position.left"/>
                <EchartsYaxis :index="1" :position="Position.right"/>

                <!-- 设置X轴 -->
                <EchartsXaxis :value="xAxis"/>


                <!--数据-->
                <template v-for="(item, index) in legends" :key="index">
                  <!--
                    通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
                    value: 数据
                  -->
                  <EchartsSeries :index="index" :color="item.color" :value="series[item.id]"/>
                </template>
              </Echarts>
            </div>
            <div class="mt-8">
              <h3 class="text-xl text-global-highTitle text-opacity-85">借贷 BTC 的所有最佳路径</h3>
            </div>
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
