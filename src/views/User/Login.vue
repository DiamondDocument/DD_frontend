<template>
  <div class="login">
    <form class="login-form">
      <h1>登录</h1>
      <label><input v-model="userId" type="text" placeholder="用户ID" class="id"></label>
      <label><input v-model="pwd" type="password" placeholder="密码" class="password"
                    @keyup.enter="login"></label>
      <button type="submit" @click="login">登录</button>
    </form>
  </div>
  <router-link to="/register">没有账号？点击注册</router-link>
</template>

<script>
import qs from "qs";
import { getCurrentInstance } from 'vue'

export default {
  name: "Login",
  data() {
    return {
      userId: '',
      pwd: ''
    }
  },
  methods: {
    login: function () {

      this.$axios({
        method: 'post',
        url: '/api/login',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          pwd: this.pwd
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.status_code) {
              case 0:
                this.$message.success("登录成功！");
                /* 将后端返回的 user 信息存储起来 */
                this.$store.dispatch('saveUserInfo', {
                  user: {
                    'userId': this.userId,
                    'pwd': this.pwd,
                    'nickName': res.data.nickName,
                    'online':true
                  }
                });
                const internalInstance = getCurrentInstance();
                internalInstance.appContext.config.globalProperties.$userId = res.data.username;//用户ID
                break;
              case 1:
                this.$message.error("用户名不存在！");
                break;
              case 2:
                this.$message.error("密码错误！");
                break;
              default:
                this.$message.error("其他错误！");
                break;
            }

          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    }
  }
}
</script>

<style scoped>

</style>