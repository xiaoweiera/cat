<template>
  <div class="selectContainer">
  <el-popover
      popper-class="liquidity-search-select-con"
      placement="bottom"
      :offset="0"
      :show-arrow="false"
      :width="500"
      trigger="click"
  >
    <template #reference>
      <div class="flex items-center w-full h-14.5 bottomBorder">
        <LiquidityPlats />
        <div class="text-global-default opacity-12 text-kd36px140px">|</div>
        <LiquiditySelectTool />
      </div>
    </template>
    <LiquiditySelectToken  :close="close" />
    <LiquiditySelectPair :close="close" />
  </el-popover>
  </div>
</template>

<style >
.liquidity-search-select-con{
  padding:12px 12px 12px 12px !important;
  border:1px solid red;
  margin-left:90px !important;
}
.bottomBorder {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
</style>
