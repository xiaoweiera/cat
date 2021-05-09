<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {wxShare} from '~/lib/wxShare'
const {t} = useI18n()
let qr = ref(false)
let positionContainer = ref(null)
let video = ref(null)
const showQr = () => {
  qr.value = true
}

const closeQr = () => {
  qr.value = false
}
const videoMap = () => {
  const top = positionContainer.value.getBoundingClientRect().top
  const left = positionContainer.value.getBoundingClientRect().left
  video.value.style.top = (document.documentElement.scrollTop + top) + 'px'
  video.value.style.left = left + 'px'
  video.value.style.display = 'block'
}
onMounted(async () => {
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
  <div class="mdhidden  flex items-center mixed absolute justify-center w-full pt-1.25 px-8  ">
    <img src="https://res.ikingdata.com/nav/mobileMoneyImg.jpg" alt="" class="w-60 h-50">
  </div>
  <div class="max-w-mx1440 containerbg    md:mt-20 relative z-2  px-4 md:px-30   flex flex-col ">
    <div class="hero w-full flex-wrap   flex items-center   justify-between">
      <div class="mdhidden flex  h-52 items-center justify-center w-full pt-1.25 px-8  ">
      </div>
      <div class="mxWidth  font-kdFang">
        <div class="text-kd12px22px md:text-kd36px140   font-semibold text-global-highTitle">
          <div class="text-kd42px50px md:text-kd36px140 flex justify-center md:justify-start i8n-font-Barlow font-semibold ">
            GrowthPad
          </div>
          <div class="text-kd24px32px md:text-kd36px140 flex justify-center md:justify-start i8n-font-Barlow font-semibold ">
            {{ t('heroProjects.subtitle') }}
          </div>
        </div>
<!--        heroProjects-->
        <div class="flex mt-4  md:mt-8.25 relative z-30 items-center ">
          <div class="text-global-default opacity-65 mr-3 md:mr-4 text-kd14px22px i8n-font-inter i8n-font-inter200">{{
              t('plat.des')
            }}
          </div>
          <img class="mr-3 md:mr-4 w-12.5 h-4 md:w-15.5  md:h-5" src="https://res.ikingdata.com/nav/platHeco.png"
               alt="">
          <img class="mr-3 md:mr-4 w-16.5 h-4 md:w-20.6 md:h-5 " src="https://res.ikingdata.com/nav/platBinance.png"
               alt="">
          <img class="mr-3 md:mr-4 w-22 h-4 md:w-27.5 md:h-5" src="https://res.ikingdata.com/nav/platEth.png" alt="">
        </div>
        <GrowthpadSummary/>
        <div class="flex flex-col md:flex-row md:justify-start justify-center items-center">
          <div class="join-in  md:mt-kd32px mt-kd35px  w-40">
            <a href="http://ikingdata.mikecrm.com/kbZDdCb" target="_blank"><img
                class="applyImg"
                :src="t('imgList.applyImg')"
                alt=""></a>
          </div>
          <div class="flex mt-8 ml-8 relative">
            <!--          <img class="platImg" src="https://res.ikingdata.com/nav/KTelegram.png" alt="">-->
            <a href="https://twitter.com/KingData_com" target="_blank"> <img class="platImg"
                                                                             src="https://res.ikingdata.com/nav/KTwitter.png"
                                                                             alt=""></a>
            <a href="https://weibo.com/jinseshuju?topnav=1&wvr=6&topsug=1" target="_blank"> <img class="platImg"
                                                                                                 src="https://res.ikingdata.com/nav/Kweibo.png"
                                                                                                 alt=""></a>
            <img class="platImg" @mouseenter="showQr()" @mouseleave="closeQr()"
                 src="https://res.ikingdata.com/nav/Kwechat.png" alt="">
            <img v-if="qr" class="w-29 h-35 absolute bottom-12 -right-3"
                 src="https://res.ikingdata.com/nav/growthQRcode.png" alt="">
          </div>
        </div>
      </div>
      <div ref="positionContainer" class="xshidden hero-money  mt-6 md:mt-0 xl:ml-10.5 xl:mt-0">
      </div>

    </div>

    <!--  即将开始-->
    <div class="progress text-left mt-15 md:mt-20 ">
      <div class="project-status-title   text-center md:text-left i8n-font-inter font-medium">⏱ {{
          t('project.status.coming')
        }}
      </div>
      <GrowthpadProjects :status="'progress'"/>
    </div>
    <GrowthpadExamplefooter/>
  </div>
</template>

<style scoped>
.en .i8n-font-inter200 {
  @apply font-extralight;
}

.mixed {
  mix-blend-mode: darken;
}

.applyImg {
  box-shadow: 5px 5px 10px rgb(43 141 254 / 20%), -5px -5px 10px #ffffff;
  border-radius: 32px;
}

.hero-money {
  width: 486px;
  height: 434px;

}

.platImg {
  @apply w-6 h-6 mr-8;
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
  max-width: 657px;
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
//height: 42px !important; //background-image: url("/assets/growthpad/join-button.svg");
  @apply w-auto  md:ml-0;
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

// @formatter:off
<route lang="yaml">
meta:
 layout: growthpadLayout
</route>
// @formatter:off