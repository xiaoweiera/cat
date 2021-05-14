<script setup lang="ts">
import {defineProps,toRefs} from 'vue'
import { ElSelect,ElOption,ElIcon} from 'element-plus'
interface dropModel {
  name:string
  select:string
  data:object
}
const props=defineProps({
  chains:Object
})
const optionModel:dropModel=toRefs(props.chains)

</script>
<template>
  <div class=" w-56" >
    <!--    所在链-->
    <div class="flex items-center justify-between w-full  h-10 h-7.5 mb-6">
      <div class="selectDes ">{{optionModel.name.value}}</div>
      <el-select class="w-42  " v-model="optionModel.select.value"  placeholder="请选择">
        <el-option class="h-7.5"
                   v-for="item in optionModel.data.value"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.el-input__suffix){
  margin-top:-5px;
}
::v-deep(.el-input__inner){
  height:30px;
}
.selectDes{
  color:rgba(37, 62, 111, 0.65);
  @apply text-kd14px18px ;
}
</style>
