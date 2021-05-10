<template>
  <div class="circleContainer">
  </div>
  <div class="containerbgs bg-global-body md:bg-opacity-100">
    <ApyHeader/>
    <main class="w-full flex justify-center examples">
      <router-view/>
      <Footer/>
    </main>
  </div>
</template>

<style scoped lang="postcss">
  .examples {
    background: url("/assets/growthpad/examples/background.png") top center / 100% auto no-repeat, radial-gradient(49.91% 49.91% at 50.09% 50.09%, rgba(43, 141, 254, 0.1) 0%, rgba(43, 141, 254, 0) 100%);
  }
</style>
