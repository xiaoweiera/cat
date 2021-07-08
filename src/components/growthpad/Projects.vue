<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'
import { taskList } from '/mock/growthpad/projectInfo'
// @ts-ignore
import { ElTabs, ElTabPane } from 'element-plus'
import { TimeStatus, getTimeStatus } from '~/components/growthpad/task/task'

const waitList: any[] = [] // 未开始
const ingList: any[] = [] // 进行中任务（包含未开始）
const closureList: any[] = [] // 已结束任务

taskList.forEach((data: any) => {
  const status = getTimeStatus(data)
  // 设置时间状态
  data.timeStatus = status
  if (status === TimeStatus.closure) {
    closureList.push(data)
  } else if (status === TimeStatus.ing) {
    ingList.push(data)
  } else {
    waitList.push(data)
  }
})

// @ts-ignore
const tabs = [
  // {
  //   list: waitList,
  //   name: TimeStatus.wait,
  //   title: `<span class="mr-2"></span>${I18n.growthpadShow.status.wait}`, // 进行中标题
  // },
  {
    list: [...waitList, ...ingList],
    name: TimeStatus.ing,
    title: `<span class="mr-2">⛳</span>${I18n.growthpadShow.status.ing}`, // 进行中标题
  }, {
    list: closureList,
    name: TimeStatus.closure,
    title: `<span class="mr-2">🎯️</span>${I18n.growthpadShow.status.end}`, // 结束标题
  }
]

// @ts-ignore
const activeValue = ref<string>('')

for(let i = 0, len = tabs.length; i < len; i++) {
  const item: any = tabs[i]
  if (item.list.length > 0) {
    activeValue.value = item.name
    break
  }
}

</script>
<template>

  <p class="text-sm text-global-numRed pb-3">
    <span>{{ I18n.growthpadShow.notice }}</span>
  </p>

  <el-tabs v-model="activeValue">
    <template v-for="(item, index) in tabs" :key="index">
      <el-tab-pane v-if="item.list.length > 0" :name="item.name">
        <template #label>
          <span class="text-base font-kdFang" v-html="item.title"></span>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>

  <div v-for="(item, index) in tabs" :key="index">
    <div v-show="item.name === activeValue">
      <div class="md:-mx-3 md:flex md:flex-wrap">
        <template v-for="(data, index) in item.list" :key="index">
          <div class="py-3 w-full lg:w-1/3 md:w-1/2 md:px-3 md:min-w-96">
            <GrowthpadProject
                :value="data.timeStatus === TimeStatus.wait ? data.dashboard.begin : data.dashboard.end"
                :status="data.timeStatus"
                :project="data"
            />
          </div>
        </template>
      </div>
    </div>
  </div>


</template>
