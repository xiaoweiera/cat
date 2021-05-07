<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, onMounted, ref} from 'vue'
import {chartsConfig} from '~/logic/apy/config'

const props = defineProps({
  state:{type:Boolean},
  changeState:{type:Function},
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
  <div v-if="state" class="dialogModel">
    <img class="closeButton" @click="changeState(false)" src="https://res.ikingdata.com/nav/apyBigClose.png" alt="">
    <div class="dialogChart">

    </div>
  </div>
</template>
<style lang="postcss" scoped>
.dialogModel{
  width:100%;
  position: fixed;
  height:100%;
  z-index:10;
  background: rgba(68, 90, 132, 0.3);
  backdrop-filter: blur(1.4px);
  top:0;
  left:0;
  margin:0 auto;
}
.dialogChart{
  background: white;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:auto;
  width: 80%;
  height:83%;
}
.closeButton{
  width: 16.97px;
  height: 16.97px;
  position: absolute;
  right:7%;
  top:4.5%;
}
</style>