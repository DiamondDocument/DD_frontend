<template>

  <nav>
    <router-link to="/">主页</router-link> |
    <router-link to="/login">登录</router-link> |
    <router-link to="/register">注册</router-link>
    <button v-on:click="goLogin" > 登录</button>
  </nav>
  <router-view/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    goLogin(){
      this.$router.resolve({path:"/Login"});
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
  background-color: silver;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
