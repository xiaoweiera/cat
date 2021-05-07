<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, onMounted, ref} from 'vue'
import {chartsConfig} from '~/logic/apy/config'

const props = defineProps({
  title:{type:String},
  selected: {type: String},
  tableIndex: {type: Number},
  chartIndex: {type: Number}
})
const getTitle=()=>{
  if(props.chartIndex===2){
    return props.title+props.selected+'对比'
  }else{
    return props.selected+' '+props.title
  }
}
</script>
<template>
  <div class="dialogModel">
  </div>
</template>
<style lang="postcss" scoped>
.dialogModel{
  width:100%;
  position: fixed;
  height:30%;
  background: red;
  top:0;
  margin:0 auto;

}
</style>