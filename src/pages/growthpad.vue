<script setup lang="ts">
</script>

<template>
  <div class="hero w-full h-96 flex items-center mx-auto mt-24">
    <div class="left w-2/5 ml-24 text-left">
      <div class="title">
        <div>GrowthPad</div>
        <div>数据驱动 DeFi 项目快速增长</div>
      </div>
      <div class="sub-title">
        <div>GrowthPad 凭借 KingData 对 ETH、HECO、BSC、OKChain 四大公链全量链上数据以及各公链主流项目数据的挖掘和分析，建立了丰富的用户行为特征数据库。</div>
        <br>
        <div>GrowthPad
          旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。
        </div>
      </div>
      <GrowthpadSummary/>
      <div class="join-in">
        申请入驻GrowthPad ->
      </div>
    </div>
    <div class="right w-2/5 ml-18">
      <img src="hero-money.svg" alt="" class="hero-money">
    </div>
  </div>
</template>

<style scoped>
.hero-money {
  width: 518px;
  height: 388px;
}

.title {
  color: #033666;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 140%;
}
</style>
