<script lang="ts" setup>
import { useProvide } from '~/utils/use/state'
import {selectTxt} from '~/store/liquidity/state'
import { pairStore} from '~/store/liquidity/state'
const [tokenTableShow, ] = useProvide('tokenTableShow', false)
const [selectTableShow, ] = useProvide('selectTableShow', false)
</script>
<template>
  <div class="bg-global-white ">
    <div class="py-4 px-4">
      <LiquidityMobileSelectContainer />
      <LiquidityMobileInfo v-if="!selectTableShow[0]"/>
      <LiquidityMobilePairInfo v-if="!selectTableShow[0] && pairStore.id"/>
    </div>
    <LiquidityMobileSelectTable v-if="selectTableShow[0]"/>
      <LiquidityMobileTokenTable v-if="!selectTableShow[0]" />
    <div v-if="!tokenTableShow[0] && !selectTableShow[0]" class="px-4  pb-4">
      <LiquidityMobileChangeTypeTag/>
      <LiquidityMobileFilterOption/>
    </div>
  </div>
  <div v-if="!tokenTableShow[0] && !selectTableShow[0]">
    <LiquidityMobileChartMainChart/>
  </div>

</template>
<style>
.showY {
  overflow: hidden;
  overflow-y: auto;
}
</style>