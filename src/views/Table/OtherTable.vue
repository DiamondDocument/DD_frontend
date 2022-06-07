<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../../assets/logo2.png" style="width: 50px; height: 50px;">

      <div>
        <el-avatar :src="avatar" style="width: 40px; height: 40px; "/>
        <el-icon @click="toMessage" ><MessageBox /></el-icon>

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
            <el-divider content-position="center"><p v-if="!isCollapse">{{ Name }}</p></el-divider>
          </el-menu-item>

          <el-menu-item index="4" @click="this.$router.push({name: 'space'})">
            <el-icon><house /></el-icon>
            <span slot="title">Ta的空间</span>
          </el-menu-item>

          <el-menu-item index="5" @click="this.$router.push({name: 'collection'})">
            <el-icon><opportunity /></el-icon>
            <span slot="title">Ta的收藏</span>
          </el-menu-item>

          <el-menu-item index="6" @click="this.$router.push({name: 'teamList'})">
            <el-icon><user-filled /></el-icon>
            <span slot="title">Ta的团队</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main style="padding: 0px">
        <router-view></router-view>
      </el-main>
<!--      <el-main class="Main" width="100%" v-if="type==='recent'" style="padding: 0; height: 100%">-->
<!--        <space :spaceType="0"></space>-->
<!--      </el-main>-->
<!--      <el-main class="Main" width="100%" v-if="type==='mySpace'" style="padding: 0; height: 100%">-->
<!--        <space :spaceType="1"></space>-->
<!--      </el-main>-->
<!--      <el-main class="Main" width="100%" v-else-if="type==='collection'" style="padding: 0; height: 100%">-->
<!--        <space :spaceType="2"></space>-->
<!--      </el-main>-->
<!--      <el-main class="Main" width="100%" v-else-if="type==='bin'" style="padding: 0; height: 100%">-->
<!--        <space :spaceType="3"></space>-->
<!--      </el-main>-->
<!--      <el-main class="Main" width="100%" v-else-if="type==='message'" style="padding: 0; height: 900px">-->
<!--        <message></message>-->
<!--      </el-main>-->
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
.Main {
  background-color: azure;
  /*background: url("../assets/logo.png") ;*/
  /*background-size: 100% 100%;*/
}
.el-Main {

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
  name: 'OtherTable',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      userId: '',
      otherId: '',
      Name: '',
      avatar: ''
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
      this.info = '/table/my';
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
    this.otherId = this.TeamId = this.$store.state.tableId;
    console.log(this.otherId);

    this.$axios.get("/user/information", {
      params:{
        userId: this.otherId,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.Name = response.data.nickName;
        }else ElMessage("个人信息获取错误");
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
        }else ElMessage("头像获取错误");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
  }
}


</script>