<template>
  <p>欢迎页</p>
  <nav>
    <router-link to="/table">工作台</router-link> |
    <router-link to="/login">登录</router-link> |
    <router-link to="/register">注册</router-link>
  </nav>
  <router-view/>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
}
</script>
<style scoped>
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

