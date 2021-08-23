<script setup lang="ts">
import { difference } from 'ramda'
import { ref, defineProps, defineEmits, onMounted ,watch} from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import { toArray } from '~/utils'
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
    type:Array
  }
})
const dialogVisible = ref<boolean>(false)
const radioValue = ref<string | number>()
const selectValue = ref<string | number>()
const checkboxValue = ref<Array<string | number>>([])
const search=ref<string>('')
onMounted(function() {
  radioValue.value = safeGet(props.radios, '[0].value')
  selectValue.value = safeGet(props.selects, '[0].value')
})
watch([radioValue,selectValue,search],(n)=>emitEvent('changeParam',{radioValue:n[0],chain:n[1],search:n[2]}))
// 取消
const onHidden = function() {
  dialogVisible.value = false;
}
// 确认
// @ts-ignore
const onSubmit = function() {
  emitEvent('submit', toArray(checkboxValue.value))
  onHidden();
}

// 选择左侧或修改右侧数据时
const onChangeValue = function(value: Array<string | number>) {
  emitEvent('change', value)
}
// @ts-ignore
const onRemove = function(value: string | number) {
  const list: Array<string | number> = toArray(checkboxValue.value)
  // 计算差集，得到未删除的数据
  const array:Array<string | number> = difference(list, [value])
  onChangeValue(array)
  checkboxValue.value = array
}

</script>

<template>
  <div @click="dialogVisible = true">
    <slot name="content"></slot>
  </div>
  <el-dialog custom-class="diy-dialog" :title="title" v-model="dialogVisible" width="fit-content" destroy-on-close show-close>
    <div class="px-5 py-1.5 flex transfer-box" :class="{'search': selects.length > 0}">
      <div class="data-list max-h-full relative">
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
                <el-checkbox-group class="block w-full" v-model="checkboxValue" @change="onChangeValue">
                  <div class="mt-2 flex items-center" v-for="i in list" :key="i">
                    <el-checkbox :label="i">
                      <slot name="item" :data="i">
                        <span class="text-global-highTitle text-xs font-normal">BTC/ETH</span>
                      </slot>
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
            <template v-for="id in checkboxValue" :key="id">
              <div class="result-item flex items-center">
                <div class="flex-1 w-1">
                  <slot name="result" :id="id">
                    <span>{{ id }}</span>
                  </slot>
                </div>
                <div class="ml-3">
                  <div class="cursor-pointer" @click="onRemove(id)">
                    <IconFont type="icon-x" class="text-xs"/>
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
