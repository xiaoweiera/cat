<script setup lang="ts">
  import { computed } from 'vue'

  interface Item {
    label: string
    value: string | number
  }
  const data: Item[] = [
    { label: '代币名称', value: 'TOKEN' },
    { label: '代币名称', value: 'TOKEN' },
    { label: '上线时间', value: '2021年10月10日' },
    { label: '发行总量', value: '10亿' },
    { label: 'TVL', value: '3亿' },
    { label: '当前流通量', value: '3亿' },
    { label: '当前价格', value: '$3.5' },
    { label: '所在公链', value: 'HECO / BSC' },
    { label: '上线交易所', value: '火币 / 币安' },
    { label: '24H交易量', value: '30亿' },
  ]
  const list = computed(() => {
    const cols = 3
    const array: Array<Item[]> = []
    for (let i = 0; i < cols; i++) {
      const value = data.filter((item: Item, index: number) => {
        return index % cols === i
      })
      array.push(value)
    }
    return array
  })
</script>

<template>
  <div>项目介绍</div>
  <div class="flex">
    <DotChar value="DEX" size="lg" />
    <span class="text-2xl">DEX 去中心化交易所</span>
  </div>
  <div>
    <p>
      <span>项目官网</span>
      <a>https://dex-demo.com</a>
      <span>项目社群</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </p>
  </div>
  <div>
    <h2>代币发行情况</h2>
    <div class="flex justify-between">
      <div v-for="data in list">
        <p v-for="item in data">
          <span>{{ item.label }}</span>
          <span>{{ item.value }}</span>
        </p>
      </div>
    </div>
  </div>
  <div>
    <h2>项目介绍</h2>
    <p>
      Dex 是基于资金池理念的 AMM 去中心化交易所，提出并实现了基于火币生态 Heco 链和以太坊的双链 DEX 模型，同时 DEX 还将支持流动性和交易双重挖矿机制。
      <br/>
      <br/>
      Dex 创新性地采用了双挖机制，这里的“双挖”，第一指：LP 迁移前支持以太坊上 Uniswap LP、Sushiswap LP 及单币种抵押挖矿，其中，抵押 Sushiswap LP 可同时获得 Sushi 和 Dex 代币，实现一键双挖，同时还指：迁移后将在 Heco上开放交易和流动性双挖矿。
    </p>
  </div>
</template>
