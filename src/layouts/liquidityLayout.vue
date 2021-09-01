<template>
  <div class="circleContainer"></div>
  <div class="bg-global-body md:bg-opacity-100">
<!--    <LiquidityWebHeader />-->
    <UiHeader/>
    <main class="w-full flex justify-center">
      <router-view />
    </main>
  </div>
</template>
<style>
.bgLeft {
  position: absolute;
  float: left;
  z-index: -11;
}

.bgRight {
  position: absolute;
  float: right;
  z-index: -11;
}
</style>
