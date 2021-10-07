<script lang='ts' setup>
import {defineProps,ref,watch} from 'vue'
import { imgSrc } from '~/logic/cat/config'
const props=defineProps({
  sold:Number,
  time:Number
})
//滑点列表
const soldList=[0.1,0.5,1]
//是否是自定义
const isEdit=ref(false)
//自定义滑点值
const soldInput=ref(1)
const soldEdit=()=>isEdit.value=true
//改变滑点
const changeSold=(number:string)=>{
  isEdit.value=false
  props.sold.value=number
}
watch(()=>soldInput.value,(n)=>props.sold.value=n)
watch(()=>isEdit.value,(n)=>{
  if(n){
    props.sold.value=soldInput.value
  }
})
</script>
<template>
  <div class='w-82.5 h-58 bg-global-white shadow rounded-kd16px p-4 '>
    <div class='text-kd16px24px font-semibold'>Transaction settings</div>

    <div class='mt-4 flex items-center'>
      <span class='text-global-huiBold text-kd16px24px mr-1'>Maximum sold</span>
      <img :src="`${imgSrc}/tip.png`" class='w-3.5 h-3.5 hand' alt=''>
    </div>
    <div class='flex items-center mt-3'>
      <template v-for='item in soldList' :key='item'>
        <div @click='changeSold(item)' :class='sold.value===item && !isEdit?"taged":"tag"'>{{item}}%</div>
      </template>
      <div  class="tag  ml-5 relative hand" :class='isEdit?"taged":"tag"'>
        <el-input @click='soldEdit()' v-model='soldInput' placeholder='' class='hand'></el-input>
        <span class='absolute -right-4'>%</span>
      </div>

    </div>
    <div class='mt-4 flex items-center'>
      <span class='text-global-huiBold text-kd16px24px mr-1'>Transaction term</span>
      <img :src="`${imgSrc}/tip.png`" class='w-3.5 h-3.5 hand' alt=''>
    </div>
<!--    输入框-->
    <div class='h-9 flex items-center mt-3'>
      <el-input   v-model="time.value" />
      <span class='text-global-huiBold text-kd16px24px ml-2.5'>Minutes</span>
    </div>
  </div>
</template>
<style scoped>


::v-deep(.el-input__inner){
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #B1B5C4;
  background: #FCFCFD;
  border: 1px solid #E6E8EC;
  border-radius: 8px;
  @apply w-25 h-9 cursor-pointer;
}
::v-deep(.el-input){
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #B1B5C4;
  @apply w-25 h-9;
}
.taged{
  border: 1px solid #3772FF;
  @apply mr-1.5 w-15  h-9 flex items-center justify-center  font-bold text-kd14px24px text-global-primary rounded-kd8px cursor-pointer;
}
.tag{
  border: 1px solid #E6E8EC;
  @apply mr-1.5 w-15  h-9 flex items-center justify-center font-bold text-kd14px24px text-global-hui rounded-kd8px cursor-pointer;
}
.shadow{
  border: 1px solid #E6E8EC;
  box-sizing: border-box;
  /* 小阴影 */

  box-shadow: 0px 4px 12px rgba(20, 20, 22, 0.06);
}
</style>