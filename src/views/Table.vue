<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../assets/logo.png" style="width: 50px; height: 50px;">

      <div>
        <a href="#" style="padding: 0 10px 0 0">头像</a>
        <el-icon @click="toMessage"><MessageBox /></el-icon>

      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: auto">

<!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">-->
<!--            <el-radio-button :label="false">expand</el-radio-button>-->
<!--            <el-radio-button :label="true">collapse</el-radio-button>-->

<!--          <el-button :label="false" @click="isCollapse=!isCollapse" type="primary" icon="el-icon-s-unfold"><el-icon><expand /></el-icon></el-button>-->
<!--        </el-radio-group>-->

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

          <el-menu-item index="1">
            <el-icon v-if="!isCollapse" @click="isCollapse=!isCollapse" style="float: right; "><DArrowLeft /></el-icon>
            <el-icon v-else @click="isCollapse=!isCollapse" style="float: right;"><DArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><clock /></el-icon>
            <span slot="title"><router-link to="/table">最近浏览</router-link></span>
          </el-menu-item>
          <el-menu-item index="3" @click="toMySpace">
            <el-icon><house /></el-icon>
            <span slot="title">我的空间</span>
          </el-menu-item>
<<<<<<< HEAD
          <el-menu-item index="4">
=======
          <el-menu-item index="3" @click="toMyCollection">
>>>>>>> 88771980e51271b2c59f97a1407a3c7eba7d5d55
            <el-icon><opportunity /></el-icon>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><user-filled /></el-icon>
            <span slot="title">我的团队</span>
          </el-menu-item>

          <el-sub-menu index="6">
          <template #title>
            <el-icon><tickets /></el-icon>
            <span>模板</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">推荐模板</el-menu-item>
            <el-menu-item index="1-2">我的模板</el-menu-item>
            <el-menu-item index="1-3">收藏模板</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

<<<<<<< HEAD
          <el-menu-item index="7">
=======
          <el-menu-item index="6" @click="toBin">
>>>>>>> 88771980e51271b2c59f97a1407a3c7eba7d5d55
            <el-icon><delete /></el-icon>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
<<<<<<< HEAD
      <el-main class="Main" width="100%" v-if="type==='mySpace'" style="padding: 0; height: 100%">
        <space></space>
=======
      <el-main class="Main" width="100%" v-if="type==='mySpace'">
        <space :spaceType="1"></space>
      </el-main>
      <el-main class="Main" width="100%" v-else-if="type==='collection'">
        <space :spaceType="2"></space>
      </el-main>
      <el-main class="Main" width="100%" v-else-if="type==='bin'">
        <space :spaceType="3"></space>
>>>>>>> 88771980e51271b2c59f97a1407a3c7eba7d5d55
      </el-main>
      <el-main class="Main" width="100%" v-else-if="type==='message'">
        <message></message>
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
import Space from "@/views/Space";
import Message from "@/views/Message";

export default {
  name: 'Table',
  data() {
    return {
<<<<<<< HEAD
      type: 'mySpace',
      isCollapse: false
=======
      type: '',
      isCollapse: true
>>>>>>> 88771980e51271b2c59f97a1407a3c7eba7d5d55
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
      this.type='mySpace';
    },
    toMyCollection() {
      this.type='collection'
    },
    toBin() {
      this.type='bin'
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}


</script>


