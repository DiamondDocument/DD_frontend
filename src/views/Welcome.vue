<template>
  <p>欢迎页</p>
<!--  <p>{{this.$router.getRoutes()}}</p>-->
  <nav>
    <el-button @click="$router.push({name:'table',params:{info: 'my'}})">工作台</el-button> |
    <el-button>登录</el-button> |
    <el-button>注册</el-button>|
    <el-button @click="$router.push({name:'table',params:{info: 'team:团队id'}})">团队工作台（测试用）</el-button>|
    <el-button @click="$router.push({name:'table',params:{info: 'other:他人id'}})">>他人工作台（测试用）</el-button>|
    <el-button @click="hello">hello?</el-button>|

  </nav>
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
    hello(){
      this.$axios.get("/hello").then((response)=>{
        console.log(response);
      });
    }
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
