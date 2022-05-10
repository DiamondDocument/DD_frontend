//主要职责：用户进入网站时，App判断用户cookie来判断是否登录，如果登录直接跳转到工作台，如果没有则进入欢迎界面
<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$router.push("/welcome");
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
