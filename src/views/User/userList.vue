<template>
  <div style="width: 80%; margin: 0 auto;">

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

    </el-row>
  </div>

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Invite.vue",

  data(){
    return {
      keyword: '',
      userList: [],
    }
  },
  methods: {

    goUser: function (userId){
      this.$router.push({name: 'userInvite', params:{userId: userId, teamId: this.teamId}});
    },
  },
  created() {
    this.keyword = this.$route.params.keyword;

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