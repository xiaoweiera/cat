<script setup lang="ts">
import { map } from '~/utils'
import { defineProps, ref } from 'vue'
import { getPoolsList } from '~/logic/apy2/token'
import Props from '~/components/apy2/token/props'
import { selectChains } from '~/logic/apy2/config'
import { setInject } from '~/utils/use/state'
import DBList from '@fengqiaogang/dblist'
import I18n from '~/utils/i18n/index'

const props = defineProps(Props())

const setPoolList = setInject('poolList')

const radios = [
  { label: I18n.apy.token.pool.token, value: 'token' },
  { label: I18n.apy.token.pool.lp, value: 'lp' }
]

const poolList = ref<any[]>([])

const updatePoolList = async function(query?: object) {
  const param = Object.assign({
    chain: 'all',
    symbol_type: radios[0].value,
    symbol_alias: props.symbol,
  }, query || {}, { pool_type: props.type })
  const data: any = await getPoolsList(param)
  if (data && data.length > 0) {
    const db = new DBList(data)
    poolList.value = db.clone()
  } else {
    poolList.value = []
  }
  return []
}

// @ts-ignore
const onSumbit = function(list: any[]) {
  const value = map((item: any) => item.id, list)
  setPoolList(value)
}

// @ts-ignore
const onChange = function(data: any) {
  const query = {
    query: data.search,
    chain: data.chain,
    symbol_type: data.radioValue,
  }
  updatePoolList(query)
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="flex-1 w-1">
        <span class="inline-block leading-6 align-middle text-global-highTitle text-opacity-85 text-kd18px24px">APY TOP 10</span>
<!--        <span class="inline-block leading-6 ml-1.5 text-xs text-global-highTitle text-opacity-45">更新时间：1分钟前</span>-->
      </p>
      <div class="ml-5">
        <div class="cursor-pointer text-global-highTitle text-opacity-65">
          <!-- 保存 echarts 图表 -->
          <UiDownloadButton :title="`${symbol}top10`"/>
        </div>
      </div>
    </div>
    <p class="mt-1.5">
      <span class="leading-6 text-xs text-global-highTitle text-opacity-45">{{ I18n.apy.token.description }}</span>
    </p>
  </div>
  <div class="mt-3">
    <div class="flex justify-between items-center">
      <div>
        <UiTransfer :title="I18n.apy.token.pool.add" :sub-title="I18n.apy.token.pool.selected" :max="10" :list="poolList" :radios="radios" :selects="selectChains" @submit="onSumbit" @changeParam="onChange" :onload="updatePoolList">
          <template #content>
            <el-button plain size="small">
              <div class="inline-flex items-center px-3 py-0.5">
                <IconFont class="flex mr-1" type="icon-plus" size="16"/>
                <span class="text-sm">{{ I18n.apy.token.pool.add }}</span>
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

