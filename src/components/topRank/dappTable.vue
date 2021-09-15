<script lang="ts" setup>
//@ts-ignore
import {dappHeader,dappHeaderMobile} from '~/logic/topRank/config'
import {chain} from '~/store/config'
import {dappList} from '~/logic/topRank/dapp'
import {reactive,onMounted,ref} from 'vue'
import I18n from '~/utils/i18n/index'
const param=reactive({
  chain:chain.value,
  group_id:'',
  interval:'',
  sort:'tvl',
  page:1,
  page_size:3
})
const list=ref()
const resultNumber=ref(0)
const getData=async ()=>{
  const res=await dappList(param)
  console.log(res[0],'--')
  resultNumber.value=res.length
  list.value=res
}
const more=()=>{
  param.page++
  getData()
}
onMounted(()=>getData())
</script>
<template>
  <div>
    <div class="header h-10.5 px-3 xshidden bg-global-white flex items-center rounded-kd6px">
        <template v-for="(item,i) in dappHeader">
          <div :class="i===0?item.width+item.class:item.width+item.class+' ml-6'" class="flex whitespace-nowrap    exp text-kd14px18px txt65 text-global-highTitle  ">{{item.name}}</div>
        </template>
    </div>
    <div class="header h-10.5 mdhidden px-3 bg-global-white flex items-center rounded-kd6px">
        <template v-for="(item,i) in dappHeaderMobile">
          <div :class="i===0?item.width+item.class:item.width+item.class+' ml-3'" class="flex  whitespace-nowrap   exp text-kd14px18px txt65 text-global-highTitle  ">{{item.name}}</div>
        </template>
    </div>



    <template v-for="(item,i) in list">
    <TopRankDappTableItem class='xshidden' :headerData='dappHeader' :i="i" :item="item"/>
      <TopRankDappTableItem class='mdhidden' :headerData='dappHeaderMobile' :i="i" :item="item"/>
    </template>

    <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">{{I18n.apyIndex.more}}</div>
  </div>
</template>



