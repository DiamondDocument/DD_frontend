<template>




  <div style="width: 75%;margin-left: auto;margin-right: auto;margin-top: 30px;">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 20px ',backgroundColor: '#F7F7F7'  }" >
      <div>
        <div style="
         width: 600px;
         text-align: center;
         margin: 40px auto;">
          <el-icon size="30px"><Aim /></el-icon>
          <h2>邀请成员到你的团队{{teamName}}中</h2>
        </div>
        <el-input placeholder="请输入用户昵称"
                  @keyup.enter="search"
                  size="large"
                  v-model="keyword"
                  style="
              margin-bottom: 20px">
          <template #prepend>
            <el-icon><Avatar /></el-icon>
          </template>
          <template #append>
            <el-button type="primary" @click="search">
              搜索
            </el-button>
          </template>
        </el-input>

        <div v-for="(user, index) in userList" :key="user.userId"
             style="margin: 10px auto;border-style: solid;border-width: 1px;
             width: 80%;
          border-color: lightgray;border-radius: 5px;height: 100px;  display: flex;">

          <div style=";margin: auto 20px;" @click="goUser(user.userId)">
            <el-avatar :size="50"  class="teamImg" >
              <template #default>
                <el-avatar :size="48" :src="user.url" fit="cover"/>
              </template>
            </el-avatar>
          </div>
          <div style="height: 100px" @click="goUser(user.userId)">
            <div style="display: flex;height: 40px">
              <div style="font-size: 20px;line-height: 20px;margin: auto 10px 0 0;">{{user.nickName}}</div>
              <p style="font-size: 15px;line-height: 20px;margin: auto 0 0 0;color: #4d4d4d">{{user.userId}}</p>
            </div>
            <p style="margin-bottom: 20px">{{user.intro}}</p>
          </div>
          <div style="margin: auto 20px auto auto">
            <el-button type="success" @click="inviteUser(user.userId)">邀请</el-button>
          </div>
        </div>

      </div>
    </el-card>
  </div>






</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Invite.vue",

  data(){
    return {
      teamId: '',
      teamName: '',
      keyword: '',
      userList: [],
    }
  },
  methods: {
    inviteUser: function (userId){
      this.$axios.post("team/invite",
          {
            "teamId" : this.teamId,
            "userId" : userId
          }).then((res)=>{
        if (res.status === 200){
          if (res.data.code === 0) ElMessage("邀请发送成功！");
          else if (res.data.code === 1) ElMessage("团队不存在！");
          else if (res.data.code === 2) ElMessage("用户不存在！");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })
    },

    goUser: function (userId){
      this.$router.push({name: 'userInvite', params:{userId: userId, teamId: this.teamId}});
    },
    search: function (){
      this.$router.push({name: 'block', params: {
          option: '1',
          keyword: this.keyword,
          teamId: this.teamId
      }});
    },
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.teamId = this.$route.params.teamId;
    this.$axios.get("team/information", {
      params:{
        teamId: this.teamId
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.teamName = response.data.name;
        }else if(response.data.code === 1) ElMessage("团队不存在！")
        else ElMessage("系统错误！")
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });

    if (this.keyword === '') return;

    this.$axios.get("search/user", {
      params:{
        key: this.keyword,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.userList = response.data.users;
        } else ElMessage("系统错误！")
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
  }
}
</script>

<style scoped>
.block {
  margin-bottom: 10px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>