<script setup lang="ts">
</script>

<template>
  <div class="help-box p-3 text-kdFang">
    <span class="text-center mb-2 hidden md:block">
      <img class="inline-block w-20" src="https://res.ikingdata.com/static/share/growth_qrcode.jpg?r=2&lang=en"/>
    </span>
    <span class="inline-block md:block text-sm leading-5">
      <span class="md:block">参加活动遇到问题？</span>
      <span class="md:block">加入电报群联系客服</span>
    </span>
    <a class="inline-block ml-5 md:ml-0 md:block md:mt-2 cursor-pointer">
      <span class="inline-block join-btn text-xs leading-4 py-1 px-3 text-center text-white">加入电报群</span>
    </a>
  </div>
</template>

<style scoped lang="scss">
  .help-box {
    max-width: 390px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
  }
  .join-btn {
    background: #2B8DFE;
    border-radius: 12px;
  }
</style>
