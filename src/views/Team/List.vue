<template>
  <div>

    <div style="text-align: center">
      <el-input placeholder="请输入内容"
                @keyup.enter="search"
                v-model="keyword"
                style="width: 80%;
              margin: 0 auto;">
        <template #prepend>
          <el-icon><Search /></el-icon>
        </template>
        <template #append>
          <el-button type="primary" @click="search">
            搜索
          </el-button>
        </template>
      </el-input>
    </div>

    <div>
      <el-row v-for="(team, index) in teamList" :key="team.id"
              @click="goTeam(index)"
              class="block">
        <el-avatar src="circleUrl" style="margin: 10px; float: left" />
        <div style="float: right;">
          <h3 >
            {{team.name}}
          </h3>
          <p >
            {{team.introduction}}
          </p>
        </div>

      </el-row>
    </div>


  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
export default {
  name: "List",
  data(){
    return {
      keyword: '',
      teamList: [
        {
          teamId: "1",
          name: "CTS",
          introduction: "CTS 很简单的啦 java助教说话又好听"
        },
        {
          teamId: "2",
          name: "软工",
          introduction: "金刚石文档"
        }
      ]
    }
  },
  methods: {
    search: function (){
      this.$router.push({name:'teamList', params:{key: this.keyword}});
    },

    goTeam: function (index){
      this.$router.push({name:'team', params:{teamId: this.teamList[index].teamId}});
    },
  },
  created() {
    this.keyword = this.$route.params.key;
    if (this.keyword.length === 0){
      this.$axios.get("/api/user/login", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        if (response.status === 200){
          this.teamList = response.data.teams;
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    }else {

    }
  }
}
</script>

<style scoped>
.block {
  margin: 10px auto;
  width: 75%;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>