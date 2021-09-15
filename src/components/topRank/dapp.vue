<script lang="ts" setup>
import {chainPage} from '~/logic/topRank/config'
</script>
<template>
  <div class="border-1   pb-53.5 min-h-100 bg-global-topBg ">
    <div class="max-w-360  mx-auto">
      <div class='flex md:flex-row flex-col items-end px-4 pb-3 md:px-20 pt-8 items-center bg-global-white'>
        <div class='flex-1 w-full'>
          <TopRankInfo title='快速发现优质 Dapp' />
          <div class="w-full flex justify-center flex-wrap mt-4 md:mt-6">
            <Chains :page='chainPage.dapp_new'/>
          </div>
        </div>
       <div class='md:ml-6 md:w-129.75   w-full'>
         <TopRankChart />
       </div>
      </div>
      <div class='showX  px-4 md:px-20'>
        <TopRankDappTable class=' md:w-full w-227.5'/>
      </div>



    </div>

  </div>
</template>



