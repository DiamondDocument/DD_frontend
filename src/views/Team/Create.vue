<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <h2 style="text-align: center">
          新建团队
        </h2>
      </el-header>

      <el-main
          style="
          width: 700px;
          text-align: center;
          margin:0 auto">
        <el-form label-width="120px" label-position="top">

          <el-form-item label="团队名称">
            <el-input type="text"
                      placeholder="请输入团队名称"
                      v-model="teamName">

            </el-input>
          </el-form-item>

          <el-form-item label="团队简介">
            <el-input
                v-model="teamIntroduction"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入团队简介"
            />
          </el-form-item>

        </el-form>

        <el-divider />
        <span>
          <el-icon><Warning /></el-icon>
          你正在创建你的团队
        </span>
        <el-divider />

        <el-button type="success" @click="createTeam">创建团队</el-button>

      </el-main>
    </el-container>

  </div>

</template>

<script>

import {ElMessage} from "element-plus";

export default {
  name: 'teamCreate',

  data(){
    return {
      teamName: '',
      teamIntroduction: '',
      teamId: '',
    }
  },
  methods: {
    createTeam: function (){

      console.log("调用teamCreate");

      this.$axios.post("/api/team/create",
          {
            "teamName" : this.teamName,
            "teamIntroductory" : this.teamIntroduction,
            "userId": this.$route.params.userId,
          }).then((res)=>{

            console.log("进入回调函数")
            if (res.status === 200){
              if (res.data.code === 0) {
                ElMessage("创建成功！");
                 this.teamId = res.data.teamId;
              }
              else if (res.data.code === 1) ElMessage("团队名称不合规范, 团队名称只能由数字字母汉字组成");
              else ElMessage("系统错误！！");
            }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })

      this.$router.push({name: 'table', params: {info: 'team-' + this.teamId}});

    }
  },
}
</script>


<style>

</style>