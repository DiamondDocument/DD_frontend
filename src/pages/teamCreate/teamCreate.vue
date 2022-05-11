<template>
    <div class="teamCreate">
    <form class="teamCreate-form">
        <h1>创建团队</h1>
        <label>
          <input v-model="teamName" type="text" placeholder="团队名称" class="text">
        </label><br>
        <label>
            <input v-model="teamIntroduction" type="text" placeholder="团队介绍" class="text">
        </label><br>
        <button type="submit" @click="Create">创建</button>
    </form>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "teamCreate",
  data() {
    return {
      teamName: '',
      teamIntroduction: '',
    }
  },
  methods: {
    Craete: function () {
      this.$axios({
        method: 'post',
        url: '/api/team/create',
        data: qs.stringify({      /* 将 json 数据序列化发送后端 */
          teamName: this.teamName,
          teamIntroduction: this.teamIntroduction,
          userId: this.$userId
        })
      })
          .then(res => {              /* 获取后端response */
            switch (res.data.status_code) {
              case 0:
                this.$message.success("团队创建成功");
                break;
              case 1:
                this.$message.error("团队名称不合规范");
                break;
              case 2:
                this.$message.error("队长id不存在");
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
#teamCreate {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
