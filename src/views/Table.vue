<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../assets/logo.png" style="width: 50px; height: 50px;">

      <div>
        <a href="#" style="padding: 0 10px 0 0">头像</a>
        <a href="#" @click="toMessage">消息</a>
      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: auto">
        <el-radio-group v-model="isCollapse" >
          <el-button :label="false" @click="isCollapse=!isCollapse" type="primary" icon="el-icon-s-unfold" ><el-icon style=""><expand /></el-icon></el-button>
        </el-radio-group>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item index="1">
            <el-icon><clock /></el-icon>
            <span slot="title"><router-link to="/about">最近浏览</router-link></span>
          </el-menu-item>
          <el-menu-item index="2" @click="toMySpace">
            <el-icon><house /></el-icon>
            <span slot="title">我的空间</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><opportunity /></el-icon>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><user-filled /></el-icon>
            <span slot="title">我的团队</span>
          </el-menu-item>

          <el-sub-menu index="5">
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

          <el-menu-item index="6">
            <el-icon><delete /></el-icon>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="Main" width="100%" v-if="type==='space'">
        <space></space>
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
      type: 'space',
      isCollapse: true
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
      this.type='space';
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


