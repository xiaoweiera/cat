<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import DBList from '@fengqiaogang/dblist'
import { setInject } from '~/utils/use/state'
// @ts-ignore
import { shortcuts, disabledDate, formatResult } from '~/logic/ui/date'
import safeGet from '@fengqiaogang/safe-get'
import { defineProps, onMounted, ref, computed, defineEmit } from 'vue'
import { map, forEach, isString, isNumber, isFunction, toArray, isObject, toBoolean } from '~/utils'

const emitEvent = defineEmit(['change', 'update:value'])

const props = defineProps({
  shortcuts: {
    type: Object,
    default: function () {
      return {
        hour: ['7', '30'],
        day: ['7', '30', '90', '365', 'all', 'custom'],
      }
    }
  },
})

const db = new DBList()

const setUiDate = setInject('uiDate')

const timeIndex = ref<string>('')
const dateType = ref<string>('')
const customTime = ref<number[]>([])

// @ts-ignore
const dateList = computed(function(){
  const where = {
    key: dateType.value
  }
  return db.select(where)
})

const formatType = function(value: string) {
  if (value === 'hour') {
    return '1H'
  }
  return '1D'
}

// @ts-ignore
const dateTypeList = computed(function() {
  const data = props.shortcuts
  return map(function(key: string){
    const label = formatType(key)
    let disabled = true
    if (data[key]) {
      disabled = false
    }
    return { label, key, disabled }
  }, ['hour', 'day'])
})

// @ts-ignore 选中时间
const onClickDate = function(data: any) {
  if (data) {
    timeIndex.value = data.id
  }
  // 排除自定义时间的点击事件
  if (data && !data.custom) {
    customTime.value = []
  }

  let list: string[] = []
  if (data && isFunction(data.value)) {
    list = data.value()
  } else {
    list = toArray(data.value)
  }
  const result = formatResult(list)
  emitEvent('update:value', result)
  emitEvent('change', result)
  // 判断 inject 是否存在
  if (setUiDate) {
    // 通过 inject 更新数据
    setUiDate(result)
  }
}

// 选择自定义时间
// @ts-ignore
const onChangeCustomTime = function(data: any, value: number[]) {
  const { id, custom } = data
  const tmp = { id, custom, value }
  onClickDate(tmp)
}

// 切换日期类型
// @ts-ignore
const onChangeType = function(type: string){
  if (type && dateType.value !== type) {
    dateType.value = type
    let autoValue = db.selectOne<any>({ key: type, auto: true })
    if (!autoValue) {
      autoValue = db.selectOne<any>({ key: type })
    }
    if (autoValue) {
      onClickDate(autoValue)
    }
  }
}


onMounted(function(){
  const types: string[] = []
  forEach(function(list: any[], key: string) {
    types.push(key)
    forEach(function(item: any){
      const value = isObject(item) ? safeGet(item, 'value') : item
      const auto = isObject(item) ? toBoolean(safeGet<boolean>(item, 'default')) : false
      const label = isObject(item) ? safeGet(item, 'label') : ''
      if (value === 'custom') {
        db.insert({ key, label: I18n.liquidity.mainHeader.custom, custom: true })
      } else if (label && isFunction(value)) {
        db.insert({ key, label, auto, value, custom: false })
      } else if (isString(value) || isNumber(value)) {
        const data = safeGet(shortcuts, `${value}`)
        if (data) {
          db.insert(Object.assign({ label }, data, { key, auto, custom: false }))
        }
      }
    }, list)
  }, props.shortcuts)

  const [ autoType ] = types
  // 设置默认数据
  onChangeType(autoType)
})



</script>

<template>
  <div class="flex text-kdFang" v-show="dateList.length > 0">
    <div class="date-select-box">
      <template v-for="item in dateList" :key="item.id">
        <template v-if="item.custom">
          <el-date-picker class="ui-date-picker" :disabledDate="disabledDate" id="datePickerDom" v-model="customTime" @change="onChangeCustomTime(item, $event)" format="YYYY-MM-DD" size="mini" type="daterange" range-separator="–" :start-placeholder="I18n.apy.times.begin" :end-placeholder="I18n.apy.times.end">
          </el-date-picker>
        </template>
        <template v-else>
          <span class="date-item" :class="{'active': item.id === timeIndex}" @click="onClickDate(item)">{{ item.label }}</span>
        </template>
      </template>
    </div>
    <div class="date-select-box ml-3">
      <template v-for="item in dateTypeList" :key="item.label">
        <template v-if="item.disabled">
          <span class="date-item disabled">{{ item.label }}</span>
        </template>
        <template v-else>
          <span class="date-item" :class="{'active': item.key === dateType}" @click="onChangeType(item.key)">{{item.label }}</span>
        </template>
      </template>
    </div>
  </div>
</template>


<style scoped lang="scss">
.date-select-box {
  @apply rounded bg-global-primary bg-opacity-8 p-0.5;
}
.date-item {
  transition: all 0.3s;
  @apply inline-block px-2 h-full leading-7 rounded-sm select-none text-sm;
  &.active {
    @apply bg-global-white text-global-primary;
  }
  &.disabled {
    @apply cursor-not-allowed
  }
  &:not(.disabled) {
    @apply cursor-pointer;
  }
}
</style>
<style lang="scss">
.ui-date-picker {
  padding: 3px !important;
  width: 170px !important;
  @apply text-center;
  i {
    display: none !important;
  }
  input {
    @apply flex-1;
  }
  span {
    width: 16px !important;
    padding: 0 !important;
  }
}
</style>
