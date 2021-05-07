<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
  const router = useRouter()
  const loc = window.location
  console.log('home',loc,loc.host.startsWith('apy'),loc.pathname )
  if (loc.host.startsWith('apy') && loc.pathname === '/') {
    router.push('/apy')
  }
})
</script>
<template>
  <div class="circleContainer">
  </div>
  <div class=" containerbgs  bg-global-body   md:bg-opacity-100">
    <ApyHeader/>
    <main class="  w-full  flex justify-center  ">
      <router-view/>
      <Footer/>
    </main>
  </div>
</template>
<style>
@media screen and (max-width: 768px) {
  .containerbgs {
    //background:#F6FAFD;
    background-image: url("https://res.ikingdata.com/nav/apyTopBg.png");
    background-size:cover;
  }
}

@media screen and (min-width: 768px) {
  .containerbgs {
    background: url(https://res.ikingdata.com/nav/apyTopBg.png) #F6FAFD;
    background-size: 100% 446px;
    background-repeat: no-repeat;
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

