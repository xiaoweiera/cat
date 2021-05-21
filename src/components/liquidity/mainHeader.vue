<template>
  <div
    class="
      flex
      w-full
      h-14.5
      items-center
      justify-between
      px-5
      bg-white
      font-kdFang
      bottomBorder
    "
  >
    <!--    类型切换-->
    <div class="flex">
      <div class="tagSelect">流动性分析</div>
      <div class="ml-6 tagDefault">交易数据分析</div>
    </div>
    <!--    时间筛选-->
    <div class="flex">
      <LiquidityHeaderOption />
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagDefault {
  @apply kd-16px24px text-global-default opacity-65;
}
.tagSelect {
  @apply text-kd16px24px text-global-primary;
}
.bottomBorder {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
</style>
