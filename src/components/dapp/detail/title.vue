<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { compact } from '~/utils'
import { defineProps, computed } from 'vue'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const riskValue = computed<string>(function(): string {
  const data = props.data
  const risk = safeGet<string>(data, 'risk')
  if (risk) {
    const value = safeGet<string>(I18n.common.risk, risk)
    if (value) {
      return value
    }
  }
  return I18n.common.risk.unknown
})

</script>

<template>
<div class="flex wrap-title">
  <span class="title text-18 text-global-highTitle">{{ data.name }}</span>
  <span class="tag-list">
    <template v-if="data.categories && compact(data.categories).length > 0">
      <template v-for="(value, index) in compact(data.categories)" :key="index">
        <span class="tag text-12-14">{{ value }}</span>
      </template>
    </template>

    <span class="split"></span>
    <span class="inline-block">
      <DappDetailRisk :value="data.risk"></DappDetailRisk>
    </span>
  </span>
</div>
</template>

<style scoped lang="scss">
@mixin title-box(){
  @apply items-center flex-nowrap flex-row;
  .tag-list {
    @apply justify-start;
  }
}
.wrap-title {
  @apply w-full;
  .title {
    @apply text-center;
  }
  .tag-list {
    @apply flex items-center justify-center;
  }
  @screen md {
    @include title-box();
  }
  &.nft-title {
    @include title-box();
  }
}


.tag {
  @apply ml-1.5 px-2 py-1;
  @apply inline-block;
  @apply text-global-darkblue;
  @apply bg-global-darkblue bg-opacity-8;
  border-radius: 20px;
}
.split {
  width: 1px;
  @apply h-3 mx-3;
  @apply inline-block;
  @apply bg-global-highTitle bg-opacity-10;
  & + .tag {
    @apply ml-0;
  }
}
</style>
