<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus'

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
},]
</script>
<template>
  <div class="flex items-center   mb-5">
    <div class="text-kd18px28px font-normal mr-1.5">DeFi 借贷平台存款 APY 对比</div>
    <div class="text-kd14px20px font-normal text-global-default opacity-65">(4秒前更新)</div>
  </div>
  <!--  <div class="flex flex-col">-->
  <el-table
      :data="tableData"
      style="width: 100%"
  >
    <el-table-column
        fixed
        prop="date"
        label="日期"
        width="140"
    >
      <template #header="scope" >
          <div class="text-kd12px16px text-global-default opacity-65 ">项目/币种</div>
          <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
      </template>
    </el-table-column>
    <el-table-column
        prop="name"
        label="MDX"
        width="212"
    >
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
    <el-table-column
        prop="province"
        label="MDX"
        width="212"
    >
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
  <!--  </div>-->
</template>

<style scoped>
.topBg{
  background: linear-gradient(270deg, rgba(43, 141, 254, 0) 0%, rgba(43, 141, 254, 0.04) 2.61%, rgba(43, 141, 254, 0.04) 93.5%, rgba(43, 141, 254, 0) 100%);
}
.desName{
  @apply text-kd12px16px text-global-default font-normal opacity-65;
}
.desNum{
  @apply  font-kdExp font-normal text-kd14px16px;
}
.desInfo{
  @apply text-kd12px16px font-kdExp font-normal;
}
</style>

