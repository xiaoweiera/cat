<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import { wxShare } from '~/lib/wxShare'
import { userData } from '~/logic/user/login'
import { platList } from '~/logic/growthpad/index'
import { headerTag } from '~/store/header/login'
const positionContainer = ref(null)
const video = ref(null)
const videoMap = () => {
  const top = positionContainer.value.getBoundingClientRect().top
  const left = positionContainer.value.getBoundingClientRect().left
  video.value.style.top = `${document.documentElement.scrollTop + top}px`
  video.value.style.left = `${left}px`
  video.value.style.display = 'block'
}
onMounted(async() => {
  headerTag.name = 'GrowthPad'

  videoMap()
  window.onresize = () => {
    videoMap()
  }
  wxShare('GrowthPad', '数据驱动DeFi项目快速增长')
})
// const activeTab = ref('1')
</script>
<template>
  <div class="flex flex-col">
    <div ref="video" class="xshidden absolute hero-money hidden mixed">
      <video muted="“muted”" class="hero-money" autoplay="true" loop="true">
        <source
          src="https://res.ikingdata.com/nav/moneyVideoSmall.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <!--    手机端banner-->
    <GrowthpadIndexMobileBanner />
    <div class="mainContainer">
      <div class="xshidden hero w-full flex-wrap flex justify-between">
        <div class="titleDes mdhidden"></div>
        <div class="mxWidth font-kdFang i8n-font-en-inter">
          <div class="titleTxt i8n-font-en-Barlow">GrowthPad</div>
          <div class="titleTxt i8n-font-en-Barlow">
            {{ I18n.growthpadShow.title }}
          </div>
          <div
            class="
              text-kd12px22px
              md:text-kd14px22px
              text-global-default
              opacity-65
              mt-4
              md:mt-6
              i8n-font-en-inter
            "
          >
            <div>{{ I18n.growthpadShow.des }}</div>
          </div>
          <GrowthpadSummary />
          <div class="flex flex-wrap md:mt-8.25 relative z-30 items-center">
            <div class="suport i8n-font-en-inter">
              {{ I18n.growthpadShow.supproted }}
            </div>
            <template v-for="item in platList">
              <img class="mr-3 md:mr-4 h-4 md:h-5 mt-4" :src="item" alt="" />
            </template>
          </div>
          <!--   申请入驻 联系方式-->
          <GrowthpadIndexTelPlat class="xshidden" />
        </div>
        <div
          ref="positionContainer"
          class="xshidden hero-money mt-6 md:mt-0 xl:ml-10.5 xl:mt-0"
        ></div>
      </div>
      <!--    pc banner-->
      <GrowthpadIndexPcBanner />
      <!--  即将开始-->
      <div class="progress text-left mt-4 md:mt-20">
        <GrowthpadProjects :title="I18n.growthpadShow.projectState" />
      </div>

      <GrowthpadIndexTelPlat class="mdhidden" />
      <GrowthpadExamplefooter />
    </div>
  </div>
</template>

<style scoped>
.suport {
  @apply mt-4 min-w-7.5 text-global-default opacity-65 mr-3 md:mr-4 text-kd14px22px;
}
.titleDes {
  @apply flex h-52 items-center justify-center w-full pt-1.25 px-8;
}
.beginTxt {
  @apply project-status-title text-center md:text-left i8n-font-inter font-medium;
}
.titleTxt {
  @apply text-kd42px50px md:text-kd36px140 text-global-highTitle flex justify-center md:justify-start i8n-font-Barlow font-semibold;
}

.mainContainer {
  @apply max-w-mx1440 containerbg md:mt-20 relative  px-4 md:px-30 flex flex-col;
}

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
  color: #2b8dfe !important;
}

::v-deep(.ant-tabs-tab) {
  color: rgba(37, 62, 111, 0.65);
}

.imgBg {
  background: linear-gradient(
    180deg,
    #f8f9ff 0%,
    rgba(248, 249, 255, 0.6) 100%
  );
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
  font-family: 'PingFang SC';
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

// @formatter:off layout: indexLaout
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
