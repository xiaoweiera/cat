<script lang="ts" setup>
//@ts-ignore
import {nftHeader} from '~/logic/topRank/config'
import {chain} from '~/store/config'
import { GroupPosition } from '~/logic/dapp/interface'
import {nftList} from '~/logic/topRank/nft'
import {reactive,onMounted,ref,watch} from 'vue'
import I18n from '~/utils/i18n/index'
import * as API from '~/api'
const keyNumber=ref(0)
const is_Compare=ref(true)
const loading=ref(false)
const param=reactive({
  chain:chain.value,
  group_id:'',
  interval:'24h',
  sort_field:'volume',
  sort_type:'desc',
  query:'',
})
const pageInfo={
  page:1,
  page_size:10
}
const list=ref([])
const resultNumber=ref(0)
const getData=async (clear:boolean)=>{
  loading.value=true
  const newParam  = {
    ...param,
    ...pageInfo
  }
  const res=await nftList(newParam)
  if(clear){
    pageInfo.page=1
    list.value=[]
  }
  resultNumber.value=res.page_info.total
  list.value=list.value.concat(res.results)
  loading.value=false
}
const more=()=>{
  pageInfo.page++
  return getData()
}
onMounted(getData())
//更改tag
const onGetList = (value:object)=>{
  pageInfo.page=1
  param.group_id=value.group_id
}
//监听param
watch(param,(n)=>getData(true))
watch(()=>chain.value,(n)=>{
  param.chain=n
  getData(true)}
)
const onSort=(v:any)=>{
  pageInfo.page=1
  if(param.sort_field!==v.sort_field){
    keyNumber.value++
  }
  param.sort_field=v.sort_field
  param.sort_type=v.sort_type
}

</script>
<template>
  <div class='NftRank'>
    <div>
      <DappTabs :position="GroupPosition.nftRank" @change="onGetList">
        <div class="flex items-center justify-between w-full  ">
          <div class='flex items-center xshidden md:flex-1 '>
            <span class="mr-1.5 text-sm text-global-highTitle text-opacity-85 i8n-font-inter">{{I18n.dapp.rank.comparison}}</span>
            <el-switch v-model="is_Compare"></el-switch>
          </div>
          <div class='interval md:order-1 order-2 md:flex-1 ' >
            <el-select   v-model="param.interval"   size="small" >
              <el-option v-for="item in ['7d','24h']"  :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class='query md:order-2 order-1  flex-1 i8n-font-inter  mr-3 md:mr-0'>
            <el-input :placeholder="I18n.dapp.rank.searchProject" v-model="param.query" size="small">
              <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </div>
      </DappTabs>
    </div>

    <div class='relative'>
      <div v-if='list.length>0 ' class='showX'>
        <div class=' md:w-full w-227.5'>
          <div class="header h-10.5 px-3 xshidden bg-global-white flex items-center rounded-kd6px">
            <template v-for="(item,i) in nftHeader">
              <div :class="i===0?item.width+item.class:item.width+item.class+' ml-6'" class="flex whitespace-nowrap    exp text-kd14px18px txt65 text-global-highTitle  ">
                <UiSort :key='keyNumber' v-if='item.sort' :sort='param.sort_field===item.key?param.sort_type:""' :title="item.name" :name="item.key" @change="onSort"></UiSort>
                <span v-else>{{item.name}}</span>
              </div>
            </template>
          </div>
          <div class="header h-10.5 mdhidden px-3 bg-global-white flex items-center rounded-kd6px">
            <template v-for="(item,i) in nftHeader">
              <div :class="i===0?item.width+item.class:item.width+item.class+' ml-3'" class="flex whitespace-nowrap    exp text-kd14px18px txt65 text-global-highTitle  ">
                <UiSort v-if='item.sort' :title="item.name" :sort='param.sort_field===item.key?param.sort_type:""' :name="item.key" @change="onSort"></UiSort>
                <span v-else>{{item.name}}</span>
              </div>
            </template>
          </div>
          <template v-for="(item,i) in list">
            <NftRankTableItem class='xshidden' :is_Compare='is_Compare' :sortName='param.sort_field' :headerData='nftHeader' :i="i" :item="item"/>
            <NftRankTableItem class='mdhidden' :sortName='param.sort_field' :headerData='nftHeader' :i="i" :item="item"/>
          </template>
        </div>

      </div>
      <div v-else>
        <Empty v-show='!loading' :desc="I18n.apy.tips.noData"></Empty>
      </div>
      <div v-show="list.length<resultNumber" class='text-center mt-3'>
        <UiButtonMore class='i8n-font-inter' :request="more"/>
      </div>
      <UiLoading v-if='loading' class='min-h-100 absolute  top-0 z-2'/>
    </div>
  </div>
</template>
<style  lang='scss'>
.NftRank{
  .interval{
    .el-input__inner{
      background: none;
      width:80px;
      height: 34px !important;
      @apply border-global-highTitle border-opacity-10;
    }
  }
  .query{
    .el-input__inner{
      background: none;
      height: 34px !important;
      @apply w-full md:w-45 flex items-center border-global-highTitle border-opacity-10;
    }
  }
}


</style>



