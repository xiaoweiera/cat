<script setup lang="ts">
import { difference, intersection } from 'ramda'
import { ref, defineProps, defineEmits, onMounted, watch, computed, toRaw } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { toArray, map } from '~/utils'
import DBList from '@fengqiaogang/dblist'
const emitEvent = defineEmits(['change', 'submit','changeParam'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    default: () => '已选'
  },
  radios: {
    type: Array,
    required: true
  },
  selects: {
    type: Array,
    default () {
      return []
    }
  },
  list:{
    type: Array,
    default () {
      return []
    }
  },
  onload: {
    type: Function,
    default () {
      return () => []
    }
  }
})
const dialogVisible = ref<boolean>(false)
const radioValue = ref<string | number>()
const selectValue = ref<string | number>()

const checkboxValue = ref<Array<string | number>>([])

const search = ref<string>('')

// 已选择数据
const checkboxList = ref<any[]>([])

watch([radioValue, selectValue, search],(data: any[])=>{
  const value = {
    radioValue: data[0],
    chain: data[1],
    search: data[2]
  }
  emitEvent('changeParam', value)
})

const getCheckboxList = function(id: string[] | string) {
  const array: any[] = toRaw(props.list)
  const db = new DBList(array)
  return db.select({ id: toArray(id) })
}

const onChangeList = function(list: string[]) {
  const oldArray = toRaw(checkboxList.value)
  const db = new DBList(oldArray)
  // 已选中的数据
  const array1: string[] = map((item: any) => item.id, oldArray)
  const array2: string[] = map((item: any) => item.id, toRaw(props.list))
  // 排除当前列表中的数据
  const array3: string[] = intersection(array2, array1)
  console.log('del : ', array3)
  db.remove({ id: array3 })
  // 添加已选择的数据
  db.insert(getCheckboxList(list))
  checkboxList.value = db.clone()
}



// 取消
const onHidden = function() {
  dialogVisible.value = false // 关闭弹窗
  checkboxValue.value = [] // 取消所有已选择数据
}

// @ts-ignore
const onShow = async function() {
  dialogVisible.value = true
  const array = await props.onload()
  if (array.length > 0) {
    const db = new DBList(array)
    const list = db.select({ checked: true })
    checkboxValue.value = map((item: any) => item.id, list)
  } else {
    checkboxValue.value = [] // 默认选中数据
  }
}

// 确认
// @ts-ignore
const onSubmit = function() {
  const value = getCheckboxList()
  emitEvent('submit', value)
  onHidden();
}

// @ts-ignore
const onRemove = function(data: any) {
  const value = safeGet<string | number>(data, 'id')
  const list: Array<string | number> = toArray(checkboxValue.value)
  // 计算差集，得到未删除的数据
  const array:Array<string | number> = difference(list, [value])
  checkboxValue.value = array
}

onMounted(function() {
  radioValue.value = safeGet(props.radios, '[0].value')
  selectValue.value = safeGet(props.selects, '[0].value')
})

</script>

<template>
  <div @click="onShow">
    <slot name="content"></slot>
  </div>
  <el-dialog custom-class="diy-dialog" :title="title" v-model="dialogVisible" width="fit-content" destroy-on-close show-close>
    <div class="px-5 py-1.5 flex transfer-box" :class="{'search': selects.length > 0}">
      <div class="data-list max-h-full relative" v-if="dialogVisible">
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <el-container class="h-full">
            <el-header height="initial" class="p-0">
              <div class="flex">
                <div class="radio-list">
                  <el-radio-group v-model="radioValue" size="small" class="w-full">
                    <template v-for="(item, index) in radios" :key="index">
                      <el-radio-button class="w-1/2" :label="item.value">
                        <slot name="radio-item" :data="item">
                          <span>{{ item.label }}</span>
                        </slot>
                      </el-radio-button>
                    </template>
                  </el-radio-group>
                </div>
                <div class="select-box ml-3" v-if="selects.length > 0">
                  <el-select size="small" v-model="selectValue">
                    <template v-for="(item, index) in selects" :key="index">
                      <el-option :value="item.value" :label="item.label">
                        <slot name="select" :data="item"></slot>
                      </el-option>
                    </template>
                  </el-select>
                </div>
              </div>
              <div class="pt-2 pb-1">
                <div class="search-box">
                  <el-input size="small" placeholder="请输入内容" v-model="search" value="">
                    <template #prefix>
                      <i class="el-input__icon el-icon-search"></i>
                    </template>
                  </el-input>
                </div>
              </div>
            </el-header>
            <el-main class="p-0 ">
              <div class="h-full overflow-auto showY">
                <el-checkbox-group class="block w-full" v-model="checkboxValue" @change="onChangeList">
                  <div class="mt-2 flex items-center" v-for="item in list" :key="item.id">
                    <el-checkbox :label="item.id">
                      <slot :key="item.id" name="item" :data="item"></slot>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </el-main>
          </el-container>
        </div>
      </div>
      <div class="ml-4 result-box">
        <div class="leading-8 select-none">
          <span class="text-global-highTitle text-opacity-85">{{ subTitle }}</span>
        </div>
        <div class="h-76 mt-2">
          <div class="h-full p-3 overflow-auto border border-global-highTitle border-opacity-6 rounded-md bg-global-bodyTwo">
            <template v-for="(value, index) in checkboxList" :key="index">
              <div class="result-item flex items-center">
                <div class="flex-1 w-1">
                  <slot name="result" :data="value"></slot>
                </div>
                <div class="ml-3">
                  <div class="cursor-pointer" @click="onRemove(value)">
                    <IconFont class="text-global-highTitle text-xs" type="icon-x" size="12"/>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-bottom" :class="{'search': selects.length > 0}">
        <el-button @click="onHidden">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped  lang="scss">
::v-deep(.el-checkbox){
  width: 100% !important;
  @apply flex items-center;
}
::v-deep(.el-checkbox__label){
  width:100%;
  @apply items-center flex;
}
.transfer-box {
  /* 下拉框宽度 */
  .select-box {
    @apply w-34.5;
  }
  /* 如果有下拉框 */
  &.search {
    .data-list, .result-box {
      @apply w-77.5;
    }
  }
  &:not(.search) {
    .radio-list {
      @apply w-full;
    }
    .data-list, .result-box {
      @apply w-40.5;
    }
  }
  .result-item {
    @apply mt-2;
    &:first-child {
      @apply mt-0;
    }
  }
}
/* 弹窗底部按钮 */
.dialog-bottom {
  @apply flex;
  .el-button {
    @apply flex-1;
  }
  &.search {
    @apply w-77.5 ml-auto;
  }
  &:not(.search) {
    @apply w-full;
  }
}

.radio-list {
  ::v-deep(.el-radio-button__inner) {
    @apply w-full;
    @apply inline-block;
  }
}
</style>
