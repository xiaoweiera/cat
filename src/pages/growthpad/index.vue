<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('1')
</script>

<template>
  <div class="max-w-mx1440 px-4 md:px-30   flex flex-col ">
    <div class="hero w-full flex-wrap   flex items-center   justify-between">
      <div class="mdhidden flex items-center justify-center w-full py-4.25 px-18 my-4  imgBg">
        <img src="https://res.ikingdata.com/nav/mobileMoney.png" alt="" class="moneyImg">
      </div>
      <div class="mxWidth  font-kdFang">
        <div class="text-kd26px140 md:text-kd36px  font-semibold text-global-highTitle">
          <div>GrowthPad</div>
          <div>数据驱动 DeFi 项目快速增长</div>
        </div>
        <div class="text-kd12px22px md:text-kd14px22px text-global-default  opacity-65 mt-4 md:mt-6 ">
          <div>GrowthPad 凭借 KingData 对 ETH、HECO、BSC、OKChain 四大公链全量链上数据以及各公链主流项目数据的挖掘和分析，建立了丰富的用户行为特征数据库。</div>
          <div class="mt-3">GrowthPad
            旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。
          </div>
        </div>
        <GrowthpadSummary/>

        <div class="join-in md:mt-kd32px mt-kd35px ">
          <a href="http://ikingdata.mikecrm.com/kbZDdCb" target="_blank"><img src="https://res.ikingdata.com/nav/join.png" alt=""></a>
        </div>

      </div>
      <img src="https://res.ikingdata.com/nav/hero-money.png" alt="" class="xshidden hero-money mt-6 mx-auto    xl:ml-10.5 xl:mt-0 ">
    </div>

    <!--  即将开始-->
    <div class="progress text-left mt-15 md:mt-20 ">
      <p class="project-status-title   text-center md:text-left">⏱ 即将开始</p>
      <GrowthpadProjects :status="'progress'"/>
    </div>
    <!--  正在进行-->
    <div class="progress text-left mt-15 md:mt-20 ">
      <p class="project-status-title   text-center md:text-left">⛳️ 正在进行</p>
      <GrowthpadProjects :status="'doing'"/>
    </div>
<!--      我参与的 / 已结束-->
    <div class="project-container">
      <a-tabs tabBarGutter="48px" default-active-key="1" v-model:activyKey="activeKey" size="small" type="line">
        <a-tab-pane key="1" class="text-kd18px28px" tab="🎰 我参与的">
          <GrowthpadProjects :status="'done'"/>
        </a-tab-pane>
        <a-tab-pane key="2" class="text-kd18px28px"  tab="🎯 已结束">
          <GrowthpadProjects :status="'over'"/>
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
/deep/.ant-tabs-tab{
  font-size:18px;
  line-height:28px;
  padding:0px !important;

  padding-bottom:8px !important;
}
/deep/.ant-tabs-tab-active{
  color: #2B8DFE !important;
}
/deep/.ant-tabs-tab{
  color: rgba(37, 62, 111, 0.65);
}
.imgBg{
  background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
  border: 1px solid rgba(43, 141, 255, 0.08);
  box-sizing: border-box;
  /* 4-12/蓝 */
  box-shadow: 0px 4px 12px rgba(44, 140, 248, 0.08);
  border-radius: 12px;
}
.moneyImg{
  width:199px;
  height:166px;
}
.mxWidth{

  @apply  flex-1 md:w-160 md:min-w-min430px;
}
.title {
  font-family: PingFang SC;
  color: #033666;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 140%;
}

.join-in {
  width:187px !important;
  height:42px !important;
  //background-image: url("/assets/growthpad/join-button.svg");
  @apply   w-auto mx-auto md:ml-0;
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
  @apply text-left mt-15;
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
