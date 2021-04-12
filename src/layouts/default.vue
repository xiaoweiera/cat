<template >
  <div class="yuanDiv">
    <img
        class="img-responsive abBgLeft"
        src="https://res.ikingdata.com/nav/yuanLeft.png"
        alt=""
    />
    <img
        class="img-responsive abBgRight"
        src="https://res.ikingdata.com/nav/yuanRight.png"
        alt=""
    />
  </div>
  <div class=" bg-opacity-80 containerbgs   md:bg-global-body md:bg-opacity-100">
  <Nav class="relative "></Nav>
  <main class="  w-full   flex justify-center  ">
    <router-view/>
    <Footer/>
  </main>
  </div>
</template>
<style>
.yuanDiv {
  position: fixed;
  width: 100%;
  z-index:1 ;
}
.containerbgs{
  background-color: white;
  background-image: url("https://res.ikingdata.com/nav/kongtouBg.png");
}

.rightCom {
  display: flex;
}

.abBgLeft {
  position: absolute;
  float: left;
  z-index: -11;
}

.abBgRight {
  position: absolute;
  float: right;
  z-index: -11;
}

</style>

