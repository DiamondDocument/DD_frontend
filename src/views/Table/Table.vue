<template >
  <div id="all" style="width: 100%;height: 100%;">

  <el-container>

    <el-header class="Header" style="height: 50px; display: flex; justify-content: space-between; align-items: center;">

      <img src="../../assets/logo2_2.png" style="width: 150px;margin-right: 30px; margin-left: 10px" @click="this.$router.push({name: 'login'})">
      <el-input
          v-model="userSearchContent"
          placeholder="搜索用户..."
          suffix-icon="Search"
          style="width: 200px;margin-left: 30px;margin-right: auto; "
          @input="this.$router.push({name: 'userSearch', params:{keyword: this.userSearchContent}})"
      />
      <div style="display: flex; justify-content: space-between; align-items: center; width: 80px">
        <el-icon @click="this.$router.push({name:'message'})" ><Bell /></el-icon>
        <el-avatar :src="url" style="width: 40px; height: 40px " @click="goInformation"/>
      </div>
    </el-header>

    <el-container>
      <el-aside class="Aside" style="width: auto;">
         <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1" >
              <el-icon v-if="!isCollapse" @click="isCollapse=!isCollapse" style="float: right; "><DArrowLeft /></el-icon>
              <el-icon v-else @click="isCollapse=!isCollapse" style="float: right;"><DArrowRight /></el-icon>
            </el-menu-item>
            <el-menu-item class="abc" index="2" @click="this.$router.push({name: 'recent'})">
              <el-icon ><clock /></el-icon>
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

            <el-sub-menu index="6" popper-offset="1" >
              <template #title style="padding-right: 10px">
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
<!--            <el-scrollbar style="height: 100%"></el-scrollbar>-->
          </div>
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
.el-menu-vertical-demo > * {
  padding-right: 20px;
  padding-left: 10px;
}
.el-menu-vertical-demo > *:nth-child(6) {
  padding-right: 0px;
  padding-left: 0px;
}
</style>


<script>
import Space from "@/views/Space/Space";
import Message from "@/views/Message/Message";
import RecommendTemplate from "@/views/Template/Recommend"
import {ElMessage} from "element-plus";
import userList from '@/views/User/userList.vue'
export default {
  components:{
    userList
  },
  name: 'Table',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      userId: '',
      url: '',
      userSearchContent: '',
      userSearchComp: false,
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
    goInformation: function (){
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
    searchUser() {
      this.$axios.get("user/search/user", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        console.log('search user: ', response.data);
        if (response.status === 200){
          console.log(response.data);
          if (response.data.code === 0){
            this.url = response.data.url;
          }else console.log("用户头像获取错误");
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    }
  },

  // THR: 测试全局状态
  created(){
    this.userId = this.$store.state.loginUser.userId;
    console.log(this.userId);

    this.getAvatar();
  }
}


</script>


