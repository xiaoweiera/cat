<script setup lang="ts">
// @ts-ignore
const radios = [
  { label: '单币', value: 1 },
  { label: 'LP', value: 2 }
]
const selects = [
  { label: '选择公链', value: 1 },
]

const onSumbit = function(value: Array<string | number>) {

}

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="flex-1 w-1">
        <span class="inline-block leading-6 align-middle text-global-highTitle text-opacity-85 text-xl">BTC 挖矿 APY TOP 10</span>
        <span class="inline-block leading-6 ml-1.5 text-xs text-global-highTitle text-opacity-45">更新时间：1分钟前</span>
      </p>
      <div class="ml-5">
        <div class="cursor-pointer text-global-highTitle text-opacity-65">
          <!-- 保存 echarts 图表 -->
          <EchartsDownload title="收益"/>
        </div>
      </div>
    </div>
    <p class="mt-1.5">
      <span class="leading-6 text-xs text-global-highTitle text-opacity-45">指标描述：展示选定币种/交易对在单位时间内的资金净流入情况，该指标是使用单位时间内主动买入-主动卖出进行计算的，异常的资金变化可能导致行情出现剧烈波动。</span>
    </p>
  </div>
  <div class="mt-3">
    <div class="flex justify-between items-center">
      <div>
        <UiTransfer title="添加矿池" sub-title="已选矿池" :radios="radios" :selects="selects" @submit="onSumbit">
          <template #content>
            <el-button plain size="small">
              <div class="inline-flex items-center px-3 py-0.5">
                <IconFont class="flex mr-1" type="icon-plus" size="16"/>
                <span class="text-sm">添加矿池</span>
              </div>
            </el-button>
          </template>

          <!-- 自定义左侧列表显示内容 -->
          <template #item="scope">
            <span class="text-global-highTitle text-xs font-normal">BTC/ETH-{{ scope.data }}</span>
          </template>
          <!-- 自定义右侧列表显示内容 -->
          <template #result="scope">
            <span>BTC/ETH-{{ scope.id }}</span>
          </template>
        </UiTransfer>
      </div>
      <div>
        <UiDateDay/>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
