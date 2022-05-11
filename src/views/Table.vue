<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png" style="position: center">-->
<!--    <p style="position: center">Welcome to DiamondDocument!</p>-->
<!--    可不可以默认显示用户文件列表——lyh-->
    <div class="shell">
      <ul class="buttons">
        <li class="li">
          个人中心
          <ul>
            <li>xxx</li>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </li>

        <li class="li">
          我的文档
          <ul>
            <li>xxx</li>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </li>

        <li class="li">
          我的团队
          <ul>
            <li>xxx</li>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </li>

        <li class="li">
          我的消息
          <ul>
            <li @click="toMessage">查看</li>
            <li>啦啦啦</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="type==='space'">
      <Space></Space>
    </div>
    <div v-else-if="type==='message'">
      <Message></Message>
    </div>
  </div>

</template>

<style>
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
  float: left;
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


<script>
import Space from "@/views/Space";
import Message from "@/views/Message";

export default {
  name: 'Table',
  data() {
    return {
      type: 'space'
    }
  },
  components: {
    Space,
    Message
  },
  methods: {
    toMessage() {
      this.type = message;
    }
  }
}
</script>


