<script setup lang="ts">
import {getColumns,getDataset} from '~/api/apy'
import {onMounted, reactive, ref} from 'vue'
import { ElLoading} from 'element-plus'
import type { RowModel, TableModel } from '~/types/apy'
const tagList = [
  {id: 1, select: true,key:'eth', name: 'ETH', img: 'https://res.ikingdata.com/nav/apyEth.png'},
  {id: 2, select: false,key:'heco', name: 'Heco', img: 'https://res.ikingdata.com/nav/apyHeco.png'},
  {id: 3, select: false,key:'ok', name: 'Okchain', img: 'https://res.ikingdata.com/nav/apyOkchain.png'},
  {id: 4, select: false,key:'bsc', name: 'BSC', img: 'https://res.ikingdata.com/nav/apyBsc.png'},
]
let tagSelet=ref('bsc')
let dataTable=ref<TableModel[]>([])
const listType=[{name:'lend',title:'DeFi 借贷平台存款 APY 对比'}
  ,{name:'loan',title:'DeFi 借贷平台借款利息对比'},{name:'machine_gun_pool',title:'DeFi 单币种机枪池 APY 对比'}
]
//判断首次加载的高度
let requested=ref(false)
//得到数据
const getTableData = async () => {
  let newData=[]
  for(let i=0;i<listType.length;i++){
    const item=listType[i]
    const param={chain:'bsc',category:item.name}
    //获取header
    let {data:{code, data: headers}}=await getColumns(param);
    //获取dataSet

    let  dataResult = await getDataset(param);
    //表格的每一行
    const rows:RowModel[]=dataResult.data.data
    const table:TableModel={project:item.name, title: item.title, headers, rows}
    dataTable.value[i] = table
    // newData.push(table)
  }
  requested.value=true
  // Object.assign(dataTable,newData)
}
//根据链查询
const filterTableData=async (name)=>{
  tagSelet.value=name
  let newData=[]
  for(let i=0;i<listType.length;i++){
    const item=listType[i]
    const param={chain:name,category:item.name}
    //获取header
    let {data:{code, data: headers}}=await getColumns(param);
    //获取dataSet
    let  dataResult = await getDataset(param);
    //表格的每一行
    const rows:RowModel[]=dataResult.data.data
    const table:TableModel={project:item.name, title: item.title, headers, rows}
    dataTable.value[i] = table
  }

}
const floatRightData=ref([{key:'lend',name:'存款 APY'},{key:'loan',name:'借款利息'},{key:'machine_gun_pool',name:'单币机枪池'},{key:'back',name:'回到顶部'}])
const selectTag=ref('存款 APY')
const changeTag=(name)=>{
  console.log(name)
  if(name==='回到顶部'){
    document.scrollingElement.scrollTop=0
  }
  selectTag.value=name
}
onMounted(async() => {
  await getTableData()
})
const loading=true
</script>
<template>
  <div   class=" flex-col w-full max-w-360  md:mb-25">
    <!-- 头部描述信息-->
    <div  class="px-4 md:px-30">
      <div class="text-kd24px100 md:text-kd24px24px  md:text-kd36px36px mt-8 md:mt-9.25">DeFi APY 大全</div>
      <div class="mt-4 text-kd14px22px text-global-default opacity-65 font-normal">
        我们已经为每个加密货币类别创建了索引。类别按24小时价格变化排名。单击密码类别名称可查看指数的组成部分及其最近的价格表现。
      </div>
      <ApyChain :filterTableData="filterTableData" :tagSelet="tagSelet" :tagList="tagList"/>
    </div>
    <!-- table表格-->
    <div :class="requested?'':'heightAuto'">
    <div v-if="requested"  :class="index%2!==0 ? 'cardBg px-4 py-12  md:px-30 md:py-15':'px-4 py-12 md:px-30 md:py-15' "
         v-for="(item,index) in dataTable">
      <ApyTable :index="index" :project="item.project" :title="item.title" :dataSet="item.rows" :headerList="item.headers"/>
      <div class="grid  md:gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="(chartType,i) in []" class="flex flex-col mt-8 md:mt-5 relative">
          <!--          描述信息-->
          <ApyDes/>
          <!--          平台列表-->
          <ApyPlat/>
          <!--          图表-->
          <ApyChart line="1" :chartType="chartType" :chain="tagSelet" :id="'one'+index+i"/>
          <div v-if="i>0" class=" absolute border-1 h-full -left-6 "></div>
        </div>
      </div>
    </div>
    </div>
    <ApyFooter />
    <!--    浮动tag-->
    <div class="tagContainer  w-18 h-28 flex-col fixed fixed right-2  2xl:right-40 top-70">
      <template v-for="item in floatRightData" >
        <a @click="changeTag(item.name)" :href="'#'+item.key" :class="selectTag===item.name? 'floatRightTag  selectRightTag hand':'floatRightTag  rightTag hand' ">{{item.name}}</a>
      </template>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 768px) {
  .heightAuto{
    height: calc( 100vh - 357px);
  }
}
@media screen and (min-width: 768px) {
  .heightAuto{
    height: calc( 100vh - 417px);
  }
}

.floatRightTag{
  @apply text-kd12px16px font-medium mb-4  pl-2;
}
.selectRightTag{

  border-left: 2px solid #2B8DFE;
  @apply relative right-0.3 block  text-global-primary;
}
.rightTag{
  @apply  text-global-default block opacity-65;
}
.cardBg {
  background-image: url('https://res.ikingdata.com/nav/apyCardBg.png');
  background-size: cover;
}

.selected {

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