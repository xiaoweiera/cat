<script lang="ts" setup>
import {chainPage} from '~/logic/topRank/config'
</script>
<template>
  <div class="  pb-53.5 min-h-100 bg-global-topBg ">
    <div class=" mx-auto ">
      <div class=' bg-global-white'>
        <div class='flex md:flex-row max-w-360 mx-auto  items-end flex-col items-stretch px-4 pb-3 md:px-20 pt-21 items-center'>
          <div class='flex-1 w-full'>
            <DappRankInfo title='快速发现优质 Dapp' />
            <div class="w-full flex justify-center flex-wrap mt-4 md:mt-6">
              <Chains :page='chainPage.dapp_new'/>
            </div>
          </div>
          <div class='md:ml-6 md:w-129.75   w-full'>
            <DappChart />
          </div>
        </div>

      </div>
      <div class='showX max-w-360 mx-auto   px-4 md:px-20'>
        <DappRankTable class=' md:w-full w-227.5'/>
      </div>


    </div>

  </div>
</template>



