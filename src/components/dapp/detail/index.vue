<script setup lang="ts">

</script>

<template>
  <div class="md:w-250 mx-auto p-6 bg-white rounded-sm">
    <div class="flex">
      <el-avatar class="new-40" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
      <div class="mx-4 flex-1 w-1">
        <div class="flex items-center">
          <DappDetailTitle/>
        </div>
        <p class="text-14-20 mt-2.5 text-global-highTitle text-opacity-85">
          N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized IPs.N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized IPs.N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized...
        </p>
      </div>
      <div>
        <DappStar/>
      </div>
    </div>
    <div class="mt-6">
      <DappDetailInfo/>
    </div>
    <div class="mt-12">
      <DappDetailComment/>
    </div>
    <div class="mt-12">
      <DappDetailHelp/>
    </div>
    <div class="mt-12">
      <DappDetailShare/>
    </div>
  </div>
</template>


<style scoped lang="scss">
  .star {
    @apply h-23;
  }
</style>
