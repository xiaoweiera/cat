<script lang="ts" setup>
//@ts-ignore
import {dappHeader,dappHeaderMobile} from '~/logic/topRank/config'
import {chain} from '~/store/config'
import { GroupPosition } from '~/logic/dapp/interface'
import {dappList} from '~/logic/topRank/dapp'
import {reactive,onMounted,ref,watch} from 'vue'
import I18n from '~/utils/i18n/index'
import * as API from '~/api'
const keyNumber=ref(0)
const is_Compare=ref(true)
const param=reactive({
  chain:chain.value,
  group_id:'',
  interval:'24h',
  sort_field:'tvl',
  sort_type:'desc',
  query:'',
  page:1,
  page_size:3
})
const list=ref()
const resultNumber=ref(0)
const getData=async (clear:boolean)=>{
  const res=await dappList(param)
  if(clear){
    list.value=[]
  }
  resultNumber.value=res.page_info.total
  list.value=res.results
}
const more=()=>{
  param.page++
  getData()
}
//更改tag
const onGetList = (value:object)=> param.group_id=value.group_id
//监听param
watch(param,(n)=>getData(true))
const onSort=(v:any)=>{
  if(param.sort_field!==v.sort_field){
    keyNumber.value++
  }
  param.sort_field=v.sort_field
  param.sort_type=v.sort_type
}

</script>
<template>
  <div class='dappRank'>
    <div>
      <DappTabs :position="GroupPosition.dappNew" @change="onGetList">
        <div class="flex items-center justify-between w-full">
          <div class='flex items-center'>
            <IconFont type='icon-gang' class='w-0.1 mx-3 px-0 flex justify-center text-global-highTitle text-opacity-10'/>
            <span class="mr-1.5 text-sm text-global-highTitle text-opacity-85">显示对比</span>
            <el-switch v-model="is_Compare"></el-switch>
          </div>
          <div class='interval'>
            <el-select   v-model="param.interval"   size="small" >
              <el-option v-for="item in ['7d','24h']"  :label="item" :value="item">
              </el-option>
            </el-select>
          </div>
          <div class='query'>
            <el-input placeholder="搜索项目" v-model="param.query" size="small">
              <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </div>
      </DappTabs>
    </div>
    <div class="header h-10.5 px-3 xshidden bg-global-white flex items-center rounded-kd6px">
        <template v-for="(item,i) in dappHeader">
          <div :class="i===0?item.width+item.class:item.width+item.class+' ml-6'" class="flex whitespace-nowrap    exp text-kd14px18px txt65 text-global-highTitle  ">
            <UiSort :key='keyNumber' v-if='item.sort' :sort='param.sort_field===item.key?param.sort_type:""' :title="item.name" :name="item.key" @change="onSort"></UiSort>
            <span v-else>{{item.name}}</span>
          </div>
        </template>
    </div>
    <div class="header h-10.5 mdhidden px-3 bg-global-white flex items-center rounded-kd6px">
        <template v-for="(item,i) in dappHeaderMobile">
          <div :class="i===0?item.width+item.class:item.width+item.class+' ml-3'" class="flex whitespace-nowrap    exp text-kd14px18px txt65 text-global-highTitle  ">
            <UiSort v-if='item.sort' :title="item.name" sort='desc' :name="item.key" @change="onSort"></UiSort>
            <span v-else>{{item.name}}</span>
          </div>
        </template>
    </div>
    <template v-for="(item,i) in list">
      <TopRankDappTableItem class='xshidden' :is_Compare='is_Compare' :sortName='param.sort_field' :headerData='dappHeader' :i="i" :item="item"/>
      <TopRankDappTableItem class='mdhidden' :sortName='param.sort_field' :headerData='dappHeaderMobile' :i="i" :item="item"/>
    </template>
    <div @click="more" v-if="resultNumber===param.page_size" class="mx-auto text-kd14px18px text-global-highTitle text-opacity-65 w-50 py-2 text-center mt-4 hand font-kdFang bg-global-highTitle bg-opacity-6 px-3 py-2  rounded-kd4px">{{I18n.apyIndex.more}}</div>
  </div>
</template>
<style  lang='scss'>
.dappRank{
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
      width:180px;
      height: 34px !important;
      @apply flex items-center border-global-highTitle border-opacity-10;
    }
  }
}


</style>



