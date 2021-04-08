<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('1')
</script>

<template>
  <div class="mx-12">
    <div class="hero w-full h-96 flex items-center mx-auto mt-12 pb-12">
      <div class="left w-2/5 text-left">
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
        </div>

      </div>
      <div class="right w-2/5 ml-18">
        <img src="hero-money.svg" alt="" class="hero-money">
      </div>
    </div>

    <!--  正在进行中-->
    <div class="progress text-left">
      <p class="project-status-title">⛳️ 正在进行</p>
      <GrowthpadProjects :status="'progress'"/>
    </div>

    <!--  我参与的 / 已结束 -->
    <div class="project-container">
      <a-tabs default-active-key="1" v-model:activyKey="activeKey" size="small" type="line">
        <a-tab-pane key="1" tab="🎰 我参与的">
          <GrowthpadProjects :status="'progress'"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="🎯 已结束">
          <GrowthpadProjects :status="'done'"/>
        </a-tab-pane>
      </a-tabs>
    </div>

    <GrowthpadFooter/>
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

.join-in {
  background-image: url("/assets/growthpad/join-button.svg");
  @apply h-32 bg-no-repeat w-auto;
}
.project-status-title {
  color: #033666;
  font-family: "PingFang SC";
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
  line-height: 28px;
}

.project-container {
  overflow: hidden;
  @apply text-left my-12;
}

.project-container > .ant-tabs-card > .ant-tabs-content {
  height: 240px;

  //margin-top: -16px;
}

.project-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  //background: #fff;
  padding: 16px;
}

.project-container > .ant-tabs-card > .ant-tabs-bar {
  //border-color: #fff;
}

.project-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.project-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
