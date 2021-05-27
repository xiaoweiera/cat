<script setup lang="ts">
// @ts-ignore
import * as echarts from 'echarts'
import { defineProps, watch, ref } from 'vue'
import { ElDatePicker } from 'element-plus'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
// @ts-ignore
// @ts-ignore
import { chartsConfig } from '~/logic/apy/config'
import { dataToTimestamp, formatDefaultTime, getagoTimeStamp } from '~/lib/tool'
interface timeModel {
  name: string
  value: number
  selected: boolean
}
const props = defineProps({
  title: { type: String },
  selected: { type: String },
  tableIndex: { type: Number },
  chartIndex: { type: Number },
  changeTime: { type: Function },
})
const getTitle = () => {
  if (props.chartIndex === 2) {
    if (lang.current.value === 'cn') {
      return `${props.title + props.selected}对比`
    } else {
      return `Comparison of ${props.selected} on different platforms`
    }
  } else {
    return `${props.selected} ${props.title}`
  }
}
const testDom = ref(null)
const time = ref(null)
const beginTime = ref(0)
const endTime = ref(0)
const editTime = ref(false) // 控制是否显示自定义时间
// @ts-ignore
const closeShow = ref(false)
const filterOption = ref([
  { name: I18n.apy.times.week, value: 7, selected: true },
  {
    name: I18n.apy.times.month,
    value: 30,
    selected: false,
  },
  { name: I18n.apy.times.more, value: 90, selected: false },
  { name: I18n.apy.times.custom, value: 0, selected: false },
])

const updateChart = (begin: number, end: number) => {
  beginTime.value = begin
  endTime.value = end
  props?.changeTime(beginTime.value, endTime.value)
}

watch(
  () => time.value,
  (n, o) => {
    if (time.value) {
      updateChart(
        dataToTimestamp(formatDefaultTime(n[0])),
        dataToTimestamp(formatDefaultTime(n[1])),
      )
    }
  },
)

const selectTag = (timeM: timeModel) => {
  if (timeM.name === I18n.apy.times.custom) {
    document.getElementsByClassName('el-range-input')[0].click()
    editTime.value = true
  } else {
    updateChart(
      getagoTimeStamp(timeM.value),
      dataToTimestamp(formatDefaultTime()),
    )
    editTime.value = false // 关闭自定义
    time.value = null // 自定义清空
  }
  R.forEach((item) => {
    if (item.name === timeM.name) {
      item.selected = true
    } else {
      item.selected = false
    }
  }, filterOption.value)
}
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd18px28px text-global-highTitle font-normal">
      {{ getTitle() }}
    </div>
    <div class="flex">
      <div class="flex h-7.8 items-center timeFilter">
        <template v-for="(item, index) in filterOption">
          <div
            v-if="
              item.name !== I18n.apy.times.custom ||
                (item.name === I18n.apy.times.custom && !editTime)
            "
            :class="item.selected ? 'timeTagSelected' : 'timeTag'"
            @click="selectTag(item)"
          >
            {{ item.name }}
          </div>
        </template>
        <div v-show="editTime" class="timeContainer">
          <el-date-picker
            id="datePickerDom"
            v-model="time"
            :clearable="closeShow"
            size="mini"
            type="daterange"
            range-separator="–"
            :start-placeholder="I18n.apy.times.begin"
            :end-placeholder="I18n.apy.times.end"
          >
          </el-date-picker>
        </div>
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
  color: #a2a4a8;
}

.closeSmall {
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
