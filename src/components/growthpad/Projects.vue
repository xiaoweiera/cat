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
  }, 5000)
}
onMounted(init)
onUnmounted(() => clearInterval(interval))
</script>
<template>
  <div class="grid grid-cols-3 gap-5">
    <div v-for="project in projects" :key="props.status + project.symbol">
      <GrowthpadProject :project="project" :title="title[props.status]"/>
    </div>
  </div>
</template>
