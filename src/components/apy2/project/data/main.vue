<script setup lang="ts">
import {defineProps} from 'vue'
const props=defineProps({projectId:Object,pool_type:String})
</script>

<template>
  <div class="font-kdFang">
    <Apy2ProjectDataLook  :projectId="props.projectId"/>
    <Apy2ProjectDataSame  :projectId="props.projectId"/>
  </div>
</template>



