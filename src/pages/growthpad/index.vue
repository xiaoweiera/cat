<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { wxShare } from '~/lib/wxShare'

const { t } = useI18n()
useHead({
  title: 'GrowthPad 数据驱动DeFi项目快速增长',
  meta: [
    {
      name: 'keywords',
      content: 'BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis 增长平台  GrowthPad',
    },
    {
      name: 'description',
      content: 'GrowthPad 旨在根据精准的用户行为画像，精妙的建模、高效的任务模式，让项目方可以摆脱传统的冷启动方式，精准找到目标用户。同样平台也帮助企业把丰厚的奖励分发给目标用户，避免羊毛党和科学家，真正的做到了企业快速增长。',
    },
  ],
})
let positionContainer = ref(null)
let video = ref(null)
const videoMap = () => {
  const top = positionContainer.value.getBoundingClientRect().top
  const left = positionContainer.value.getBoundingClientRect().left
  video.value.style.top = (document.documentElement.scrollTop + top) + 'px'
  video.value.style.left = left + 'px'
  video.value.style.display = 'block'
}
onMounted(async() => {
  videoMap()
  window.onresize = () => {
    videoMap()
  }
  wxShare('GrowthPad', '数据驱动DeFi项目快速增长')
})
// const activeTab = ref('1')
</script>
<template>
  <div ref="video" class=" xshidden absolute hero-money hidden  mixed  ">
    <video muted="“muted”" class="hero-money" autoplay="true" loop="true">
      <source src="https://res.ikingdata.com/nav/moneyVideoSmall.mp4"
              type="video/mp4"
      >
    </video>
  </div>
  <div class="mdhidden flex items-center mixed absolute justify-center w-full pt-1.25 px-8  ">
    <img src="https://res.ikingdata.com/nav/mobileMoneyImg.jpg" alt="" class="w-60 h-50">
  </div>
  <div class="max-w-mx1440 containerbg    md:mt-20 relative z-2  px-4 md:px-30   flex flex-col ">
    <div class="hero w-full flex-wrap   flex items-center   justify-between">
      <div class="mdhidden flex  h-52 items-center justify-center w-full pt-1.25 px-8  ">
        <!--              <img src="https://res.ikingdata.com/nav/mobileMoneyImg.jpg" alt="" class="w-60 h-50">-->
      </div>
      <div class="mxWidth  font-kdFang">
        <div class="text-kd12px22px md:text-kd36px  font-semibold text-global-highTitle">
          <div class="text-kd42px50px flex justify-center md:justify-start">GrowthPad</div>
          <div class="text-kd24px32px flex justify-center md:justify-start">{{ t('hero.subtitle') }}</div>
        </div>
        <div class="text-kd12px22px md:text-kd14px22px text-global-default  opacity-65 mt-4 md:mt-6 ">
          <div>{{ t('hero.desc1') }}</div>
          <div class="mt-3">{{ t('hero.desc2') }}</div>
        </div>
        <GrowthpadSummary/>

        <div class="join-in md:mt-kd32px mt-kd35px ">
          <a href="http://ikingdata.mikecrm.com/kbZDdCb" target="_blank"><img
              src="https://res.ikingdata.com/nav/join.png" alt=""
          ></a>
        </div>

      </div>
      <div ref="positionContainer" class="xshidden hero-money  mt-6 md:mt-0 xl:ml-10.5 xl:mt-0">
        <!--        <video  muted=“muted” class="hero-money" autoplay="true" loop="true">-->
        <!--          <source src="https://res.ikingdata.com/nav/moneyVideoSmall.mp4"-->
        <!--                  type="video/mp4">-->
        <!--        </video>-->
      </div>

    </div>

    <!--  即将开始-->
    <div class="progress text-left mt-15 md:mt-20 ">
      <p class="project-status-title   text-center md:text-left">⏱ {{ t('project.status.coming') }}</p>
      <GrowthpadProjects :status="'progress'"/>
    </div>
    <!--  正在进行-->
    <!--    <div class="progress text-left mt-15 md:mt-20 ">-->
    <!--      <p class="project-status-title   text-center md:text-left">⛳️ 正在进行</p>-->
    <!--      <GrowthpadProjects :status="'doing'"/>-->
    <!--    </div>-->
    <!--      我参与的 / 已结束-->
    <!--    <div class="project-container">-->
    <!--      <a-tabs tabBarGutter="48px" default-active-key="1" v-model:activyKey="activeKey" size="small" type="line">-->
    <!--        <a-tab-pane key="1" class="text-kd18px28px" tab="🎰 我参与的">-->
    <!--          <GrowthpadProjects :status="'done'"/>-->
    <!--        </a-tab-pane>-->
    <!--        <a-tab-pane key="2" class="text-kd18px28px"  tab="🎯 已结束">-->
    <!--          <GrowthpadProjects :status="'over'"/>-->
    <!--        </a-tab-pane>-->
    <!--      </a-tabs>-->
    <!--    </div>-->

    <GrowthpadFooter/>
  </div>
</template>

<style scoped>
.mixed {
  mix-blend-mode: darken;
}

.hero-money {
  width: 486px;
  height: 434px;

}

::v-deep(.ant-tabs-tab) {
  font-size: 18px;
  line-height: 28px;
  padding: 0px !important;

  padding-bottom: 8px !important;
}

::v-deep(.ant-tabs-tab-active) {
  color: #2B8DFE !important;
}

::v-deep(.ant-tabs-tab) {
  color: rgba(37, 62, 111, 0.65);
}

.imgBg {
  background: linear-gradient(180deg, #F8F9FF 0%, rgba(248, 249, 255, 0.6) 100%);
  border: 1px solid rgba(43, 141, 255, 0.08);
  box-sizing: border-box;
  /* 4-12/蓝 */
  box-shadow: 0px 4px 12px rgba(44, 140, 248, 0.08);
  border-radius: 12px;
}

.moneyImg {
  width: 199px;
  height: 166px;
}

.mxWidth {
  max-width: 640px;
  @apply flex-1 md:w-160 md:min-w-min430px;
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
  width: 187px !important;
  height: 42px !important;
//background-image: url("/assets/growthpad/join-button.svg");
  @apply w-auto mx-auto md:ml-0;
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
//background: #fff; padding: 16px;
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
