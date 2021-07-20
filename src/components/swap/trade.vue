<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import * as ethereum from '~/utils/ethereum/index'
import Web3Util from '~/utils/ethereum/util'

const formData = reactive({
  pair: '0x6dd2993b50b365c707718b0807fc4e344c072ec2',
  usdt: '10',
  eth: '1'
})

const onSubmit = function() {
  console.log(formData)
}

const ready = async function() {
  const web3 = new Web3Util()
  const data = await web3.getPairInfo(formData.pair)
  const { symbol0, symbol1 } = data
  console.log(data)
  if (symbol0 && symbol0.token) {
    const balance = await web3.getSymbolBalance(symbol0.token)
    console.log('token0 balance = ', balance)
  }
  if (symbol1 && symbol1.token) {
    const balance = await web3.getSymbolBalance(symbol1.token)
    console.log('token1 balance = ', balance)
  }
}

onBeforeMount(ready)

</script>

<template>
  <el-form :model="formData" label-width="80px">
    <el-form-item label="Pair">
      <el-input v-model="formData.pair"></el-input>
    </el-form-item>
    <el-form-item label="USDT">
      <el-input v-model="formData.usdt"></el-input>
    </el-form-item>
    <el-form-item label="ETH">
      <el-input v-model="formData.eth"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">交换</el-button>
    </el-form-item>

  </el-form>
</template>

