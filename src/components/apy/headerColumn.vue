<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
// @ts-ignore
import { toFixedNumber, numColor } from '~/lib/tool'

// @ts-ignore
const props = defineProps({
  headerData: {
    type: Object,
  },
  orderByApy: { type: Function },
  headerIndex: { type: Number },
  selectHeaderIndex: { type: Object },
})
// @ts-ignore
const type = ref('up')
const orderNum = ref(1)
const orderTip = ref('https://res.ikingdata.com/nav/apyNoOrder.png')
const orderList = {
  0: { value: 'no', src: 'https://res.ikingdata.com/nav/apyNoOrder.png' },
  1: { value: 'desc', src: 'https://res.ikingdata.com/nav/apyDesc.png' },
  2: { value: 'asc', src: 'https://res.ikingdata.com/nav/apyAsc.png' },
}

const orderBy = () => {
  if (orderNum.value === 3) {
    orderNum.value = 0
  }
  orderTip.value = orderList[orderNum.value].src
  props.orderByApy(
    props.headerData?.token_name,
    orderList[orderNum.value].value,
    props.headerIndex,
  )
  orderNum.value++
}

watch(
  () => props.selectHeaderIndex?.indexValue,
  () => {
    if (props.headerIndex !== props.selectHeaderIndex?.indexValue) {
      orderNum.value = 1
      orderTip.value = 'https://res.ikingdata.com/nav/apyNoOrder.png'
    }
  },
)
// @ts-ignore
const getLogo = () =>
  props.headerData.logo
    ? props.headerData.logo
    : 'https://res.ikingdata.com/nav/platLogo.jpg'
</script>
<template>
  <div class="hand" @click="orderBy">
    <div class="flex w-full items-center mb-1.5">
      <img class="w-6 h-6 mr-1.5" :src="getLogo()" alt="" />
      <div class="font-normal text-kd14px18px text-global-highTitle">
        {{ props.headerData.token_name }}
      </div>
      <img class="w-2 h-2.5 ml-2" :src="orderTip" alt="" />
    </div>
    <div class="flex flex-wrap">
      <div class="text-kd14px18px text-global-highTitle font-normal mr-1 5">
        <span :class="props.headerData.price ? '' : 'ml-2'">{{
          props.headerData.price ? '$' : '-'
        }}</span>{{ toFixedNumber(props.headerData.price) }}
      </div>
      <div
        v-if="props.headerData.change || props.headerData.change === 0"
        :class="props.headerData.change >= 0 ? 'Greem percent' : 'Red percent'"
      >
        {{ numColor(props.headerData.change)
        }}<span v-if="props.headerData.change">%</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tag {
  @apply rounded-md  flex mt-4 md:mr-1  py-1.25 px-3.75 items-center justify-center;
}

.Greem {
  @apply text-global-numGreen bg-global-numGreen;
}

.Red {
  @apply text-global-numRed bg-global-numRed;
}

.percent {
  @apply px-1.5 py-0.25 text-kd12px16px  rounded bg-opacity-10 font-bold flex items-center;
}

.selectTag {
  @apply bg-global-primary bg-opacity-8;
}
</style>
