<script setup lang="ts">
import { ref,reactive,watch} from 'vue'
import { ElSelect,ElOption,ElIcon} from 'element-plus'
const chartFilterOption=reactive({
  //@ts-ignore
  chainOption:reactive({chains:['ETH','HECO','BSC','HSC'],selectName:'HECO'}),
  typeOption:reactive({types:[],selectName:''}),
  platOption:reactive({plats:[],selectName:''}),
  coinOption:reactive({conins:[],selectName:''}),
  markOption:reactive({marks:[],selectName:''})
})

const chains=reactive({name:'所在链',select:'HECO',data:['ETH','HECO','BSC','HSC']})
</script>
<template>
  <div class=" w-56 ml-5">
    <!--    所在链-->
    <div class="flex items-center justify-between w-full  h-10 h-7.5 mb-6">
      <ApyChartFilter   :chains="chains"/>
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
