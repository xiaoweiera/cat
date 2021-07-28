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
  <el-popover
      placement="bottom"
      title="标题"
      :width="200"
      trigger="hover"
  >
    <div>aaa</div>
    <template #reference>
      <el-button>hover 激活</el-button>
    </template>
  </el-popover>

</template>
<style>
.auto            { cursor: auto; }
.deafult         { cursor: default; }
.none            { cursor: none; }
.context-menu    { cursor: context-menu; }
.help            { cursor: help; }
.pointer         { cursor: pointer; }
.progress        { cursor: progress; }
.wait            { cursor: wait; }
.cell            { cursor: cell; }
.crosshair       { cursor: crosshair; }
.text            { cursor: text; }
.vertical-text   { cursor: vertical-text; }
.alias           { cursor: alias; }
.copy            { cursor: copy; }
.move            { cursor: move; }
.no-drop         { cursor: no-drop; }
.not-allowed     { cursor: not-allowed; }
.all-scroll      { cursor: all-scroll; }
.col-resize      { cursor: col-resize; }
.row-resize      { cursor: row-resize; }
.n-resize        { cursor: n-resize; }
.e-resize        { cursor: e-resize; }
.s-resize        { cursor: s-resize; }
.w-resize        { cursor: w-resize; }
.ns-resize       { cursor: ns-resize; }
.ew-resize       { cursor: ew-resize; }
.ne-resize       { cursor: ne-resize; }
.nw-resize       { cursor: nw-resize; }
.se-resize       { cursor: se-resize; }
.sw-resize       { cursor: sw-resize; }
.nesw-resize     { cursor: nesw-resize; }
.nwse-resize     { cursor: nwse-resize; }
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
