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
          <span class="text-kd12px20px text-global-highTitle mr-1.5">{{props.data?.name}}</span>
          <span class="text-global-highTitle text-opacity-65"><span><span class="text-kd12px20px ">TVL</span>: </span><span class="text-kd12px20px ">${{formatRulesNumber(props.data?.tvl)}}</span></span>
        </div>
        <div class="flex items-center">
          <template v-for="item in props.data.chains">
            <img class="w-3.5 h-3.5 mr-1" :src="chainsIcon[item]" alt="">
          </template>
          <template v-for="item in props.data.category">
            <IconFont class="mr-1" :type="getIconType(item)" size="14"/>
          </template>
          <div class="ml-1 text-kd12px14px text-global-highTitle text-opacity-65">{{props.data?.strategy_tags}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">

</style>