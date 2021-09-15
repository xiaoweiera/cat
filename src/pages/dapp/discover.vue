<script lang="ts">
import Discover from "~/components/dapp/discover.vue"

export default {
  name: 'Dapp',
  components: {
    Discover
  }
}
</script>

<template>
  <div class="pt-8 bg-white">
    <div>
      <div class="flex items-center justify-center">
        <h2 class="mr-3 text-global-highTitle text-32">快速发现 Dapp 新项目</h2>
        <a class="text-white bg-global-darkblue rounded-kd34px px-4 py-2 flex items-center">
          <IconFont type="icon-shangchuan" size="16"/>
          <span class="text-sm ml-1.5">提交新项目</span>
        </a>
      </div>
    </div>
    <div class="pt-6 pb-3">
      <div class="flex justify-center">
        <Chains/>
      </div>
    </div>
    <div>
      <Discover/>
    </div>
  </div>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
