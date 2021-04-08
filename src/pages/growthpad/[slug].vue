<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mx-24 text-left">
    <div class="remainder">
      <div class="info pr-8">
        <div class="flex items-center">
          <div>logo</div>
          <div class="ml-4">MDEX</div>
          <div class="ml-4 bg-gray-200 p-2 rounded-md">⏱ 即将开始</div>
        </div>
        <div class="mt-4">为庆祝mdex登录BSC，现联合Kingdata，推出IKA（首次Kingdata奖励），符合条件的用户可以在活动结束后，领取价值100$的MDX奖励。</div>
        <div class="flex items-center">
          <div class="my-6 mr-8">
            <div class="my-2">
              奖励数量
            </div>
            <div>
              1000000MDX
            </div>
          </div>
          <div class="my-6 mr-8">
            <div class="my-2">
              奖励价值
            </div>
            <div>
              ¥10000000
            </div>
          </div>
          <div class="my-6 mr-8">
            <div class="my-2">
              每人可领取
            </div>
            <div>
              100-500MDX
            </div>
          </div>
        </div>
      </div>

      <div class="text-left">
        <p class="text-left">开始倒计时</p>
        <div class="flex items-center">
          <div class="my-4 mr-4">
            <div class="text-2xl">01</div>
            <p>Days</p></div>
          <div>:</div>
          <div class="m-4">
            <div class="text-2xl">22</div>
            <p>Hours</p></div>
          <div>:</div>
          <div class="m-4">
            <div class="text-2xl">12</div>
            <p>Minutes</p>
          </div>
        </div>
      </div>
    </div>
    <div class="activity">
      活动详情页
    </div>

    <div class="project-info">
      <p class="text-xl my-4">项目介绍</p>
      <div class="flex">
        <div class="flex flex-grow">
          <div class="mr-4">logo</div>
          <div>MDEX 去中心化交易所</div>
        </div>
        <div class="flex-shrink"></div>
        <div class="flex-1">项目官网 <a href="https://mdex.com/">https://mdex.com</a></div>
        <div class="flex-1">
          <p>项目社群</p>
        </div>
      </div>

      <div class="my-5">
        <p class="text-base">代币发行情况</p>
        <div class="grid grid-cols-4 mt-4">
          <div class="flex">
            <p class="summary-title">代币名称</p>
            <p>MDX</p>
          </div>

          <div class="flex">
            <p class="summary-title">代币全称</p>
            <p>MDX</p>
          </div>

          <div class="flex">
            <p class="summary-title">发行总量</p>
            <p>10亿</p>
          </div>

          <div class="flex">
            <p class="summary-title">上线时间</p>
            <p>2021年10月10日</p>
          </div>

          <div class="flex">
            <p class="summary-title">TVL</p>
            <p>3亿</p>
          </div>

          <div class="flex">
            <p class="summary-title">当前流通量</p>
            <p>3亿</p>
          </div>
          <div class="flex">
            <p class="summary-title">当前价格</p>
            <p>¥3.5</p>
          </div>
          <div class="flex">
            <p class="summary-title">所在公链</p>
            <p>HECO / BSC</p>
          </div>
          <div class="flex">
            <p class="summary-title">上线交易所</p>
            <p>火币 / 币安</p>
          </div>
          <div class="flex">
            <p class="summary-title">24H交易量</p>
            <p>30亿</p>
          </div>
        </div>
      </div>

      <div class="my-5">
        <p class="text-base">项目介绍</p>
        <p class="mt-5">
          Mdex 是基于资金池理念的 AMM 去中心化交易所，提出并实现了基于火币生态 Heco 链和以太坊的双链 DEX模型，同时MDEX还将支持流动性和交易双重挖矿机制。Mdex 上线12天以来，总质押量超过 2000 万美元，日交易额破 4500 万美元，24 小时手续费超 12 万美元，单日交易笔数突破 15 万笔，超SushiSwap 6倍。
          <br>
          <br>
          Mdex 创新性地采用了双挖机制，这里的“双挖”，第一指：LP迁移前支持以太坊上uniswap LP、sushiswap LP及单币种抵押挖矿，其中，抵押 Sushiswap LP 可同时获得 sushi 和 mdex 代币，实现一键双挖，同时还指：迁移后将在Heco上开放交易和流动性双挖矿。
        </p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="postcss">

.remainder {
  background-image: url("/assets/growthpad/detail-bg.svg");
  @apply flex bg-no-repeat h-64 pt-10;
}

.remainder > .info {
  min-width: 600px;
}

.summary-title {
  width: 100px;
  @apply text-global-default opacity-65;
}
</style>
