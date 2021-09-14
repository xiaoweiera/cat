<script lang="ts" setup>
import {dappHeader,dappHeaderMobile} from '~/logic/topRank/config'
import {chain} from '~/store/config'
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



    <template v-for="(item,i) in [1,2,3]">
    <TopRankDappTableItem class='xshidden' :headerData='dappHeader' :i="i" :item="item"/>
      <TopRankDappTableItem class='mdhidden' :headerData='dappHeaderMobile' :i="i" :item="item"/>
    </template>
  </div>
</template>



