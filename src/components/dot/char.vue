<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  value: {
    type: [String, Number],
  },
  img: { type: String },
  size: {
    validator(value: string): boolean {
      return ['sm', 'xl', 'lg'].includes(value)
    },
    default: (): string => {
      return 'sm'
    },
  },
})
// @ts-ignore
const char = computed((): string => {
  if (props.value) {
    const [text = ''] = `${props.value}`
    return text
  }
  return ''
})
// class Name
// @ts-ignore
const className = computed(() => {
  const data: any = {}
  data[props.size] = true
  // 如果 img 属性存在，则以图片形式展示
  if (props.img) {
    data['inline-block'] = true
    return data
  }
  data.dot = true
  data.bg = true
  data['inline-flex'] = true
  data['justify-center'] = true
  data['items-center'] = true
  return data
})

const bgStyle = computed<string>((): string => {
  return `background-image: url(${props.img})`
})
</script>

<template>
  <span class="dot" :class="className">
    <template v-if="img">
      <span class="dot-image" :style="bgStyle" />
    </template>
    <template v-else-if="char">{{ char }}</template>
  </span>
</template>

<style scoped lang="scss">
.dot {
  border-radius: 50%;
  color: #fff;
  overflow: hidden;
  .bg {
    background: #2749fc;
  }
  .dot-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
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

.sm {
  @include size(24px);
}
.xl {
  @include size(32px);
}
.lg {
  @include size(42px);
  font-size: 28px;
}
.xl-8 {
  @include size(100px);
}
.xl-10 {
  @include size(140px);
}
</style>
