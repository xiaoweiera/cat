<script setup lang="ts">
import { defineProps, reactive, ref, onMounted } from 'vue'
import { getDetail } from '~/logic/apy2/table'
// @ts-ignore
import { forEach, toNumber } from '~/utils'
import { useProvide } from '~/utils/use/state'
import dataEventName from '~/components/ui/date/eventname'

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: () => 'mining',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
  id: {
    type: [String, Number],
    required: true,
  }
})

// 日期
useProvide(dataEventName.value)

const detail = reactive<object>({})
// @ts-ignore
const tab1 = ref<string>('1')
// @ts-ignore
const tab2 = ref<string>('2')

// @ts-ignore
const tabValue = ref<string>(tab1.value)


const upDetail = async function() {
  const data = await getDetail(props)
  forEach(function(value: any, key: string) {
    if (key === 'strategy_tags') {
      const [ icon ]: string[] = value.split(',')
      value = icon
    }
    // @ts-ignore
    detail[key] = value
  }, data)
}

onMounted(upDetail)

</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0" v-if="detail && detail.id">
      <div class="flex items-center">
        <IconFont :type="detail.symbol_logo || 'icon-morentoken'" size="32" rounded/>
        <span class="symbol-name">{{ detail.symbol }}</span>
        <span class="mr-2">-</span>
        <IconFont :type="detail.project_logo || 'icon-morentoken'" size="32" rounded/>
        <span class="symbol-name">{{ detail.project }}</span>
        <IconFont class="mr-1.5" :type="detail.chain" size="24"/>
        <IconFont class="mr-1.5" :type="detail.strategy_tags" size="24"/>
        <span class="label">机枪池</span>
      </div>
      <div class="flex items-center mt-5 text-xs" v-if="type === 'mining'">
        <div class="whitespace-nowrap self-end">
          <span class="text-global-highTitle text-opacity-45">收益率</span>
          <span class="text-global-numGreen text-4xl ml-1.5">{{ toNumber(detail.apy) }}%</span>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">TVL: </span>
            <span class="text-global-highTitle text-opacity-85">${{ toNumber(detail.tvl) }}</span>
          </div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">可投额度: </span>
            <span class="text-global-highTitle text-opacity-85">${{ toNumber(detail.quota_remain) }} ({{ toNumber(detail.quota_remain_percent) }}%)</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">单利: </span>
            <span class="text-global-highTitle text-opacity-85">${{ toNumber(detail.single_apy) }}</span>
          </div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">复利: </span>
            <span class="text-global-highTitle text-opacity-85">${{ toNumber(detail.compound_apy) }}</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">产出币种</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-global-highTitle text-opacity-85">
            <span class="label">{{ detail.single_apy_detail }} 单利</span>
            <span class="label">{{ detail.compound_detail }} 复利</span>
          </div>
        </div>
      </div>

      <div class="flex items-center mt-5 text-xs" v-else-if="type === 'loan'">
        <div class="whitespace-nowrap self-end">
          <span class="text-global-highTitle text-opacity-45">利息</span>
          <span class="text-global-numGreen text-4xl ml-1.5">{{ toNumber(detail.apy) }}%</span>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">可借额度: </span>
            <span class="text-global-highTitle text-opacity-85">${{ toNumber(detail.quota_remain) }} ({{ toNumber(detail.quota_remain_percent) }}%)</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">利率构成</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-global-highTitle text-opacity-85">
            <span class="label">{{ detail.apy_detail }}</span>
          </div>
        </div>
      </div>

      <div class="py-4" v-if="detail.risk_warning">
        <template v-for="(value, index) in detail.risk_warning" :key="index">
          <div class="bg-global-numRed bg-opacity-6 p-2.5 text-global-numRed text-xs">
            <IconFont type="icon-Warning" size="16" class="mr-3"/>
            <span class="inline">{{ value }}</span>
          </div>
        </template>
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
          <Apy2PoolTrends :type="type" :id="id" title="相关 APY 走势图"/>
        </div>
        <div class="flex-1 w-1 h-full pl-4">
          <Apy2PoolTop5 v-if="tabValue === tab1" :type="type" :symbol="detail.symbol" title="Top5 池子对比">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="tab1">排行对比</el-radio-button>
              <el-radio-button :label="tab2">趋势对比</el-radio-button>
            </el-radio-group>
          </Apy2PoolTop5>
          <Apy2PoolDiff v-else-if="tabValue === tab2" :type="type" :symbol="detail.symbol" title="Top5 池子对比">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="tab1">排行对比</el-radio-button>
              <el-radio-button :label="tab2">趋势对比</el-radio-button>
            </el-radio-group>
          </Apy2PoolDiff>
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



