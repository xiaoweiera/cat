<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import I18n from '~/utils/i18n'
const props = defineProps({
  status: String,
  url: String,
})
// 得到背景颜色
const txts = {
  ing: I18n.growthpadShow.ingButton,
  wait: I18n.growthpadShow.waitButton,
  closure: I18n.growthpadShow.lockreward,
}
</script>
<template>
<!--  v-if="props.status"-->
  <a v-router="props.url"
    class="w-full mt-6 text-white hand text-center flex justify-center items-center"
    :class="props.status"
    target="_blank"
  >
    <span class="text-kd14px18px font-medium">{{ txts[props.status] }}</span>
    <img
      class="w-3 h-3 ml-1"
      src="https://res.ikingdata.com/nav/statusRight.png"
      alt=""
    />
  </a>
<!--  <div v-else class="w-full mt-6 text-white hand text-center flex justify-center items-center" :class="props.status">-->
<!--    <span class="text-kd14px18px font-medium">{{ txts[props.status] }}</span>-->
<!--    <img-->
<!--      class="w-3 h-3 ml-1"-->
<!--      src="https://res.ikingdata.com/nav/statusRight.png"-->
<!--      alt=""-->
<!--    />-->
<!--  </div>-->
</template>
<style scoped lang="scss">
.ing {
  padding: 9px 12px;
  background: #0ec674;
  border-radius: 44px;
}
.wait {
  padding: 9px 12px;
  background: rgba(#FFFFFF, 0.3);
  border-radius: 44px;
  cursor: default;
  color: rgba(#2B8DFE, 0.3);
  img {
    display: none;
  }
}
.closure {
  padding: 9px 12px;
  background: #2b8dfe;
  border-radius: 44px;
}
</style>
