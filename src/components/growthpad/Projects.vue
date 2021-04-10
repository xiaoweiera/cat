<script setup lang="ts">
import axios from 'axios'
import { defineProps, reactive, ref, onMounted, onUnmounted } from 'vue'
import { loadProject } from '~/logic/growthpad/projects'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const projects = ref([])

const title = {
  progress: '即将开始',
}

let interval = null

const init = () => {
  interval = setInterval(() => {
    loadProject(props.status, (data) => {
      projects.value = data
    })
  }, 1000)
}
onMounted(init)
onUnmounted(() => clearInterval(interval))
</script>
<template>
  <div class="grid mt-4 md:mt-6 gap-4 md:gap-6 md:mt-6 lg:grid-cols-2 xl:grid-cols-3    ">
    <div class="w-full  projectContainer" v-for="project in projects" :key="props.status + project.symbol">

      <GrowthpadProject  :project="project" :title="title[props.status]"/>
    </div>
  </div>
</template>
<style>
.projectContainer{
  //max-width: 384px;
  min-width: 345px;

}
</style>