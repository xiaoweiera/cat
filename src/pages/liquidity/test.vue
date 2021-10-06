<script setup lang='ts'>
import {ref} from 'vue'
const a=ref('red')
const colorList=[
  'red',
  'blue',
  'yellow'
]
const change=()=>{
  a.value=a.value==='red'?a.value='green':a.value='red'
}
</script>
<template>
<div class='w-full h-100 border-1 mx-auto text-center pt-30'>
 <div v-for='item in colorList'>
   <span :class='`name${item}`'>{{item}}</span>
 </div>
  <div @click='change()' class='bian' :style='`--v:${a}`'>啊啊啊</div>
</div>

</template>
<style  lang='scss'>
.bian{
  background:var(--v);
}
$colorList:[
  red,
  blue,
  green,
  yellow
];
@function getColor($c){
  @return $c
}
.yan{
  background:lighten(getColor(purple),33%)
}
@each $item in $colorList{
  .name#{$item}{
    color:$item
  }
}
$color:green;
@mixin border($color){
  border:1px solid $color;
}
.qiantao {
  & > .zi{
    color:$color;
    @include border(yellow);
  }

}


$or:or;
.txt{
  $color:blue !global;
  $border:1px solid blue !global;
  color:$color
}
.wen{
  col#{or}:$color;
  border:$border
}
</style>
// @formatter:off
<route lang="yaml">
meta:
  layout: base
</route>
// @formatter:off
