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
  <div class="pb-4 text-base font-semibold">
    {{ I18n.growthpad.about.projectDetail }}
  </div>
  <div class="flex items-center font-kdFang">
    <DotChar :img="store.icon.value" size="xl" />
    <span class="ml-3 label">{{
      I18n.template(I18n.growthpad.about.title, { project: store.title.value })
    }}</span>
  </div>
  <div class="mt-6 font-kdFang">
    <p class="md:flex md:items-center">
      <span class="flex items-center">
        <b class="text-base font-medium h2">{{
          I18n.growthpad.about.website
        }}</b>
        <a
          class="mx-4 text-sm font-color-theme"
          :href="`https://${store.about.website}`"
          target="_blank"
        >{{ store.about.website }}</a>
      </span>
      <span class="flex items-center pt-3 md:pt-0">
        <b class="text-base font-medium mr-4 h2">{{
          I18n.growthpad.about.community
        }}</b>
        <a
          v-for="(item, index) in store.about.share"
          :key="index"
          class="inline-block"
          target="_blank"
          :href="item.href"
        >
          <IconFont class="mr-4 flex" :type="item.icon" size="xl" />
        </a>
      </span>
    </p>
  </div>
  <!-- 手机版本 -->
  <div class="mt-6 font-kdFang md:hidden">
    <h2 class="text-base">{{ I18n.growthpad.about.reward }}</h2>
    <div class="mt-3 pt-2">
      <div v-for="(item, i) in store.about.minutias" :key="i">
        <p class="text-sm pb-1.5">
          <span class="inline-block w-26 minutia-name">{{ item.label }}</span>
          <span class="inline-block minutia-value">{{ item.value }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="mt-6 font-kdFang">
    <h2 class="pb-2">{{ I18n.growthpad.about.projectDetail }}</h2>
    <p class="detail text-sm">{{ store.about.detail }}</p>
  </div>
  <!-- 大屏 -->
  <div class="mt-6 font-kdFang hidden md:block">
    <h2 class="text-base">{{ I18n.growthpad.about.reward }}</h2>
    <div class="flex justify-between pt-2">
      <div v-for="(data, i) in list" :key="i">
        <p
          v-for="(item, index) in data"
          :key="`${i}-${index}`"
          class="text-sm"
          :class="{ 'mt-1': index > 0 }"
        >
          <span class="inline-block w-26 minutia-name">{{ item.label }}</span>
          <span class="inline-block minutia-value">
            <template v-if="item.value === 'price'">{{
              store.price.value
            }}</template>
            <template v-else>{{ item.value }}</template>
          </span>
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
