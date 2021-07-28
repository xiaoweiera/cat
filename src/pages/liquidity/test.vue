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
  <div class="cursors">
    <div class="auto">auto</div>
    <div class="default">default</div>
    <div class="none">none</div>
    <div class="context-menu">context-menu</div>
    <div class="help">help</div>
    <div class="pointer">pointer</div>
    <div class="progress">progress</div>
    <div class="wait">wait</div>
    <div class="cell">cell</div>
    <div class="crosshair">crosshair</div>
    <div class="text">text</div>
    <div class="vertical-text">vertical-text</div>
    <div class="alias">alias</div>
    <div class="copy">copy</div>
    <div class="move">move</div>
    <div class="no-drop">no-drop</div>
    <div class="not-allowed">not-allowed</div>
    <div class="all-scroll">all-scroll</div>
    <div class="col-resize">col-resize</div>
    <div class="row-resize">row-resize</div>
    <div class="n-resize">n-resize</div>
    <div class="s-resize">s-resize</div>
    <div class="e-resize">e-resize</div>
    <div class="w-resize">w-resize</div>
    <div class="ns-resize">ns-resize</div>
    <div class="ew-resize">ew-resize</div>
    <div class="ne-resize">ne-resize</div>
    <div class="nw-resize">nw-resize</div>
    <div class="se-resize">se-resize</div>
    <div class="sw-resize">sw-resize</div>
    <div class="nesw-resize">nesw-resize</div>
    <div class="nwse-resize">nwse-resize</div>
  </div>
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
