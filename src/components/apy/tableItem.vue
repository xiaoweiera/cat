<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
// @ts-ignore
import { unitConfig } from '~/logic/apy/config'

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
const isShow = ref(false)
const isNullFun = (data: any) => {
  data
    && data.forEach((item) => {
      if (item.value) {
        isShow.value = true
      }
    })
}
const getColor = (index: number, data: string) => {
  if (index !== 0 || !data) {
    return ''
  }
  if (!data.includes('-')) {
    return 'greenTxt '
  } else {
    return 'redTxt'
  }
}
const getValue = (data: any, i) => {
  if (data) {
    if (!data.value && data.value !== 0) return '-'
    if (unitConfig[data.name]) {
      if (unitConfig[data.name].unit === '$')
        return unitConfig[data.name]?.unit + data.value
      else return data.value + unitConfig[data.name]?.unit
    }
    return data.value
  }
}
watch(
  () => props.itemData,
  () => {
    isShow.value = false
    isNullFun(props.itemData)
  },
)
onMounted(() => isNullFun(props.itemData))
</script>
<template>
  <div v-if="isShow" class="w-full h-full flex flex-col justify-center">
    <template v-for="(item, i) in itemData">
      <div
        v-if="item.status && getValue(item, i) !== '-'"
        class="flex mb-0.5 items-center flex-wrap"
      >
        <span class="desName mr-1">{{ item.name }}</span>
        <div
          :class="
            i === 0
              ? 'desNum '
              : 'text-kd10px16px text-global-default opacity-60 md:text-kd12px16px '
          "
        >
          <span :class="getColor(i, item.value)">{{ getValue(item, i) }}</span>
        </div>
      </div>
    </template>
  </div>
  <div
    v-else
    class="w-full h-full flex flex-col justify-center items-center px-3"
  >
    <img
      style="width: 112px"
      src="https://res.ikingdata.com/nav/tableLogo.png"
      alt=""
    />
  </div>
</template>

<style scoped lang="postcss">
.tableLogo {
  width: 112.39px;
  height: 36px;
}

.greenTxt {
  color: #00a44b;
  @apply text-kd16px16px  md:text-kd20px24px;
}

.redTxt {
  color: #e9592d;
  @apply text-kd16px16px md:text-kd20px24px;
}

.Red {
  @apply text-global-numRed;
}

.topBg {
  background: linear-gradient(
    270deg,
    rgba(43, 141, 254, 0) 0%,
    rgba(43, 141, 254, 0.04) 2.61%,
    rgba(43, 141, 254, 0.04) 93.5%,
    rgba(43, 141, 254, 0) 100%
  );
}

.desName {
  @apply text-kd10px16px text-global-default opacity-60 md:text-kd12px16px flex items-center  font-normal;
}

.desNum {
  @apply text-kd16px16px text-global-default   md:text-kd24px24px font-kdExp font-bold;
}

.desInfo {
  @apply text-kd10px16px text-global-default opacity-60 md:text-kd12px16px font-kdExp font-normal;
}
</style>
