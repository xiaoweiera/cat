<script setup lang="ts">
import { ref } from 'vue'
import * as lang from '~/utils/lang'
const langType = ref(lang.current.value)
</script>
<template>
  <div class="circleContainer"></div>
  <div :id="langType" class="containerbgs bg-global-body md:bg-opacity-100">
    <Nav class="relative"></Nav>
    <main class="w-full flex justify-center">
      <router-view />
      <Footer />
    </main>
  </div>
</template>
<style>
#en .i8n-font-en-inter {
  font-family: i8n-font-inter;
}
#en .i8n-font-en-Barlow {
  font-family: i8n-font-Barlow;
}
@media screen and (max-width: 768px) {
  .containerbgs {
    background-image: url('https://res.ikingdata.com/nav/kongtouBg.png');
    background-size: cover;
  }
}

@media screen and (min-width: 768px) {
  .containerbgs {
    background-image: url('https://res.ikingdata.com/nav/kgBodytopBg.jpg');
    background-size: cover;
  }
}

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
