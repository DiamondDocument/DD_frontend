<template>
  <div>
    <div v-if="isOwner">
      <el-tabs type="border-card" @tab-click="clean">
        <el-tab-pane label="个人信息">

          <el-avatar :size="200" :src="circleUrl" style="float: left; " @click="changeImg"/>
          <el-form
              label-position="Right"
              label-width="100px"
              style="
              max-width: 300px;
              margin: 20px;
        ">
            <el-form-item label="用户名：">
              {{ userId }}
            </el-form-item>

            <el-form-item label="用户昵称：">
              {{ nickName }}
            </el-form-item>

            <el-form-item label="邮箱：">
              {{ email }}
            </el-form-item>

            <el-form-item label="用户简介：">
              {{ introduction }}
            </el-form-item>
          </el-form>

        </el-tab-pane>

        <!--      切换清空 邮箱 密码 时无法消除错误提示    -->


        <el-tab-pane label="修改信息">
          <el-form
              label-position="Right"
              label-width="100px"
              style="max-width: 460px"
          >
            <el-form-item label="用户昵称：">
              <el-input type="text"
                        style="margin-bottom: 10px"
                        v-model="c_nickName"
                        @blur="changeNickname"/>
            </el-form-item>

            <el-form-item label="用户简介：">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                        style="margin-bottom: 10px"
                        @blur="changeIntroduction"
                        v-model="c_introduction"
              />
            </el-form-item>

            <el-form-item label="邮箱：">
              <el-input type="text"
                        style="margin-bottom: 10px"
                        v-model="c_email"
                        @blur="checkEmail">
                <template #append>
                  <el-button  @click="sendCode" :disabled="!(emailCheckRes === 0)">发送验证码</el-button>
                </template>
              </el-input>
              <p v-if="emailCheckRes === 1" style="
               font-size: 12px;
               color: red;
          ">
                邮箱格式错误
              </p>
            </el-form-item>

            <el-form-item label="验证码">
              <el-input type="text"
                        v-model="c_code"
                        style="
                      width: 200px;
                      float: left ;"/>
              &nbsp;
              <el-button type="success" @click="changeEmail" style="float: right" >修改邮箱</el-button>
            </el-form-item>

          </el-form>
        </el-tab-pane>


        <el-tab-pane label="修改密码">
          <el-form
              label-position="Right"
              label-width="100px"
              style="max-width: 460px"
          >
            <el-form-item label="原密码：">
              <el-input v-model="oldPwd" type="password"/>
            </el-form-item>

            <el-form-item label="新密码：">
              <el-input v-model="newPwd" type="password" @blur="checkPwd"/>
              <p v-if="(pwdCheckRes === 1 || pwdCheckRes === 2)" style="
               font-size: 12px;
               color: red;
            ">
                密码只能由6-20个数字，英文字母或下划线组成
              </p>
            </el-form-item>



            <el-form-item label="确认密码：">
              <el-input v-model="confirm" type="password" />
            </el-form-item>

            <div style="margin-left: 200px;">
              <el-button type="success" @click="changePwd">
                提交修改
              </el-button>
            </div>

          </el-form>
        </el-tab-pane>

      </el-tabs>
    </div>

    <div v-if="!isOwner">
      <el-avatar :size="200" :src="circleUrl" style="float: left; " @click="changeImg"/>
      <el-form
          label-position="Right"
          label-width="100px"
          style="
              max-width: 300px;
              margin: 20px;
        ">
        <el-form-item label="用户名：">
          {{ userId }}
        </el-form-item>

        <el-form-item label="用户昵称：">
          {{ nickName }}
        </el-form-item>

        <el-form-item label="邮箱：">
          {{ email }}
        </el-form-item>

        <el-form-item label="用户简介：">
          {{ introduction }}
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import qs from "qs";
import {ElMessage} from "element-plus";

export default {

  name: "Information",
  data(){
    return {
      isOwner: true,
      userId: '',
      nickName: '',
      email: '',
      introduction: '',
      c_nickName: '',
      c_email: '',
      c_introduction: '',
      c_code: '',
      identifyingCode: '',
      oldPwd: '',
      newPwd: '',
      confirm: '',
      emailCheckRes: -1,
      pwdCheckRes: -1,
      pwdJudge: /^\w+$/,
      emailJudge: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    }
  },
  methods: {
    clean: function (){
      this.c_nickName = '';
      this.c_introduction = '';
      this.c_email = '';
      this.c_code = '';
      this.newPwd = '';
      this.oldPwd = '';
    },

    checkEmail: function (){    //检查邮箱格式
      if (this.c_email === ''){
        this.emailCheckRes = -1;
        return;
      }
      if (this.emailJudge.test(this.c_email)) this.emailCheckRes = 0;
      else this.emailCheckRes = 1;
    },

    checkPwd: function (){
      if (this.newPwd === ''){
        this.pwdCheckRes = -1;
        return;
      }
      if (this.newPwd.length < 6 || this.newPwd.length > 20){
        this.pwdCheckRes = 2;
        return;
      }
      if (this.pwdJudge.test(this.newPwd)) this.pwdCheckRes = 0;
      else  this.pwdCheckRes = 1;
    },

    // changeImg 未完成
    changeImg: function (){

    },

    changeNickname: function (){
      this.$axios({
        method: 'post',
        url: '/api/user/modify/nickname',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          newNick: this.c_nickName,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.code) {
              case 0:
                ElMessage('修改密码成功');
                break;
              case 1:
                ElMessage('用户不存在');
                break;
              default:
                ElMessage('其他错误!');
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },

    changeIntroduction: function (){
      this.$axios({
        method: 'post',
        url: '/api/user/modify/introduction',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          newIntro: this.c_introduction,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.code) {
              case 0:
                ElMessage('修改密码成功');
                break;
              case 1:
                ElMessage('用户不存在');
                break;
              default:
                ElMessage('其他错误!');
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },

    changeEmail: function (){
      if (!(this.c_code === this.identifyingCode)){
        ElMessage('验证码错误');
        return;
      }
      this.$axios({
        method: 'post',
        url: '/api/user/modify/email',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          newEmail: this.c_email,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.code) {
              case 0:
                ElMessage('修改密码成功');
                break;
              case 1:
                ElMessage('用户不存在');
                break;
              default:
                ElMessage('其他错误!');
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },

    sendCode: function (){
      this.$axios({
        method: 'get',
        url: '/api/user/send-identifying',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          email: this.c_email
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.code) {
              case 0:
                this.identifyingCode = res.data.identifyingCode;
                ElMessage('发送验证码成功');
                break;
              case 1:
                ElMessage('发送验证码失败,请检查邮箱是否正确');
                break;
              default:
                ElMessage('其他错误!');
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },

    changePwd :function (){
      if (!(this.newPwd === this.confirm)){
        ElMessage('两次输入密码不同');
        return;
      }
      this.$axios({
        method: 'post',
        url: '/api/user/modify/password',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.userId,
          newPwd: this.newPwd,
          oldPwd: this.oldPwd,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.code) {
              case 0:
                ElMessage('修改密码成功');
                break;
              case 1:
                ElMessage('原密码错误');
                break;
              default:
                ElMessage('其他错误!');
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
  },

  //  获取头像的操作未完成
  created() {
    // 判断是否是浏览他人主页
    // this.isOwner = (this.$route.params.userId === this.$store.getUser().user.userId)

    this.$axios({
      method: 'get',
      url: '/api/user/information',
      data: qs.stringify({      /* 将 json 数据序列化发送后端 */
        userId: this.$route.params.userId,
      })
    })
        .then(res => {              /* 获取后端response */
          switch (res.data.code) {
            case 0:
              this.userId = this.$route.params.userId;
              this.nickName = res.data.nickName;
              this.email = res.data.email;
              this.introduction = res.data.introduction;
              break;
            case 1:
              ElMessage("用户不存在！");
              break;
            default:
              ElMessage('其他错误！')
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })

  }
}
</script>

<style scoped>

</style>