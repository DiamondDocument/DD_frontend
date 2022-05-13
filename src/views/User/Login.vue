<template>
  <div class="login">
    <div style="margin:20px auto; width: 80px; ">
      <img src="../../assets/logo.png" alt="logo"> <br>
      <h2 class="title" style="margin:0 auto">登录</h2>
    </div>
    <br>
    <div class="Wireframe">

      <el-form
        label-position= "top"
        label-width="100px"
        style="max-width: 460px"
        >

        <el-form-item label="用户名">
          <el-input v-model="userId" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="pwd" type="password" class="password" @keyup.enter="login" />
        </el-form-item>

      </el-form>

<!--      <button type="submit" @click="login">登录</button>-->
      <el-button type="success" @click="login">登录</el-button>
    </div>
  </div>

  <br>
  <div class="Wireframe">
    <router-link to="">忘记密码？</router-link>
    &nbsp;
    <router-link to="/register">没有账号？点击注册</router-link>
  </div>

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
img {
  width: 80px;
}
.title {
  font-size: 25px;
  text-align: center;
}
.Wireframe {
  margin: 0 auto;
  width: 400px;
  border-style:solid;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
}
</style>