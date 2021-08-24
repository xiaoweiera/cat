<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  // 是否是池子，否则为单币
  pool: {
    type: Boolean,
    default () {
      return false
    }
  },
  // 类型
  type: {
    type: String,
    default: () => 'mining',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'lend';
    }
  },
  // 币种为 symbol name, 池子为 id
  value: {
    type: [String, Number],
    required: true,
  },
  // 是否已收藏, 默认为未收藏
  status: {
    type: Boolean,
    default () {
      return false
    }
  }
})

</script>

<template>
  <IconFont class="ml-1 text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
</template>
