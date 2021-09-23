<script setup lang="ts">

</script>

<template>
  <div class="md:w-250 mx-auto p-6 bg-white rounded-sm">
    <div class="flex items-center">
      <DappDetailTitle/>
    </div>
    <div class="flex items-end">
      <div class="mr-4">
        <div class="mt-2">
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
          <el-avatar class="mr-2" shape="square" fit="fit" :size="92" src="http://iph.href.lu/92x92"></el-avatar>
        </div>
        <div class="mt-2">
          <p class="text-14-20 mt-2.5 text-global-highTitle text-opacity-85">
            N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized IPs.N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized IPs.N.Fans is committed to creating a metaverse of animations and GameFi with and for globally recognized...
          </p>
        </div>
      </div>
      <!-- 点赞 -->
      <div>
        <DappStar/>
      </div>
    </div>

    <div class="mt-4">
      <NftDetailInfo/>
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
