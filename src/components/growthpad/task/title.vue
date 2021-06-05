<script setup lang="ts">
import { defineProps, computed } from 'vue'
// @ts-ignore
import { makeDescription } from './task'
import Task from '~/logic/growthpad/task'
// @ts-ignore

const store = Task()

const props = defineProps({
  data: Object,
})

// @ts-ignore
const href = computed(() => {
  const href = props.data?.tooltip?.href || 'http://kingdata.com'
  return href
})
// @ts-ignore
const hrefAfter = computed(() => {
  const href = props.data?.tooltipAfter?.href || 'http://kingdata.com'
  return href
})
</script>
<template>
  <div>
    <div class="font-kdFang">
      <div class="pb-1">
        <span
          class="
            text-sm
            title
            label
            inline-block
            align-middle
            whitespace-pre-line
            mr-1.5
          "
          v-html="data.title"
        ></span>
        <template v-if="data.tooltip">
          <a
            class="tooltip rounded mr-1.5 inline-flex items-center align-middle"
            target="_blank"
            :href="href"
          >
            <template v-if="data.tooltip.icon">
              <IconFont class="mr-1 flex" :type="data.tooltip.icon" size="xs" />
            </template>
            <span class="text-xs inline-block whitespace-nowrap">{{
              data.tooltip.value
            }}</span>
          </a>
        </template>
        <template v-if="data.titleAfter">
          <span class="text-sm title inline align-middle mr-1.5">{{
            data.titleAfter
          }}</span>
        </template>
        <template v-if="data.tooltipAfter">
          <a
            class="tooltip rounded mr-1.5 inline-flex items-center align-middle"
            target="_blank"
            :href="hrefAfter"
          >
            <template v-if="data.tooltipAfter.icon">
              <IconFont
                class="mr-1 flex"
                :type="data.tooltipAfter.icon"
                size="xs"
              />
            </template>
            <span class="text-xs inline-block whitespace-nowrap">{{
              data.tooltipAfter.value
            }}</span>
          </a>
        </template>
      </div>
      <div class="description text-xs">
        <slot name="desc">
          <p v-html="makeDescription(data, store.token)"></p>
        </slot>
      </div>
    </div>
    <div class="whitespace-nowrap md:ml-3">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
/*
span {
  user-select: none;
}
*/
.tooltip {
  border: 1px solid rgba(43, 141, 254, 0.32);
  box-sizing: border-box;
  padding: 2px 6px;
  color: #2b8dfe;
}
.title {
  color: #033666;
}
.label {
  :deep(i) {
    font-style: normal;
    color: rgba(37, 62, 111, 0.35);
  }
}
.description {
  color: rgba(37, 62, 111, 0.35);
  /*user-select: none;*/
  :deep(i) {
    font-style: normal;
    font-weight: normal;
    color: #2b8dfe;
  }
}
</style>
