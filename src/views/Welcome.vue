<template>
  <p>欢迎页</p>
<!--  <p>{{this.$router.getRoutes()}}</p>-->
  <nav>
    <el-button><router-link to="/table/:info">工作台</router-link> </el-button> |
    <el-button><router-link to="/login">登录</router-link></el-button> |
    <el-button><router-link to="/register">注册</router-link></el-button>|
    <el-button @click="toTeamTable">团队工作台（测试用）</el-button>|
    <el-button @click="toOtherTable">>他人工作台（测试用）</el-button>|
  </nav>
  <router-link to="/template/my">gg</router-link>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods:{
    toTeamTable(){
      this.$router.push({name:"teamTable",params:{tableId:123}});
    },
    toOtherTable(){
      this.$router.push({name:"otherTable",params:{tableId:123}});
    },
  },
}
</script>
<style scoped>
nav {
  padding: 30px;
  background-color: silver;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    /*float: right;*/
    padding: 0;
    position: absolute;
    text-align: center;
  }

  * {
    padding: 0;
    margin: 0;
    text-decoration: none;
  }

  template {
    background-color: mintcream;
    display: flex;
    justify-content: space-evenly;
    height: 100vh;
    align-items: center;
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
  }
</style>

>>>>>>> needMerge
