<template>
  <div class="register">
    <form class="register-form">
      <h1>注册</h1>
      <label><input v-model="userId" type="text" placeholder="用户ID" class="id"></label>
      <label><input v-model="pwd" type="password" placeholder="密码" class="password"></label>
      <label><input v-model="email" type="text" placeholder="邮箱地址 选填" class="email"></label>
      <label><input v-model="nickname" type="text" placeholder="昵称 选填" class="nickname"></label>
      <button type="submit" @click="register">注册</button>
    </form>
  </div>
  <router-link to="/api/login">已有账号？点击登录</router-link>
</template>

<script>
import qs from "qs";

export default {
  name: "Register",
  data() {
    return {
      userId: '',
      pwd: '',
      email: '',
      nickname: ''
    }
  },
  methods: {
    register: function () {
      this.$axios({
        method: 'post',
        url: '/api/register',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          pwd: this.pwd,
          email: this.email,
          nickname: this.nickname,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.status_code) {
              case 0:
                this.$message.success("注册成功！");
                break;
              case 1:
                this.$message.error("密码格式错误！");
                break;
              case 2:
                this.$message.error("用户ID已存在！");
                break;
              case 3:
                this.$message.error("邮箱不合规范！");
                break;
              case 4:
                this.$message.error("用户昵称不合规范！");
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