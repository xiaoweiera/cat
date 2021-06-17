<script setup lang="ts">
import {toRefs, ref, defineProps} from 'vue'
// @ts-ignore
import {ElSwitch} from 'element-plus'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'

const props = defineProps({
  time: {type: Number},
  project: {type: String},
  title: {
    type: String,
  },
  options: {type: Object},
  timer: {type: Number},
})
//单利  复利 默认单利
const isSingle=ref(true)
const {data: realOptions, select} = toRefs(props.options)

const show = ref(false)

const clickOption = (option) => {
  setTimeout(() => {
    realOptions.value = realOptions.value.map((i) => {
      if (i.name !== option.name) {
        return i
      }
      i.status = option.status
      return i
    })
    show.value = !show.value
  }, 100)
}

const optionShow = () => {
  show.value = true
}
const optionClose = () => {
  show.value = false
}
const showDownLoad = ref(false)
const openDown = () => {
  showDownLoad.value = true
}
const closeDown = () => {
  showDownLoad.value = false
}
//单利 复利
const changeSinge=(type:boolean)=>{
  if(type!==isSingle.value){
    isSingle.value=type
    // 'single_detail','compound_detail'
    setTimeout(() => {
      realOptions.value = realOptions.value.map((i) => {
        if(type) {
          if (i.key === 'compound_detail' || i.key === 'compound_and_mine_award') {
            i.status = false
            return i
          }
          if (i.key === 'single_detail' || i.key === 'single_and_mine_award') {
            i.status = true
            return i
          }
        }else{
          if (i.key === 'compound_detail' || i.key === 'compound_and_mine_award') {
            i.status = true
            return i
          }
          if (i.key === 'single_detail' || i.key === 'single_and_mine_award') {
            i.status = false
            return i
          }
        }
        return i
      })
      show.value = !show.value
    }, 100)
  }
}
</script>
<template>
  <div :id="project" class="flex flex-wrap items-center justify-between mb-3 mt-6 mt-0 md:mb-8 md:mb-3">
    <!-- pc-->
    <div class="xshidden w-full">
      <div class="flex md:flex-row flex-col items-center justify-between w-full mt-5 md:items-center">
        <div class="flex items-center">
          <div class="mr-3 mt-3 md:mt-1 text-kd14px18px text-global-highTitle opacity-65 font-normal">{{ I18n.apy.poolsMarks }} :</div>
          <div class="flex items-center flex-wrap">
            <div class="flex items-center singCom">
              <div @click="changeSinge(true)" :class="isSingle?'selectTag':'defaultTag'">{{I18n.apy.single_detail}}</div>
              <div @click="changeSinge(false)" :class="isSingle?'defaultTag':'selectTag'">{{I18n.apy.compound_detail}}</div>
            </div>
            <div v-for="(item, i) in realOptions">
              <div v-if="i > 3" class="flex items-center mt-3 mr-3 md:mt-0">
                <div class="mt-1 mr-2 text-kd14px18px font-normal text-global-highTitle">
                  {{ item.name !== '剩余额度' ? item.name : item.name + '(%)' }}
                </div>
                <div>
                  <el-switch v-model="item.status" active-color="#2B8DFE" :validate-event="false" inactive-color="rgba(37, 62, 111, 0.1)" @change="clickOption(item)">
                  </el-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center relative">
          <img class="w-4 h-4 mr-1" src="https://res.ikingdata.com/nav/apyBell.png" alt=""/>
          <div class="text-global-highTitle opacity-85 text-kd14px18px hand" @mousemove="openDown" @mouseleave="closeDown">
            {{ I18n.apy.downTip }}
          </div>
          <img v-if="showDownLoad" style="width: 136px; height: 136px" class="shadowQr absolute z-111 top-5 right-0" src="https://res.ikingdata.com/nav/apyDownqr.png" alt=""/>
        </div>
      </div>
    </div>
    <!--    mobile-->
    <div class="mdhidden mt-6 w-full">
      <div class="flex md:flex-row flex-col relative w-full md:items-center">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center" @mousemove="optionShow" @mouseleave="optionClose">
            <div class="mr-1.5 text-kd14px18px text-global-highTitle opacity-65 font-normal">
              {{ I18n.apy.poolsMarks }}
            </div>
            <img class="w-4.5 h-4.5" src="https://res.ikingdata.com/nav/apySet.png" alt=""/>
          </div>
          <div class="text-kd14px20px font-normal text-global-default opacity-65">
            <span v-if="lang.current.value === 'cn'">({{ timer }} 秒后更新)</span>
            <span v-else> (Update in {{ timer }} s)</span>
          </div>
        </div>
        <div v-show="show" class="optionModel" @mousemove="optionShow">
          <div class="flex items-center singCom w-20 mt-4">
            <div @click="changeSinge(true)" :class="isSingle?'selectTag':'defaultTag'">{{I18n.apy.single_detail}}</div>
            <div @click="changeSinge(false)" :class="isSingle?'defaultTag':'selectTag'">{{I18n.apy.compound_detail}}</div>
          </div>
          <div v-for="(item, i) in realOptions">
            <div v-if="i >3" class="flex items-center mr-1.5 mt-4 h-4.5 justify-between">
              <div class="mt-1 mr-2 text-kd14px18px font-normal text-global-highTitle">
                {{item.name !== I18n.apy.remainRatio ? item.name : item.name + '(%)' }}
              </div>
              <div>
                <el-switch
                    v-model="item.status"
                    active-color="#2B8DFE"
                    :validate-event="false"
                    inactive-color="rgba(37, 62, 111, 0.1)"
                    @change="clickOption(item)"
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
.singCom{
  border-radius: 42px;
  border:1px solid rgba(43, 141, 254, 1);
  @apply  w-22  flex  justify-between mr-3;
}
.defaultTag{
  border-radius: 42px;
  @apply text-kd14px18px text-global-highTitle  flex-1    text-center py-0.5   opacity-85 cursor-pointer;
}
.selectTag{
  border-radius: 42px;
  @apply text-kd14px18px bg-global-primary flex-1 font-medium px-1 text-center   py-0.5 text-global-white  cursor-pointer;
}
.shadowQr {
  box-shadow: 4px 8px 10px rgba(0, 0, 0, 0.12);
}

.optionModel {
  border-radius: 4px;
  position: absolute;
  width: 167px;
  z-index: 1111;
  top: 23px;
  @apply items-center flex-wrap    bg-white px-4 pb-4;
}
</style>
