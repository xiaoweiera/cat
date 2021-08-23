<script setup lang="ts">
import { map } from '~/utils'
import { defineProps, onMounted, ref } from 'vue'
import { getPoolsList } from '~/logic/apy2/token'
// 定义 props
import Props from '~/components/apy2/token/props'
// @ts-ignore
import { selectChains } from '~/logic/apy2/config'
import { setInject } from '~/utils/use/state'

// @ts-ignore
const props = defineProps(Props())

// @ts-ignore
const setPoolList = setInject('poolList')

// @ts-ignore
const radios = [
  { label: '单币', value: 'token' },
  { label: 'LP', value: 'lp' }
]

const poolList = ref<any[]>([])

const updatePoolList = async function() {
  const data: any = await getPoolsList({ pool_type: props.type })
  if (data && data.length > 0) {
    poolList.value = [...data]
  }
}

// @ts-ignore
const onSumbit = function(value: Array<string | number>) {
  const ids = map((item: any) => item.id, value)
  if (ids && ids.length > 0) {
    // setPoolList(ids.join(','))
  }
}

// @ts-ignore
const onChange = function(data: object) {
  console.log(data)
}

const ready = function() {
  return updatePoolList()
}

onMounted(ready)

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="flex-1 w-1">
        <span class="inline-block leading-6 align-middle text-global-highTitle text-opacity-85 text-xl">BTC 挖矿 APY TOP 10</span>
        <span class="inline-block leading-6 ml-1.5 text-xs text-global-highTitle text-opacity-45">更新时间：1分钟前</span>
      </p>
      <div class="ml-5">
        <div class="cursor-pointer text-global-highTitle text-opacity-65">
          <!-- 保存 echarts 图表 -->
          <EchartsDownload title="收益"/>
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
        <UiTransfer title="添加矿池" sub-title="已选矿池" :list="poolList" :radios="radios" :selects="selectChains" @submit="onSumbit" @changeParam="onChange">
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
            <Apy2TokenPool :data="scope.data"/>
          </template>
          <!-- 自定义右侧列表显示内容 -->
          <template #result="scope">
            <Apy2TokenPool v-if="scope.data" :data="scope.data"/>
          </template>
        </UiTransfer>
      </div>
      <div>
        <UiDateDay/>
      </div>
    </div>
  </div>
</template>

