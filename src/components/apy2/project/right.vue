<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'

const activeName = ref('mining')
const tagKey = ref(0)
const tags = [
  {name: '挖矿池子', key: 'mining'},
  {name: '借贷池子', key: 'loan'},
  {name: '项目数据', ke: 'data'},
]
const selectName = (key: string) => {
  activeName.value = key
  tagKey.value++
}
</script>
<template>
  <div class="font-kdFang">
    <Apy2ProjectInfo/>
    <div class="flex items-center mt-8 bottomBorderGang">
      <template v-for="item in tags">
        <div @click="selectName(item.key)" :class="activeName===item.key?'activeName':'name'" class="activeName mr-12 hand" name="mining">
          {{ item.name }}
        </div>
      </template>
    </div>
    <Apy2ProjectMining v-if="activeName==='mining'" />
    <Apy2ProjectLoan v-else-if="activeName==='loan'"/>
    <Apy2ProjectData v-else/>
  </div>
</template>
<style scoped lang="scss">
.activeName {
  border-bottom: 2px solid #2B8DFE;
  @apply text-global-primary text-kd18px24px font-medium pb-1.5 hand;
}

.name {
  border-bottom: 2px solid rgba(43, 141, 254, 0);
  @apply text-global-highTitle text-opacity-45 text-kd18px24px font-medium pb-1.5 hand;
}

.bottomBorder {
  border-bottom: 1px solid #2B8DFE;
}

.bottomBorderGang {
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}
</style>



