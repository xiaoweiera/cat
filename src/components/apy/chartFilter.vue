<script setup lang="ts">
import { defineProps, toRefs, onMounted } from 'vue'
import { ElSelect, ElOption, ElIcon } from 'element-plus'
import { getTypeNameByKey } from '~/logic/apy/chartOption'
interface dropModel {
  name: string
  select: string
  data: object
}
const props = defineProps({
  typeName: String,
  dataList: Object,
})
const optionModel: dropModel = toRefs(props.dataList)
</script>
<template>
  <div class="w-56">
    <!--    所在链-->
    <div class="flex items-center justify-between w-full h-10 h-7.5 mb-6">
      <div class="selectDes">{{ optionModel.name.value }}</div>
      <el-select
        v-model="optionModel.select.value"
        class="w-42"
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionModel.data.value"
          :key="item"
          class="h-7.5"
          :label="
            typeName === 'type'
              ? getTypeNameByKey(item)
              : item === 'ALL'
                ? '全部'
                : item
          "
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-input__suffix) {
  margin-top: -5px;
}
::v-deep(.el-input__inner) {
  height: 30px;
}
.selectDes {
  color: rgba(37, 62, 111, 0.65);
  @apply text-kd14px18px;
}
</style>
