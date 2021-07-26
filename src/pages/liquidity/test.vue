<script lang="ts" setup>
// @ts-ignore
class person{
  name:string;
  constructor(name:string){
    this.name=name
  }
  private desc:string='desc'
  static getName():void{
    alert('aa')
  }
}
class person2 extends person{
  name:string;

}
const j=''
const p=new person2('小明')
alert(p.desc)
</script>
<template>
</template>
<style>
.animal{
  //height: calc( 100vh - 75px);
  //position: absolute;
  background: red;
  //top:75px;
  //bottom:0;
  transition: all 1s;
  //transform: translate(10px, 0);
  //margin-left:50%;
}
.animal:hover{
  font-size: 100px;
  background: white;
  @apply w-50 h-50;
}
</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
