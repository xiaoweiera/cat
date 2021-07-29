<script lang="ts" setup>
import {ref,toRaw} from 'vue'
import * as R from 'ramda'
 const headers = ['地址', '净添加量', '添加总量', '移除总量', '参与次数', '添加次数', '移除次数']
const openHeaders=['时间','交易对','方向','净添加量','总价值']
 const data=ref([
   {
     index:0,
     address:'北京',
     netAddNumber:'1000',
     allNumber:'2000',
     removeNumber:'1200',
     joinNumber:'1100',
     addNumber:'888',
     removeCount:'123'
   },
   {
     index:1,
     address:'石家庄',
     netAddNumber:'1300',
     allNumber:'4000',
     removeNumber:'3200',
     joinNumber:'2100',
     addNumber:'688',
     removeCount:'1231'
   }
 ])
const openData=ref([
  {
    time:'2021-03-19 11:35',
    pair:'ETH/USDT',
    position:'添加流动性',
    netAddNumber:'1ETH+1678.22USDT',
    money:'≈$1678.2'
  },
  {
    time:'2021-03-19 11:35',
    pair:'ETH/USDT',
    position:'添加流动性',
    netAddNumber:'1ETH+1678.22USDT',
    money:'≈$1678.2'
  },
])
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
const row=ref(0)
const selectRow=(index:number)=>{
  row.value=index
}
</script>
<template>
<div class="w-300  mt-13 font-kdFang">
<div class="table w-full h-full bg-global-white">
  <div class="header  px-2.5 h-9 flex items-center">
    <template v-for="item in headers">
        <div class="flex-1  text-kd12px16px text-global-default text-opacity-65">{{item}}</div>
    </template>
  </div>
<!--  -->
  <div class="flex flex-col">
    <template v-for="(item,i) in data">
      <div @click="selectRow(i)" :class="row===i?'selectedRow':''" class=" hand   px-2.5  h-8.5  items-center flex  text-kd12px16px text-global-default text-opacity-65">
        <div class="flex-1"> {{ item.address }}</div>
        <div class="flex-1"> {{ item.netAddNumber }}</div>
        <div class="flex-1"> {{ item.allNumber }}</div>
        <div class="flex-1"> {{ item.removeNumber }}</div>
        <div class="flex-1"> {{ item.joinNumber }}</div>
        <div class="flex-1"> {{ item.addNumber }}</div>
        <div class="flex-1"> {{ item.removeCount }}</div>
      </div>
      <div v-if="row===i" class="h-30 px-2.5  flex flex-col openContainer ">
        <div class="flex mt-2.5 ">
          <template v-for="item in openHeaders">
            <div class="flex-1  items-center flex text-kd12px16px text-global-default text-opacity-65">{{item}}</div>
          </template>
        </div>
          <template v-for="v in openData">
            <div class="flex text-kd14px18px text-global-highTitle font-normal mt-2.5
             items-center ">
            <div class="flex-1">{{v.time}}</div>
            <div class="flex-1">{{v.pair}}</div>
            <div class="flex-1">{{v.position}}</div>
            <div class="flex-1">{{v.netAddNumber}}</div>
            <div class="flex-1">{{v.money}}</div>
        </div>
          </template>
      </div>
    </template>

  </div>
</div>
</div>


</template>
<style scoped>
.selectedRow{
  @apply bg-global-primary bg-opacity-8;
}
.openContainer{
  @apply bg-global-primary bg-opacity-4;
}
.header{
  border-top:1px solid rgba(37, 62, 111, 0.12);
  border-bottom:1px solid rgba(37, 62, 111, 0.12);
}

</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
