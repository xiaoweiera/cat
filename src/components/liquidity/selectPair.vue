<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref, reactive,onMounted,watch,defineProps} from 'vue'
import { coinList, tradingList } from '/mock/liquidity'
import {symbolStore, pairStore,selectTxt } from '~/store/liquidity/state'
import {getInfoByPair} from '~/api/liquidity'
import {subStr} from '~/lib/tool'
const props = defineProps({
  close:Function
})
const allData=ref([]) //请求数据的个数
const pairList=ref([])
const page=ref(1) //页数
const size=10 //每页数量
const initSize=5 //首次加载数量

const param={
  platId:1,
  query:''
}

const changeSelect = (state) => {
  props.close(state)
}
const changePair = (symbol0:string,name: string,id:string,tokenId:string) => {
  symbolStore.name=symbol0
  symbolStore.id=tokenId
  pairStore.name=name
  pairStore.id=id
  changeSelect(false)
}

const getData=(list:any)=>{
  const pairDB=new DBList(list)
  pairList.value=pairDB.select({}, initSize)
}
//更多
const addMore=()=>{
  const pairDB=new DBList(allData.value)
  pairList.value=pairDB.select({}, initSize+(size*page.value))
  page.value++
}
watch(()=>selectTxt.value,async (n)=> {
  page.value = 1
  //如果为空则制空
  if (!n) {
    pairList.value = []
    return
  }
  param.query = n
  const result = await getInfoByPair(param)
  if (result?.data?.code === 0) {
    allData.value = result?.data?.data
    console.log(allData, '---')
    getData(result?.data?.data)
  } else {
    pairList.value = []
  }
})
</script>
<template>
  <ul class="mt-3">
    <li class="text-global-default opacity-65 text-kd14px18px py-1.5 px-3">交易对</li>
    <template v-for="item in pairList">
      <li class="itemLi hand" :class="{selectBg:pairStore.id === item.pair_id}" @click="changePair(item.symbol0,item.pair,item.pair_id,item.symbol0_id)">
        <div class="coinName">
          <span>{{ subStr(item.pair) }}</span>
        </div>
      </li>
    </template>
    <li v-if="allData.length>initSize && allData.length!==pairList.length" @click="addMore" class="more hand">查看更多</li>
  </ul>
  <!--      交易对-->
</template>
<style lang="postcss" scoped>
.more {
  @apply text-kd14px18px px-3 py-1.5 text-global-primary font-normal;
}

.itemLi {
  @apply flex items-center justify-between px-3;
  .coinName {
    @apply text-kd14px20px py-1.5 text-global-default opacity-85 font-normal;
  }
  .coinTip {
    border: 1px solid rgba(43, 141, 254, 0.4);
    border-radius: 2px;
    @apply px-1 py-0.5 text-kd12px16px flex items-center justify-center text-global-primary font-bold;
  }
  &:hover {
    background: rgba(43, 141, 254, 0.08);
  }
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
