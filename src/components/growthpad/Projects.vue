<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps, ref } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})
const { t } = useI18n()
const projects = ref([{}, {}, {}])
const title = {
  progress: t('project.status.coming'),
}

</script>
<template>
  <div class=" grid grid-cols-1  mt-4 md:mt-6 gap-4 md:gap-6 md:mt-6 lg:grid-cols-2 xl:grid-cols-3 ">
    <div v-for="project in projects" :key="props.status + project.symbol" class="w-full  projectContainer">
      <GrowthpadProject :project="project" :status="props.status" :title="title[props.status]" />
    </div>
  </div>
</template>
<style>
</style>
