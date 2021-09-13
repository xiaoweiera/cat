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
  <Discover/>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
