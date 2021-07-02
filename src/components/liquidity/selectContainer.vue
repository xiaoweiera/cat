<script setup lang="ts">
import {ref,watch} from 'vue'
import {selectTxt,selectHistory} from '~/store/liquidity/state'
const isHasHistory=ref(localStorage.getItem('history') && localStorage.getItem( 'history')!=='null'?true:false)

const show=ref(false)
const changeShow=(state:boolean)=>{
  show.value=state
}
watch(()=>selectHistory.value,()=>{
  isHasHistory.value=localStorage.getItem('history') && localStorage.getItem( 'history')!=='null'?true:false
})
</script>
<template>
  <div class="selectContainer">
  <el-popover popper-class="liquidity-search-select-con" placement="bottom" :offset="0" :show-arrow="false" :width="600" v-model:visible="show" trigger="click">
    <template #reference>
      <div class="flex items-center w-full h-14.5 bottomBorder">
        <LiquidityPlats />
        <div class="text-global-default opacity-12 text-kd36px140px">|</div>
        <LiquiditySelectTool  :changeShow="changeShow"/>
      </div>
    </template>
    <div v-show="selectTxt" class="showY">
      <LiquiditySelectToken  />
      <LiquiditySelectPair class="mt-2.5"/>
    </div>
    <div v-show="!selectTxt">
      <LiquiditySelectHistory v-show="isHasHistory"/>
      <div v-show="isHasHistory" class="mb-3 mt-3.5" style="border-top:1px solid rgba(37, 62, 111, 0.08);"></div>
      <LiquiditySelectHot/>
    </div>

  </el-popover>
  </div>
</template>

<style >
.liquidity-search-select-con{
  overflow: auto !important;
  padding:12px 12px 12px 12px !important;
  border:1px solid red;
  margin-left:90px !important;
  @apply max-h-153;
}
.bottomBorder {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
.liquidity-search-select-con::-webkit-scrollbar {
  height: 15px;
  @apply w-1;
}

.liquidity-search-select-con::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}
</style>
