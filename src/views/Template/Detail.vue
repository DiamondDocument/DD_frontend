<template>
  <div style="width: 1043px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',backgroundColor: '#F7F7F7'  }" >
      <el-page-header style="margin-left: 20px" icon="PictureFilled" :content="name+'  详情'" title="        " />
      <el-divider/>
      <div class="common-layout" style="height: 500px;">
        <el-container>
          <el-aside style="height: 500px; width: 700px;padding: 20px;background-color: #F7F7F7">
            <img v-for="oneUrl in this.urls" :src="oneUrl" alt="">
          </el-aside>
          <el-main>
            <el-form
                label-width="100px"
                style="
              margin: 20px 20px 20px 10px;
            ">
              <el-form-item label="模板名：" style="margin-left: 14px">
                {{ name }}
              </el-form-item>
              <el-form-item @click="this.$router.push({name: 'userInformation', params: {userId: creatorId}})" >
                <template #label>
                  <div style="line-height: 40px;">作者：</div>
                </template>
                <el-avatar style="margin-left: 10px" :src="url2"/>
                <div style="margin-left: 10px">{{ creatorName }}</div>
              </el-form-item>
              <el-form-item label="简介：">
                {{ intro }}
              </el-form-item>
            </el-form>
            <div>
              <el-button type="primary" round style="float: right" >立即使用</el-button>
            </div>
          </el-main>
        </el-container>
      </div>

    </el-card>
  </div>




</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Detail.vue",

  data() {
    return {
      userId: '',
      tempId: '',
      name: '',
      intro: '',
      creatorId: '',
      creatorName: '',
      url: '',
      url2: '',
      urls: [

      ]
    }
  },

  created() {
    this.tempId = this.$route.params.templateId;
    this.userId = this.$store.state.loginUser.userId;

    this.$axios.get("/template/image", {
      params: {
        tempId: this.tempId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.urls = response.data.url;
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });

    this.$axios.get("/template", {
      params: {
        tempId: this.tempId,
        userId: this.userId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.name = response.data.name;
          this.intro = response.data.intro;
          this.creatorId = response.data.creatorId;
          this.creatorName = response.data.creatorName;
          this.$axios.get("user/get-avatar", {
            params:{
              // userId: this.creatorId,
              userId: this.creatorId,
            }
          }).then((response)=>{
            if (response.status === 200){
              console.log(response.data)
              console.log(this.creatorId)
              if (response.data.code === 0){
                this.url2 = response.data.url;
              }else console.log("用户头像获取错误");
            }else console.log("请求返回status不为200");
          }).catch((err)=>{
            console.log(err);
          });
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