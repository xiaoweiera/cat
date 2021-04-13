<template>
  <div class="text-center mt-15 md:mt-20">
    <div class="why-us">为什么选择我们</div>
    <div class="grid sm:grid-cols-1 gap-6  md:gap-7 mt-8  md:grid-cols-2 xl:grid-cols-3 ">
      <div class="flex-1 min-w-min288px ">
        <img src="/assets/growthpad/feature1.svg" alt="" class="mx-auto">
        <div class="feature-title">精准触达、用户更真实</div>
        <div class="feature-detail">
          <p>全面完善的链上信息画像、精准的项目用户特征数据库</p>
          <p>一步找到想要的用户</p>
        </div>
      </div>

      <div class="flex-1 min-w-min288px">
        <img src="/assets/growthpad/feature2.svg" alt="" class="mx-auto">
        <div class="feature-title">甄选流量、投放更精准</div>
        <div class="feature-detail">
          <p>庞大的用户基础，以数百社群和媒体矩阵为核心</p>
          <p>甄选海内外优质流量</p>
        </div>
      </div>

      <div class="flex-1 min-w-min288px">
        <img src="/assets/growthpad/feature3.svg" alt="" class="mx-auto">
        <div class="feature-title">多维服务、效率更高</div>
        <div class="feature-detail">
          <p>围绕您的需求定制增长策略</p>
          <p>实现全方位推广服务</p>
        </div>
      </div>
    </div>
  </div>
  <div class="join-mobile-us mt-15 mb-15 mdhidden">
    <a class="w-full h-full " href="http://ikingdata.mikecrm.com/kbZDdCb"><img class="w-full h-full shadowImg" src="https://res.ikingdata.com/nav/mobileFootImg.png" alt="">
    </a>
  </div>
  <div class="join-us xshidden   relative flex  items-center">
    <a class="w-full shadowImg"  href="http://ikingdata.mikecrm.com/kbZDdCb" target="_blank">
    <img class="w-full " src="https://res.ikingdata.com/nav/pcFooter.jpg" alt="">
    </a>
  </div>
</template>

<style scoped lang="postcss">
.imgVisit{
  width: 179px;
  height: 34px;
  @apply absolute right-19;
}
.imgVisitImg{
  width: 179px;
  height: 34px;
}
.why-us {

  @apply font-medium font-kdFang  text-kd24px150 text-global-highTitle;
}

.feature-title {
  @apply mt-3 text-kd16px24px md:text-kd18px27px text-global-highTitle font-kdFang font-normal;
}

.feature-detail {

  @apply text-global-default text-kd12px16px md:text-kd14px18px  opacity-85 font-kdFang  mt-1.5;
}
.shadowImg{
  box-shadow: 0px 26px 66px -18px rgba(43, 141, 255, 0.6);
}
.join-us {
  max-width: 1200px;
  margin-top:81px;
  background-size: contain;
  background-repeat: no-repeat;
  @apply h-50 mb-10;
}
.join-mobile-us{
  width:100%;
}
</style>
