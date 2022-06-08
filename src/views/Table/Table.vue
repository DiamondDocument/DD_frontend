<template >
  <div id="all" style="width: 100%;height: 100%;">

  <el-container>
    <el-header class="Header" style="height: 50px">
      <img src="../../assets/logo2_2.png" style="width: 150px;">

      <div>
<!--        <a href="#" style="padding: 0 10px 0 0">头像</a>-->
<!--  THR: for test     -->
<!--        <el-button @click="goInformation">-->
<!--        头像-->
<!--      </el-button>-->
        <el-avatar :src="url" style="width: 40px; height: 40px " @click="goInformation"/>

        <el-icon @click="this.$router.push({name:'message'})" style=""><MessageBox /></el-icon>
      </div>
    </el-header>
    <el-container>
      <el-aside class="Aside" style="width: 140px">
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
      <el-main style="padding: 0;margin-bottom: 0;height: 100vh">
          <div style="height: 670px;margin-right: auto;margin-left: auto">
            <router-view></router-view>
          </div>
<!--          <p v-for="item in 100" :key="item" style="line-height: 30px">{{ item }}</p>-->
<!--                <el-scrollbar style="height: 670px;> -->
<!--        </el-scrollbar>-->
      </el-main>
    </el-container>
  </el-container>

  </div>

</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
Aside {

  background-color: white;

}

.Header {
  background-color: #C1D5E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 40px;
}
a {
  text-decoration: none;
}
el-main {
  background-color: azure;
}
#all{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FCFCFC;
  z-index: 1;
}

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
import {ElMessage} from "element-plus";

export default {
  name: 'Table',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      userId: '',
      url: '',
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
      // this.$router.push({name: 'userInformation', params: {userId: 'u123'}});
      this.$router.push({name: 'userInformation', params: {userId: this.$store.state.loginUser.userId}});
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
    },
    getAvatar: function (){
      console.log('get avatar')
      this.$axios.get("user/get-avatar", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log(response.data)
          if (response.data.code === 0){
            this.url = response.data.url;
          }else console.log("用户头像获取错误");
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    },
  },

  // THR: 测试全局状态
  created(){
    this.userId = this.$store.state.loginUser.userId;
    console.log(this.userId);

    this.getAvatar();
  }
}


</script>


