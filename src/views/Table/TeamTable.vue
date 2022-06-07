<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../../assets/logo.png" style="width: 50px; height: 50px;">

      <div>
        <img src="#" style="padding: 0 10px 0 0">
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

          <el-menu-item index="2" @click="toMySpace">
            <el-icon><HomeFilled /></el-icon>
            <span slot="title">返回我的空间</span>

          </el-menu-item>

          <el-menu-item index="3">
            <el-divider content-position="center"><p v-if="!isCollapse">{{TeamName}}的空间</p></el-divider>
          </el-menu-item>

          <el-menu-item index="4" >
            <el-icon><house /></el-icon>
            <span slot="title">团队空间</span>
          </el-menu-item>

          <el-menu-item index="5" >
            <el-icon><opportunity /></el-icon>
            <span slot="title">团队详情</span>
          </el-menu-item>

          <el-menu-item index="6" >
            <el-icon><delete /></el-icon>
            <span slot="title">回收站</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
        <el-main>
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
  name: 'TeamTable',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      TeamId: '',
      TeamName: '',
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
    this.TeamId = this.$store.state.tableId;
    this.$axios.get("/team/information", {
      params:{
        teamId: this.TeamId,
      }
    }).then((response)=>{
      if (response.status === 200){
        if (response.data.code === 0){
          this.TeamName = response.data.name;
        }else ElMessage("团队信息获取错误");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
  }
}


</script>