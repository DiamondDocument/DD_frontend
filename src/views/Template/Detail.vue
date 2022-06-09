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
              <el-form-item label="模板名：">
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
  <tmp-pos ref="tmpPos" v-if="selectPos" @commit="commit" @cancel="selectPos=false"></tmp-pos>

</template>

<script>
import {ElMessage} from "element-plus";
import tmpPos from "@/views/Space/tmpPos";
export default {
  name: "Detail.vue",
  components:[tmpPos],
  data() {
    return {
      like: 0,
      tempId: '',
      name: '',
      intro: '',
      creatorId: '',
      creatorName: '',
      url: '',
      url2:'',
      urls: '',
      selectPos: false,     //是否在选择创建位置
      info: [

      ]
    }
  },

  created() {
    this.tempId = this.$route.params.templateId;
    this.tempName=this.$route.params.templateName;
    this.spaceUsing=this.$route.params.spaceUsing;
    console.log(this.tempId, this.tempName, this.spaceUsing)

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
        userId: this.$store.state.loginUser.userId
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
  },
  methods:{
    //lyh的函数，非空间组件调用时，调用选择位置的组件; 空间组件调用时（准确说是Space调用My，My路由push到Detail时），直接由传来的参数创建文档
    useTmp(){
      if (this.spaceUsing==='false')
        this.selectPos=true
      else{
        this.commit(this.$route.params.parentId)
      }
    },
    //lyh的函数，位置选择界面确定好创建模板的位置id后进入此函数
    commit(id){
      this.$axios.post("/file/create", {
        "type": 1,
        "name": this.tempName,
        "templateId": this.tempId,
        "authority": 3,
        "creatorId": this.$store.state.loginUser.userId,
        "parentId": id,
      }).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('创建成功')
          } else if(response.data.code===1){
            ElMessage('文件重名，已修改')
          }else if(response.data.code===2){
            ElMessage('您没有权限')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.selectPos=false
    },
  },
}
</script>

<style scoped>
  .author:hover {
    cursor: hand;
  }
</style>