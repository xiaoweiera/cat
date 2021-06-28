<script lang="ts" setup>
import { ref,watch,reactive} from 'vue'
import {selectTxt} from '~/store/liquidity/state'
const coinShow = reactive({valueData:false})
const changeSelect = () => {
  console.log(coinShow.valueData)
  coinShow.valueData = !coinShow.valueData
}
// 加延迟不然会先执行blur，不执行click
const inputBlur = () => {
  setTimeout(() => {
    changeSelect(false)
  }, 100)
}
const close=(state:boolean)=>{
  coinShow.valueData=state
}
watch(()=>selectTxt.value,(n)=>{
  coinShow.valueData=n?true:false
})
</script>
<template>
  <div class="flex flex-1 relative items-center ml-1 pl-1.5 pr-3 font-kdFang h-14.5">
    <el-input v-model="selectTxt" class="selectClass" placeholder="搜索" @click="changeSelect()" ></el-input>
    <img class="w-3.5 h-3.5" src="https://res.ikingdata.com/nav/topicSearch.png" alt=""/>
    <!--    弹窗-->
      <div v-if="coinShow.valueData && selectTxt" class="absolute top-14.5 right-0 w-51.25 py-1.5 z-2 tipContainer h-82.5 overflow-hidden overflow-y-auto">
        <LiquiditySelectToken  :close="close" />
        <LiquiditySelectPair :close="close" />
      </div>
      <div v-if="coinShow.valueData && !selectTxt" class="absolute top-14.5 right-0 w-51.25  z-2 tipContainer h-42.5 overflow-hidden overflow-y-auto">
        <LiquiditySelectHistory  :close="close" />
      </div>


  </div>
</template>
<style lang="postcss" scoped>
.tipContainer {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(43, 140, 255, 0.16);
  border-radius: 4px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    background: rgba(0, 0, 0, 0.1);
  }
}
::v-deep(.el-input__inner) {
  height: 20px;
  background: none;
  border: 0;
}

::v-deep(.el-input__inner) {
  font-size: 14px !important;
  padding-left: 0px;
}
</style>
