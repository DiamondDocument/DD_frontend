<template>
    <div>
        <label>
            <input v-model="searchText" type="text" placeholder="请输入用户信息" class="text">
        </label><br>
        <button type="submit" @click="Find">查找</button>
    </div>
    <!-- 搜索后的 -->
    <div>
        <span v-if="nickName.length>0">
            {{nickName}}
            <button type="submit" @click="invite">邀请</button>
        </span>
        <span v-if="gender.length>0">
            {{gender}}
        </span>
        <br>
        <span v-if="userIntroductory.length>0">
            {{userIntroductory}}
        </span>
        <span v-if="email.length>0">
            {{email}}
        </span>
    </div>
</template>

<script>
import qs from "qs";

export default {
  name: "inviteMem",
  data() {
    return {
        searchText: "",
        // 搜索后的展示数据
        nickName: "",
        gender: "",
        userIntroductory: "", //可以为空
        email: "" //可以为空   
    };
  },
  methods: {
    Find: function () {
      this.$axios({
        method: 'post',
        url: '/api/user/information',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.searchText,
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.status_code) {
              case 0:
                this.$message.success("返回成功");
                /* 将后端返回的 user 信息存储起来 */
                this.$data.nickName = this.nickName;
                this.$data.gender = this.gender;
                this.$data.userIntroductory = this.userIntroductory;
                this.$data.email = this.email;
                break;
              case 1:
                this.$message.error("用户名不存在！");
                break;
              default:
                this.$message.error("其他错误！");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },

    invite: function () {
      this.$axios({
        method: 'post',
        url: '/api/team/join',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          userId: this.searchText,
//            teamID需要外部页面传入
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.status_code) {
              case 0:
                this.$message.success("加入团队成功");
                break;
              case 1:
                this.$message.error("用户不存在");
                break;
              case 2:
                this.$message.error("团队不存在");
                break;
              case 3:
                this.$message.error("用户已加入团队");
                break;
              default:
                this.$message.error("其他错误！");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    }


  }
}
</script>


<style>
#inviteMem {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>