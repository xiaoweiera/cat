<script setup lang="ts">
import { isHttp } from '~/utils/index'
import { defineProps, computed } from 'vue'
const picture = 'https://res.ikingdata.com/icon'

// 保存在 Ali OSS 中的图标
const ossIconList: string[] = [
  '24', // 24.svg
  'apy', // apy.svg
  'arrow', // arrow.svg, arrow.png
  'arrow_ok', // arrow_ok.svg
  'calendar', // calendar.svg
  'channels', // channels.svg
  'close', // close.svg
  'coinwind', // coinwind.jpg
  'copy', // copy.svg
  'defi', // defi.svg
  'defi_flow', // defi_flow.svg
  'down', // down.svg
  'github', // github.svg
  'growthPad', // growthPad.svg
  'help', // help.svg
  'inter', // inter.svg
  'kingdata', // kingdata.png
  'lang', // lang.png
  'loading', // loading.jpg
  'mdx', // mdx.png
  'mobile', // mobile.svg
  'more', // more.svg
  'nav-more', // nav-more.svg
  'navigation', // navigation.svg
  'new', // new.svg
  'plus', // plus.svg
  'remove', // remove.svg
  'report', // report.svg
  'sina', // sina.svg
  'success', // success.svg
  'table', // table.svg
  'telegram', // telegram.svg
  'top1', // top1.svg
  'trend', // trend.svg
  'twitter-white', // twitter-white.svg
  'twitter', // twitter.svg
  'union', // union.svg
  'up', // up.svg
  'user', // user.svg
  'vector', // vector.svg
]



// 定义 icon 名称
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    default() {
      return 'svg'
    },
  },
  size: {
    type: String,
    default() {
      return 'xl'
    },
  },
})
// @ts-ignore
const src = computed<string>(() => {
  if (isHttp(props.type) || props.type.includes('.')) {
    return props.type
  }
  return `${picture}/${props.type}.${props.suffix}`
})
// @ts-ignore
const isAliOSS = computed<boolean>(() => {
  if (isHttp(props.type) || ossIconList.includes(props.type)) {
    return true;
  }
  return false;
})
// @ts-ignore
const iconCode = function() {
  return `<use xlink:href="#${props.type}"></use>`;
}

</script>

<template>
  <span class="inline-block none-select" v-if="isAliOSS">
    <img
      class="inline-block none-select"
      :class="`icon-${type} size-${size}`"
      :src="src"
    />
  </span>
  <i class="icon-font inline-block" v-else>
    <svg aria-hidden="true" v-html="iconCode()"></svg>
  </i>
</template>

<style scoped lang="scss">
.icon-font{
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  fill: currentColor;
  overflow: hidden;
  & > svg {
    width: 1em;
    height: 1em;
  }
}


@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}

@mixin size($number) {
  width: $number;
  height: $number;
  max-width: $number;
  max-height: $number;
  min-width: $number;
  min-height: $number;
}

.size-3xl {
  @include size(32px);
}

.size-2xl {
  @include size(24px);
}

.size-xl {
  &:not(.icon-new) {
    @include size(20px);
  }
}
.size-base {
  @include size(16px);
}
.size-xs {
  @include size(12px);
}

.icon-loading {
  transform-origin: 50% 50%;
  animation: rotating 0.7s linear infinite;
}
.icon-new {
  width: 33px;
  height: 15px;
}

.icon-plus {
  @include size(42px);
}
</style>
