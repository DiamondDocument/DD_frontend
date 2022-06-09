<template>

  <div style="width: 1043px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '40px 20 20 0 ',backgroundColor: '#F7F7F7'  }" >
      <div style="height: 30px"></div>
      <el-page-header style="margin-left: 20px" icon="PictureFilled" content="收藏模板" title="        " />
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
                  <el-link id="name" @click="this.$router.push({name: 'templateDetail', params:{templateId:temps.tempId}})" target="_blank">{{temps.tempName}}</el-link>
                </div>
                <div style="display: flex">
                  <el-link @click="$router.push({name:'userInformation', params: {userId : 'visitor'}})" target="_blank">作者：{{temps.creatorName}}</el-link>
                  <el-icon v-if="temps.iscollection === true" @click="DisCol(i)"
                           style="margin-right: 30px;margin-left: auto;" size="large"><StarFilled /></el-icon>
                  <el-icon v-else @click="Col(i)"
                           style="margin-right: 30px;margin-left: auto;" size="large"><Star /></el-icon>
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
  <tmp-pos ref="tmpPos" v-if="selectPos" @commit="commit" @cancel="selectPos=false"></tmp-pos>


</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Collection.vue",
  data() {
    return {
      userId: '',
      templates: []
    }
  },

  created() {
    this.userId = this.$store.state.loginUser.userId;
    this.$axios.get("/template/list/collection", {
      params: {
        userId: this.userId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.templates = response.data.temps;
        } else console.log("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });
  },

  methods: {
    Col(i) {
      this.templates[i].iscollection = true
      console.log(this.templates[i].tempId);

      this.$axios.post("/template/like", {
        userId: this.userId,
        tempId: this.templates[i].tempId
      }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            console.log("like ok");
          } else console.log("模板信息获取错误");
        } else console.log("请求返回status不为200")
      }).catch((err) => {
        console.log(err);
      });
    },

    DisCol(i) {
      this.templates[i].iscollection = false

      this.$axios.post("/template/dislike", {
        userId: this.userId,
        tempId: this.templates[i].tempId
      }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            console.log("dislike ok");
          } else console.log("模板信息获取错误");
        } else console.log("请求返回status不为200")
      }).catch((err) => {
        console.log(err);
      });
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