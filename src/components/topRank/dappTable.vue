<script lang="ts" setup>
import {dappHeader} from '~/logic/topRank/config'
</script>
<template>
  <div>
    <div class="header h-10.5 px-3 bg-global-white flex items-center rounded-kd6px">
<!--      <div class="exp text-kd14px20px txt85 w-10.5 border-1  text-center">{{i}}</div>-->
        <template v-for="(item,i) in dappHeader">
            <div :class="i===0?item.width+item.class:item.width+item.class+' ml-6'" class="flex     exp text-kd14px18px txt65 text-global-highTitle  ">{{item.name}}</div>
        </template>
    </div>

    <template v-for="(item,i) in [1,2,3]">
    <TopRankDappTableItem :i="i" :item="item"/>
    </template>
  </div>
</template>



