<script setup lang="ts">
import {ref, defineProps, onMounted, reactive, watch} from 'vue'
import {rankingTag} from '~/store/apy2/state'
import I18n from '~/utils/i18n/index'
import * as R from 'ramda'

const props = defineProps({token: Object,chain:String})
const moreToken = ref('')
const selectToken = (item: object) => {
  props.token.value = item.id
  props.token.name = item.name
  moreToken.value=''
}
watch(()=>moreToken.value, (n) => {
  if(!n) return
  const item = R.find(item => item.id === n, rankingTag.value)
  props.token.value = item.id
  props.token.name = item.name
})
const defaultShowNumber=12
</script>
<template>
  <div class="newTopList h-6.5">
    <div class="flex items-center flex-wrap  mt-3.25 md:mt-4 ">
      <div class="xshidden flex items-center">
        <template v-for="item in rankingTag.slice(0,defaultShowNumber)">
          <span @click="selectToken(item)" :class="token.value===item.id?'selectTag':'tag'" class="hand">{{ item.name }}</span>
        </template>
      </div>
      <div class="mdhidden flex items-center mb-3 ">
        <template v-for="item in rankingTag.slice(0,defaultShowNumber)">
          <span @click="selectToken(item)" :class="token.value===item.id?'selectTag':'tag'" class="hand">{{ item.name }}</span>
        </template>
      </div>
      <el-select v-if="defaultShowNumber<rankingTag.length" filterable :placeholder="I18n?.apyIndex.selectCoins" :popper-append-to-body="false" v-model="moreToken" class="ml-1" size="small">
        <template v-for="item in rankingTag.slice(defaultShowNumber,rankingTag.length)">
          <div class="xshidden">
            <el-option :label="item.name" :value="item.id">
            </el-option>
          </div>
          <div class="mdhidden">
            <el-option :label="item.name" :value="item.id">
            </el-option>
          </div>
        </template>
      </el-select>
    </div>
  </div>
</template>
<style lang="scss">
.newTopList {
  .tag {
    @apply px-2 py-1 text-kd14px18px md:text-kd16px16px mr-2  text-global-highTitle text-opacity-85 whitespace-nowrap;
  }

  .selectTag {
    @apply mr-2 rounded-kd4px text-kd14px18px md:text-kd16px16px text-global-primary px-2 py-1 bg-global-primary  bg-opacity-8  whitespace-nowrap;
  }

  @apply bg-global-white;
  .el-input__inner {
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    padding-left: 4px !important;
    @apply text-kd12px16px md:text-kd16px16px     text-global-highTitle text-opacity-85  text-center h-7 md:h-8.5 flex items-center  text-kd14px18px w-30 md:w-33 important ;
  }

  .el-icon-arrow-up {
    @apply -mt-1 md:mt-0.5 ;
  }

  input::-webkit-input-placeholder {
    font-weight: 400;
    @apply text-global-highTitle text-kd12px16px md:text-kd14px18px text-opacity-45;
  }

  input::-ms-input-placeholder {
    font-weight: 400;
    @apply text-global-highTitle text-kd12px16px md:text-kd14px18px text-opacity-45;
  }
}
</style>