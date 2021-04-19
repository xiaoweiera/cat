<script setup lang="ts">
import {ElButton, ElSwitch, ElTable, ElTableColumn} from 'element-plus'
import {ref, defineProps, onMounted, reactive, computed} from "vue";
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

let filterItems = reactive([])
let renderData = reactive([])

const changeOption = (arg) => {
  // return R.map(datas => {
  //   return {...item, 'tvl': {...item.tvl, show: !arg[0]}}
  // })
  if (filterItems.length !== 0) {
    return []
  }
  return props.dataSet
}
const options=ref({token_name:true,})
onMounted(() => {
  console.log('fffff',props.dataSet)
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
      if(props.index===0) {
        options.value=[{key:'apy',name:'收到利息',status:true},{key:'apy_detail',name:'产出',status:true},{key:'tvl',name:'存款总额',status:true},{key:'quota_used',name:'借款总量',status:true}]
        newItem.data.push([{
          token_name: hasData.token_name,
          high_light: hasData.high_light,
          name: '收到利息',
          key: 'apy',
          value: hasData.apy,
          status: true
        }, {name: '产出', key: 'apy_detail', value: hasData.apy_detail, status: true}, {
          name: '存款总额', key: 'tvl', value: hasData.tvl,
          status: true
        }, {name: '借款总量', key: 'quota_used', value: hasData.quota_used, status: true}])
      }
      else if(props.index===1){
        options.value=[{key:'apy',name:'支付利率',status:true},{key:'apy_detail',name:'计息',status:true},
          {key:'quota_remain',name:'可借',status:true},
          {key:'quota_remain_percent',name:'剩余额度',status:true}]
          newItem.data.push([{
          token_name: hasData.token_name,
          high_light: hasData.high_light,
          name: '支付利率',
          key: 'apy',
          value: hasData.apy,
          status: true
        }, {name: '计息', key: 'apy_detail', value: hasData.apy_detail, status: true}, {
          name: '可借', key: 'quota_remain', value: hasData.quota_remain,
          status: true
        },{name: '借出', key: 'hasData.quota_remain*hasData.quota_remain_percent', value:hasData.quota_remain*hasData.quota_remain_percent, status: true}
        , {name: '剩余额度', key: 'quota_remain_percent', value: hasData.quota_remain_percent, status: true}])
      }
      else if(props.index===3){

      }
    })
    newList.push(newItem)
  })
  if (props.index === 0) {
    Object.assign(renderData, newList)
  } else {
    Object.assign(renderData, newList)
  }

})

const ok = ref(true)
//删选
const filterFunc = (args) => {
  let newData=[]
  renderData.forEach((item,i)=>{
    let newItem=[]
    item.data.forEach((itemTwo,j)=>{
      //没列的数据
      let newItemTwo=[]
      itemTwo.forEach(keyData=>{
        args.forEach(keys=>{
          if(keys.key===keyData.key)
          {
            newItemTwo.push({high_light:keyData.high_light,key:keyData.key,name:keyData.name,status:keys.status,token_name:keyData.token_name,value:keyData.value})
          }
        })

      })
      newItem.push(newItemTwo)
    })
    newData.push({project_name:item.project_name,data:newItem})

  })
  Object.assign(renderData, newData)
}
</script>
<template>
  <ApyOption :options="options" :filterFunc="filterFunc" :title="title" :index="index"/>
  <div class="flex flex-col">
    <el-table
        :data="renderData"
        :header-cell-style="'background:rgba(43, 141, 254, 0.14)'"
        :cell-style="'background:#F6FAFD'"
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
      <el-table-column    v-for="(item,i) in headerList"
                       prop="name"
                       width="212"
      >
        <template #header="scope">
          <ApyHeaderColumn :headerData="item"/>
        </template>
        <template #default="scope">
          <!--          table里面的单个表格-->
          <!--          {{scope.row.data[i]?scope.row.data[i].token_name:'&#45;&#45;'}}-->
          <ApyTableItem :index="index"  :itemData="scope.row.data[i]"/>
        </template >
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.t_btn2 /deep/ .el-table, .el-table__expanded-cell {
  background-color: #F6FAFD;
}

/deep/ .el-table {
  thead {
    color: #fff;
    font-weight: 500;
    background: linear-gradient(to right, #6fa3fe, #4cdafe) !important;

    & th {

      background-color: transparent;
    }

    & tr {
      background-color: transparent;
    }
  }
}

.t_btn2 /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell {
  background-color: transparent;
}

.t_btn2 /deep/ .el-table__row > td {
  border: none;
}

/deep/ .el-table__fixed {
  border: 0px solid #F6FAFD;
}

/deep/ .el-table__fixed-right::before, /deep/ .el-table__fixed::before {
  background-color: transparent;
}

/* 清除底部横线 */
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

