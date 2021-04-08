<script setup lang="ts">
import { defineProps, reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const projects = ref([])

const init = async() => {
  axios.get(`api/v1/growthpad/projects?status=${props.status}`)
      .then(({ data }) => {
        if (data.data.length === 0) {
          projects.value = [
            {},
            {},
            {},
          ]
        }
        else {
          projects.value = data.data
        }
        console.log('resp', data, 'value', projects.value)
      })
  console.log(projects.value)
}
onMounted(init)
</script>
<template>
  <div class="flex">
    <div v-for="project in projects" class="flex-1">
      <GrowthpadProject :project="project"/>
    </div>
  </div>
</template>
