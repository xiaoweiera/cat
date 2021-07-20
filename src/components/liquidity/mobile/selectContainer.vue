<script setup lang="ts">
import {ref,watch} from 'vue'
import {selectTxt} from '~/store/liquidity/state'

const show=ref(false)
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
  <div class="selectContainer flex items-center bg-global-bgHui h-11">
    <LiquidityPlats />
    <div class="flex flex-1 relative text-kd12px14px items-center  ml-2  font-kdFang mr-3  ">
      <el-input v-model="selectTxt"  placeholder="查看自选或搜索币种" @change="changeSelect()" ></el-input>
      <img class="w-3.5 h-3.5" src="https://res.ikingdata.com/nav/topicSearch.png" alt=""/>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.selectContainer{
  border-radius: 12px;
}
::v-deep(.el-input__inner) {
  height: 20px;
  background: none;
  border: 0;
}

::v-deep(.el-input__inner) {
  line-height:18px !important;
  font-size: 16px !important;
  padding-left: 0px;
  @apply font-kdExp !important;
}
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
