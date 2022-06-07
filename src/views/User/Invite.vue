<template>
  <div style="
      text-align: center;
      border-style: solid;
      border-width: 1px;
      border-color: lightgray;
      border-radius: 5px;
      margin: 0 auto;
      width: 300px;">

      <el-avatar
          style="margin-top: 30px;"
          :size="150"
          :src="url"/>
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
    <el-divider/>
      <span>
        是否邀请该用户?
      </span>
    <el-divider/>

    <div style="width: 250px;
    height: 50px;
    text-align: center;
    margin: 0 auto">
      <el-button type="success" @click="invite">
        发送邀请
      </el-button>
    </div>

  </div>
</template>


<script>
import {ElMessage} from "element-plus";

export default {
  name: "Invite.vue",

  data(){
    return {
      url: '',
      userId: '',
      nickName: '',
      email: '',
      flag: false,
      introduction: '',
    }
  },
  methods: {

    isMaster: function (){
      console.log('check is master');
      return this.axios.get("team/team-status",{
        params:{
          teamId: this.teamId,
          userId: this.$store.state.loginUser.userId,
          // userId: 'admin',
        }
      }).then(res => {
        console.log('userType data =  ');
        console.log(res.data);
        if (res.status === 200){
          if (res.data.status === 0) {
            this.flag = true;
          }
        }else console.log('status is not 200!');
      }).catch(err => {
        console.log(err);
      })
    },

    sendInvite: function (){
      console.log('sendInvite is called!');
      this.$axios.post("team/invite",
          {
            "teamId" : this.teamId,
            "userId" : this.userId,
          }).then((res)=>{
        if (res.status === 200){
          if (res.data.code === 0) ElMessage("邀请发送成功！");
          else if (res.data.code === 3) ElMessage("邀请已经发送");
          else if (res.data.code === 4) ElMessage('该用户已在团队中');
          else  console.log('code = ' + res.data.code);
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })
    },

    async invite(){
      await this.isMaster();
      if (!this.flag){
        ElMessage('你不是该团队队长');
        return
      }
      await this.sendInvite();
    },

    getUserInformation: function () {
      this.$axios.get("user/information", {
        params: {
          userId: this.userId,
        }
      }).then((response) => {
        if (response.status === 200) {
          console.log('user data');
          console.log(response.data);
          if (response.data.code === 0) {
            this.nickName = response.data.nickName;
            this.email = response.data.email;
            this.introduction = response.data.introduction;
          } else if (response.data.code === 1) console.log('用户不存在')
          else console.log("用户信息获取错误");
        } else console.log("请求返回status不为200")
      }).catch((err) => {
        console.log(err);
      });

      this.$axios.get("user/get-avatar", {
        params: {
          userId: this.userId,
        }
      }).then((response) => {
        if (response.status === 200) {
          console.log('get User avatar = ')
          console.log(response.data)
          if (response.data.code === 0) {
            this.url = response.data.url;
          } else console.log("用户头像获取错误");
        } else console.log("请求返回status不为200")
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  created() {
    this.userId = this.$route.params.userId;
    this.teamId = this.$route.params.teamId;
    this.getUserInformation();
  }
}
</script>

<style scoped>

</style>