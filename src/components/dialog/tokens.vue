<script setup lang='ts'>
import {imgSrc} from '~/logic/cat/config'
import {defineProps,ref} from 'vue'
const props=defineProps({
  show:Object
})
const search=ref('')
//列表集合
const tokenList = [
  { name: 'USDT', img: '../assets/cat/tokenDemo.png', balance: 100 },
  { name: 'BTC', img: '../assets/cat/tokenDemo.png', balance: 0 },
  { name: 'DOT', img: '../assets/cat/tokenDemo.png', balance: 0 },
  { name: 'DOT', img: '../assets/cat/tokenDemo.png', balance: 0 },
  { name: 'DOT', img: '../assets/cat/tokenDemo.png', balance: 0 },
  { name: 'DOT2', img: '../assets/cat/tokenDemo.png', balance: 0 },
  { name: 'DOT3', img: '../assets/cat/tokenDemo.png', balance: 0 },
]
//关闭弹窗
const closeDialog=()=>props.show.value=false
</script>
<template>
  <div class='selectTokens'>
    <el-dialog
      v-model='show.value'>
      <div class='px-6 pt-6 '>
        <div class='flex justify-between items-center mb-2.5'>
          <span class='text-kd16px24px font-semibold text-global-hei'>Select a token</span>
          <img @click='closeDialog' :src='`${imgSrc}/close.png`' class='w-6 h-6 hand' alt=''>
        </div>
        <el-input v-model='search' placeholder='Search name or paste address'></el-input>
        <div class='mt-3 h-94.5 showY'>
          <template v-for='item in tokenList' :key='item.name'>
            <div class='flex items-center justify-between py-3 hand'>
              <div class='flex items-center'>
                <img :src='item.img' class='w-9 h-9' alt=''>
                <div class='ml-3'>
                  <div class='text-kd16px20px font-semibold text-global-hei'>{{ item.name }}</div>
                  <div class='text-kd12px16px font-medium text-global-hui'>{{ item.name }} Token</div>
                </div>
              </div>
              <div class='text-kd12px20px font-medium text-global-hui'>balance: {{ item.balance }} {{ item.name }}</div>
            </div>
          </template>
        </div>
      </div>
      <!--        编辑-->
      <div class='manage hand'>
        <img :src='`${imgSrc}/edit.png`' class='w-6 h-6' alt=''>
        <span class='ml-1.5'>Manage</span>
      </div>
    </el-dialog>
  </div>
</template>
<style lang='scss'>
.selectTokens {
  .manage{
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #3772FF;
    box-shadow: 0px -1px 0px #F4F5F6;
    @apply flex justify-center items-center relative z-12 h-18  w-full radiusBottom;
  }
  .el-input__inner{
    border: 1px solid #E6E8EC;
    box-sizing: border-box;
    border-radius: 8px;
  }
  .el-dialog {
    width: 420px !important;
    padding: 0px !important;
    border-radius: 24px;
  }
  .radiusBottom{
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
  .el-dialog__body {
    padding: 0px !important;
  }

  .el-dialog__header {
    display: none;
  }
}
</style>