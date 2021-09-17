<script lang="ts" setup>
import {chainPage} from '~/logic/topRank/config'
import I18n from '~/utils/i18n/index'
</script>
<template>
  <div class=" md:pb-13.5 pb-8 min-h-100 bg-global-topBg ">
    <div class=" mx-auto ">
      <div class=' bg-global-white'>
        <div class='flex md:flex-row max-w-360 mx-auto  items-end flex-col items-stretch px-4  md:px-20 mt-4.5 md:mt-20.5 items-center'>
          <div class='flex-1 w-full'>
            <DappRankInfo :title='I18n.dapp.rank.title' />
            <div class="w-full flex justify-center flex-wrap mt-4 md:mt-8">
              <Chains :page='chainPage.dapp_rank'/>
            </div>
          </div>
          <div class='md:ml-6  mt-4 md:mt-1.5 md:w-129.75    w-full'>
            <DappChart />
          </div>
        </div>

      </div>
<!--      <div class='showX md:max-w-360 mx-auto   px-4 md:px-20'>-->
<!--        <DappRankTable class=' md:w-full w-227.5'/>-->
<!--      </div>-->
      <div class='showX md:max-w-360 mx-auto   px-4 md:px-20'>
        <DappRankTable />
      </div>

    </div>

  </div>
</template>



