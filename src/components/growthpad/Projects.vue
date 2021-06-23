<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'
import { taskList } from '/mock/growthpad/projectInfo'
import { ElTabs, ElTabPane } from 'element-plus'
import { TimeStatus, getTimeStatus } from '~/components/growthpad/task/task'

const ingList: any[] = [] // 进行中任务（包含未开始）
const closureList: any[] = [] // 已结束任务

taskList.forEach((data: any) => {
  const status = getTimeStatus(data)
  // 设置时间状态
  data.timeStatus = status
  if (status === TimeStatus.closure) {
    closureList.push(data)
  } else {
    ingList.push(data)
  }
})

// @ts-ignore
const activeValue = ref<string>(TimeStatus.ing)

// @ts-ignore
const tabs = [
  {
    list: ingList,
    name: TimeStatus.ing,
    title: `<span class="mr-2">⛳</span>${I18n.growthpadShow.waitButton}`, // 进行中标题
  }, {
    list: closureList,
    name: TimeStatus.closure,
    title: `<span class="mr-2">🎯️</span>${I18n.growthpadShow.status.end}`, // 结束标题
  }
]

</script>
<template>

  <el-tabs v-model="activeValue">
    <el-tab-pane v-for="(item, index) in tabs" :name="item.name" :key="index">
      <template #label>
        <span class="text-base font-kdFang" v-html="item.title"></span>
      </template>
      <div>
        <div class="md:-m-3 md:flex md:flex-wrap">
          <template v-for="(data, index) in item.list" :key="index">
            <div class="mt-6 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96">
              <GrowthpadProject
                  :value="data.timeStatus === TimeStatus.wait ? data.dashboard.begin : data.dashboard.end"
                  :status="data.timeStatus"
                  :project="data"
              />
            </div>
          </template>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>


</template>
