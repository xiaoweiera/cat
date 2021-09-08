<script setup lang="ts">
import {defineProps} from 'vue'
import * as R from 'ramda'
import { tolocaleUpperCase} from '~/lib/tool'
// @ts-ignore
import { toNumberFormat, toNumberCashFormat } from '~/utils'

const props= defineProps({
  data:Object
})
const getIconType=(name:string)=>`icon-${tolocaleUpperCase(R.slice(0,1,name))}`
</script>
<template>
<div class="font-kdExp w-full" v-if="data">
  <div class="flex justify-between items-center w-full">
    <div>
      <div>
        <span class="text-kd12px20px text-global-highTitle mr-1.5">{{data.symbol}}</span>
        <span class="text-global-highTitle text-opacity-65">
          <span class="text-kd12px20px">TVL:</span>
          <span class="text-kd12px20px ml-2">{{toNumberCashFormat(data.tvl, '$')}}</span>
        </span>
      </div>
      <div class="flex items-center">
        <IconFont :type="data.chain" size="14"></IconFont>
        <IconFont class="ml-1" :type="data.project_category" size="14"/>
        <div class="ml-1 text-kd12px14px text-global-highTitle text-opacity-65" v-if="data.strategy_tags">{{data.strategy_tags}}</div>
      </div>
    </div>
      <div class="text-kd12px20px text-global-highTitle text-opacity-85">
        <span>APY:</span>
        <span class="ml-2">{{toNumberFormat(data.apy, '%')}}</span>
      </div>
  </div>

</div>
</template>
<style scoped lang="scss">

</style>
