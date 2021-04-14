<script setup lang="ts">
const tagList=[
  {id:1,name:'ETH',img:'https://res.ikingdata.com/nav/apyEth.png'},
  {id:2,name:'Heco',img:'https://res.ikingdata.com/nav/apyHeco.png'},
  {id:3,name:'Okchain',img:'https://res.ikingdata.com/nav/apyEth.png'},
  {id:4,name:'BSC',img:'https://res.ikingdata.com/nav/apyBsc.png'},
]
</script>

<template>
  <!--  <ApyChart/>-->
  <!--top description-->
  <div class=" flex  flex-col w-full max-w-360 px-30  md:mb-40">
    <div class="text-kd24px24px  md:text-kd36px36px mt-8 md:mt-9.25">DeFi APY 大全</div>
    <div class="mt-4 text-kd14px22px text-global-default opacity-65 font-normal">我们已经为每个加密货币类别创建了索引。类别按24小时价格变化排名。单击密码类别名称可查看指数的组成部分及其最近的价格表现。</div>
    <div class="flex" >
      <div v-for="item in tagList" class="rounded-md mb-15 flex mt-4 mr-1 bg-global-primary bg-opacity-8 py-1.25 px-3.75 items-center justify-center">
        <img class="w-4.5 h-4.5 mr-1" :src='item.img' alt="">
        <div class="text-kd14px20px text-global-primary font-normal  font-kdExp">{{item.name}}</div>
      </div>
    </div>
    <!--  jie-->
    <!--    <ApyTableData />-->
    <!--    <ApyChart/>-->
    <!--  dai-->

    <!--  danbi-->

    <!--  dibu-->
    <!--    <GrowthpadFooter/>-->
        <ApyTable/>
    <ApyFooter/>
  </div>

</template>
<style scoped>
.rightTag{
  box-shadow: inset 1px 0px 0px rgba(37, 62, 111, 0.1);
}
.leftBorder{
  border-left:2px solid #2B8DFE;
}
</style>