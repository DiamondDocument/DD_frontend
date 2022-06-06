<template >

  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../../assets/logo.jpg" style="width: 50px; height: 50px;">

      <div>
<!--        <a href="#" style="padding: 0 10px 0 0">头像</a>-->
<!--  THR: for test     -->
        <el-button @click="goInformation">
        头像
      </el-button>
        <el-icon @click="this.$router.push({name:'message'})"><MessageBox /></el-icon>
      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: auto">
     <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item index="1">
            <el-icon v-if="!isCollapse" @click="isCollapse=!isCollapse" style="float: right; "><DArrowLeft /></el-icon>
            <el-icon v-else @click="isCollapse=!isCollapse" style="float: right;"><DArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="2" @click="this.$router.push({name: 'recent'})">
            <el-icon><clock /></el-icon>
            <span slot="title">最近浏览</span>
          </el-menu-item>
          <el-menu-item index="3" @click="this.$router.push({name: 'space'})">
            <el-icon><house /></el-icon>
            <span slot="title">我的空间</span>
          </el-menu-item>
          <el-menu-item index="4" @click="this.$router.push({name: 'collection'})">
            <el-icon><opportunity /></el-icon>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="5" @click="this.$router.push({name: 'teamList'})">
            <el-icon><user-filled /></el-icon>
            <span slot="title">我的团队</span>
          </el-menu-item>

          <el-sub-menu index="6" popper-offset="1">
          <template #title>
            <el-icon><tickets /></el-icon>
            <span>模板</span>
          </template>
          <el-menu-item-group style="width: 100px">
            <el-menu-item index="1-1" @click="this.$router.push({name: 'recommendTemplate'})">推荐模板</el-menu-item>
            <el-menu-item index="1-2" @click="this.$router.push({name: 'myTemplate'})">我的模板</el-menu-item>
            <el-menu-item index="1-3" @click="this.$router.push({name: 'collectionTemplate'})">收藏模板</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

          <el-menu-item index="7" @click="this.$router.push({name: 'recycle'})">
            <el-icon><delete /></el-icon>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding: 0px">
        <router-view></router-view>
      </el-main>
<!--      <el-main>-->
<!--        <space></space>-->
<!--      </el-main>-->
<!--      <el-main>-->
<!--        <RecommendTemplate></RecommendTemplate>-->
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
import RecommendTemplate from "@/views/Template/Recommend"

export default {
  name: 'Table',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
    }
  },
  // components: {
  //   RecommendTemplate,
  //   Space,
  //   Message
  // },
  mounted() {
    this.$store.commit("changeTable", this.$route.params.info);
  },
  methods: {
    // THR: for test
    goInformation: function (){
      this.$router.push({name: 'userInformation', params: {userId: 'u123'}})
    },

    toMessage() {
      this.$router.push({name: "message"});
    },
    toMySpace() {
      this.$router.push({name: "space"});
    },
    toMyCollection() {
      this.$router.push({name: "collection"});
    },
    toRecycle() {
      this.$router.push({name: "recycle"});
    },
    toRecent() {
      this.$router.push({name: "recent"});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  // THR: 测试全局状态
  created(){
    console.log(this.$store.state.loginUser.userId);
  }
}


</script>


