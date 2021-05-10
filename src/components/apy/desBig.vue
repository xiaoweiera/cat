<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, watch, ref} from 'vue'
//@ts-ignore
import { chartsConfig } from '~/logic/apy/config'
//@ts-ignore
import {ElDatePicker, ElIcon} from 'element-plus'

import * as R from 'ramda'
import {dataToTimestamp, formatDefaultTime, getagoTimeStamp} from '~/lib/tool'


interface timeModel {
  name: string
  value: number
  selected: boolean
}

const props = defineProps({
  title: {type: String},
  selected: {type: String},
  tableIndex: {type: Number},
  chartIndex: {type: Number},
  changeTime: {type: Function},
  closeModel: {type: Function}
})
const getTitle = () => {
  if (props.chartIndex === 2) {
    return props.title + props.selected + '对比'
  } else {
    return props.selected + ' ' + props.title
  }
}
const time = ref(null)
const beginTime = ref(0)
const endTime = ref(0)
const editTime = ref(true)//控制是否显示自定义时间
//@ts-ignore
const closeShow = ref(false)
const filterOption = ref([{name: '近7天', value: 7, selected: true}, {
  name: '近1月',
  value: 30,
  selected: false
}, {name: '近3月', value: 90, selected: false}, {name: '自定义', value: 0, selected: false}])

watch(() => props.selected, (n, o) => {
  time.value = null
})
watch(() => time.value, (n, o) => {
  if (time.value) {
    beginTime.value = dataToTimestamp(formatDefaultTime(n[0]))
    endTime.value = dataToTimestamp(formatDefaultTime(n[1]))
    props?.changeTime(beginTime.value, endTime.value)
  }
})
watch(() => beginTime.value, (n, o) => {
  if (editTime.value === true) {
    return
  }
  beginTime.value = n
  endTime.value = dataToTimestamp(formatDefaultTime())//默认当天
  props?.changeTime(beginTime.value, endTime.value)
})
const selectTag = (timeM: timeModel) => {

  if (timeM.name === '自定义') {
    editTime.value = true
  } else {
    beginTime.value = getagoTimeStamp(timeM.value)
    editTime.value = true //关闭自定义
    time.value = null //自定义清空
  }
  R.map(item => {
    if (item.name === timeM.name) item.selected = true
    else item.selected = false
  }, filterOption.value)
}
//@ts-ignore
const closeDialog = () =>props.closeModel()
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd18px28px text-global-highTitle font-normal">{{ getTitle() }}</div>
    <div class="flex">
      <div class="flex h-7.8 items-center timeFilter">
        <template v-for="(item,index) in filterOption">
          <div v-if="item.name!=='自定义' || (item.name==='自定义' && !editTime)" @click="selectTag(item)"
               :class="item.selected?'timeTagSelected':'timeTag'">
            {{ item.name }}
          </div>
        </template>
        <div v-if="editTime" class="timeContainer">
          <el-date-picker
              :clearable="closeShow"
              size="mini"
              v-model="time"
              type="daterange"
              range-separator="–"
              start-placeholder="开始"
              end-placeholder="结束"
          >
          </el-date-picker>
        </div>
      </div>
      <div @click="closeDialog" class="closeSmall w-7.5 h-7.5 flex items-center justify-center ml-6 hand">
        <img class="w-4 h-4" src="https://res.ikingdata.com/nav/apySmall.png" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.timeTag {
  border-radius: 2px;
  cursor: pointer;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-65;
}

.timeTagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-primary bg-white;
}

.timeFilter {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
::v-deep(.el-range-editor--mini .el-range-input) {
  width: 100px !important;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(37, 62, 111, 0.85);
}

::v-deep(.el-range-editor--mini .el-range-separator) {
  font-family: 'i8n-font-inter';
}

::v-deep(.el-range-editor--mini.el-input__inner) {
  width: 235px;
  border: none;
}

::v-deep(.el-input__inner) {
  margin-right: 0px;
  padding-right: 0px;
  width: 2px;
  padding: 0px 8px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

::v-deep(.el-range__icon) {
  display: none;
}

::v-deep(.el-range-input) {
  color: #2b8dfe;
  width: 50%;
  font-size: 14px;
}

::v-deep(.el-range-separator) {
  padding: 0 0;
  line-height: 28px;
  color: #2b8dfe;
}

::v-deep(.el-date-editor .el-range-separator) {
  margin: 0px 5px;
  padding: 0;
}

::v-deep(.el-range__close-icon) {
  display: none;
}

.timeColor {
  color: #A2A4A8;
}

.closeSmall {
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>