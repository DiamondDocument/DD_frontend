<template>
  <div class="login">
    <form class="login-form">
      <h1>登录</h1>
      <label><input v-model="id" type="text" placeholder="用户ID" class="id"></label>
      <label><input v-model="pwd" type="password" placeholder="密码" class="password"
                    @keyup.enter="login"></label>
      <button type="submit" @click="login">登录</button>
    </form>
  </div>
  <router-link to="/api/register">没有账号？点击注册</router-link>
</template>

<script>
import qs from "qs";
import {getCurrentInstance} from "vue";

export default {
  name: "Login",
  data() {
    return {
      id: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      getCurrentInstance().getUser();
      this.$axios({
        method: 'post',
        url: '/api/login',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          id: this.id,
          pwd: this.pwd
        })
      })
          .then(res => {              /* 获取后端response的status状态 */
            switch (res.data.status_code) {
              case 200:
                window.alert("登录成功！");
                /* 将后端返回的 user 信息存储起来 */
                this.$store.dispatch('saveUserInfo', {
                  user: {
                    'token': res.data.token,
                    'userId': res.data.id
                  }
                });
                break;
              case 401:
                window.alert("用户名不存在！");
                break;
              case 402:
                window.alert("密码错误！");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
      this.$getUser.getUser();
    }
  }
}
</script>

<style scoped>

</style>