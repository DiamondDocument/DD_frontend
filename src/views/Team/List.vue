<template>
  <div style="width: 1000px;margin-left: auto;margin-right: auto;margin-top: 30px; ">
    <el-card shadow="always" :body-style="{ padding: '0 0 0 0 ',  }">

    <div style="padding: 30px;">
        <div style="text-align: center;
      width: 80%;
      margin: 0 auto;">
          <el-input placeholder="请输入内容"
                    @keyup.enter="search"
                    v-model="key"
                    size="large"
                    style="
                margin-right: 50px;
                width: 75%"
          >
            <template #prepend>
              <el-icon><Search/></el-icon>
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
      </div>
      <el-divider />
      <div style="min-height: 500px">
        <el-row v-for="(team, index) in teamList" :key="team.id"
                class="block">
          <el-avatar :src="team.url" style="margin: 10px 30px; float: left" />
          <div style="float: left;">
            <h3 >
              {{team.name}}
            </h3>
            <p >
              {{team.intro}}
            </p>
          </div>

          <div style="float: right; position: absolute; right: 80px; top: 20px">
            <el-button type="" @click="goTeam(index)">
              进入团队
            </el-button>
          </div>

        </el-row>
      </div>
    </el-card>

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
      this.$router.push({name: 'block', params: {
        option: '0',
        key: this.key
      }})
      // this.$router.push({name:'teamList', params:{key: this.key}});
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
    console.log('key is ' + this.key);
    if (this.key === '' || this.key === null || this.key === undefined){
      this.$axios.get("user/team", {
        params:{
          userId: this.$store.state.loginUser.userId,
        }
      }).then((response)=>{
        console.log('search team data = ');
        console.log(response.data);
        if (response.status === 200){
          if (response.data.code === 0) this.teamList = response.data.teams;
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    }else{
      this.$axios.get("search/team", {
        params:{
          key: this.key,
        }
      }).then((response)=>{
        console.log('search team data = ');
        console.log(response.data);
        if (response.status === 200){
          if (response.data.code === 0) this.teamList = response.data.teams;
        }else console.log("请求返回status不为200")
      }).catch((err)=>{
        console.log(err);
      });
    }

    console.log(this.teamList);
  }
}
</script>

<style scoped>
.block {
  position: relative;
  margin: 10px auto;
  width: 60%;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>