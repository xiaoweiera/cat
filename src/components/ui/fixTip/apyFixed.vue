<script setup lang='ts'>
import I18n from '~/utils/i18n/index'
import { ref } from 'vue'
const show = ref(false)
import * as lang from '~/utils/lang'
const apply='http://ikingdata.mikecrm.com/ijyjMFO?lang=en'
const telegram = 'https://t.me/KingDataCN'
const twitter = 'https://twitter.com/KingData_com'
const weibo = 'https://weibo.com/u/5553600723'
const weChat = 'https://u.wechat.com/MAbomlcLpQlWPJTAdyhgEPo'
// window.addEventListener('scroll', function() {
//   var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
//   if (scrollTop >= window.screen.height) {
//     show.value = true
//   } else {
//     show.value = false
//   }
// })
const back=()=>document.body.scrollTop=document.documentElement.scrollTop=0
</script>
<template>
  <div class='fixApyTip xshidden'>
    <div v-if='!show' class='w-12  fixed z-1  right-5 bottom-20 '>
      <a v-router.blank='apply' class='w-full block  text-center rounded-kd4px py-3 tagShadow hand'>
        <IconFont class='text-global-highTitle text-opacity-65' size='20' type='icon-shangchuan' />
        <div :class='lang.current.value ==="cn"?" w-6 ":""' class='text-12-14 text-global-highTitle text-opacity-65 mx-auto'>
          {{ I18n.common.apply }}
        </div>
      </a>
      <!--      <div  class='w-full block text-center rounded-kd4px py-3 mt-3 tagShadow hand'>-->
      <!--        <IconFont class='text-global-highTitle text-opacity-65' size='20' type='icon-jiaocheng' />-->
      <!--        <div class='text-12-14 text-global-highTitle text-opacity-65'>教程</div>-->
      <!--      </div>-->
      <div  class='w-full block  rounded-kd4px h-42  flex flex-col items-center justify-between py-3 mt-3 tagShadow hand'>

        <el-popover :append-to-body='false' placement="left" :width='105'   trigger="hover">
          <template #reference>
            <a v-router.blank='telegram'>
              <IconFont class='text-global-primary ' size='24' type='icon-telegram' />
            </a>
          </template>
          <div class='w-20  w-fit text-center'>
            <UiQrcode width="80" height="80" href :value="telegram"></UiQrcode>
            <!--            <div class='mt-2 text-12-16 font-medium text-global-default text-opacity-85'>{{ I18n.common.chat.joinTelegram }}</div>-->
          </div>
        </el-popover>
        <a v-router.blank='twitter'>
          <IconFont class='text-global-primary' size='24' type='icon-twitter' />
        </a>
        <a v-router.blank='weibo'>
          <IconFont class='text-global-primary' size='24' type='icon-weibo1' />
        </a>
        <el-popover :append-to-body='false' placement="left" :width='105'   trigger="hover">
          <template #reference>
            <IconFont class='text-global-primary' size='24' type='icon-wechat' />
          </template>
          <div class='w-20  w-fit text-center'>
            <UiQrcode width="80" height="80" href :value="weChat"></UiQrcode>
          </div>
        </el-popover>
      </div>
      <div @click='back'  class='w-full block border-1 text-center rounded-kd4px pt-3 pb-1 mt-3 tagShadow hand'>
        <IconFont class='text-global-highTitle text-opacity-65 ' size='24' type='icon-fixedBackTop' />
      </div>
    </div>
  </div>
</template>
<style  lang='scss'>
.fixApyTip{
  .el-popover{
    min-width:105px !important;
  }
  .el-popper{
    min-width: 105px !important;
  }
  .is-light{
    min-width: 105px !important;
  }
  .tagShadow {
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
    background:white;
  }
}
</style>
