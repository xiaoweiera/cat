<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, onMounted, ref,watch} from 'vue'
import {chartsConfig} from '~/logic/apy/config'

const props = defineProps({
  state:{type:Boolean},
  changeState:{type:Function},
  title:{type:String},
  selected:{type:String},
  bigOption:{type:Object}
})
watch(()=>props.bigOption,(v,o)=>{
  console.log('3333',props.title, props.selected, props.bigOption)
})
</script>
<template>
  <div v-if="state" class="dialogModel">
    <img class="closeButton hand" @click="changeState(false)" src="https://res.ikingdata.com/nav/apyBigClose.png" alt="">
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
  background: rgba(68, 90, 132, 0.4);
  backdrop-filter: blur(10px);
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