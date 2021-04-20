<script setup lang="ts">
import {ElButton, ElSwitch, ElTable, ElTableColumn} from 'element-plus'
import {ref, defineProps, onMounted, onUpdated, reactive, watch, computed} from "vue";
import {numberFormat, numberTwo} from '~/lib/tool'
import type {HeaderModel} from '~/types/apy'

const props = defineProps({
  title: {type: String},
  dataSet: {
    type: Array
  },
  headerList: {
    type: Object as PropTypes<HeaderModel[]>
  },
  index: {
    type: Number
  }
})
let renderData = ref([])
//监听tag切换
watch(() => props.dataSet, (a, b) => {
  init()
})
const options = ref([])
//初始化
const init = () => {
  let newData = props.dataSet
  let newList = []
  newData.forEach((item, i) => {
    let newItem = {project_name: item.project_name, data: []}
    props.headerList.forEach(itemTwo => {
      let hasData = {}
      item.data.forEach(v => {
        if (itemTwo.token_name === v.token_name) {
          hasData = v
        }
      })
      //存款
      if (props.index === 0) {
        options.value = [{key: 'apy', name: '收到利息', status: true}, {
          key: 'apy_detail',
          name: '产出',
          status: true
        }, {key: 'tvl', name: '存款总额', status: true}, {key: 'quota_used', name: '借款总量', status: false}]
        newItem.data.push([{
          token_name: hasData.token_name,
          high_light: hasData.high_light,
          name: '收到利息',
          key: 'apy',
          value: numberTwo(hasData.apy),
          status: true
        }, {name: '产出', key: 'apy_detail', value: hasData.apy_detail, status: true}, {
          name: '存款总额', key: 'tvl', value: numberFormat(hasData.tvl),
          status: true
        }, {name: '借款总量', key: 'quota_used', value: numberFormat(hasData.quota_used), status: false}])
      } else if (props.index === 1) {
        options.value = [{key: 'apy', name: '支付利率', status: true}, {key: 'apy_detail', name: '计息', status: true},
          {key: 'quota_remain', name: '可借', status: false},
          {key: 'quota_remain*quota_remain_percent', name: '借出', status: false},
          {key: 'quota_remain_percent', name: '剩余额度', status: false}]
        newItem.data.push([{
          token_name: hasData.token_name,
          high_light: hasData.high_light,
          name: '支付利率',
          key: 'apy',
          value: numberTwo(hasData.apy),
          status: true
        }, {name: '计息', key: 'apy_detail', value: hasData.apy_detail, status: true}, {
          name: '可借', key: 'quota_remain', value: numberFormat(hasData.quota_remain),
          status: false
        }, {
          name: '借出',
          key: 'quota_remain*quota_remain_percent',
          value: numberFormat(hasData.quota_remain * hasData.quota_remain_percent),
          status: false
        }
          , {
            name: '剩余额度',
            key: 'quota_remain_percent',
            value: numberFormat(hasData.quota_remain_percent),
            status: false
          }])
      } else if (props.index === 2) {
        options.value = [{key: 'apy', name: '收到利息', status: true}, {
          key: 'apy_detail',
          name: '产出币种',
          status: true
        }, {key: 'quote', name: '可投额度', status: true},
          {key: 'tvl', name: '总锁仓', status: false},
          {key: 'quota_remain_percent', name: '剩余额度', status: false}]
        newItem.data.push([{
          token_name: hasData.token_name,
          high_light: hasData.high_light,
          name: '收到利息',
          key: 'apy',
          value: numberTwo(hasData.apy),
          status: true
        }, {name: '产出', key: 'apy_detail', value: hasData.apy_detail, status: true}, {
          name: '可投出额度', key: 'quote', value: numberFormat(hasData.quota_remain),
          status: true
        }, {name: '总锁仓', key: 'tvl', value: numberFormat(hasData.tvl), status: false}
          , {
            name: '剩余额度',
            key: 'quota_remain_percent',
            value: numberFormat(hasData.quota_remain_percent),
            status: false
          }])
      }
    })
    newList.push(newItem)
  })
  renderData.value = newList;

}
onMounted(() => {
  init();
})
//单元格背景色
const addClass = ({row, column, rowIndex, columnIndex}) => {
  if (row.data[columnIndex - 1] && columnIndex > 0 && row.data[columnIndex - 1][0].high_light === true) {
    return 'border:1px solid none;background:rgba(9, 217, 142, 0.2);'
  } else {
    return 'border:1px solid none;'
  }
}
const addHeaderClass=()=>{
  return 'background:linear-gradient(to right,#F6FAFD,#F6FAFD,#F6FAFD);'
}
//删选
const filterFunc = (args) => {
  let newData = []
  renderData.value.forEach((item, i) => {
    let newItem = []
    item.data.forEach((itemTwo, j) => {
      //没列的数据
      let newItemTwo = []
      itemTwo.forEach((keyData, n) => {
        //第一个永远显示
        args.forEach(keys => {
          if (keys.key === keyData.key) {
            newItemTwo.push({
              high_light: keyData.high_light,
              key: keyData.key,
              name: keyData.name,
              status: keys.status,
              token_name: keyData.token_name,
              value: keyData.value
            })
          }
        })
      })
      newItem.push(newItemTwo)
    })
    newData.push({project_name: item.project_name, data: newItem})

  })
  renderData.value = newData;
}
</script>
<template>
  <ApyOption :options="options" :filterFunc="filterFunc" :title="title" :index="index"/>
  <div class="flex flex-col">
    <el-table
        :data="renderData"
        :header-row-style="addHeaderClass"
        :header-cell-style="'background:rgba(43, 141, 254, 0.14)'"
        :cell-style="addClass"
        style="width: 100%;"
    >
      <el-table-column
          fixed
          prop="date"
          label="日期"
          width="140"
      >
        <template #header="scope">
          <div class="text-kd12px16px text-global-default opacity-65 ">项目/币种</div>
          <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
        </template>
        <template #default="scope">
          <div class="min-w-35  w-35   justify-center   flex flex-col">
            <div class="flex px-3  items-center  ">
              <img class="w-8 h-8 mr-1.5" src="https://res.ikingdata.com/nav/platForm.png" alt="">
              <div class="flex flex-col ">
                <div class="font-kdExp mb-1  text-kd14px18px text-global-highTitle font-normal">
                  {{ scope.row.project_name }}
                </div>
                <div
                    class="font-normal rounded h-4.5 w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px text-global-primary">
                  借贷平台
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="(item,i) in headerList"
                       width="212"
      >
        <template #header="scope">
          <ApyHeaderColumn :headerData="item"/>
        </template>
        <template #default="scope">
          <!--          table里面的单个表格-->
          <!--          {{scope.row.data[i]?scope.row.data[i].token_name:'&#45;&#45;'}}-->
          <ApyTableItem :index="index" :itemData="scope.row.data[i]"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
::v-deep(.el-table td) {
  border-bottom: 0;
}

.t_btn2 /deep/ .el-table, .el-table__expanded-cell {
  background-color: #F6FAFD;
}

.el-table::before {
  height: 0px;
}

::v-deep(.el-switch__core) {
  width: 35px !important;
  height: 18px;
}

::v-deep(.el-switch__action) {
  height: 12px !important;
  width: 12px !important;
  margin-top: 1px;
}

el-table th, .el-table tr {
  background-color: red;
}

::v-deep(.el-table tr) {
//background: blue !important;
}


</style>

