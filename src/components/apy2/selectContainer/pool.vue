

<script lang="ts" setup>
import DBList from '@fengqiaogang/dblist'
import I18n from '~/utils/i18n/index'
import { ref,toRefs, reactive,onMounted,watch,defineProps} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {getPoolSearch} from '~/api/apy2/index.vue'
import {formatRulesNumber,getIconType,tolocaleLowerCase} from '~/lib/tool'
import * as api from '~/api/index'
const txt=getInject('txt')
const props = defineProps({pageType: String,chain:String,load:Boolean})
const {state:prposLoad,number:propsNumber}=toRefs(props.load)
const allData=ref([]) //请求数据的个数
const initSize=4 //首次加载数量
const resultNumber=ref(0)
const param={
  query:txt.value[0],
  pool_type:props.pageType,
  chain:props.chain,
  page:1,
  page_size:initSize
}
watch(()=>props?.pageType,(n)=>{
  param.pool_type=n
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
  prposLoad.value=true
  const result=await api.apy.common.getPoolSearch(param)
  if(result.code===0){
    if(param.page===1) allData.value=[]
    resultNumber.value=result.data.length
    allData.value=allData.value.concat(result.data)
  }else{
    allData.value=[]
  }
  propsNumber.value=allData.value.length
  prposLoad.value=false
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
const platUrl=(projectId:number)=>`/apy/project?id=${projectId}`
</script>
<template>
  <div v-if="allData.length>0" class=" mt-4"  name="select">
      <div class="text-global-highTitle opacity-45 text-kd12px16px  text-kdFang"  name="select">{{I18n.apyIndex.pools}}</div>
    <div class='py-1'>
      <template v-for="item in allData">
        <Apy2PoolDialog type="mining" :id="item.id">
          <template #reference>
            <div class="flex items-center hand  h-9 justify-between" name="select">
              <div class="flex items-center" name="select">
                <img name="select" :class="item.symbol_type==='lp'?'w-8':'w-5'" class="h-5 mr-1" :src="item.symbol_logo" alt="">
                <span name="select" class="text-kd14px14px text-global-highTitle font-kdExp">{{item.symbol}}</span>
                <span name="select" class="text-kd14px14px text-global-highTitle text-opacity-65 font-kdExp ml-1">{{item.project}}</span>
                <img name="select" class="w-3.5 h-3.5 ml-1" :src="chainsIcon[tolocaleLowerCase(item.chain)]" alt="">
                <IconFont name="select" :type="getIconType(item.project_category)" size="14" class="ml-1"/>
                <div name="select" v-if="item.strategy_tags" class="bg-global-highTitle bg-opacity-6 px-1 py-0.5 rounded-kd4px ml-1 text-kd12px14px text-global-highTitle text-opacity-45">{{item.strategy_tags}}</div>
              </div>
              <div name="select" class="flex items-center">
                <span name="select" class="text-kd13px18px text-global-highTitle text-opacity-65 font-kdFang">APY</span>
                <span name="select" :class="getApyColor(item.apy)" class="ml-1 text-kd14px14px font-kdExp font-bold">{{formatRulesNumber(item.apy)}}%</span>
              </div>
            </div>
          </template>
        </Apy2PoolDialog>

      </template>
    </div>
      <div name="select" v-if="resultNumber===initSize" @click="addMore" class="more hand ">{{I18n.apyIndex.more}}</div>
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

