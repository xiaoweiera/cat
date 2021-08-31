<script setup lang="ts">
import {watch, ref, onMounted} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chain} from '~/store/apy2/state'
import {getMining_rank} from '~/logic/apy2/index'
import {getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber, getIconType} from '~/lib/tool'

const group_id = getInject('group_id')
const list = ref()
watch(() => group_id.value[0], () => getData())
const getData = async () => list.value = await getMining_rank(group_id.value[0], chain.value)
const getIconSize = (type: string) => type === 'lp' ? 'w-8 h-5' : 'w-4 h-4'
const getNewSize = (type: string) => type === 'lp' ? '26' : '14'
onMounted(() => {
  if (group_id.value[0]) {
    getData()
  }
})
</script>
<template>
  <div class="font-kdFang w-full  font-kdExp ">
    <template v-for="(item,i) in list">
      <Apy2PoolDialog type="mining" :id="item.id">
        <template #reference>
          <UiPopover v-if="i<5"  class="inline-block  w-full">
            <template #reference>
              <div class="flex py-3 items-center w-full topBorder">
                <div class=" flex items-center">
                  <IconFont v-if="i<3" class="text-global-highTitle text-opacity-25 absolute relative" style="font-size:38px;" :type='`icon-a-${i+1}`'></IconFont>
                  <div v-else class="mx-2.9 text-kd24px24px text-global-highTitle text-opacity-65 font-kdExp font-bold">
                    {{ i + 1 }}
                  </div>
                </div>
                <div class="flex flex-col w-full ml-3">
                  <div class="flex justify-between">
                    <div class="flex items-center relative">
                      <!--            <IconFont class="text-global-highTitle text-opacity-25 absolute" :size="getNewSize()"    type="icon-NEW"></IconFont>-->
                      <img :class="getIconSize(item.symbol_type)" :src="item.symbol_logo" alt="">
                      <span class="ml-1 text-kd14px20px font-kdExp text-global-highTitle">{{ item.symbol }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="mr-1 text-global-numGreen font-bold text-kd20px20px">{{ formatRulesNumber(item.apy) }}%</span>
                      <IconFont class="text-global-highTitle text-opacity-25" size="18" type="icon-help"></IconFont>
                    </div>
                  </div>
                  <div class="mt-1 flex items-center flex-wrap justify-between">
                    <div class="flex items-center">
                      <span class="text-kd12px18px text-global-highTitle text-opacity-65">{{ item.project }}</span>
                      <img class="w-3.5 h-3.5 ml-1" :src="chainsIcon[item.chain]" alt="">
                      <IconFont class="text-global-highTitle text-opacity-25 ml-1" size="14" :type="getIconType(item.project_category)"></IconFont>
                      <span class="ml-1 px-1 text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{ item.strategy_tags }}</span>
                    </div>
                    <div v-if="item.tvl">
                      <span class="text-kd12px12px text-global-highTitle text-opacity-45 font-normal">TVL</span>
                      <span class="ml-1 text-kd12px12px text-global-highTitle text-opacity-85 ">${{ formatRulesNumber(item.tvl) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #content>
              <div class="min-w-70 relative p-1.3">
                <Apy2TopListMiningTip :data="item"/>
              </div>
            </template>
          </UiPopover>
        </template>
      </Apy2PoolDialog>

    </template>
  </div>
</template>
<style scoped lang="scss">
.topBorder {
  border-top: 1px solid rgba(3, 54, 102, 0.06);
}

.tag {
  @apply mr-2  text-kd14px18px text-global-highTitle font-medium  text-opacity-65;
}

.selectedTag {
  border-radius: 6px;
  @apply mr-2 text-kd14px18px text-global-primary font-medium bg-global-primary bg-opacity-8;
}

.btnCount {
  border: 1px solid rgba(43, 141, 254, 0.32);
  border-radius: 4px;
}
</style>
