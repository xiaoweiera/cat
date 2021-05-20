<script setup lang="ts">
import { computed, ref } from 'vue'
// @ts-ignore
import { Name, Icon, About } from '~/logic/growthpad/examples'
// 多少列
const cols = 3
// @ts-ignore
const list = computed(() => {
  const array: Array<any[]> = []
  for (let i = 0; i < cols; i++) {
    const value = About.minutias.filter((item, index: number) => {
      return index % cols === i
    })
    array.push(value)
  }
  return array
})
const communitys = ref<string[]>(['telegram', 'twitter', 'vector', 'union'])
</script>

<template>
  <div class="pb-4 text-base font-semibold">Project Info</div>
  <div class="flex items-center">
    <DotChar :img="Icon" size="xl" />
    <span class="ml-3 label">{{ Name }}</span>
  </div>
  <div class="py-6">
    <p class="flex items-center">
      <b class="text-base font-medium">Website</b>
      <a
        class="mx-4 text-sm font-color-theme"
        :href="About.website"
        target="_blank"
      >{{ About.website }}</a>
      <b class="text-base font-medium mr-4">Community</b>
      <template v-for="(type, index) in communitys" :key="index">
        <IconFont class="mr-4" :type="type" />
      </template>
    </p>
  </div>
  <div>
    <h2 class="text-base">Economic model</h2>
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
  <div class="mt-6">
    <h2 class="pb-2">Project Detail</h2>
    <p class="detail text-sm">{{ About.detail }}</p>
  </div>
</template>

<style scoped>
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
