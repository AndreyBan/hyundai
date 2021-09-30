<template>
  <div id="app">
    <MainPageCars/>
  </div>
</template>

<script>
import MainPageCars from './components/MainPageCars'

export default {
  name: 'App',
  components: {
    MainPageCars
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

[v-cloak] {
  display: none;
}

body {
  margin: 0;
  padding: 0;
}
</style>
