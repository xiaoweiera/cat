<script setup lang="ts">
import { echartData } from '~/logic/apy2/heco'
// @ts-ignore
import { Position, seriesType } from '~/logic/echarts/interface'
const data = echartData()
</script>

<template>
  <div class="w-300 mx-auto max-w-full text-kdFang">
    <div class="text-center">
      <h3 class="title text-global-highTitle text-opacity-85">HECO 节点竞选</h3>
      <p class="description">
        <span class="item">
          <span class="sub">本轮投票总票数</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">3,642,110 HT</span>
        </span>
        <span class="item">
          <span class="sub">本轮投票总人数</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">9058 人</span>
        </span>
        <span class="item">
          <span class="sub">距本轮投票结束</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">05:33:20</span>
        </span>
      </p>
    </div>
    <div class="mt-6 h-75">
      <Echarts>
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />

        <template v-for="(item, index) in data.legends" :key="index">
          <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
        </template>

        <EchartsYaxis :index="0" :position="Position.left"/>
        <EchartsYaxis :index="1" :position="Position.right"/>

        <!-- 设置X轴 -->
        <EchartsXaxis :value="data.xAxis"/>


        <!--数据-->
        <template v-for="(item, index) in data.legends" :key="index">
          <!--
            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
            value: 数据
          -->
          <EchartsSeries :index="index" :color="item.color" :value="data.series[item.id]"/>
        </template>
      </Echarts>
    </div>

    <div class="mt-6">

    </div>
  </div>
</template>

<style scoped lang="scss">
h3.title {
  font-size: 2rem;
  @apply pt-10 pb-6;
}
.description {
  @apply text-sm text-global-default text-opacity-65 flex items-center justify-around;
  .item {
    @apply block;
    span {
      @apply block;
    }
    .sub {
      &:after {
        @apply inline-block;
      }
    }
  }

  @screen md {
    @apply block;
    .item {
      @apply inline-block ml-8;
      &:first-child {
        @apply ml-0;
      }
      span {
        @apply inline-block;
      }
      .sub {
        &:after {
          content: ":";
        }
      }
    }
  }

}
</style>
