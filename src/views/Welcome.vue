<template>
  <p>欢迎页</p>
  <nav>
    <router-link to="/table">工作台</router-link> |
    <router-link to="/login">登录</router-link> |
    <router-link to="/register">注册</router-link>
  </nav>
  <router-view/>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

<<<<<<< HEAD
<style scoped>
=======
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods:{
    goLogin(){
      this.$router.replace("/login");
    }
  }
}
</script>
<style>
>>>>>>> 68279ce7c6426724bde6176c35124ee6b81c4093
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

  .shell {
    /*float: left;*/
    width: 320px;
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
  }
</style>

