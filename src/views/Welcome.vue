<template>
  <p>欢迎页</p>
<!--  <p>{{this.$router.getRoutes()}}</p>-->
  <nav>
    <el-button @click="$router.push({name:'table',params:{info: 'my'}})">工作台</el-button> |
    <el-button @click="$router.push({name:'login'})" >登录</el-button> |
    <el-button>注册</el-button>|
    <el-button @click="$router.push({name:'table',params:{info: 'team:123'}})">团队工作台</el-button>|
    <el-button @click="$router.push({name:'table',params:{info: 'other:123'}})">>他人工作台</el-button>|
    <el-button @click="$router.push({name:'documentEdit',params:{documentId: '1223'}})">>编辑文档</el-button>|
    <el-button @click="hello">hello?</el-button>|
    <el-button @click="post">post?</el-button>|
    <el-button @click="file">uploadfile?</el-button>|
    <input type="file" id="keyfile" multiple="multiple" @change="select($event)" >
    <p>{{str}}</p>
    <p>{{code}}</p>
    <el-button @click="this.$store.commit({type: 'login', userId: 123, nickname: 'giao'})">全局状态登录</el-button>|
    <el-button @click="this.$store.commit('logout')">全局状态登出</el-button>|
    <p>isLogin? {{this.$store.state.isLogin}}, user = {{this.$store.state.loginUser}}</p>
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
  data(){
    return {
      str: "",
      code: -1,
    };
  },
  methods:{
    hello(){
      this.$axios.get("/hello",{
        params:{
          userId: "12345",
        }
      }).then((response)=>{
        console.log(response.data);
        this.str = response.data.message;
        this.code = response.data.code;
      });
    },
    post(){
      this.$axios.post("/post",
          {
            "content" : "字符串"
          }
      ).then((response)=>{
        console.log(response.data);
        this.str = response.data;
      });
    },
    login(){
      this.$axios.get("/user/login",{
        params:{
          userId: 'u123',
          pwd: '123456',
          email: null
        }
      }).then((response)=>{
        console.log("请求完毕");
        if(response.status === 200){
          if(response.data.code === 0){
            console.log(response.data);
          }else{
            console.log("code");
          }
        }else{
          console.log("请求错误");
        }
      }).catch((err) => {
        console.log("请求错误");
      });
    },
    file(){
      let files = document.getElementById('keyfile').value;
      console.log(files);

    },
    select(e){
      let getFile =document.getElementById("files");
      // getFile.onchange=function(e){
        //获取到文件以后就会返回一个对象，通过这个对象即可获取文件
        console.log(e.currentTarget.files);//所有文件，返回的是一个数组
        console.log(e.currentTarget.files[0].name)//文件名
        let form = new FormData();
        form.append("file",e.currentTarget.files[0]);
        this.axios.post("file",form).then((response)=>{
          if(response.status === 200){
            console.log(response.data);
          }else{
            //http没有返回200
          }
        }).catch((err)=>{
          //报错
        });
      // }
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
