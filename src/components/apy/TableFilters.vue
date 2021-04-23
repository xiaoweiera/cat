<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
// @ts-ignore
import { ElSwitch } from 'element-plus'

const props = defineProps({
  time: { type: Number },
  project: { type: String },
  title: {
    type: String,
  },
  options: { type: Object },
})

const {
  data: realOptions,
  select,
} = toRefs(props.options)

const clickOption = option => select.value = option.key

</script>
<template>
  <div :id="project" class="flex flex-wrap items-center justify-between  mb-8  md:mb-5">
    <div class="flex items-center">
      <div class="text-kd18px28px font-medium mr-1.5">{{ title }}</div>
      <div class="text-kd14px20px font-normal text-global-default opacity-65">({{ time }} 秒后更新)</div>
    </div>
    <div>
      <div class="flex md:flex-row flex-col  md:items-center">
        <div class="mr-3 mt-3 md:mt-1 text-kd14px18px text-global-highTitle opacity-65 font-normal">池子指标 :</div>
        <div class="flex items-center flex-wrap ">
          <template v-for="(item,i) in realOptions">
            <div v-if="i>0" class="flex items-center mt-3 mr-3  md:mt-0">
              <div class="mr-2">
                <el-switch
                    width="39"
                    active-color="#2B8DFE"
                    @change="clickOption(item)"
                    validate-event="false"
                    inactive-color="rgba(37, 62, 111, 0.1)"
                    v-model="item.status"
                >
                </el-switch>
              </div>
              <div class=" mt-1 text-kd14px18px font-normal text-global-highTitle">{{ item.name }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
