<template >
  <div class="login">

    <div style="margin:20px auto; width: 80px; ">
      <img src="../../assets/logo2.png" alt="logo" style="margin: 0 auto;"> <br>
      <h2 class="title" style="margin:0 auto">登录</h2>
    </div>
    <br>
    <div class="Wireframe">
      <el-tabs :model-value="activeName" class="demo-tabs" stretch="true" @tab-click="handleClick">
        <el-tab-pane label="用户名登录" name="first">

          <el-form
              label-position= "top"
              label-width="100px"
              style="max-width: 460px"
          >

            <el-form-item label="用户名">
              <el-input v-model="userId" />
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="pwd" type="password" class="password" @keyup.enter="loginByName" />
            </el-form-item>

          </el-form>
          <!--      <button type="submit" @click="login">登录</button>-->
          <el-button type="success" @click="loginByName">登录</el-button>

        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">

          <el-form
              label-position= "top"
              label-width="100px"
              style="max-width: 460px"
          >

            <el-form-item label="邮箱">
              <el-input v-model="email" />
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="pwd" type="password" class="password" @keyup.enter="loginByEmail" />
            </el-form-item>

          </el-form>

          <!--      <button type="submit" @click="login">登录</button>-->
          <el-button type="success" @click="loginByEmail">登录</el-button>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <br>
  <div class="Wireframe">
    <router-link to="">忘记密码？</router-link>
    &nbsp
    <router-link to="/register">没有账号？点击注册</router-link>
  </div>

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      userId: '',
      email: '',
      pwd: '',
      activeName: 'first',
      loginBg: 'url(' + require('../../assets/bk.jpg') + ')'
    }
  },
  mounted() {
    document.body.style.backgroundSize = '100%'
    document.body.style.backgroundImage = this.loginBg
  },
  methods: {
    handleClick: function (){
      this.userId = '';
      this.pwd = '';
      this.email = '';
    },
    // 需要具体分密码错误 or 用户名不存在？

    loginByName: function () {
      this.$axios.get("/api/user/login", {
        params:{
          userId: this.userId,
          pwd: this.pwd,
        }
      }).then((response)=>{
        if (response.status === 200){
          switch (response.data.code) {
            case 0:
              this.$store.commit({type: 'login', userId: response.data.name, nickname: response.data.nickname})
              ElMessage('登录成功');
              break
            case 1:
              ElMessage('用户名或邮箱不存在');
              break;
            case 2:
              ElMessage('密码错误');
              break;
            default:
              ElMessage('其他错误');
              break;
          }
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    },

    loginByEmail: function () {
      this.$axios.get("/api/user/login", {
        params:{
          email: this.email,
          pwd: this.pwd,
        }
      }).then((response)=>{
        if (response.status === 200){
          switch (response.data.code) {
            case 0:
              this.$store.commit({type: 'login', userId: response.data.name, nickname: response.data.nickname})
              ElMessage('登录成功');
              break
            case 1:
              ElMessage('用户名或邮箱不存在');
              break;
            case 2:
              ElMessage('密码错误');
              break;
            default:
              ElMessage('其他错误');
              break;
          }
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
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