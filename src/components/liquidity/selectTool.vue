<script lang="ts" setup>
import { ref,watch,reactive,defineProps} from 'vue'
import {selectTxt} from '~/store/liquidity/state'
const props = defineProps({
  changeShow: Function
})
const changeSelect = () => {
  props.changeShow(true)
}
// 加延迟不然会先执行blur，不执行click
const inputBlur = () => {
  setTimeout(() => {
    changeSelect(false)
  }, 100)
}
watch(()=>selectTxt.value,(n)=>{
  props.changeShow(true)
})
</script>
<template>
  <div class="flex flex-1 relative text-kd12px14px items-center ml-1 pl-1.5 pr-3 font-kdFang h-14.5">
    <el-input v-model="selectTxt"  placeholder="搜索币种/交易对/合约地址" @change="changeSelect()" ></el-input>
    <img class="w-3.5 h-3.5" src="https://res.ikingdata.com/nav/topicSearch.png" alt=""/>
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
  font-size: 11px !important;
  padding-left: 0px;
}
</style>
