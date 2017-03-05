<template>
  <div id="app">
    <my-header></my-header>
    <div id="content">
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'
export default {
  name: 'app',
  components: {
    MyFooter: Footer,
    MyHeader: Header
  },

}
</script>

<style type="text/css" lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  #content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
