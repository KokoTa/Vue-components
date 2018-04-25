<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>KokoTaのVue组件库</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  overflow: hidden;
  background: pink;
  & #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
  }
}
</style>
