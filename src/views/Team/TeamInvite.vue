<template>
  <div style="width: 80%; margin: 0 auto;">

    <div style="
         width: 600px;
         text-align: center;
         margin: 40px auto;">
      <el-icon size="30px"><Aim /></el-icon>
      <h2>邀请成员到你的团队{{teamName}}中</h2>
    </div>
    <el-input placeholder="请输入用户昵称"
              @keyup.enter="search"
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

    <el-row v-for="(user, index) in userList" :key="user.userId"
            class="block">
      <div @click="goUser(user.userId)"
           style="float: right; width: 80%">
        <el-avatar :src="user.url" style="margin: 10px; float: left" />
        <h3 >
          {{user.nickName}}
        </h3>
        <p >
          {{user.intro}}
        </p>
      </div>

      <el-button type="success"
                 @click.stop="inviteUser(user.userId)"
                 style="
                 float: right;
                 margin: auto 20px;">
        邀请
      </el-button>

    </el-row>
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