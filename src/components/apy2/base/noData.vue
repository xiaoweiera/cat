<script setup lang="ts">
import { defineProps,defineEmits } from 'vue'
import I18n from '~/utils/i18n/index'
import { TabCategoryData } from '~/logic/apy2/interface'
const emitEvent = defineEmits(['submit'])
const props= defineProps({
  // 类型
  type: {
    type: String,
  },
  // 分组
  groupId: {
    type: String,
  },
})
const goSubmit=()=>emitEvent('submit')
</script>
<template>
  <div class="h-60 flex items-center justify-center borderClass font-kdFang">
    <div class="text-center">
      <!-- 自选币种 -->
      <template v-if="groupId === 'my'">
        <div class="text-global-highTitle text-opacity-85 text-kd16px24px">{{ I18n.apy.tips.title }}</div>
        <div v-if="type=== TabCategoryData.mining ">
          <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
            <span>{{ I18n.apy.tips.click }}</span>
            <span @click="goSubmit" class="text-global-primary hand">"{{ I18n.apy.tips.addTokenLp }}"</span>
            <span>{{ I18n.apy.tips.addTokenLpDesc }}</span>
          </span>
        </div>
        <div v-if="type=== TabCategoryData.lend">
          <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
            <span>{{ I18n.apy.tips.click }}</span>
            <span @click="goSubmit" class="text-global-primary hand">"{{ I18n.apy.tips.addToken }}"</span>
            <span>{{ I18n.apy.tips.addTokenDesc }}</span>
          </span>
        </div>
      </template>
      <template v-else>
        <div class="text-global-highTitle text-opacity-85 text-kd16px24px">{{ I18n.apy.tips.noData }}</div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.borderClass{
  border:1px solid #EBEBEB;
}
</style>
