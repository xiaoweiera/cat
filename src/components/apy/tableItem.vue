<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  itemData: {
    type: Object,
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
  },
})
</script>
<template>
  <!--存款-->
  <div class="w-53 h-full flex flex-col justify-center   px-3">
    <template v-for="(item,i) in itemData">
      <div v-if="item.status" class="flex mb-0.5 items-center  flex-wrap ">
        <span class="desName mr-1">{{ item.name }}</span>
        <div :class="i===0?'desNum':'text-global-hightTitle text-kd12px16px' ">{{ item.value ? item.value : '-' }}</div>
      </div>
    </template>
    <!--    <div class="flex mb-0.5  items-center flex-wrap">-->
    <!--      <div class="desName mr-1">产出</div>-->
    <!--      <div class="text-global-hightTitle text-kd12px16px ">{{itemData.apy_detail?itemData.apy_detail:'-'}}</div>-->
    <!--    </div>-->
    <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
    <!--      <div class="desName mr-1">存款总额</div>-->
    <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.tvl?itemData.tvl:'-'}}</div>-->
    <!--    </div>-->
    <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
    <!--      <div class="desName mr-1">借款总量</div>-->
    <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.quota_used?itemData.quota_used:'-'}}</div>-->
    <!--    </div>-->
  </div>
  <!--&lt;!&ndash;  借款&ndash;&gt;-->
  <!--  <div v-if="props.index===1"  class="w-53 h-full flex flex-col justify-center   px-3">-->
  <!--    <div class="flex mb-0.5 items-center  flex-wrap ">-->
  <!--      <span class="desName mr-1">支付利率</span>-->
  <!--      <div class="desNum ">{{itemData.apy?itemData.apy:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.5  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">计息</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px ">{{itemData.apy_detail?itemData.apy_detail:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">可借</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData. ?itemData.quota_remain:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">借出</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.quota_remain && itemData.quota_remain_percent?itemData.quota_remain*itemData.quota_remain_percent:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">剩余</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.quota_remain_percent?itemData.quota_remain_percent:'-'}}</div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--&lt;!&ndash;  机枪池&ndash;&gt;-->
  <!--  <div v-if="props.index===2"  class="w-53 h-full flex flex-col justify-center   px-3">-->
  <!--    <div class="flex mb-0.5 items-center  flex-wrap ">-->
  <!--      <span class="desName mr-1">收到利息</span>-->
  <!--      <div class="desNum ">{{itemData.apy?itemData.apy:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.5  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">产出</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px ">{{itemData.apy_detail?itemData.apy_detail:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">可投额度</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.quote?itemData.quote:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">总锁仓</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.tvl?itemData.tvl:'-'}}</div>-->
  <!--    </div>-->
  <!--    <div class="flex mb-0.4  items-center flex-wrap">-->
  <!--      <div class="desName mr-1">剩余额度</div>-->
  <!--      <div class="text-global-hightTitle text-kd12px16px">{{itemData.quota_remain_percent?itemData.quota_remain_percent:'-'}}</div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<style scoped>
.topBg {
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}

.desName {
  @apply text-kd12px16px flex items-center text-global-default font-normal opacity-65;
}

.desNum {
  font-size: 14px;
  @apply font-kdExp font-bold text-global-highTitle ;
}

.desInfo {
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>
