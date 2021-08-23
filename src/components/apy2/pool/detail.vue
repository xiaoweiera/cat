<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps({
  type: {
    type: String,
    required: true,
    default: () => 'loan',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
})

const diff1Label = ref<string>('1')

// @ts-ignore
const diff2Label = ref<string>('2')

// @ts-ignore
const tabValue = ref<string>(diff1Label.value)


</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0">
      <div class="flex items-center">
        <IconFont type="icon-morentoken" size="32"/>
        <span class="symbol-name">BTC</span>
        <span class="mr-2">-</span>
        <IconFont type="icon-morentoken" size="32"/>
        <span class="symbol-name">Coinwind</span>
        <IconFont class="mr-1.5" type="BSC" size="24"/>
        <IconFont class="mr-1.5" type="FARM" size="24"/>
        <span class="label">机枪池</span>
      </div>
      <div class="flex items-center mt-5 text-xs">
        <div class="whitespace-nowrap self-end">
          <span class="text-global-highTitle text-opacity-45">收益率</span>
          <span class="text-global-numGreen text-4xl ml-1.5">8.32%</span>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">TVL: </span>
            <span class="text-global-highTitle text-opacity-85">$28381231</span>
          </div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">可投额度: </span>
            <span class="text-global-highTitle text-opacity-85">$28381231 (20%)</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">单利: </span>
            <span class="text-global-highTitle text-opacity-85">$28381231</span>
          </div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">复利: </span>
            <span class="text-global-highTitle text-opacity-85">$28381231 (20%)</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">产出币种</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-global-highTitle text-opacity-85">
            <span class="label">USDC - 25% + USDC - 25% 单利</span>
            <span class="label">USDC - 25% + USDC - 25% 复利</span>
          </div>
        </div>
      </div>
      <div class="py-4">
        <div class="bg-global-numRed bg-opacity-6 p-2.5 text-global-numRed text-xs">
          <IconFont type="icon-Warning" size="16" class="mr-3"/>
          <span class="inline">风险提示：本站数据来源于各平台的公开数据，本站井未对收录内容做安全审计，内容不构成投资建议，请注意风险。</span>
        </div>
      </div>
      <div class="border-0 border-t border-solid border-highTitle border-opacity-6">
        <div class="flex justify-end py-4">
          <UiDateDay/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0">
      <div class="flex h-full">
        <div class="flex-1 w-1 pr-4 h-full border-0 border-r border-solid border-highTitle border-opacity-6">
          <Apy2PoolApy/>
        </div>
        <div class="flex-1 w-1 h-full pl-4">
          <Apy2PoolDiff1 v-if="tabValue === diff1Label">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="diff1Label">排行对比</el-radio-button>
              <el-radio-button :label="diff2Label">趋势对比</el-radio-button>
            </el-radio-group>
          </Apy2PoolDiff1>
          <Apy2PoolDiff2 v-else-if="tabValue === diff2Label">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="diff1Label">排行对比</el-radio-button>
              <el-radio-button :label="diff2Label">趋势对比</el-radio-button>
            </el-radio-group>
          </Apy2PoolDiff2>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.symbol-name {
  font-size: 1.625rem;
  @apply ml-1.5 mr-2 text-global-highTitle text-opacity-85;
}
.label {
  @apply mr-3 inline-block rounded bg-global-highTitle bg-opacity-6 px-1 py-0.5 text-global-highTitle text-opacity-45;
  &:last-child {
    @apply mr-0;
  }
}
.split {
  width: 1px;
  height: 24px;
  @apply mx-8 bg-global-highTitle bg-opacity-10;
}
</style>



