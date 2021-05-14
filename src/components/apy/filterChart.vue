<script setup lang="ts">
import {ref, reactive, watch, defineProps, onBeforeMount, onMounted} from 'vue'
import { getInfo} from '~/logic/apy/chartOption'
const props=defineProps({
  chainId:String,
  category:String,
  chartIndex:Number,
})
interface  dataSetModel{
  chain:string
  category:string
}
const typeName='type'
const param:dataSetModel={ chain:props.chainId, category:props.category}
const {chains,types,plats,coins,marks,getData}=getInfo(param)

watch(()=>chains.select,(n,o)=>{
  param.chain=n.toLowerCase()
  getData(param)
})
watch(()=>types.select,(n,o)=>{
  console.log(n)
  param.category=n
  getData(param)
})
onMounted(()=>{
  getData()
})
</script>
<template>
  <div class=" w-56 ml-5">
    <!-- 所在链-->
    <div class="items-center justify-between w-full  h-10 h-7.5 mb-6">
      <ApyChartFilter   :dataList="chains"/>
      <ApyChartFilter :typeName="typeName"  :dataList="types"/>
      <ApyChartFilter    :dataList="plats"/>
      <ApyChartFilter v-if="props.chartIndex!==2"   :dataList="coins"/>
      <ApyChartFilter   :dataList="marks"/>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-input__suffix){
  margin-top:-5px;
}
::v-deep(.el-input__inner){
  height:30px;
}
.selectDes{
  color:rgba(37, 62, 111, 0.65);
  @apply text-kd14px18px ;
}
</style>
