<script setup lang="ts">
import { defineProps, toRefs ,ref} from 'vue'
// @ts-ignore
import { ElSwitch } from 'element-plus'

const props = defineProps({
  time: { type: Number },
  project: { type: String },
  title: {
    type: String,
  },
  options: { type: Object },
  timer:{type:Number}
})

const {
  data: realOptions,
  select,
} = toRefs(props.options)

const clickOption = (option) => {
  setTimeout(()=>{
    realOptions.value = realOptions.value.map((i) => {
      if (i.name !== option.name) {
        return i
      }
      i.status = option.status
      return i
    })
    show.value=!show.value
  },300)
}
const show=ref(false)
const optionShow=()=>{
  show.value=true
}
const optionClose=()=>{
  show.value=false
}
const showDownLoad=ref(false)
const openDown=()=>{
  showDownLoad.value=true
}
const closeDown=()=>{
  showDownLoad.value=false
}
</script>
<template>
  <div :id="project" class="flex flex-wrap items-center justify-between mb-3 mt-6 mt-0  md:mb-8  md:mb-3">
    <div class="xshidden flex items-center justify-center  w-full">
      <div style="font-size:24px;" class=" font-medium mr-1.5">{{ title }}</div>
      <div class="text-kd14px20px font-normal text-global-default opacity-65">({{ timer }} 秒后更新)</div>
    </div>
<!-- pc-->
    <div class="xshidden w-full">
      <div class="flex md:flex-row flex-col items-center justify-between w-full mt-5 md:items-center">
        <div class="flex items-center  ">
          <div class="mr-3 mt-3 md:mt-1 text-kd14px18px text-global-highTitle opacity-65 font-normal">池子指标 :</div>
          <div class="flex items-center flex-wrap ">
            <div v-for="(item,i) in realOptions">
              <div v-if="i>0" class="flex items-center mt-3 mr-3  md:mt-0">
                <div class=" mt-1 mr-2 text-kd14px18px font-normal text-global-highTitle">{{ item.name!=='剩余额度'?item.name:item.name+'(%)' }}</div>
                <div >
                  <el-switch
                      active-color="#2B8DFE"
                      :validate-event="false"
                      @change="clickOption(item)"
                      inactive-color="rgba(37, 62, 111, 0.1)"
                      v-model="item.status"
                  >
                  </el-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center relative">
          <img class="w-4 h-4 mr-1" src="https://res.ikingdata.com/nav/apyBell.png" alt="">
          <div @mousemove="openDown" @mouseleave="closeDown" class="text-global-highTitle opacity-85 text-kd14px18px hand">扫码下载 App，获取 APY 第一名变化提醒</div>
          <img v-if="showDownLoad" style="width:136px;height:136px;" class="absolute z-111 top-9 right-0" src="https://res.ikingdata.com/nav/apyDownLoad.png" alt="">
        </div>

      </div>
    </div>
<!--    mobile-->
    <div class="mdhidden  mt-6 w-full ">
        <div class="flex md:flex-row flex-col relative  w-full md:items-center">
          <div class="flex items-center justify-between  w-full" >
            <div class="flex items-center" @mousemove="optionShow" @mouseleave="optionClose">
              <div class="mr-1.5 text-kd14px18px text-global-highTitle opacity-65 font-normal">池子指标</div>
              <img  class="w-4.5 h-4.5" src="https://res.ikingdata.com/nav/apySet.png" alt="">
            </div>
            <div class="text-kd14px20px font-normal text-global-default opacity-65">({{ timer }} 秒后更新)</div>
          </div>
          <div v-show="show" @mousemove="optionShow"  class=" optionModel">
            <div v-for="(item,i) in realOptions">
              <div v-if="i>0" class="flex items-center mr-1.5 mt-4 h-4.5  justify-between ">
                <div class=" mt-1 mr-2 text-kd14px18px font-normal text-global-highTitle">{{ item.name!=='剩余额度'?item.name:item.name+'(%)' }}</div>
                <div >
                  <el-switch
                      active-color="#2B8DFE"
                      :validate-event="false"
                      @change="clickOption(item)"
                      inactive-color="rgba(37, 62, 111, 0.1)"
                      v-model="item.status"
                  >
                  </el-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="postcss" scoped>
.optionModel{
  border-radius:4px;
  position: absolute;
  width: 167px;
  z-index: 1111;
  top: 23px;
  @apply items-center flex-wrap    bg-white px-4 pb-4;
}
</style>
