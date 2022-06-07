<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../../assets/logo2.png" style="width: 50px; height: 50px;">

      <div>
        <el-avatar :src="avatar" style="width: 40px; height: 40px "/>
        <el-icon @click="this.$router.push('/message')"><MessageBox /></el-icon>

      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: auto">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item index="1">
            <el-icon v-if="!isCollapse" @click="isCollapse=!isCollapse" style="float: right; "><DArrowLeft /></el-icon>
            <el-icon v-else @click="isCollapse=!isCollapse" style="float: right;"><DArrowRight /></el-icon>
          </el-menu-item>

          <el-menu-item index="2" @click="this.$router.push({path: '/table/my'})">
            <el-icon><HomeFilled /></el-icon>
            <span slot="title">返回我的空间</span>

          </el-menu-item>

          <el-menu-item index="3">
            <el-divider content-position="center"><p v-if="!isCollapse">{{ TeamName }}</p></el-divider>
          </el-menu-item>

          <el-menu-item index="4" @click="this.$router.push({name: 'space'})">
            <el-icon><house /></el-icon>
            <span slot="title">团队空间</span>
          </el-menu-item>

          <el-menu-item index="5" >
            <el-icon><opportunity /></el-icon>
            <span slot="title" @click="this.$router.push({name: 'team', params: {teamId: this.TeamId}})">团队详情</span>
          </el-menu-item>

          <el-menu-item index="6" @click="this.$router.push({name: 'recycle'})">
            <el-icon><delete /></el-icon>
            <span slot="title">回收站</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
        <el-main style="height: 695px">
          <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>


</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
Aside {

  background-color: white;

}

.Header {
  background-color: #B3C0D1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 40px;
}
a {
  text-decoration: none;
}
</style>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100vh;
  align-items: center;
}
</style>


<script>
import Space from "@/views/Space/Space";
import Message from "@/views/Message/Message";
import {ElMessage} from "element-plus";

export default {
  name: 'TeamTable',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      userId: '',
      TeamId: '',
      TeamName: '',
      avatar: '',
    }
  },
  components: {
    Space,
    Message
  },
  methods: {
    toMessage() {
      this.type = 'message';
    },
    toMySpace() {

    },
    toMyCollection() {
      this.type='collection'
    },
    toBin() {
      this.type='bin'
    },
    toRecent() {
      this.type='recent'
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.userId = this.$store.state.loginUser.userId;
    this.TeamId = this.$store.state.tableId;

    this.$axios.get("/team/information", {
      params:{
        teamId: this.TeamId,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.TeamName = response.data.name;
        }else console.log("团队信息获取错误");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });

    this.$axios.get("/user/get-avatar", {
      params:{
        userId: this.userId,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.avatar = response.data.url;
        }else console.log("头像获取错误");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
  }
}


</script>