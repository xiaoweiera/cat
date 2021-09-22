

<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import { ref,toRefs, reactive,onMounted,watch,defineProps} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {getTokenSearch} from '~/api/apy2/index'
import {formatRulesNumber} from '~/lib/tool'
import * as api from '~/api/index'
const txt=getInject('txt')
const props = defineProps({pageType: String,chain:String})
import I18n from '~/utils/i18n/index'
const allData=ref([]) //请求数据的个数
const initSize=4 //首次加载数量
const resultNumber=ref(0)
const param={
  query:txt.value[0],
  category:props.pageType,
  chain:props.chain,
  page:1,
  page_size:initSize
}
watch(()=>props?.pageType,(n)=>{
  param.category=n
  param.page=1
  getList()
})
const route = useRoute()
const router = useRouter()
//更多
const addMore=()=>{
  param.page++
  getList()
}
const getList=async ()=>{
  //如果为空则制空
  if(!txt.value[0]){
    allData.value=[]
    return
  }
  const result=await api.apy.common.getTokenSearch(param)
  if(result.code===0){
    if(param.page===1) allData.value=[]
    resultNumber.value=result.data.length
    allData.value=allData.value.concat(result.data)
  }else{
    allData.value=[]
  }
}
watch(()=>txt.value[0],async (n,o)=>{
  param.page=1
  param.query=n
  getList()
})
watch(()=>props.chain,(n)=>{
  param.chain=n
  param.page=1
  getList()
})
onMounted(()=>{
  getList()
})
const getApyColor=(v:number)=>v>=0?'text-global-numGreen':'text-global-numRed'
const tokenUrl=(tokenName:string)=>`/apy/token?symbol=${tokenName}`
</script>
<template>
  <div v-if="allData.length>0" class="mt-4" name="select">
      <div class="text-global-highTitle opacity-45 text-kd12px16px  text-kdFang" name="select">{{I18n.apyIndex.tokens}}</div>
    <div class=' py-1'>
      <template v-for="item in allData">
        <a v-router.blank="tokenUrl(item.name)" class="flex items-center hand  h-9  justify-between" name="select">
          <div class="flex items-center" name="select">
            <img class="w-5 h-5 mr-1" :src="item.icon" alt="" name="select">
            <span class="text-kd14px14px text-global-highTitle font-kdExp" name="select">{{item.name}}</span>
          </div>
          <div class="flex items-center" name="select">
            <span class="text-kd13px18px text-global-highTitle text-opacity-65 font-kdFang" name="select">{{I18n.apyIndex.highApy}}</span>
            <span :class="getApyColor(item.max_mining_apy)" class="ml-1 text-kd14px14px font-kdExp font-bold" name="select">{{formatRulesNumber(item.max_mining_apy)}}%</span>
          </div>
        </a>
      </template>
    </div>
      <div v-if="resultNumber===initSize" @click="addMore" class="more hand " name="select">{{I18n.apyIndex.more}}</div>
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
  @apply text-kd12px16px font-medium font-kdFang  text-global-primary font-normal;
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

