<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <h2 style="text-align: center">
          新建团队
        </h2>
      </el-header>

      <el-main style="width: 700px; margin:0 auto">
        <el-form model="form" label-width="120px" label-position="top">

          <el-form-item label="团队名称">
            <el-input type="text" v-model="teamName">

            </el-input>
          </el-form-item>

          <el-form-item label="团队简介">
            <el-input
                v-model="teamIntroduction"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Please input"
            />
          </el-form-item>

          <el-form-item>
            <el-radio-group v-model="isPublic" >
              <el-radio :label="1">
                <el-icon><CopyDocument /></el-icon>
                Public
              </el-radio>
              <el-radio :label="0">
                <el-icon><Lock /></el-icon>
                Private
              </el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>

        <el-divider />
        <span>
          <el-icon><Warning /></el-icon>
          你正在创建你的团队
        </span>
        <el-divider />

        <el-button type="success">创建团队</el-button>

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
      userId: '',
      teamName: '',
      teamIntroduction: '',
      isPublic: 1,
    }
  },
  methods: {
    createTeam: function (){
      this.$axios.post("/api/team/create",
          {
            "teamName" : this.teamName,
            "teamIntroductory" : this.teamIntroduction,
            "userId": this.userId,
          }).then((res)=>{
            if (res.status === 200){
              if (res.data.code === 0) ElMessage("创建成功！");
              else if (res.data.code === 1) ElMessage("团队名称不合规范");
              else ElMessage("系统错误！！");
            }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })

      // 之后的行为？？？

    }
  },

  created() {
    this.userId = this.$route.params.userId;
  }
}
</script>


<style>

</style>