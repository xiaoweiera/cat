<script setup lang="ts">
import { computed, toRaw } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()

// 多少列
const cols = 3
// @ts-ignore
const list = computed(() => {
  const list = toRaw(store.about.minutias)
  const array: Array<any[]> = []
  for (let i = 0; i < cols; i++) {
    const value = list.filter((item, index: number) => {
      return index % cols === i
    })
    array.push(value)
  }
  return array
})
</script>

<template>
  <div class="pb-4 text-base font-semibold">项目介绍</div>
  <div class="flex items-center">
    <DotChar :img="store.icon.value" size="xl" />
    <span class="ml-3 label">{{ store.title.value }} 去中心化交易所</span>
  </div>
  <div class="mt-6">
    <p class="flex items-center">
      <b class="text-base font-medium h2">{{
        I18n.growthpad.examples.about.website
      }}</b>
      <a
        class="mx-4 text-sm font-color-theme"
        :href="`https://${store.about.website}`"
        target="_blank"
      >{{ store.about.website }}</a>
      <b class="text-base font-medium mr-4 h2">{{
        I18n.growthpad.examples.about.community
      }}</b>
      <a
        v-for="(item, index) in store.about.share"
        :key="index"
        class="inline-block"
        target="_blank"
        :href="item.href"
      >
        <IconFont class="mr-4" :type="item.icon" />
      </a>
    </p>
  </div>
  <div class="mt-6">
    <h2 class="pb-2">{{ I18n.growthpad.examples.about.projectDetail }}</h2>
    <p class="detail text-sm">{{ store.about.detail }}</p>
  </div>
  <div class="mt-6">
    <h2 class="text-base">奖励代币信息</h2>
    <div class="flex justify-between pt-2">
      <div v-for="(data, i) in list" :key="i">
        <p
          v-for="(item, index) in data"
          :key="`${i}-${index}`"
          class="text-sm"
          :class="{ 'mt-1': index > 0 }"
        >
          <span class="inline-block w-26 minutia-name">{{ item.label }}</span>
          <span class="inline-block minutia-value">{{ item.value }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2,
.h2 {
  color: #033666;
}
.label {
  font-size: 18px;
}
.minutia-name {
  color: rgba(37, 62, 111, 0.65);
}
.minutia-value {
  color: #033666;
}
.detail {
  width: 100%;
  word-break: break-all;
  overflow: auto;
  white-space: pre-wrap;
  color: rgba(37, 62, 111, 0.85);
}
</style>
