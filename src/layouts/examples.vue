<script setup lang="ts"></script>

<template>
  <div class="circleContainer"></div>
  <div class="containerbgs bg-global-body md:bg-opacity-100">
    <Nav class="relative"></Nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.containerbgs {
  $image: 'https://res.ikingdata.com/static/growthpad_bg.png';
  background: url($image) top right / contain no-repeat,
    radial-gradient(
      49.91% 49.91% at 50.09% 50.09%,
      rgba(43, 141, 254, 0.1) 0%,
      rgba(43, 141, 254, 0) 100%
    );
}
</style>
