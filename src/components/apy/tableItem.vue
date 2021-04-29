<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue'

const props = defineProps({
  itemData: {
    type: Object,
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
  },
})
const isShow = ref(false)
const isNullFun = (data: any) => {
  data.forEach(item => {
    if (item.value) {
      isShow.value = true
    }
  })
}
const getColor = (index: number, data: string) => {
  if (index !== 0 || !data) {
    return ''
  }
  if (data.indexOf('-') <0) {
    return 'greenTxt'
  } else {
    return 'redTxt'
  }
}
const getValue=(data:any)=>{
  if(!data.value)return '-'
  else{
    if(data.name==='剩余额度'){
      return data.value+'%'
    }else{
      return data.value
    }
  }
}
onMounted(() => isNullFun(props.itemData))
</script>
<template>
  <div v-if="isShow" class="w-full h-full flex flex-col justify-center ">
    <template v-for="(item,i) in itemData">
      <div v-if="item.status" class="flex mb-0.5 items-center  flex-wrap ">
        <span class="desName mr-1 ">{{ item.name }}</span>
        <div :class="i===0?'desNum ':'text-global-hightTitle text-kd12px16px '  "><span :class="getColor(i,item.value)">{{getValue(item)}}</span></div>
      </div>
    </template>
  </div>
  <div v-else class="w-full h-full flex flex-col justify-center items-center    px-3">
    <img style="width:112px;" src="https://res.ikingdata.com/nav/tableLogo.png" alt="">
  </div>
</template>

<style scoped lang="postcss">
.tableLogo{
  width:112.39px;
  height:36px;
}
.greenTxt {
  color: #00A44B;
  font-size: 20px;
  line-height: 24px;
}

.redTxt {
  color: #E9592D;
  font-size: 20px;
  line-height: 24px;
}

.Red {
  @apply text-global-numRed;
}

.topBg {
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}

.desName {
  @apply text-kd12px16px flex items-center text-global-default font-normal opacity-65;
}

.desNum {
  font-size: 14px;
  @apply font-kdExp font-bold text-global-highTitle ;
}

.desInfo {
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>
