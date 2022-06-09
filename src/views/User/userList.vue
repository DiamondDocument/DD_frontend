<template>
  <div style="width: 1000px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',  }">
      <div style="height: 30px"></div>
      <el-page-header content="用户搜索结果..." @back="this.$router.back()" />
      <el-divider/>
      <div style="width: 80%; margin: 0 auto;min-height: 500px">
        <el-row v-for="(user, index) in userList" :key="user.userId"
                class="block">
          <el-avatar :src="user.url" style="margin: 10px; float: left" />
          <div
              style="float: right; width: 80%;margin-top: auto;margin-bottom: auto;">
            <div style="display: flex">
              <h3 >{{user.nickName}}</h3>
              <p style="margin-left: 10px;line-height: 25px; color: #4d4d4d">{{user.userId}}</p>
            </div>
            <p >{{user.intro}}</p>
          </div>
          <div style="margin: auto 0">
            <el-button @click="goUser(user.userId)">查看信息</el-button>
          </div>
        </el-row>

      </div>

    </el-card>
  </div>



</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "userList.vue",
  // props: ['keyword'],
  data(){
    return {
      userList: [],
    }
  },
  methods: {

    goUser: function (userId){
      this.$router.push({name: 'userInformation', params:{userId: userId}});
    },
    search() {
      // this.keyword = this.$route.params.keyword;
      console.log('keyword = ');
      console.log(this.keyword);
      this.$axios.get("search/user", {
        params:{
          // key: this.keyword,
          key: this.$route.params.keyword,
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log('search data = ');
          console.log(response.data);
          if (response.data.code === 0){
            this.userList = response.data.users;
          } else ElMessage("系统错误！")
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    },
  },
  created() {
    this.search();
  },
  updated() {
    this.search();
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