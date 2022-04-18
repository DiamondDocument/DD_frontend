<template>
  <div class="login">
    <form class="login-form">
      <h1>登录</h1>
      <label><input v-model="id" type="text" placeholder="Id" class="id"></label>
      <label><input v-model="pwd" type="password" placeholder="Password" class="password"></label>
      <button type="submit" @click="click_login">登录</button>
    </form>
  </div>
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