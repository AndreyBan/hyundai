<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

[v-cloak] {
  display: none;
}

body {
  margin: 0;
  padding: 0;
}

/*#app {*/
/*  font-family: Roboto, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  margin-top: 60px;*/
/*}*/

.container {
  max-width: 1560px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}
label{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media only screen and (max-width: 1262px) {
  .container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 767px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
@media screen and (prefers-reduced-motion: reduce) {
  .btn {
     -webkit-transition: .2s !important;
     transition: .2s !important;
  }
}
</style>
