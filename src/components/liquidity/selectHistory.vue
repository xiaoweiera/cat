<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref, reactive,onMounted,watch,defineProps} from 'vue'
import {symbolStore, pairStore } from '~/store/liquidity/state'
import {subStr} from '~/lib/tool'
const data=ref([])
const props = defineProps({
  close:Function,
  selectTxt:String
})
onMounted(()=>{
  const list=['测试','测试','测试','测试']
  localStorage.setItem('history',JSON.stringify(list))
  data.value= JSON.parse(localStorage.getItem('history'))

})
</script>
<template>
  <ul class="mt-3">
    <li class="text-global-default opacity-65 mb-1 text-kd14px18px  px-3">历史记录</li>
    <template v-for="item in data">
      <li class=" hand flex items-center px-3 ">
        <img class="w-4 h-4" src="https://res.ikingdata.com/nav/clock.jpg" alt="">
        <div class="ml-2 coinName">{{item}}</div>
      </li>
    </template>
  </ul>
  <!--      交易对-->
</template>
<style lang="postcss" scoped>
.more {
  @apply text-kd14px18px px-3 py-1.5 text-global-primary font-normal;
}  .coinName {
     @apply text-kd14px20px py-1.5 text-global-default opacity-85 font-normal;
   }
.selectBg {
  background: rgba(43, 141, 254, 0.08);
}

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
