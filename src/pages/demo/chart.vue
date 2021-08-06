<script setup lang="ts">
import { toArray, uuid } from '~/utils'
import { ref, watch } from 'vue'
// @ts-ignore
import { Position } from '~/logic/echarts/interface'
import { createEchartData, onRemoveLegend, onAddLegend } from '~/logic/demo/chart'
const echartData = createEchartData()

const key = ref<string>(uuid())

const sync = function(){
  key.value = uuid()
}

const onRemove = function(index: number) {
  onRemoveLegend(echartData, index)
  sync()
}

const onAdd = function() {
  onAddLegend(echartData)
  sync()
}

</script>

<template>
  <div class="p-5">
    <div class="border-gray-500 border border-solid">
      <div class="w-full p-2 flex">
        <el-button type="primary" @click="sync">刷新图表</el-button>
        <el-button type="success" @click="onAdd">添加一条新数据</el-button>
      </div>
      <div class="flex border-gray-500 border-t border-solid">
        <div class="flex-1 w-1 p-2">
          <el-form ref="form" :model="echartData" label-position="top">
            <template v-for="(item, index) in echartData.legends" :key="index">
              <div class="flex justify-between items-center pb-2">
                <div class="flex-1">
                  <el-input v-model="echartData.legends[index].name"></el-input>
                </div>
                <div class="ml-5">
                  <el-button size="small" type="warning" @click="onRemove(index)">删除</el-button>
                </div>
              </div>
            </template>
          </el-form>
        </div>
        <div class="flex-1 w-1 border-gray-500 border-l border-solid">
          <div class="h-100" :key="key">
            <!-- 堆积图，log 图 --->
            <Echarts :stack="false" :log="false">
              <!-- 提示框 trigger: 触发方式 -->
              <EchartsTooltip trigger="axis" />
              <!--图例-->
              <template v-for="(item, index) in echartData.legends" :key="`legend-${index}`">
                <!--
                  value: 图例名称
                  type: 图例对应的图形类型(通过 index 与 series 数据匹配)
                  show: 是否显示
                  position: 通过该字段控制 Series 中对应的数据以那个 Y 轴为纬度展示
                -->
                <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>

                <EchartsYaxis :index="0" :position="Position.left"/>
                <EchartsYaxis :index="1" :position="Position.right"/>

                <!-- 设置X轴 -->
                <EchartsXaxis :value="echartData.xAxis"/>


                <!--数据-->
                <template v-for="(item, index) in echartData.series" :key="index">
                  <!--
                    通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
                    value: 数据
                  -->
                  <EchartsSeries :index="index" :value="item"/>
                </template>
              </template>
            </Echarts>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: index
</route>
// @formatter:off
