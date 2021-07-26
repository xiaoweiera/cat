

<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref,toRefs, reactive,onMounted,watch,defineProps} from 'vue'
import { coinList, tradingList } from '/mock/liquidity'
import { symbolStore,pairStore,selectTxt,setHistory } from '~/store/liquidity/state'
import {getInfoByToken} from '~/api/liquidity'
import {useRoute, useRouter} from 'vue-router'
import {changeRoute, changeRouteParam,smallToken,formatRulesNumber} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
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
const changeToken = (name: string,id:string) => {

  symbolStore.name=name
  symbolStore.id=id
  pairStore.id=''
  pairStore.name=''
  changeRouteParam(route,router,{token:id,pair:undefined,pairName:undefined})
  // changeRouteParam(route,router,{pair:undefined,pairName:undefined})
  setHistory({token_id:id,name:name,type:'token'})
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
    <li class="text-global-default opacity-65 text-kd14px18px mb-3 text-kdFang font-medium ">{{I18n.liquidity.select.coinType}}</li>
    <div class="flex py-1.5 header-Border ">
      <div class="header-txt txtSmall  w-50  whitespace-nowrap"># Name/Symbol</div>
      <div class="header-txt w-25 ml-5">{{I18n.liquidity.select.address}}</div>
      <div class="header-txt w-27.5 ml-5">TVL</div>
      <div class="header-txt w-32.5 ml-5">{{I18n.liquidity.select.price}}</div>
    </div>
    <template v-for="item in tokenList">
      <li v-login  class="flex items-center hand content-item py-1.5 mt-1.5" :class="{selectBg:symbolStore.id === item.symbol_id}" @click="changeToken(item.symbol,item.symbol_id)">
        <el-tooltip :hide-after="10" :content="item.symbol+', '+item.symbol_name" placement="bottom" effect="light">
          <div class="txtSmall w-50 whitespace-nowrap  ">
            <span>{{ item.symbol}}</span>,<span class="ml-2">{{ item.symbol_name}}</span>
          </div>
        </el-tooltip>
        <el-tooltip :hide-after="10" :content="item.symbol_id" placement="bottom" effect="light">
          <div class="w-25 ml-5 whitespace-nowrap  ">{{smallToken(item.symbol_id)}}</div>
        </el-tooltip>
        <el-tooltip :hide-after="10" :content="item.tvl" placement="bottom" effect="light">
          <div class="w-27.5 ml-5 ">${{formatRulesNumber(item.tvl) }}</div>
        </el-tooltip>
        <el-tooltip :hide-after="10" :content="item.price" placement="bottom" effect="light">
          <div class="w-32.5 ml-5">{{formatRulesNumber(item.price) }}</div>
        </el-tooltip>
      </li>
    </template>
    <li v-if="allData.length>initSize && allData.length!==tokenList.length" @click="addMore" class="more hand ">{{I18n.liquidity.select.more}}</li>
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
  @apply font-normal text-kdFang text-kd12px16px text-global-default text-opacity-65 ;
}

.txtSmall {
  text-overflow: ellipsis;
  overflow: hidden;
}
.content-item{
  @apply text-kdExp text-kd14px20px text-global-default opacity-85;
}
.more {
  @apply text-kd14px18px py-1.5 text-global-primary font-normal  text-center mt-2;
}

.itemLi {
  @apply flex items-center;

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

