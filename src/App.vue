<template>
  <div id="app">
    <YohuHead></YohuHead> 
    <router-view/>
     <bottom></bottom> 
  </div>
</template>

<script>
import Bottom from './commonModule/bottom'
import YohuHead from './components/YohuHead/header'
export default {
  name: 'App',
  components: {
    YohuHead,
    Bottom,
    
  }
}
</script>

<style>
  @import './style/main.scss'; 

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
