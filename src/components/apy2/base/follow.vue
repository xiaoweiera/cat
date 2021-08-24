<script setup lang="ts">
import { defineProps } from 'vue'
import { TabCategoryData } from '~/logic/apy2/interface'
import * as API from '~/api/index'
const props = defineProps({
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
    default: () => TabCategoryData.mining,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === TabCategoryData.mining || value === TabCategoryData.lend;
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

// @ts-ignore
const onClick = async function() {
  const query = {
    value: props.value,
    type: props.type,
    pool: props.pool
  }
  const data = await API.apy.common.setFollow(query)
  console.log(data)
}

</script>

<template>
  <IconFont v-login @click.stop.prevent="onClick" class="cursor-pointer text-global-highTitle text-opacity-45" type="icon-star-weixuanzhong" size="16"/>
</template>
