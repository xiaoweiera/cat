<script lang="ts" setup>
import {chainPage} from '~/logic/topRank/config'
</script>
<template>
  <div class="border-1 pt-8  pb-13.5 min-h-100 bg-global-topBg ">
    <div class="max-w-360 px-4 md:px-20 mx-auto">
      <div class='flex md:flex-row flex-col items-center'>
        <div class='flex-1 w-full'>
          <TopRankInfo title='快速发现优质 Dapp' />
          <div class="w-full flex justify-center flex-wrap mt-4 md:mt-6">
            <Chains :page='chainPage.dapp_new'/>
          </div>
        </div>
       <div class='border-1 md:w-129.75 w-full'>
         图
       </div>
      </div>



      <div class='showX mt-3'>
        <TopRankDappTable class=' md:w-full w-227.5'/>
      </div>



    </div>

  </div>
</template>



