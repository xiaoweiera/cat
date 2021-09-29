<script setup lang="ts">
import { defineProps } from "vue"
import I18n from '~/utils/i18n/index'
import { TabCategoryData } from '~/logic/apy2/interface'
// @ts-ignore
import { toInteger, toNumberCashFormat, toNumberFormat, isEmpty, toNumber } from '~/utils'
import hmt from '~/lib/hmt'
defineProps({
  data: {
    type: Object
  }
})

</script>

<template>
  <Apy2PoolDialog :type="TabCategoryData.mining" :id="data.id">
    <template #reference>
      <div class="apy-item">
        <el-popover popper-class="apy-hover-detail" placement="bottom-start" title="" width="fit-content" :show-after="300" trigger="hover" :show-arrow="false" :offset="0">
          <template #reference>
            <div  @click="hmt.event('表格部分打开池子详情页','mining_table_poolsinfo')" class="h-18.5 flex items-center w-full cursor-pointer" :class="{'new-30': data.new }">
              <div class="pl-4 pr-2 text-kdFang w-full">
                <div class="flex">
                  <template v-if="toNumber(data.apy) > 0">
                    <span class="text-kdExp text-global-numGreen font-bold text-xl leading-5">{{ toNumberFormat(data.apy, '%') }}</span>
                  </template>
                  <template v-else>
                    <span class="text-kdExp text-global-numRed font-bold text-xl">{{ toNumberFormat(data.apy, '%') }}</span>
                  </template>
                  <span class="text-kdExp ml-1 text-xs text-global-highTitle text-opacity-45" v-if="toInteger(data.lever) > 0">{{ toInteger(data.lever) }}X</span>
                </div>
                <div class="text-xs leading-3 mt-1">
<!--                  <span class="text-global-highTitle text-opacity-85">{{ data.project }}</span>-->
                  <span class="text-global-highTitle text-opacity-45 ml-1">TVL:</span>
                  <span class="text-kdExp text-global-highTitle text-opacity-85 ml-1">{{ toNumberCashFormat(data.tvl, '$') }}</span>
                </div>
                <div class="text-xs flex items-center justify-between mt-1">
                  <div class="flex items-center">
                    <IconFont :type="data.chain" size="14"/>
                    <IconFont :type="data.project_category" size="14" class="ml-1"/>
                    <span class="inline-block bg-global-highTitle bg-opacity-6 py-0.5 px-1 rounded ml-1" v-if="data.project">
                      <span class="text-global-highTitle text-opacity-45 text-xs leading-3.5">{{ data.project }}</span>
                    </span>
                  </div>
                  <div class="text-global-highTitle text-opacity-25">
<!--                    <IconFont v-if="data.warining_info" type="icon-info2" size="16"/>-->
                    <div v-if="data.project_url" @click.stop>
                      <a   @click="hmt.event('表格部分点击去挖矿','mining_table_deposit')" class="flex text-global-primary text-xs leading-3" v-router.blank="data.project_url">
                        <span>{{ I18n.apy.pool.mining }}</span>
                        <IconFont class="flex ml-1" type="icon-right" size="xs"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <Apy2BaseTableMiningDetail :data="data"/>
        </el-popover>
      </div>
    </template>
  </Apy2PoolDialog>
</template>

