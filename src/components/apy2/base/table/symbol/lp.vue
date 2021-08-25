<script setup lang="ts">
import { defineProps, computed } from "vue"
// @ts-ignore
import { numberUint, toNumber, toBoolean } from '~/utils'

const props = defineProps({
  data: {
    type: Object
  },
  type: {
    type: String,
    required: true,
  }
})
// @ts-ignore
const href = computed(function() {
  const data: any = props.data
  const symbol = data.symbol_alias
  return {
    path: '/apy/token',
    query: { symbol }
  }
})

</script>

<template>
  <a v-if="data" class="h-18.5 symbol-item px-2.5 flex items-center text-kdFang" v-router="href" target="_blank">
    <div>
      <IconFont v-if="data.symbol_logo" :type="data.symbol_logo" size="32"/>
      <IconFont v-else type="icon-morentoken" size="32"/>
    </div>
    <div class="ml-2 flex-1 flex justify-between items-center">
      <div class="flex-1 w-1 items-center flex">
        <el-tooltip class="item" effect="dark" :content="data.symbol_alias" placement="top-start">
          <span class="flex flex-1 w-1 text-base text-global-highTitle text-opacity-85">
            <span class="inline-block whitespace-nowrap max-w-full truncate">{{ data.symbol_alias }}</span>
          </span>
        </el-tooltip>
        <Apy2BaseFollow class="ml-1 lp-follow" :type="type" :value="data.symbol_alias" :status="toBoolean(data.followed)"/>
      </div>
      <div class="ml-2">
        <IconFont class="text-global-default text-opacity-35" type="icon-tiaozhuan" size="16"/>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.symbol-item {
  @at-root .children &{
    @apply pl-7;
  }
}
.lp-follow {
  @at-root .children &{
    @apply hidden;
  }
}
</style>

