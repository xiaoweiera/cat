<script setup lang="ts">
import { ref,reactive,watch,defineProps,onBeforeMount} from 'vue'
import { getInfo} from '~/logic/apy/chartOption'
const props=defineProps({
  chartIndex:Number
})
interface  dataSetModel{
  chain:string
  category:string
}
const param:dataSetModel=reactive({ chain:'heco', category:'machine_gun_pool_single'})
const chains=reactive({name:'所在链',select:'HECO',data:['ETH','HECO','BSC','HSC']})
const types=reactive({name:'类型',select:'',data:[]})
const plats=reactive({name:'平台',select:'',data:[]})
const coins=reactive({name:'币种',select:'',data:[]})
const marks=reactive({name:'指标',select:'',data:[]})
const initData=async(param:dataSetModel)=>{
  await getInfo(param)
}
onBeforeMount( initData(param))
</script>
<template>
  <div class=" w-56 ml-5">
    <!-- 所在链-->
    <div class="items-center justify-between w-full  h-10 h-7.5 mb-6">
      <ApyChartFilter   :dataList="chains"/>
      <ApyChartFilter   :dataList="types"/>
      <ApyChartFilter   :dataList="plats"/>
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
