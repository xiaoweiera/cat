<script setup lang="ts">
import { defineProps, computed } from 'vue'
import iconFont from '~/logic/icon/index'

// 定义 icon 名称
const props = defineProps({
  // 图标名称或者链接地址
  type: {
    type: String,
    required: true,
  },
  // 图标后缀 (使用阿里云素材时有效)
  suffix: {
    type: String,
    default() {
      return 'svg'
    },
  },
  // 图标大小
  size: {
    type: String,
    default() {
      return 'xl'
    },
  },
  // 是否圆角
  rounded: {
    type: Boolean,
    default () {
      return false
    }
  },
  border: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const iconValue = computed(function() {
  return iconFont(props)
})

</script>

<template>
  <span class="inline-flex" v-html="iconValue"></span>
</template>

<style lang="scss">
.icon-font{
  display: inline-block;
}
i {
  &.icon-font {
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
  @if unitless($number) {
    $number: $number * 1px;
  }
  &.icon-font {
    font-size: $number;
  }
  &:not(.icon-font) {
    /*
     width: $number;
     max-width: $number;
    */
    min-width: $number;
    height: $number;
    max-height: $number;
    min-height: $number;
  }
  &.rounded {
    border-radius: floor($number / 2);
    @apply overflow-hidden;
  }
}
/*
  快速生成一批尺寸 6，8，10,,,60
*/
@for $index from 6 through 60 {
  @if ($index % 2 == 0) {
    .kd-ui-icon .size-#{$index} {
      @include size($index);
    }
  }
}
.kd-ui-icon {
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

  .icon-circle {
    border-radius: 50%;
  }

  .icon-border {
    /*
    @apply border border-solid border-global-border;
    */
  }
}


</style>
