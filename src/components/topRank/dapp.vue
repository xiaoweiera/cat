<script lang="ts" setup>
import {chainPage} from '~/logic/topRank/config'
</script>
<template>
  <div class="border-1 pt-8  min-h-100 bg-global-topBg ">
    <div class="max-w-360 px-4 md:px-20 mx-auto">
      <div class="w-full flex justify-center">
        <Chains :page='chainPage.dapp_new'/>
      </div>
      <div class='showX mt-3'>
        <TopRankDappTable class=' md:w-full w-227.5'/>
      </div>

    </div>

  </div>
</template>



