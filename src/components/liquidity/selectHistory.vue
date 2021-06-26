<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref, reactive,onMounted,watch,defineProps} from 'vue'
import {symbolStore, pairStore,getHistory } from '~/store/liquidity/state'
import {subStr,changeRouteParam} from '~/lib/tool'
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const data=ref([])
const props = defineProps({
  close:Function
})
const changeSelect = (state) => {
  props.close(state)
}
const selectHistory=(item:any)=>{
  if(item.type==='token'){
    symbolStore.name=item.name
    symbolStore.id=item.token_id
    pairStore.id=''
    pairStore.name=''
    changeRouteParam(route,router,{token:item.id})
  }else{
    symbolStore.name=item.tokenName
    symbolStore.id=item.token_id
    pairStore.name=item.name
    pairStore.id=item.pair_id
    changeRouteParam(route,router,{token:item.token_id})
    changeRouteParam(route,router,{pair:item.pair_id,pairName:item.name})
  }
  changeSelect(false)
}

onMounted(()=>{
  data.value=getHistory()
})
</script>
<template>
  <ul class="mt-3">
    <li class="text-global-default opacity-65 mb-1 text-kd14px18px  px-3">历史记录</li>
    <template v-for="item in data">
      <li v-if="item.type" @click="selectHistory(item)" class=" hand flex items-center px-3 ">
        <img class="w-4 h-4" src="https://res.ikingdata.com/nav/clock.jpg" alt="">
        <div class="ml-2 coinName">{{item.name}}</div>
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
