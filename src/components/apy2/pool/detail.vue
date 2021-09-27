<script setup lang="ts">
import { defineProps, reactive, ref, onMounted } from 'vue'
import { getDetail } from '~/logic/apy2/table'
import { forEach, toNumber, toBoolean, toNumberFormat, toNumberCashFormat, isEmpty } from '~/utils'
import { useProvide } from '~/utils/use/state'
import dataEventName from '~/components/ui/date/eventname'
import { TabCategoryData } from '~/logic/apy2/interface'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  type: {
    type: String,
    default: () => TabCategoryData.mining,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === TabCategoryData.mining || value === TabCategoryData.lend;
    }
  },
  id: {
    type: [String, Number],
    required: true,
  },
  chain:String,
  lendCoin:String,
  loanCoin:String,
  project_id:Number
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
    if (key === 'project_category') {
      const [ icon ]: string[] = value.split(',')
      value = icon
    }
    // @ts-ignore
    detail[key] = value
  }, data)
}

onMounted(upDetail)
const projectUrl=(projectId:number)=>`/apy/project?id=${projectId}`
</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0" v-if="detail && detail.id">
      <div class="flex item-center justify-between">
        <div class="flex items-center">
          <IconFont :type="detail.symbol_logo" size="32" rounded/>
          <span class="symbol-name font-semibold text-kdExp">{{ detail.symbol }}</span>
          <span class="mr-2">-</span>
          <a class="flex items-center" v-router.blank="projectUrl(detail.project_id)">
            <IconFont :type="detail.project_logo" size="32" rounded/>
            <span class="symbol-name font-semibold text-kdExp">{{ detail.project }}</span>
            <IconFont class="mr-1.5" :type="detail.chain" size="24"/>
          </a>
          <template v-if="detail.project_category">
            <IconFont class="mr-1.5" :type="detail.project_category" size="24"/>
            <span class="label" v-if="detail.strategy_tags">{{ detail.strategy_tags }}</span>
          </template>
        </div>
        <div class="flex item-center">
          <div class="mr-3" v-if="type === TabCategoryData.lend">
<!--            <UiDialogBase :chain="props.chain" :lendCoin="props.lendCoin" :loanCoin="props.loanCoin" :project_id="props.project_id" customClass="480px">-->
<!--              <template #title>-->
<!--            <span class="flex item-center py-2 px-3 rounded bg-global-primary text-global-white cursor-pointer">-->
<!--              <IconFont class="flex" type="icon-jisuanqi-xiao"/>-->
<!--              <span class="text-sm ml-1">真实利率计算器</span>-->
<!--            </span>-->
<!--              </template>-->
<!--              <template #content>-->
<!--                <Apy2Calculator :chain="detail.chain" :project_id="detail.project_id"  />-->
<!--              </template>-->
<!--            </UiDialogBase>-->
          </div>
          <div class="mr-3">
            <Apy2BaseFollow class="text-global-primary flex items-center h-8.5 px-3 rounded border border-global-primary border-opacity-32" pool :type="type" :value="id" :status="toBoolean(detail.followed)">
              <span class="text-sm ml-1.5 text-sm leading-4">{{ I18n.apy.pool.favorite }}</span>
            </Apy2BaseFollow>
          </div>
          <div>
            <a v-router.blank="detail.project_url" class="cursor-pointer flex items-center  h-8.5 px-7.5 rounded border border-global-primary border-opacity-32">
              <span class="text-global-primary text-sm leading-4">
                <template v-if="type === TabCategoryData.mining">{{ I18n.apy.pool.mining }}</template>
                <template v-else>{{ I18n.apy.pool.lean }}</template>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="flex items-center mt-5 text-xs" v-if="type === TabCategoryData.mining">
        <div class="whitespace-nowrap flex items-end">
          <span class="text-global-highTitle text-xs leading-5 text-opacity-45">{{ I18n.apy.pool.apy }}</span>
          <span class="text-kdExp flex text-global-numGreen text-4xl leading-9 ml-1.5">
            <span class="font-semibold">{{ toNumber(detail.apy) }}%</span>
          </span>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap text-xs">
            <span class="text-global-highTitle text-opacity-45">TVL: </span>
            <span class="text-kdExp text-global-highTitle text-opacity-85">{{ toNumberCashFormat(detail.tvl, '$') }}</span>
          </div>
          <div class="whitespace-nowrap mt-2">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apy.pool.remainingRatio }}: </span>

            <template v-if="isEmpty(detail.quota_remain) && isEmpty(detail.quota_remain_percent)">
              <span class="text-kdExp text-global-highTitle text-opacity-85">-</span>
            </template>
            <template v-else>
              <span class="text-kdExp text-global-highTitle text-opacity-85">
                <span>{{ toNumberCashFormat(detail.quota_remain, '$') }}</span>
                <span class="ml-2">({{ toNumberFormat(detail.quota_remain_percent, '%') }})</span>
              </span>
            </template>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap text-xs">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apy.pool.single }}: </span>
            <span class="text-global-highTitle text-opacity-85">{{ toNumberCashFormat(detail.single_apy, '%') }}</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-xs">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apy.pool.compound }}: </span>
            <span class="text-global-highTitle text-opacity-85">{{ toNumberCashFormat(detail.compound_apy, '%') }}</span>
          </div>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apy.pool.info }}</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-global-highTitle text-opacity-85">
            <span class="label" v-if="detail.single_apy_detail">{{ detail.single_apy_detail }} {{ I18n.apy.pool.single }}</span>
            <span class="label" v-if="detail.compound_detail">{{ detail.compound_detail }} {{ I18n.apy.pool.compound }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center mt-5 text-xs" v-else-if="type === TabCategoryData.lend">
        <div class="whitespace-nowrap flex items-end">
          <span class="text-global-highTitle text-xs leading-5 text-opacity-45">{{ I18n.apy.interest }}</span>
          <span class="text-kdExp flex text-global-numGreen text-4xl leading-9 ml-1.5">
            <span class="font-semibold">{{ toNumber(detail.apy) }}%</span>
          </span>
        </div>
        <div class="split"></div>
        <div>
          <div class="whitespace-nowrap text-xs">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apyIndex.borrowAmount }}: </span>
            <span class="text-kdExp text-global-highTitle text-opacity-85">{{ toNumberCashFormat(detail.quota_remain, '$') }} ({{ toNumberFormat(detail.quota_remain_percent, '%') }})</span>
          </div>
        </div>
        <div class="split"></div>
        <div class="text-xs">
          <div class="whitespace-nowrap">
            <span class="text-global-highTitle text-opacity-45">{{ I18n.apyIndex.interestGroup }}</span>
          </div>
          <div class="whitespace-nowrap mt-2 text-global-highTitle text-opacity-85">
            <span class="label">{{ detail.apy_detail }}</span>
          </div>
        </div>
      </div>

      <div class="py-4" v-if="detail.risk_warning && detail.risk_warning.length > 0">
        <template v-for="(value, index) in detail.risk_warning" :key="index">
          <div class="bg-global-numRed bg-opacity-6 p-2.5 text-global-numRed text-xs">
            <IconFont type="icon-Warning" size="16" class="mr-3"/>
            <span class="inline">{{ value }}</span>
          </div>
        </template>
      </div>
      <div class="py-4" v-else>
        <div class="bg-global-numRed bg-opacity-6 p-2.5 text-global-numRed text-xs flex items-center">
          <IconFont type="icon-Warning" size="16" class="mr-3 flex"/>
          <span class="inline">{{I18n.apyIndex.warningDes}}</span>
        </div>
      </div>
      <div class="border-0 border-t border-solid border-highTitle border-opacity-6">
        <div class="flex justify-end py-4">
          <UiDateDay/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0 overflow-init">
      <div class="flex h-full">
        <div class="flex-1 w-1 pr-4 h-full border-0 border-r border-solid border-highTitle border-opacity-6">
          <Apy2PoolTrends :type="type" :id="id" :title="I18n.apy.pool.poolData"/>
        </div>
        <div class="flex-1 w-1 h-full pl-4">
          <Apy2PoolTop5  v-if="tabValue === tab1 && detail.id"  :type="type" :symbol="detail.symbol_alias" :title="I18n.apy.pool.apyTop5">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="tab1">{{ I18n.apy.pool.ranking }}</el-radio-button>
              <el-radio-button :label="tab2">{{ I18n.apy.pool.trending }}</el-radio-button>
            </el-radio-group>
          </Apy2PoolTop5>
          <Apy2PoolDiff v-else-if="tabValue === tab2" :type="type" :symbol="detail.symbol_alias" :title="I18n.apy.pool.apyTop5">
            <el-radio-group v-model="tabValue" size="small">
              <el-radio-button :label="tab1">{{ I18n.apy.pool.ranking }}</el-radio-button>
              <el-radio-button :label="tab2">{{ I18n.apy.pool.trending }}</el-radio-button>
            </el-radio-group>
          </Apy2PoolDiff>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>

.calc{
  .el-dialog__body{
    padding:0px !important;
    padding-top:0px !important;
  }
}

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



