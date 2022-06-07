<template>

  <div class="common-layout">
    <el-container>
      <el-aside style="height: 100vh; width: 700px">
        <img :src="this.url" style=" width: 500px; height:100vh; align-items: center ">
      </el-aside>
      <el-container>
        <el-header style="padding: 100px 100px; height: 300px; text-align: center">
          <h2>{{name}}</h2>
        </el-header>
        <el-main style="padding: 0 100px 0 0">
          <h3 style="padding-left: 80px">简介:{{intro}}</h3>
          <h3 style="padding-left: 80px">作者:{{creatorId}}</h3>
          <el-button type="primary" round style="float: right" >立即使用</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Detail.vue",

  data() {
    return {
      tempId: '',
      name: '',
      intro: '',
      creatorId: '',
      creatorName: '',
      url: '',
      info: [

      ]
    }
  },

  created() {
    this.tempId = this.$route.params.templateId;

    this.$axios.get("/template/thumbnail", {
      params: {
        tempId: this.tempId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.url = response.data.url;
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });

    this.$axios.get("/template", {
      params: {
        tempId: this.tempId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.name = response.data.name;
          this.intro = response.data.intro;
          this.creatorId = response.data.creatorId;
          this.creatorName = response.data.creatorName;
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>

</style>