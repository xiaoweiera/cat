<template>
  <div class="text-center">
    <div class="why-us">为什么选择我们</div>
    <div class="flex">
      <div class="flex-1 mt-8">
        <img src="growthpad/feature1.svg" alt="" class="mx-auto">
        <div class="feature-title">精准触达、用户更真实</div>
        <div class="feature-detail">
          <p>全面完善的链上信息画像、精准的项目用户特征数据库</p>
          <p>一步找到想要的用户</p>
        </div>
      </div>

      <div class="flex-1 mt-8">
        <img src="growthpad/feature2.svg" alt="" class="mx-auto">
        <div class="feature-title">甄选流量、投放更精准</div>
        <div class="feature-detail">
          <p>庞大的用户基础，以数百社群和媒体矩阵为核心</p>
          <p>甄选海内外优质流量</p>
        </div>
      </div>

      <div class="flex-1 mt-8">
        <img src="growthpad/feature3.svg" alt="" class="mx-auto">
        <div class="feature-title">多维服务、效率更高</div>
        <div class="feature-detail">
          <p>围绕您的需求定制增长策略</p>
          <p>实现全方位推广服务</p>
        </div>
      </div>
    </div>
  </div>
  <div class="join-us">
  </div>
</template>

<style scoped lang="postcss">
.why-us {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;
  color: #033666;
  @apply mt-4;
}
.feature-title {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #033666;
  @apply mt-4;
}

.feature-detail {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  /* or 129% */

  text-align: center;
  @apply text-global-default opacity-85 mt-4;
}

.join-us {
  background-image: url("growthpad/foot-join-bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  @apply h-32 mt-12;
}
</style>
