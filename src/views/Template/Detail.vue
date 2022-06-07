<template>

  <div class="common-layout">
    <el-container>
      <el-aside style="height: 100vh; width: 700px">
        <img :src="this.url" style=" width: 600px; height:100vh; align-items: center ">

      </el-aside>
      <el-container>
        <el-header style="padding: 100px 100px; height: 200px; text-align: center">
          <h2>{{name}}</h2>
        </el-header>
        <el-main style="padding: 0 100px 0 0">
          <h3 style="padding-left: 80px; font-family: 新宋体,sans-serif">
            <img :src="url2" style="width: 30px;">
            {{creatorId}}>
            </h3> <br>
          <h3 style="padding-left: 80px; font-family: 'Adobe 宋体 Std L',serif">简介:{{intro}}</h3> <br>
          <el-divider />
          <el-icon v-if="like === 0" style="width: 80px; position: center" @click="like=1"><Star /></el-icon>
          <el-icon v-else style="width: 80px; position: center" @click="like=0"><StarFilled /></el-icon>
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
      like: 0,
      tempId: '',
      name: '',
      intro: '',
      creatorId: '',
      creatorName: '',
      url: '',
      url2: '',
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

    this.$axios.get("user/get-avatar", {
      params:{
        userId: this.creatorId,
      }
    }).then((response)=>{
      if (response.status === 200){
        console.log(response.data)
        if (response.data.code === 0){
          this.url2 = response.data.url;
        }else console.log("用户头像获取错误");
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
  }
}
</script>

<style scoped>

</style>