<script setup lang="ts">
import { reactive, ref, defineProps, toRaw } from 'vue'
import { getEchartData } from '~/logic/apy2/token'
import { watchState } from '~/utils/use/state'
import dataEventName, { getDateValue } from '~/components/ui/date/eventname'
import { uuid } from '~/utils'
import { chartFormatter } from '~/lib/common'
import { Position, LegendDirection, EchartData } from '~/logic/echarts/interface'

import Props from './props'

const loading = ref<boolean>(false)
const echartKey = ref<string>('')
const echartData = reactive<EchartData>(new EchartData())

const props = defineProps(Props())
const param=ref()
const updateData = async function(date: any, pools: number[]) {
  loading.value = true
  const query = {
    ...date,
    ...props,
    pools: pools.join(','),
  }
  param.value=query
  echartKey.value = uuid(JSON.stringify(query))
}

watchState([dataEventName.value, 'poolList'], function(result: any[]) {
  const date = getDateValue(result[0])
  let pools = []
  if (result[1]) {
    const [ list = [] ] = toRaw(result[1])
    pools.push(...list)
  }
  updateData(date, pools)
})


</script>

<template>
        <Apy2TopContainer class="mt-4" v-if="props.type==='mining'" page='token_farm' origin='token' dialogType='mining' :symbol="props.symbol"  :key="echartKey" :header="false" :paramData="param" :token="true"  type="mining" />
        <Apy2TopContainer class="mt-4" v-else :key="echartKey" page='token_borrow' origin='token' dialogType='lend' :symbol="props.symbol"  :header="false" :paramData="param" :token="true"  type="lend"/>
</template>
