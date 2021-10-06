<script setup lang='ts'>
import {imgSrc} from '~/logic/cat/config'
import {ref} from 'vue'
const walletState=ref(false)
const address=ref('OxE976...994e')
const openWallet=()=>{
  walletState.value=true
}
</script>
<template>
  <div class='h-9  flex items-center'>
    <div class='buyButton whitespace-nowrap'>
      <div class='mr-1.5 text-kd14p24px font-bold text-global-fen'>$0.075 PAW</div>
      <div class='buy hand'>BUY</div>
    </div>
    <!--  未连接钱包-->
    <div v-if='!walletState' @click='openWallet()' class='bg-global-primary hand whitespace-nowrap  w-43 h-8 rounded-kd8px px-3 py-2 w-fit flex items-center'>
      <img :src="`${imgSrc}/wallet.png`" class='w-4 h-4' alt=''>
      <span class='ml-1.5 text-kd14px20px text-white'>Connect to a wallet</span>
    </div>
    <!--  链接钱包成功-->
    <div v-else class='walletOk whitespace-nowrap'>
      <img :src="`${imgSrc}/walletok.png`" class='w-4 h-4 mr-1.5' alt=''>
      <div class='text-global-primary mr-1.5'>0.000</div>
      <div class='address'>{{address}}</div>
    </div>
  </div>

</template>
<style scoped lang='scss'>
.walletOk{
  border:1.5px solid #E6E8EC;
  @apply Cssbg-global-white hand   h-9 rounded-kd12px pl-3 pr-1.5 py-2.5 w-fit flex items-center;
}
.address{
  @apply h-6 flex items-center  px-2 text-kd14px20px bg-global-primary rounded-kd6px text-white;
}
.buyButton{
  border:1.5px solid #E6E8EC;
  @apply flex items-center mr-3 p-1.25  h-9 border-1 rounded-kd12px;
}
.buy{
  color: #FCFCFD;
  @apply h-6.5  bg-global-fen rounded-kd6px text-kd12px16px font-medium flex items-center px-2.5 py-1.25 text-global-white;
}
</style>