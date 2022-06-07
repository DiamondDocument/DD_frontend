<template>
  <div>

    <div style="text-align: center;
      width: 80%;
      margin: 0 auto;
      margin-top: 20px">
      <el-input placeholder="请输入内容"
                @keyup.enter="search"
                v-model="key"
                style="
                margin-right: 30px;
                width: 70%"
                >
        <template #prepend>
          <el-icon><Search /></el-icon>
        </template>
        <template #append>
          <el-button type="primary" @click="search">
            搜索
          </el-button>
        </template>
      </el-input>

      <el-button type="success" style="margin-bottom: 5px" @click="createTeam">
        新建团队
      </el-button>
    </div>

    <div>
      <el-row v-for="(team, index) in teamList" :key="team.id"
              @click="goTeam(index)"
              class="block">
        <el-avatar :src="team.url" style="margin: 10px; float: left" />
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
      key: '',
      teamList: [],
      // teamList: [
      //   {
      //     teamId: "00127",
      //     name: "CTS",
      //     url: '',
      //     introduction: "CTS 很简单的啦 java助教说话又好听"
      //   },
      //   {
      //     teamId: "00128",
      //     name: "软工",
      //     url: '',
      //     introduction: "金刚石文档"
      //   }
      // ]
    }
  },
  methods: {
    search: function (){
      this.$router.push({name:'teamList', params:{key: this.key}});
    },

    goTeam: function (index){
      this.$router.push({name:'team', params:{teamId: this.teamList[index].teamId}});
    },

    createTeam: function (){
      this.$router.push({name:'teamCreate', params:{}});
    }
  },
  created() {
    console.log(this.$store.state.loginUser.userId);
    // console.log(this.$route.params.key === '');
    this.key = this.$route.params.key;
    this.$axios.get("search/team", {
      params:{
        key: this.key,
      }
    }).then((response)=>{
      console.log('search team data = ');
      console.log(response.data);
      if (response.status === 200){
        this.teamList = response.data.teams;
        console.log(this.teamList);
      }else console.log("请求返回status不为200")
    }).catch((err)=>{
      console.log(err);
    });
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