<script setup lang="ts">
import { uuid, map } from '~/utils'
import { ref } from 'vue'
// @ts-ignore
import { Position, seriesType, Direction, LegendDirection, colors } from '~/logic/echarts/interface'
import { createEchartData, onRemoveLegend, onAddLegend, makeSeriesItem } from '~/logic/demo/chart'
const echartData = createEchartData()

const key = ref<string>(uuid())

// @ts-ignore
const direction = ref<Direction>(Direction.vertical)

const sync = function(){
  key.value = uuid()
}
const toJSON = function(value: string) {
  if (value) {
    const list: any[] = JSON.parse(value)
    return map(function(item: any){
      return makeSeriesItem(item)
    }, list)
  }
  return []
}

const toStringify = function() {
  return JSON.stringify(echartData, null, 4)
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
        <el-select v-model="direction" class="ml-5" @change="sync">
          <el-option :value="Direction.horizontal" label="水平"></el-option>
          <el-option :value="Direction.vertical" label="垂直"></el-option>
        </el-select>
      </div>
      <div class="flex border-gray-500 border-t border-solid">
        <div class="flex-1 w-1 p-2">
          <el-form ref="form" :model="echartData" label-position="top">
            <template v-for="(item, index) in echartData.legends" :key="index">
              <div class="pb-5">
                <div class="flex justify-end">
                  <el-button size="small" type="warning" @click="onRemove(index)">删除</el-button>
                </div>
                <div>
                  <el-form-item label="名称">
                    <el-input v-model="echartData.legends[index].name"></el-input>
                  </el-form-item>
                  <div class="flex">
                    <el-form-item label="图形类型" class="flex-1">
                      <el-select v-model="echartData.legends[index].type">
                        <el-option :value="seriesType.line" label="折线"></el-option>
                        <el-option :value="seriesType.bar" label="柱状"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否显示" class="flex-1">
                      <el-select v-model="echartData.legends[index].show">
                        <el-option :value="true" label="显示"></el-option>
                        <el-option :value="false" label="隐藏"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item label="数据">
                    <el-input type="textarea" v-model="echartData.series[index]"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-form>
        </div>
        <div class="flex-1 w-1 border-gray-500 border-l border-solid">
          <div class="h-100" :key="key">
            <!-- 堆积图，log 图 --->
            <Echarts :stack="false" :log="false" :direction="direction" :legend="LegendDirection.custom">
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
                <EchartsLegend :index="index" :value="item.name" :show="item.show" :type="item.type" :position="item.kline ? Position.right : Position.left"/>

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
                  <EchartsSeries :index="index" :color="colors[index]" :value="toJSON(item)"/>
                </template>
              </template>
            </Echarts>
          </div>
          <div>
            <pre v-html="toStringify()"></pre>
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
