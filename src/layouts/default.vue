<script setup lang="ts">

import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
  const router = useRouter()
  const loc = window.location
  // 二级域名 growthpad.xxx.com/ 跳转到 growthpad.xxx.com/growthpad
  console.log(loc.host.startsWith('growthpad'),loc.host,loc.pathname)
  if (loc.host.startsWith('growthpad') || loc.pathname === '/') {
      router.push('/growthpad')
  }
})
</script>
<template>
  <div class="circleContainer">
  </div>
  <div class=" containerbgs  bg-global-body   md:bg-opacity-100">
    <Nav class="relative "></Nav>
    <main class="  w-full  flex justify-center  ">
      <router-view/>
      <Footer/>
    </main>
  </div>
</template>
<style>
.circleContainer {
  position: fixed;
  width: 100%;
  z-index: 1;
}

@media screen and (max-width: 768px) {
  .containerbgs {
    background-image: url("https://res.ikingdata.com/nav/kongtouBg.png");
  }
}

@media screen and (min-width: 768px) {
  .containerbgs {
    background-image: url("https://res.ikingdata.com/nav/kgBodytopBg.jpg");
    background-size: 100% 100%;
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

