<template>
  <el-scrollbar height="100%">
    <div style="width: 1000px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
      <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',  }">
        <div style="height: 30px"></div>
        <el-page-header content="用户搜索结果..." @back="this.$router.back()" />
        <el-divider/>
        <div style="width: 80%; margin: 0 auto;min-height: 500px">
          <div v-for="(user, index) in userList" :key="user.userId"
               style="margin: 10px 0;border-style: solid;border-width: 1px;
                border-color: lightgray;border-radius: 5px;height: 100px;  display: flex;">
            <div style=";margin: auto 20px;">
              <el-avatar :size="50"  class="teamImg" >
                <template #default>
                  <el-avatar :size="48" :src="user.url" fit="cover"/>
                </template>
              </el-avatar>
            </div>
            <div style="height: 100px">
              <div style="display: flex;height: 40px">
                <div style="font-size: 20px;line-height: 20px;margin: auto 10px 0 0;">{{user.nickName}}</div>
                <p style="font-size: 15px;line-height: 20px;margin: auto 0 0 0;color: #4d4d4d">{{user.userId}}</p>
              </div>
              <p style="margin-bottom: 20px">{{user.intro}}</p>
            </div>
            <div style="margin: auto 20px auto auto">
              <el-button type="primary" @click="goUser(user.userId)">查看信息</el-button>
            </div>
          </div>
        </div>

      </el-card>
    </div>
  </el-scrollbar>




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
  margin: 10px 0;
  /*padding: 10px;*/
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
  height: 100px;
  display: flex;
}
</style>