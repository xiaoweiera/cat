<script setup lang="ts">
  // @ts-ignore
  import { Name, Icon, Dasboard } from '~/logic/growthpad/examples'
</script>

<template>
  <div class="py-15 total">
    <div class="flex items-center pb-5">
      <DotChar :img="Icon" size="lg" />
      <span class="text-2xl ml-2">{{ Name }} 增长</span>
      <span class="ml-4 hot py-1.5 px-3 rounded text-sm">
        <b class="font-medium">🔥</b>
        <b class="font-medium ml-4">{{ Dasboard.status }}</b>
      </span>
    </div>
    <div>
      <p class="description text-sm">{{ Dasboard.description }}</p>
    </div>
    <div class="pt-5">
      <ul class="flex">
        <li>
          <h4 class="font-normal text-xs mb-1">奖励数量</h4>
          <p class="font-color-theme font-kdFang font-bold flex items-end">
            <span class="text-4xl">{{ Dasboard.reward.count }}</span>
            <span class="ml-1.5">token</span>
          </p>
        </li>
        <li class="ml-12">
          <h4 class="font-normal text-xs mb-1">奖励价值</h4>
          <p class="font-color-theme font-kdFang font-bold">
            <span class="text-4xl">${{ Dasboard.reward.cost }}</span>
          </p>
        </li>
        <li class="ml-12">
          <h4 class="font-normal text-xs mb-1">每人可领取</h4>
          <p class="font-color-theme font-kdFang font-bold flex items-end">
            <span class="text-4xl">
              <span>{{ Dasboard.reward.limits[0] }}</span>
              <span>-</span>
              <span>{{ Dasboard.reward.limits.slice(-1)[0] }}</span>
            </span>
            <span class="ml-1.5">token</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .total {
    min-height: 310px;
  }
  .hot {
    color: #E9592D;
    background: rgba(248, 137, 35, 0.14);
  }
  h4 {
    color: rgba(37, 62, 111, 0.65);
  }
  .description {
    color: rgba(37, 62, 111, 0.85);
  }
</style>
