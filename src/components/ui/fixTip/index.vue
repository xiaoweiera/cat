<script setup lang="ts">

</script>

<template>
  <div class="fixed right-7 top-150 help-box p-3 text-kdFang whitespace-nowrap">
    <span class="text-center mb-2 hidden md:block">
      <img class="inline-block w-20" src="https://res.ikingdata.com/image/growthpad/kingdata/qrcode.jpg"/>
    </span>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.help-box {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
}
</style>
