<script setup lang="ts">
import {defineProps} from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import * as R from 'ramda'
import {formatRulesNumber,tolocaleUpperCase} from '~/lib/tool'
const props=defineProps({data:Object})
const getIconType=(name:string)=>`icon-${tolocaleUpperCase(R.slice(0,1,name))}`
</script>
<template>
  <div class="font-kdExp w-full ">
    <div class="flex justify-between items-center w-full ">
      <div>
        <div>
          <span class="text-kd12px20px text-global-highTitle mr-1.5">{{data.symbol}}</span>
          <span class="text-global-highTitle text-opacity-65"><span><span class="text-kd12px20px ">可借额度</span>: </span><span class="text-kd12px20px ">${{formatRulesNumber(data.quota_remain)}}</span></span>
        </div>
        <div class="flex items-center">
          <img class="w-3.5 h-3.5 mr-1" :src="chainsIcon[tolocaleLowerCase(data.chain)]" alt="">
          <IconFont v-if="props.data?.pool_type" :type="getIconType(props.data?.pool_type)" size="14"/>
          <div class="ml-1 text-kd12px14px text-global-highTitle text-opacity-65">{{data.strategy_tags}}</div>
        </div>

      </div>
      <div class="text-kd12px20px text-global-highTitle text-opacity-85">APR:  <span>{{formatRulesNumber(data.apy)}}</span>%</div>
    </div>

  </div>
</template>
<style scoped lang="scss">

</style>