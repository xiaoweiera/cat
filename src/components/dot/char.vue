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
    data['inline-flex'] = true
    data['justify-center'] = true
    data['items-center'] = true
    return data
  })
</script>

<template>
  <span :class="className">
    <template v-if="img">
      <img class="w-full w-max inline-block" :src="img" />
    </template>
    <template v-else-if="char">
      <template>{{ char }}</template>
    </template>
  </span>
</template>

<style scoped>
  .dot {
    background: #2749FC;
    border-radius: 50%;
    color: #fff;
  }
  .sm {
    width: 24px;
    height: 24px;
  }
  .xl {
    width: 32px;
    height: 32px;
  }
  .lg {
    width: 42px;
    height: 42px;
    font-size: 28px;
  }
</style>
