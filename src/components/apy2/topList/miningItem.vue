<script setup lang="ts">
import {watch, ref, onMounted} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chain} from '~/store/apy2/state'
import {getMining_rank} from '~/logic/apy2/index'
import {getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber, getIconType,tolocaleLowerCase} from '~/lib/tool'

const group_id = getInject('group_id')
const list = ref()
watch(() => group_id.value[0], () => getData())
const getData = async () => list.value = await getMining_rank(group_id.value[0], chain.value)
const getIconSize = (type: string) => type === 'lp' ? 'w-8 h-5' : 'w-5 h-5'
const getNewSize = (type: string) => type === 'lp' ? '16' : '16'
watch(()=>group_id.value[0],()=>{getData()})
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
              <div :class="i===4?'pb-3':'pb-3'" class="flex pt-3 items-center w-full topBorder">
                <div class=" flex items-center">
                  <IconFont v-if="i<3" class="xshidden text-global-highTitle text-opacity-25 absolute relative" style="font-size:38px;" size="32" :type='`icon-a-${i+1}`'></IconFont>
                  <IconFont v-if="i<3" class="mdhidden text-global-highTitle text-opacity-25 absolute relative" style="font-size:38px;" size="24" :type='`icon-a-${i+1}`'></IconFont>
                  <div v-else class="md:mx-2.4 mx-1.3 text-kd24px24px text-global-highTitle text-opacity-65 font-kdExp font-bold">
                    {{ i + 1 }}
                  </div>
                </div>
                <div class="flex flex-col w-full ml-3">
                  <div class="flex justify-between">
                    <div class="flex items-center relative">
                      <IconFont v-if="item.new" class="text-global-highTitle text-opacity-25 absolute -top-0.2 -left-0.2" :size="getNewSize(item.symbol_type)"    type="icon-NEW"></IconFont>
                      <img :class="getIconSize(item.symbol_type)" :src="item.symbol_logo" alt="">
<!--                      <IconFont class="xshidden" :type="item.symbol_logo" :class="{'new-24': item.new}"  size="32"/>-->
<!--                      <IconFont class="mdhidden" :type="item.symbol_logo" :class="{'new-16': item.new}"  size="24"/>-->
                      <span class="ml-1 text-kd14px20px font-kdExp text-global-highTitle">{{ item.symbol }}</span>
                    </div>
                    <div class="flex items-center">
                      <span :class="item.apy>=0?'text-global-numGreen':'text-global-numRed'" class="mr-1  font-bold md:text-kd20px20px  text-kd16px16px font-kdExp">{{ formatRulesNumber(item.apy) }}%</span>
                      <IconFont class="xshidden text-global-highTitle text-opacity-25" size="20" type="icon-help"></IconFont>
                      <IconFont class="mdhidden text-global-highTitle text-opacity-25" size="16" type="icon-help"></IconFont>
                    </div>
                  </div>
                  <div class="mt-1 flex items-center flex-wrap justify-between  ">
                    <div class="flex items-center">
                      <span class="text-kd12px18px font-kdExp text-global-highTitle text-opacity-65">{{ item.project }}</span>
                      <img class="w-3.5 h-3.5 ml-1" :src="chainsIcon[tolocaleLowerCase(item.chain)]" alt="">
                      <IconFont class="text-global-highTitle text-opacity-25 ml-1" size="14" :type="getIconType(item.project_category)"></IconFont>
                      <span class="ml-1 px-1 text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{ item.strategy_tags }}</span>
                    </div>
                    <div v-if="item.tvl" class="h-4.5 flex items-center">
                      <span class="text-kd12px12px text-global-highTitle text-opacity-45 font-normal">TVL</span>
                      <span class="ml-1 text-kd12px12px text-global-highTitle text-opacity-85 font-kdExp ">${{ formatRulesNumber(item.tvl) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #content>
              <div class="min-w-70 relative p-1.3 ">
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
