<script setup lang='ts'>
import {imgSrc,navList} from '~/logic/cat/config'
import {onMounted,ref} from 'vue'
import { useRoute } from 'vue-router'
const router = useRoute()
const key=ref('')
const routerList=router.path.split('/')
onMounted(()=>{
  key.value=routerList[routerList.length-1]
})
</script>
<template>
  <div class='px-6 flex justify-between w-full bg-global-white h-16 flex  items-center'>
    <div class='flex items-center whitespace-nowrap'>
      <div class='flex items-baseline whitespace-nowrap  mr-24'>
        <img :src="`${imgSrc}/logoHand.png`" class='w-7 min-w-7 h-10'  alt=''>
        <img :src="`${imgSrc}/logoTxt.png`" class='w-29 min-w-29 h-7 ml-2 ' alt=''>
      </div>
      <div class='flex items-center'>
        <template v-for='item in navList' key='item.name'>
          <div :class='key===item.key?"naved":"nav"' class='mr-12'>{{item.name}}</div>
        </template>
      </div>
    </div>

    <div>
<!--      钱包链接-->
      <Wallet />
    </div>
    
  </div>
</template>
<style scoped lang='scss'>
.naved{
  color:#141416;
  @apply text-kd14px20px font-medium cursor-pointer;

}
.nav{
  color:#777E90;
  @apply text-kd14px20px cursor-pointer;
}
</style>