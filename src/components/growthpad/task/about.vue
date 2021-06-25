<script setup lang="ts">
import { computed, toRaw } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { ProjectKey as Project } from '~/logic/growthpad/config'

const store = Task()

// 多少列
const cols = 3
// @ts-ignore
const list = computed(() => {
  // @ts-ignore
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
// @ts-ignore
const title = computed<string>((): string => {
  // @ts-ignore
  if (store.projectName === Project.mdx) {
    // @ts-ignore
    return I18n.template(I18n.growthpad.about.title, {
      project: store.title.value,
    })
  }
  // @ts-ignore
  return store.title.value
})
</script>

<template>
  <div class="pb-6">
    <h2 class="text-base font-medium">
      {{ I18n.growthpad.about.projectDetail }}
    </h2>
  </div>

  <div class="md:flex md:justify-between">
    <div>
      <div class="flex items-center font-kdFang pb-6">
        <DotChar :img="store.icon.value" size="xl" />
        <span class="ml-3 label">{{ title }}</span>
      </div>

      <div class="font-kdFang">
        <!-- 带二维码展示方式 -->
        <p v-if="store.about.qrcode">
          <span class="flex items-center">
            <b class="text-base font-medium h2">{{
              I18n.growthpad.about.website
            }}</b>
            <a
              class="ml-4 text-sm font-color-theme"
              :href="`https://${store.about.website}`"
              target="_blank"
            >{{ store.about.website }}</a>
          </span>
          <span class="flex items-center pt-6">
            <b class="text-base font-medium h2 pr-4">{{
              I18n.growthpad.about.community
            }}</b>
            <a
              v-for="(item, index) in store.about.share"
              :key="index"
              class="inline-block"
              target="_blank"
              :href="item.href"
            >
              <IconFont
                class="flex"
                :class="{ 'ml-4': index > 0 }"
                :type="item.icon"
                size="xl"
              />
            </a>
          </span>
        </p>
        <p v-else class="md:flex md:items-center">
          <span class="flex items-center">
            <b class="text-base font-medium h2">{{
              I18n.growthpad.about.website
            }}</b>
            <a
              class="ml-4 text-sm font-color-theme"
              :href="`https://${store.about.website}`"
              target="_blank"
            >{{ store.about.website }}</a>
          </span>
          <span class="flex items-center pt-6 md:pt-0 md:ml-8">
            <b class="text-base font-medium h2 pr-4">{{
              I18n.growthpad.about.community
            }}</b>
            <a
              v-for="(item, index) in store.about.share"
              :key="index"
              class="inline-block"
              target="_blank"
              :href="item.href"
            >
              <IconFont
                class="flex"
                :class="{ 'ml-4': index > 0 }"
                :type="item.icon"
                size="xl"
              />
            </a>
          </span>
        </p>
      </div>
    </div>
    <div>
      <a
        v-if="store.about.qrcode"
        v-router="store.about.qrcode"
        class="qr-code block md:w-32 md:text-center mt-3 md:mt-0"
        target="_blank"
      >
        <img class="inline-block" :src="store.about.qrcode" />
        <p class="block text-sm font-kdExp mt-1">
          {{
            I18n.template(I18n.growthpad.chat.qrcode, { name: store.getName() })
          }}
        </p>
      </a>
    </div>
  </div>

  <!-- 手机版本 -->
  <div
    v-if="store.about.minutias && store.about.minutias.length > 0"
    class="pt-6 font-kdFang md:hidden"
  >
    <h2 class="text-base">{{ I18n.growthpad.about.reward }}</h2>
    <div class="pt-3">
      <div v-for="(item, i) in store.about.minutias" :key="i">
        <p class="text-sm pb-1.5 whitespace-nowrap">
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

  <div v-if="store.about.detail" class="pt-6 font-kdFang">
    <h2 class="pb-3">{{ I18n.growthpad.about.projectDetail }}</h2>
    <p class="detail text-sm whitespace-pre-line w-full">
      {{ store.about.detail }}
    </p>
  </div>

  <!-- 大屏 -->
  <div
    v-if="store.about.minutias && store.about.minutias.length > 0"
    class="pt-6 font-kdFang hidden md:block"
  >
    <h2 class="text-base">{{ I18n.growthpad.about.reward }}</h2>
    <div class="flex justify-between pt-3">
      <div v-for="(data, i) in list" :key="i">
        <p
          v-for="(item, index) in data"
          :key="`${i}-${index}`"
          class="text-sm whitespace-nowrap"
          :class="{ 'pt-1.5': index > 0 }"
        >
          <span class="inline-block w-26 minutia-name">{{ item.label }}</span>
          <span class="inline-block minutia-value">
            <template
              v-if="item.value === 'price'"
            >${{ store.price.value }}</template>
            <template v-else>{{ item.value }}</template>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2,
.h2,
.label {
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
  color: rgba(37, 62, 111, 0.85);
}
.qr-code {
  color: rgba(37, 62, 111, 0.85);
  img {
    width: 70px;
    height: 70px;
  }
}
</style>
