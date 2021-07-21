

<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref, reactive,onMounted,watch,defineProps} from 'vue'
import { coinList, tradingList } from '/mock/liquidity'
import {symbolStore, pairStore,selectTxt,setHistory } from '~/store/liquidity/state'
import {getInfoByPair} from '~/api/liquidity'
import {useRoute, useRouter} from 'vue-router'
import {changeRoute,subStr, changeRouteParam, toFixedNumber,numberUnitFormat,smallToken,formatRulesNumber} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import {setInject } from '~/utils/use/state'
const setSelectTableShow= setInject('selectTableShow')
const allData=ref([]) //请求数据的个数
const pairList=ref([])
const page=ref(1) //页数
const size=10 //每页数量
const initSize=3 //首次加载数量

const param={
  platId:1,
  query:''
}

const changePair = (symbol0:string,name: string,id:string,tokenId:string) => {
  symbolStore.name=symbol0
  symbolStore.id=tokenId
  pairStore.name=name
  pairStore.id=id
  changeRouteParam(route,router,{token:tokenId})
  changeRouteParam(route,router,{pair:id,pairName:name})
  setHistory({name:name,pair_id:id,tokenName:symbol0,token_id:tokenId,type:'pair'})
  setSelectTableShow(false)

}
const route = useRoute()
const router = useRouter()
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
const getList=async ()=>{
  page.value = 1
  //如果为空则制空
  if (!selectTxt.value) {
    pairList.value = []
    return
  }
  param.query = selectTxt.value
  const result = await getInfoByPair(param)
  if (result?.data?.code === 0) {
    allData.value = result?.data?.data
    getData(result?.data?.data)
  } else {
    pairList.value = []
  }
}
watch(()=>selectTxt.value,async (n)=> {
  getList()
})
onMounted(getList)
</script>
<template>
  <ul>
    <li class="text-global-default text-kd14px18px mb-1 px-4 text-kdFang  ">{{I18n.liquidity.select.tradingPairs}}</li>
    <div class="flex py-1.5 header-Border px-4">
      <div class="header-txt txtSmall  w-50  whitespace-nowrap"># Pair</div>
      <div class="header-txt w-28.5 ml-5">{{I18n.liquidity.select.changePrice}}</div>
      <div class="header-txt w-31.5 ml-5 text-right">TVL</div>
    </div>
    <template v-for="item in pairList">
      <li class="flex items-center hand content-item py-2 px-4 text-kd14px16x font-kdExp text-global-default  text-opacity-85" :class="{selectBg:pairStore.id === item.pair_id}" @click="changePair(item.symbol0,item.pair,item.pair_id,item.symbol0_id)">
        <el-tooltip :hide-after="10" :content="item.pair" placement="bottom" effect="light">
          <div style="font-weight: 700;" class="txtSmall w-50 whitespace-nowrap  font-kdFang  text-kd14px16px font-bold  "><span>{{ item.pair }}</span></div>
        </el-tooltip>
        <el-tooltip :hide-after="10" :content="'1:'+item.price" placement="bottom" effect="light">
          <div class="w-28.5 ml-5">1:{{formatRulesNumber(item.price) }}</div>
        </el-tooltip>
        <el-tooltip :hide-after="10" :content="item.tvl" placement="bottom" effect="light">
          <div class="w-31.5 ml-5 text-right">${{formatRulesNumber(item.tvl)}}</div>
        </el-tooltip>
      </li>
    </template>
    <li v-if="allData.length>initSize && allData.length!==pairList.length" @click="addMore" class="more hand px-4">{{I18n.liquidity.select.more}}</li>
  </ul>
</template>
<style lang="postcss" scoped>

.header-Border{
  border:none;
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
  @apply text-kd14px18px py-1.5 text-global-primary font-normal  text-left ;
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

