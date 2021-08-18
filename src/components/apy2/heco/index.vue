<script setup lang="ts">
import { omit } from 'ramda'
// @ts-ignore
import { formatCash, uuid } from '~/utils'
import { onMounted, reactive, ref, toRaw } from 'vue'
// @ts-ignore
import { getHecoTrendsList, getTableList, pcHeader, mobileHeader } from '~/logic/apy2/heco'
import { HecoDetail, HecoNode } from '~/logic/apy2/interface'
// @ts-ignore
import { EchartData, Position, seriesType } from '~/logic/echarts/interface'
import DBList from '@fengqiaogang/dblist'
import safeSet from '@fengqiaogang/safe-set'
import router from '~/utils/router'

const detail = reactive<HecoDetail>(new HecoDetail())

const chartData = reactive<EchartData>(new EchartData())
const tableData = ref<HecoNode[]>([])

// 投票数
const updateTrendsData = async function() {
  const trends = await getHecoTrendsList()
  detail.votes = trends.votes
  detail.voters = trends.voters
  const data = trends.trends ? trends.trends : new EchartData()
  chartData.legends = data.legends
  chartData.xAxis = data.xAxis
  chartData.series = data.series
}
// 节点数据
const updateNodeList = async function() {
  tableData.value = await getTableList()
}

onMounted(function() {
  return Promise.all([ updateTrendsData(), updateNodeList()])
})

const expandValue = ref<string>('')

// 删除展开的数据
const onExpandRemove = function(id: string, pid: string, value: string | number): HecoNode[] {
  const list: any[] = toRaw(tableData.value)
  if (value) {
    const db = new DBList(list, id, pid)
    db.remove({ [pid]: value })
    db.update({ [id]: value }, {
      expand: false
    })
    return db.clone<HecoNode>()
  }
  return list
}


// 展开
const onExpandOn = function(key: string, id: string, data: HecoNode) {
  const value = data.id
  // 获取删除展开数据后的表格数据
  const list: any[] = onExpandRemove(id, 'pid', expandValue.value)
  const expandData = omit([key, 'pid', 'dbIndex', 'expand', 'custom'], data)
  const expandId = uuid()
  safeSet(expandData, key, expandId)
  safeSet(expandData, 'pid', value)
  safeSet(expandData, 'custom', true)
  safeSet(expandData, 'expand', false)
  let index = 0
  for(let size = list.length; index < size; index++) {
    const item = list[index]
    if (item[key] === value) {
      item['expand'] = true
      index += 1
      break
    }
  }
  // @ts-ignore
  tableData.value = [].concat(list.slice(0, index), expandData, list.slice(index))
  expandValue.value = id
}


// 展开或者收起图表
const onChangeExpand = function(data: HecoNode) {
  const value = data.id
  const key = 'id'
  if (value && value === expandValue.value) {
    // 收起图表
    tableData.value = onExpandRemove(key, 'pid', value)
    expandValue.value = ''
  } else {
    // 展开图表
    onExpandOn(key, value, data)
  }
}

// @ts-ignore
const onRowClick = function(row: any) {
  const data: HecoNode = toRaw(row)
  if (data.custom) {
    return
  }
  onChangeExpand(data)
}
// @ts-ignore
const onOpen = function(href: string) {
  const src = router(href)
  window.open(src)
}

// @ts-ignore
const arraySpanMethod = function({ row, column, rowIndex, columnIndex }: any) {
  if (expandValue.value) {
    const value = row['pid']
    if (value && value === expandValue.value) {
      if (columnIndex === 0) {
        return [1, pcHeader.length + 1];
      }
      return [0, 0];
    }
  }
}


</script>

<template>
  <div class="bg-global-white px-4">
    <div class="w-300 mx-auto max-w-full text-kdFang">
      <div class="text-center">
        <h3 class="title text-global-highTitle text-opacity-85">HECO 节点竞选</h3>
        <p class="description">
        <span class="item">
          <span class="sub">本轮投票总票数</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">
            <span>{{ formatCash(detail.votes) }} HT</span>
          </span>
        </span>
          <span class="item">
          <span class="sub">本轮投票总人数</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">
            <span>{{ formatCash(detail.voters) }} 人</span>
          </span>
        </span>
          <span class="item">
          <span class="sub">距本轮投票结束</span>
          <span class="ml-1 text-global-highTitle text-opacity-85">05:33:20</span>
        </span>
        </p>
      </div>
      <div class="mt-6 h-75">
        <Echarts v-if="chartData.xAxis && chartData.xAxis.length > 0">
          <!-- 提示框 trigger: 触发方式 -->
          <EchartsTooltip trigger="axis" />

          <template v-for="(item, index) in chartData.legends" :key="index">
            <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
          </template>

          <EchartsYaxis :index="0" :position="Position.left"/>
          <EchartsYaxis :index="1" :position="Position.right"/>

          <!-- 设置X轴 -->
          <EchartsXaxis :value="chartData.xAxis"/>
          <!--数据-->
          <template v-for="(item, index) in chartData.legends" :key="index">
            <!--
              通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
              value: 数据
            -->
            <EchartsSeries :index="index" :color="item.color" :value="chartData.series[item.id]"/>
          </template>
        </Echarts>
      </div>
      <div class="mt-6">
        <!-- 大屏 -->
        <div class="hidden md:block">
          <el-table class="w-full heco-custom-expand" :data="tableData" row-key="id" :span-method="arraySpanMethod" @row-click="onRowClick">
          <template v-for="(item, index) in pcHeader" :key="index">
            <el-table-column :prop="item.key" :sortable="item.sortable" :label="item.label" :fixed="item.fixed">
              <template v-if="item.key === 'node_name'" #default="scope">
                <Apy2HecoProject :data="scope.row"/>
              </template>
              <template v-else-if="item.render" #default="scope">
                <div :class="item.className">
                  <span>{{ item.render(scope.row, item.key) }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="node_name" label="操作">
            <template #default="scope">
              <div>
                <el-button type="text" @click.stop.prevent="onOpen(scope.row.address)">
                  <span class="text-xs font-medium">去投票</span>
                </el-button>
                <el-button type="text">
                  <span class="text-xs font-medium" v-if="scope.row.expand">收起图表</span>
                  <span class="text-xs font-medium" v-else>展开图表</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <!-- 手机端 -->
        <div class="block md:hidden">
          <el-table class="w-full heco-custom-expand" :data="tableData" row-key="id">
            <template v-for="(item, index) in mobileHeader" :key="index">
              <el-table-column :min-width="item.width" :prop="item.key" :sortable="item.sortable" :label="item.label" :fixed="item.fixed">
                <template v-if="item.render" #default="scope">
                  <div class="whitespace-nowrap" :class="item.className">
                    <span class="inline-block">{{ item.render(scope.row, item.key) }}</span>
                  </div>
                </template>
              </el-table-column>
            </template>
            <el-table-column prop="node_name" label="操作">
              <template #default="scope">
                <div>
                  <el-button type="text" @click.stop.prevent="onOpen(scope.row.address)">
                    <span class="text-xs font-medium">去投票</span>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="pt-4 pb-15">
        <h4 class="text-base text-global-highTitle">投票规则:</h4>
        <p class="pt-1.5 text-xs whitespace-pre-wrap text-global-default text-opacity-85">
          <span class="block">
            1 投票方式：用户通过质押 HT 的方式向候选人投票，1HT代表1票，仅能投给一个候选人，本次竞选开放11个主节点，11个备选节点；HT质押量排名前11的候选人为主节点，第12-22名为备选节点。
          </span>
          <span class="block">2 投票周期：节点排名根据用户投票数更新，奖励每6小时发放。</span>
          <span class="block">3 退出机制：投票用户可随时退出节点投票并取回HT，取回的HT锁定大约3天后到账。</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-button--text {
  min-height: 1px;
  @apply p-0;
}
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

<style lang="scss">
.el-table {
  &.heco-custom-expand {
    thead {
      th {
        @apply border-t border-b border-solid border-global-highTitle border-opacity-6;
        .cell {
          @apply whitespace-nowrap;
        }
      }
    }
    tr {
      td {
        @apply border-0;
        .cell {
          line-height: 20px;
        }
      }
    }
    td[colspan] {
      &:only-child {
        @apply p-3 rounded-md bg-global-bodyTwo border border-solid border-global-highTitle border-opacity-6;
      }
    }
  }
}
</style>
