<template>
  <div id="app">
    <div style="font-size: large; color: white; margin-top: 15px">Sohan's Chromatic Tuner</div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  // background-image: linear-gradient(#d62e90, #d792dd);
  background-image: linear-gradient(#2e0d20, #372638);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
