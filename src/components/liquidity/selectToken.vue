<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref,toRefs, reactive,onMounted,watch,defineProps} from 'vue'
import { coinList, tradingList } from '/mock/liquidity'
import { symbolStore,pairStore,selectTxt,setHistory } from '~/store/liquidity/state'
import {getInfoByToken} from '~/api/liquidity'
import {useRoute, useRouter} from 'vue-router'
import {subStr,changeRouteParam} from '~/lib/tool'
const props = defineProps({
  close:Function
})
const allData=ref([]) //请求数据的个数
const tokenList=ref([])
const page=ref(1) //页数
const size=10 //每页数量
const initSize=5 //首次加载数量
const param={
  platId:1,
  query:''
}
const route = useRoute()
const router = useRouter()
const changeSelect = (state) => {
  props.close(state)
}
const changeToken = (name: string,id:string) => {
  symbolStore.name=name
  symbolStore.id=id
  pairStore.id=''
  pairStore.name=''
  changeRouteParam(route,router,{token:id})
  setHistory({token_id:id,name:name,type:'token'})
  changeSelect(false)
}
const getData=(list:any)=>{
  const tokenDB=new DBList(list)
  tokenList.value=tokenDB.select({}, initSize)
}
//更多
const addMore=()=>{
  const tokenDB=new DBList(allData.value)
  tokenList.value=tokenDB.select({}, initSize+(size*page.value))
  page.value++
}
const getList=async ()=>{
  page.value=1
  //如果为空则制空
  if(!selectTxt.value){
    tokenList.value=[]
    return
  }
  param.query=selectTxt.value
  const result=await getInfoByToken(param)
  if(result?.data?.code===0){
    allData.value=result?.data?.data
    getData(result?.data?.data)
  }else{
    tokenList.value=[]
  }
}
watch(()=>selectTxt.value,async (n,o)=>{
  getList()
})
onMounted(()=>{
  getList()
})
</script>
<template>
  <ul>
    <li class="text-global-default opacity-65 text-kd14px18px py-1.5 text-kdFang font-medium ">币种</li>
    <div class="flex py-1.5 header-Border">
      <div class="header-txt w-35">Name/Symbol</div>
      <div class="header-txt w-30">合约地址</div>
      <div class="header-txt w-30">TVL</div>
      <div class="header-txt flex-1">价格</div>
    </div>

    <template v-for="item in tokenList">
      <li class="itemLi hand" :class="{selectBg:symbolStore.id === item.symbol_id}" @click="changeToken(item.symbol,item.symbol_id)">
        <div class="coinName">
          <span>{{ subStr(item.symbol) }}</span>,<span class="ml-2">{{ subStr(item.symbol_name) }}</span>
        </div>

      </li>
    </template>
    <li v-if="allData.length>initSize && allData.length!==tokenList.length" @click="addMore" class="more hand">查看更多</li>
  </ul>
  <!--      交易对-->
</template>
<style lang="postcss" scoped>
.header-Border{
  border:none;
  border-top:1px solid rgba(37, 62, 111, 0.08);
  border-bottom:1px solid rgba(37, 62, 111, 0.08);
}
.header-txt{
  @apply text-kdFang text-kd12px16px text-global-default text-opacity-65 border-1;
}
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
