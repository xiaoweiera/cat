<script lang="ts" setup>

</script>
<template>
  <div>
    <template v-for="(item,i) in [1,2,3]">
    <TopRankDappTableItem :i="i" :item="item"/>
    </template>
  </div>
</template>



