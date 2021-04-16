<script setup lang="ts">
import {ElButton, ElSwitch, ElTable, ElTableColumn} from 'element-plus'
import {ref,defineProps} from "vue";
const props = defineProps({
  headerList: {
    type: Array,
  }
})
const tableData = [{
  date: '2016-05-03',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333,
}, {
  date: '2016-05-02',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333,
}, {
  date: '2016-05-04',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333,
}, , {
  date: '2016-05-04',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333,
}, , {
  date: '2016-05-04',
  name: '王小虎',
  province: '上海',
  city: '普陀区',
  address: '上海市普陀区金沙江路 1518 弄',
  zip: 200333,
},]
const ok = ref(true)
</script>
<template>
  <div class="flex flex-wrap items-center justify-between  mb-8  md:mb-5">
    <div class="flex items-center">
      <div class="text-kd18px28px font-medium mr-1.5">DeFi 借贷平台存款 APY 对比</div>
      <div class="text-kd14px20px font-normal text-global-default opacity-65">(4秒前更新)</div>
    </div>
    <div>
      <div class="flex md:flex-row flex-col  md:items-center">
        <div class="mr-3 mt-3  md:mt-1 text-kd14px18px text-global-highTitle opacity-65 font-normal">池子指标</div>
        <div class="flex items-center flex-wrap ">
          <div v-for="item in [{},{},{},{}]" class="flex items-center mt-3 mr-3  md:mt-0">
            <div class="mr-2">
              <el-switch
                  width="39"
                  active-color="#2B8DFE"
                  inactive-color="rgba(37, 62, 111, 0.1)"
                  v-model="ok"
              >
              </el-switch>
            </div>
            <div class=" mt-1 text-kd14px18px font-normal text-global-highTitle">产出币种</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <el-table
        :data="tableData"
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
                <div class="font-kdExp mb-1  text-kd14px18px text-global-highTitle font-normal">Compound</div>
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
                       prop="name"
                       label="MDX"
                       width="212"
      >
        <template #header="scope">
          <ApyHeaderColumn :headerData="item"/>
        </template>
        <template #default="scope">
          <div class="w-53 h-full flex flex-col justify-center   px-3">
            <div class="flex mb-0.5 items-center">
              <div class="desName mr-1">收到利息</div>
              <div class="desNum">34.33%</div>
            </div>
            <div class="flex mb-0.5  items-center">
              <div class="desName mr-1">产出</div>
              <div class="desName">USDT(33%)+CAN(44%)</div>
            </div>
            <div class="flex mb-0.4  items-center">
              <div class="desName mr-1">存款总额</div>
              <div class="desName">$300万 USDT</div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

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

.topBg {
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}

.desName {
  @apply text-kd12px16px text-global-default font-normal opacity-65;
}

.desNum {
  @apply font-kdExp font-normal text-kd14px16px;
}

.desInfo {
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>

