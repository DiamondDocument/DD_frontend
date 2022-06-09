<template>
<!--  space调用的时候才会显示的一个div-->
<!--  <div v-if="this.spaceUsing==='true'">-->
<!--    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >-->
<!--      <el-button type="primary" style="float: right; margin-right: 20px;">-->
<!--        <span style="vertical-align: middle" @click="this.$emit('cancel')">取消</span>-->
<!--      </el-button>-->
<!--    </el-menu>-->
<!--  </div>-->
<!--  <el-row v-if="!selectPos">-->
<!--    <el-col-->
<!--        v-for="(temps, i) in templates"-->
<!--        :span="6.5"-->
<!--        :offset="i > 0 ? 0.5 : 0"-->
<!--    >-->
<!--      <el-card class="box-card">-->
<!--        <img-->
<!--            :src="temps.url"-->
<!--            class="image"-->
<!--            style="position: center"-->
<!--            @click="this.$router.push({name: 'templateDetail', params:{templateId:temps.tempId}})"-->
<!--        />-->
<!--        <div style="padding: 14px; margin: 0;">-->
<!--          <p>{{temps.tempName}}</p>-->
<!--          <div class="bottom">-->
<!--            <p>作者：{{temps.creatorId}}</p>-->
<!--            <el-button type="primary" round @click="useTmp(temps)">立即使用</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-col>-->
<!--  </el-row>-->
  <div style="width: 1043px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',backgroundColor: '#F7F7F7'  }" >
      <div style="height: 30px"></div>
      <el-page-header style="margin-left: 20px" icon="PictureFilled" content="我的模板" title="        " />
      <el-divider/>
      <el-scrollbar style="height: 500px;" >
        <div id="out">
          <div id="item" v-for="(temps, i) in templates" >
            <el-card shadow="always" id="image" :body-style="{ padding: '0px' }">
              <img
                  :src="temps.url"
                  id="image"
                  @click="useTmp(temps)"
              />
              <div id="information" style="padding: 5px;padding-left: 25px;background-color:  #F7F7F7">
                <div>
                  <el-link id="name"
                           @click="this.$router.push({name: 'templateDetail',
                                    params:{templateId:temps.tempId,
                                    templateName:temps.tempName,
                                    spaceUsing:this.spaceUsing,
                                    parentId:this.parentId}})"
                           target="_blank">{{temps.tempName}}</el-link>
                </div>
                <div style="display: flex">
                  <el-link @click="$router.push({name:'userInformation', params: {userId : 'visitor'}})" target="_blank">作者：{{temps.creatorName}}</el-link>
                  <el-icon style="margin-right: 30px;margin-left: auto;" size="large"><CollectionTag /></el-icon>
                </div>
                <!--            <p id="name" @click="useTmp(temps)">{{temps.tempName}}</p>-->

              </div>
            </el-card>

            <!--        <el-button text style="width: 100%"><p style="margin-left: 0;">{{temps.tempName}}</p></el-button>-->
            <!--        <a href="" id="name" @click=""> </a>-->

          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>




</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "MyTemplate.vue",
  props: [
    "spaceUsing",
    "parentId"
  ],
  data() {
    return {
      userId: '',
      templates: []
    }
  },

  created() {
    this.userId = this.$store.state.loginUser.userId
    this.$axios.get("/template/list/my", {
      params: {
        userId: this.userId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.templates = response.data.temps;
          console.log(this.templates[0].url)
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });
  },
  methods:{
    useTmp(tmp){
      console.log("in and spaceusing is", this.spaceUsing)
      if(this.spaceUsing==='true'){
        this.commit(tmp,this.parentId)
      }
      else{
        this.$router.push({name: 'templateDetail',
          params:{templateId:tmp.tempId,
            templateName:tmp.tempName,
            spaceUsing:this.spaceUsing,
            parentId:this.parentId}})
      }
    },
    commit(tmp, id){
      console.log("parent:",id)
      this.$axios.post("/file/create", {
        "type": 1,
        "name": tmp.tempName,
        "templateId": tmp.tempId,
        "authority": 3,
        "creatorId": this.$store.state.loginUser.userId,
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
  }
}
</script>

<style>
#out {
  display: grid;
  grid-template-columns: 250px 250px 250px 250px;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;

}
#image {
  /*width: 218px;*/
  width: 100%;
  margin: 0;
  /*height: 260px;*/
  object-fit: cover;
  display: block;
  border: 1px solid #e8e8e8;
}
#item {
  margin-left: auto;
  margin-right: auto;
  height: 340px;
  width: 220px;
  margin-top: 30px;
  margin-bottom: 30px;
}
#name{
  line-height: 50px;
  font-size: 20px;
  height: 50px;
  /*text-align: center;*/
  /*color: rgba(0, 0, 0, 0.7);*/
  /*flood-color: ;*/
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
a{
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
}

.box-card {
  margin-left: 0;
  margin-top: 20px;
  width: 400px;
  float: left;
}
</style>