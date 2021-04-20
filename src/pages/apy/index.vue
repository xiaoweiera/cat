<script setup lang="ts">
import {getColumns,getDataset} from '~/api/apy'
import axios from 'axios'
import {onMounted, reactive, ref} from 'vue'
import type { RowResponse, HeaderModel, TableModel } from '~/types/apy'
import Table = WebAssembly.Table;
const tagList = [
  {id: 1, select: true,key:'eth', name: 'ETH', img: 'https://res.ikingdata.com/nav/apyEth.png'},
  {id: 2, select: false,key:'heco', name: 'Heco', img: 'https://res.ikingdata.com/nav/apyHeco.png'},
  {id: 3, select: false,key:'ok', name: 'Okchain', img: 'https://res.ikingdata.com/nav/apyOkchain.png'},
  {id: 4, select: false,key:'bsc', name: 'BSC', img: 'https://res.ikingdata.com/nav/apyBsc.png'},
]
let tagSelet=ref('bsc')
let dataTable=reactive<TableModel>([])
// let dataTable=ref<TableModel[]>([])
const listType=[{name:'lend',title:'DeFi 借贷平台存款 APY 对比'},{name:'loan',title:'DeFi 借贷平台借款利息对比'},{name:'machine_gun_pool',title:'DeFi 单币种机枪池 APY 对比'}]
//得到header
const getTableData = async () => {
  let newData=[]
  for(let i=0;i<listType.length;i++){
    const item=listType[i]
    const param={chain:'heco',category:item.name}
    //获取header
    let {data:{code, data: headers}}=await getColumns(param);
    //获取dataSet
    let  {data:{code:codes, data: rows}} = await getDataset(param);
    newData.push( { title: item.title, headers, rows })
  }
  Object.assign(dataTable,newData)
}
//根据链查询
const filterTableData=async (name)=>{
  let newData=[]
  for(let i=0;i<listType.length;i++){
    const item=listType[i]
    const param={chain:name,category:item.name}
    //获取header
    let {data:{code, data: headers}}=await getColumns(param);
    //获取dataSet
    let  {data:{code:codes, data: rows}} = await getDataset(param);
    newData.push( { title: item.title, headers, rows })
  }
  Object.assign(dataTable,newData)
  tagSelet.value=name
  // dataTable.value=[]
  // dataTable.value=data
}
onMounted(async() => {
  await getTableData()
})
</script>

<template>
  <div class=" flex-col w-full max-w-360  md:mb-25">
    <!-- 头部描述信息-->
    <div class="px-4 md:px-30">
      <div class="text-kd24px100 md:text-kd24px24px  md:text-kd36px36px mt-8 md:mt-9.25">DeFi APY 大全</div>
      <div class="mt-4 text-kd14px22px text-global-default opacity-65 font-normal">
        我们已经为每个加密货币类别创建了索引。类别按24小时价格变化排名。单击密码类别名称可查看指数的组成部分及其最近的价格表现。
      </div>
      <ApyChain :filterTableData="filterTableData" :tagSelet="tagSelet" :tagList="tagList"/>
    </div>
    <!-- table表格-->
    <div :class="index%2!==0 ? 'cardBg px-4 py-12  md:px-30 md:py-15':'px-4 py-12 md:px-30 md:py-15' "
         v-for="(item,index) in dataTable">
      <ApyTable :index="index" :title="item.title" :dataSet="item.rows" :headerList="item.headers"/>
      <div class="grid  md:gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="(chart,i) in []" class="flex flex-col mt-8 md:mt-5 relative">
          <!--          描述信息-->
          <ApyDes/>
          <!--          平台列表-->
          <ApyPlat/>
          <!--          图表-->
          <ApyChart line="1" :id="'one'+i+j"/>
          <div v-if="i>0" class=" absolute border-1 h-full -left-6 "></div>
        </div>
      </div>
    </div>
    <ApyFooter/>
    <!--    浮动tag-->
    <div class="tagContainer w-18 h-28 flex-col fixed fixed right-2  2xl:right-40 top-70">
      <a class="selected block text-kd12px16px font-medium mb-4  pl-2   text-global-primary">存款 APY</a>
      <a class=" text-kd12px16px block font-medium mb-4 pl-2  text-global-default opacity-65 ">借款利息</a>
      <a class="text-kd12px16px block font-medium mb-4 pl-2  text-global-default opacity-65 ">单币机枪池</a>
      <a class="text-kd12px16px block font-medium mb-4 pl-2   text-global-default opacity-65">回到顶部</a>
    </div>
  </div>
</template>
<style scoped>
.cardBg {
  background-image: url('https://res.ikingdata.com/nav/apyCardBg.png');
  background-size: cover;
}

.selected {
  border-left: 2px solid #2B8DFE;
  @apply relative right-0.3;
}

.tagContainer {
  border-left: 1px solid rgba(37, 62, 111, 0.1);
}


@media screen and (max-width: 880px) {
  .tagContainer {
    display: none;
  }
}

.rightTag {
  box-shadow: inset 1px 0px 0px rgba(37, 62, 111, 0.1);
}

.leftBorder {
  border-left: 2px solid #2B8DFE;
}
</style>