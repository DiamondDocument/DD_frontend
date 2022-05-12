<template >
  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../assets/logo.png" style="width: 50px; height: 50px;">

      <div>
        <a href="#" style="padding: 0 10px 0 0">头像</a>
        <a href="#">消息</a>
      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: auto">
        <el-radio-group v-model="isCollapse" >

          <el-button :label="false" @click="isCollapse=!isCollapse" type="primary" icon="el-icon-s-unfold"></el-button>
        </el-radio-group>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item index="1">
<!--            <i class="el-icon-paperclip"></i>-->
            <el-icon><document /></el-icon>

            <span slot="title"><router-link to="/about">最近浏览</router-link></span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user-solid"></i>
            <span slot="title">我的空间</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-custom"></i>
            <span slot="title">我的团队</span>
          </el-menu-item>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">模板</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">推荐模板</el-menu-item>
              <el-menu-item index="1-2">我的模板</el-menu-item>
              <el-menu-item index="1-3">收藏模板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="6">
            <i class="el-icon-delete-solid"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
          <!--            <el-menu-item-group>-->
          <!--              <span slot="title">分组一</span>-->
          <!--              <el-menu-item index="1-1">选项1</el-menu-item>-->
          <!--              <el-menu-item index="1-2">选项2</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--            <el-menu-item-group title="分组2">-->
          <!--              <el-menu-item index="1-3">选项3</el-menu-item>-->
          <!--            </el-menu-item-group>-->
          <!--            <el-submenu index="1-4">-->
          <!--              <span slot="title">选项4</span>-->
          <!--              <el-menu-item index="1-4-1">选项1</el-menu-item>-->
          <!--            </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-main class="Main" width="100%">Main</el-main>
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
  background-color: aqua;

}
</style>

  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: auto;
    min-height: 400px;
  }
.el-menu-vertical-demo {
  height: 100vh;
<<<<<<< HEAD
=======
  align-items: center;
}

.shell {
  float: left;
  width: 20%;
  height: 640px;
  background-color: ghostwhite;
  position: absolute;
  top: 0;
}

.buttons {
  margin: 60px 0;
}

.li {
  letter-spacing: 2px;
  font: 600 17px '';
  padding: 25px 52px;
  transition: .3s;
}

.li::after {
  content: '';
  position: absolute;
  left: 20px;
  margin-top: -22px;
  display: block;
  width: 20px;
  height: 20px;
  background-color: ghostwhite;
  border-radius: 30%;
}

.li ul {
  width: 0;
  height: 530px;
  padding: 60px 0;
  position: fixed;
  top: 80px;
  left: 50px;
  right: 0;
  overflow: hidden;
  background-color: ivory;
  transition: .3s;
  border-radius: 10%;
}

.li ul li {
  padding: 20px 24px;
  transition: .3s;
}

.li ul li router-link {
  padding: 16px 24px;
  transition: .3s;
}

.li:hover ul {
  width: 228px;
}

.li ul li:hover {
  background-color: #eeeeee;
>>>>>>> c8f3c78b97d6136f829d73f1ecb293cb454d6ffd
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


