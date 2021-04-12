<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="w-full px-4 relative z-2  mt-6 mb-15 md:mb-26.5  md:mt-15  md:px-55 font-kdFang ">
    <img class="xshidden absolute left-0 top-24.5" src="/assets/growthpad/detail-bg.svg" alt="/">
    <div class="remainder flex flex-wrap md:justify-between font-kdFang">
      <div class="info">
        <div class="flex items-center">
          <img class="w-10.5 h-10.5 -ml-1" src="https://res.ikingdata.com/nav/payLogo.png" alt="">
          <div class="ml-2 text-kd24px36px md:text-kd24px150 font-medium text-global-highTitle">MDEX</div>
          <div
              class="font-medium bg-global-primary bg-opacity-12 time px-3 ml-4 py-1.5 text-global-primary text-kd14px18px">
            ⏱ 即将开始
          </div>
        </div>
        <div class="mt-5 text-kd14px20px md:text-kd14px22px text-global-default font-normal">
          为庆祝mdex登录BSC,现联合Kingdata,推出IKA(首次Kingdata奖励符合条件的用户可以在活动结束后,领取价值100$的MDX奖励。
        </div>
        <div class="flex mt-5   items-center">
          <div class="flex-1 md:flex-0 md:mr-12">
            <div class="text-kd12px16px text-global-default opacity-65">
              奖励数量
            </div>
            <div class="mt-1.5 text-kd14px18px text-global-highTitle ">
              1000000MDX
            </div>
          </div>
          <div class="flex-1 md:flex-0 md:mr-12">
            <div class="text-kd12px16px text-global-default opacity-65">
              奖励价值
            </div>
            <div class="mt-1.5 text-kd14px18px text-global-highTitle ">
              ¥10000000
            </div>
          </div>
          <div class="flex-1 md:flex-0">
            <div class="text-kd12px16px text-global-default opacity-65">
              每人可领取
            </div>
            <div class="mt-1.5 text-kd14px18px text-global-highTitle ">
              100-500MDX
            </div>
          </div>
        </div>
      </div>

      <div class="text-left mt-8 md:mt-0 font-kdFang">
        <p class="text-kd12px16px text-global-default opacity-65">开始倒计时</p>
        <div class="flex items-center mt-3">
          <div class="mr-4 flex flex-col items-center">
            <div class="text-kd42px110 font-kdExp font-bold text-global-primary">01</div>
            <p class="text-kd14px18px text-global-default opacity-65">Days</p></div>
          <div class="text-kd24px30px font-kdExp mr-4   text-global-primary font-bold">:</div>
          <div class="mr-4 flex flex-col  items-center">
            <div class="text-kd42px110 font-kdExp font-bold text-global-primary">01</div>
            <p class="text-kd14px18px text-global-default opacity-65">Hours</p></div>
          <div class="text-kd24px30px font-kdExp mr-4   text-global-primary font-bold">:</div>
          <div class="mr-4 flex flex-col  items-center">
            <div class="text-kd42px110 font-kdExp font-bold text-global-primary">01</div>
            <p class="text-kd14px18px text-global-default opacity-65">Minutes</p></div>
        </div>
      </div>
    </div>
    <div class="mt-15 md:mt-20">
      <p class="text-xl ">项目介绍</p>
      <div class="flex justify-between flex-wrap mt-6">
        <div class="flex items-center minwidthLogoTitle">
          <img class="w-8 -ml-1 h-8" src="https://res.ikingdata.com/nav/payLogo.png" alt="">
          <div class=" ml-3 text-kd18px28px font-medium text-global-highTitle">MDEX 去中心化交易所</div>
        </div>
        <div class="flex items-center flex-wrap mt-3 sm:mt-0 md:mt-0">
          <div style="min-width:205px;"
               class=" mr-2 md:mr-8 text-global-highTitle font-medium text-kd16px24px md:text-kd16px150">项目官网<a
              class="ml-4 text-global-primary text-kd14px18px" href="https://mdex.com/">https://mdex.com</a></div>
          <div class="flex items-center md:mt-0 mt-3 sm:mt-0 md:mt-0">
            <p class="text-global-highTitle font-medium text-kd16px150 ">项目社群</p>
            <img class="w-5 h-4.5 ml-4" src="https://res.ikingdata.com/nav/feiji.png" alt="">
            <img class="w-5 h-4.5 ml-4" src="https://res.ikingdata.com/nav/niao.png" alt="">
            <img class="w-5 h-4.5 ml-4" src="https://res.ikingdata.com/nav/mm.png" alt="">
            <img class="w-5 h-4.5 ml-4" src="https://res.ikingdata.com/nav/wx.png" alt="">
          </div>
        </div>

      </div>

      <div class="mt-6">
        <p class="text-base">代币发行情况</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-3  text-kd14px18px ">
          <div class="flex w-53.5 mt-3 md:mt-1.5">
            <p class="summary-title">代币名称</p>
            <p class="text-global-highTitle ml-6">MDX</p>
          </div>

          <div class="flex w-53.5 mt-1.5">
            <p class="summary-title">代币全称</p>
            <p class="text-global-highTitle ml-6">MDX</p>
          </div>

          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">发行总量</p>
            <p class="text-global-highTitle ml-6">10亿</p>
          </div>

          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">上线时间</p>
            <p class="text-global-highTitle ml-6">2021年10月10日</p>
          </div>

          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">TVL</p>
            <p class="text-global-highTitle ml-6">3亿</p>
          </div>

          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">当前流通量</p>
            <p class="text-global-highTitle ml-6">3亿</p>
          </div>
          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">当前价格</p>
            <p class="text-global-highTitle ml-6">¥3.5</p>
          </div>
          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">所在公链</p>
            <p class="text-global-highTitle ml-6">HECO / BSC</p>
          </div>
          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">上线交易所</p>
            <p class="text-global-highTitle ml-6">火币 / 币安</p>
          </div>
          <div class="flex w-53.5 mt-1.5">

            <p class="summary-title">24H交易量</p>
            <p class="text-global-highTitle ml-6">30亿</p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-base">项目介绍</p>
        <p class="mt-3 text-kd14px20px text-global-default opacity-85">
          Mdex 是基于资金池理念的 AMM 去中心化交易所，提出并实现了基于火币生态 Heco 链和以太坊的双链 DEX模型，同时MDEX还将支持流动性和交易双重挖矿机制。Mdex 上线12天以来，总质押量超过 2000
          万美元，日交易额破 4500 万美元，24 小时手续费超 12 万美元，单日交易笔数突破 15 万笔，超SushiSwap 6倍。
          <br>
          <br>
          Mdex 创新性地采用了双挖机制，这里的“双挖”，第一指：LP迁移前支持以太坊上uniswap LP、sushiswap LP及单币种抵押挖矿，其中，抵押 Sushiswap LP 可同时获得 sushi 和 mdex
          代币，实现一键双挖，同时还指：迁移后将在Heco上开放交易和流动性双挖矿。
        </p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="postcss">
.minwidthLogoTitle {
  min-width: 229px;
}

.text-base {

  @apply text-kd16px24px md:text-kd16px150 font-medium;
}

.time {
  background: rgba(43, 141, 254, 0.1);
  border-radius: 4px;
}

.remainder {
//background-image: url("/assets/growthpad/detail-bg.svg");
  @apply flex bg-no-repeat  ;
}

.remainder > .info {
  max-width: 600px;
}

.summary-title {
  width: 70px;
  @apply w-17.5  text-kd14px18px text-global-default opacity-65;
}
</style>
