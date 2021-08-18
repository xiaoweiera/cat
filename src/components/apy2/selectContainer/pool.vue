

<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref,toRefs, reactive,onMounted,watch,defineProps} from 'vue'
import {searchPool} from '~/api/apy2'
import {useRoute, useRouter} from 'vue-router'
import {changeRoute, changeRouteParam,smallToken,formatRulesNumber} from '~/lib/tool'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
const txt=getInject('txt')
import I18n from '~/utils/i18n/index'
const allData=ref([]) //请求数据的个数
const listData=ref([])
const page=ref(1) //页数
const size=10 //每页数量
const initSize=4 //首次加载数量
const param={
  query:''
}
const route = useRoute()
const router = useRouter()
const getData=(list:any)=>{
  const tokenDB=new DBList(list)
  listData.value=tokenDB.select({}, initSize)
}
//更多
const addMore=()=>{
  const tokenDB=new DBList(allData.value)
  listData.value=tokenDB.select({}, initSize+(size*page.value))
  console.log(allData.value,'all')
  console.log(listData.value,'list',page.value)
  page.value++
}
const getList=async ()=>{
  page.value=1
  //如果为空则制空
  if(!txt.value[0]){
    listData.value=[]
    return
  }
  const result=await searchPool(param)
  if(result){
    allData.value=result
    getData(result)
  }else{
    listData.value=[]
  }
}
watch(()=>txt.value[0],async (n,o)=>{
  getList()
})
onMounted(()=>{
  getList()
})
const getApyColor=(v:number)=>v>=0?'text-global-numGreen':'text-global-numRed'
</script>
<template>
  <div class=" mt-4"  name="select">
    <ul>
      <li class="text-global-highTitle opacity-45 text-kd12px16px  text-kdFang"  name="select">池子</li>
      <template v-for="item in listData">
        <div class="flex items-center  h-9 justify-between" name="select">
          <div class="flex items-center" name="select">
            <img name="select" :class="item.type==='token'?'w-5':'w-8'" class="h-5 mr-1" :src="item.logo" alt="">
            <span name="select" class="text-kd14px14px text-global-highTitle font-kdExp">{{item.name}}</span>
            <span name="select" class="text-kd14px14px text-global-highTitle text-opacity-65 font-kdExp ml-1">Coinwind</span>
            <img name="select" class="w-3.5 h-3.5 ml-1" :src="chainsIcon['bsc']" alt="">
            <IconFont name="select" type="icon-V" size="14" class="ml-1"/>
             <div name="select" class="bg-global-highTitle bg-opacity-6 px-1 py-0.5 rounded-kd4px ml-1 text-kd12px14px text-global-highTitle text-opacity-45">cow 策略</div>
          </div>
          <div name="select" class="flex items-center">
            <span name="select" class="text-kd13px18px text-global-highTitle text-opacity-65 font-kdFang">APY</span>
            <span name="select" :class="getApyColor(item.apy)" class="ml-1 text-kd14px14px font-kdExp font-bold">{{item.apy}}%</span>
          </div>
        </div>
      </template>
      <li name="select" v-if="allData.length>initSize && allData.length!==listData.length" @click="addMore" class="more hand ">查看更多</li>
    </ul>
  </div>

</template>
<style lang="scss" scoped>

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
  @apply text-kd12px16px font-medium font-kdFang  text-global-primary font-normal  mt-2;
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

