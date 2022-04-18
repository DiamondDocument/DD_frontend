<template>
  <div class="login">
    <form class="login-form">
      <h1>登录</h1>
      <label><input v-model="id" type="text" placeholder="用户ID" class="id"></label>
      <label><input v-model="pwd" type="password" placeholder="密码" class="password"></label>
      <button type="submit" @click="click_login">登录</button>
    </form>
  </div>
  <router-link to="/api/register">没有账号？点击注册</router-link>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      id: '',
      pwd: ''
    }
  },
  methods: {
    click_login() {
      window.alert("欢迎， " + this.id);
    }
  }
}
</script>

<style scoped>

</style>