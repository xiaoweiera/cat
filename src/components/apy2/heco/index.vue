<script setup lang="ts">
import { uuid } from '~/utils'
import { onMounted, ref, toRaw } from 'vue'
import { echartData, getHecoNodeList } from '~/logic/apy2/heco'
// @ts-ignore
import { header } from '~/logic/apy/heco'
// @ts-ignore
import { Position, seriesType } from '~/logic/echarts/interface'
import DBList from '@fengqiaogang/dblist'
import safeSet from '@fengqiaogang/safe-set'
import router from '~/utils/router'

// @ts-ignore
const chartData = echartData()
const tableData = ref<any[]>([])

onMounted(async function() {
  const list = await getHecoNodeList()
  tableData.value = list
})

const expandValue = ref<string>('')

// 删除展开的数据
const onExpandRemove = function(key: string, value: string | number) {
  const list: any[] = toRaw(tableData.value)
  const db = new DBList(list, key)
  if (value) {
    const where = { [key]: value }
    const expandData = db.selectOne<any>(where)
    if (expandData) {
      const oldValue: string | number = expandData[`old_${key}`]
      if (oldValue) {
        // 修改已展开行的数据状态
        db.update({ [key]: oldValue }, {
          expand: false
        })
      }
      // 删除展开行的数据
      db.remove(where)
    }
  }
  return db.clone()
}


// 展开
const onExpandOn = function(key: string, id: string, data: any) {
  const name = data[key]
  // 获取删除展开数据后的表格数据
  const list: any[] = onExpandRemove(key, expandValue.value)
  const expandData = { data, custom: true }
  safeSet(expandData, key, id)
  safeSet(expandData, `old_${key}`, name)

  let index = 0
  for(let size = list.length; index < size; index++) {
    const item = list[index]
    if (item[key] === name) {
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
const onChangeExpand = function(data: any) {
  const key = 'node_name'
  const name = data[key]
  const id = uuid(name)
  if (id === expandValue.value) {
    // 收起图表
    tableData.value = onExpandRemove(key, id)
    expandValue.value = ''
  } else {
    // 展开图表
    onExpandOn(key, id, data)
  }
}

// @ts-ignore
const onRowClick = function(row: any) {
  const data = toRaw(row)
  onChangeExpand(data)
}
// @ts-ignore
const onOpen = function(href: string) {
  const src = router(href)
  window.open(src)
}

// @ts-ignore
const arraySpanMethod = function({ row, column, rowIndex, columnIndex }: any) {
  if (expandValue) {
    const value = row['node_name']
    if (value === expandValue.value) {
      if (columnIndex === 0) {
        return [1, 7];
      }
      return [0, 0];
    }
  }

}


</script>

<template>
  <div class="bg-global-white">
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
        <el-table class="w-full custom-expand" :data="tableData" :span-method="arraySpanMethod" @row-click="onRowClick">
          <template v-for="(item, index) in header" :key="index">
            <template v-if="item.key === 'node_name'">
              <el-table-column :prop="item.key" sortable :label="item.label">
                <template #default="scope">
                  <Apy2HecoCustom v-if="scope.row.custom" :id="scope.row.data[item.key]"></Apy2HecoCustom>
                  <span v-else>{{ scope.row[item.key] }}</span>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column :prop="item.key" sortable :label="item.label"></el-table-column>
            </template>
          </template>
          <el-table-column prop="node_name" label="操作">
            <template #default="scope">
              <div>
                <el-button type="text" @click.stop.prevent="onOpen('http://www.baidu.com')">
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
.el-table.custom-expand {
  thead {
    th {
      @apply border-t border-b border-solid border-global-highTitle border-opacity-6;
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
</style>
