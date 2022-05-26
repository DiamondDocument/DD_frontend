<template>
  <div>

    <div class="information"
         style="height:180px;
                width: 1200px;
                background: #ebebeb;
                position: absolute"
    >

      <el-image v-if="userType === 0" @click="changeImg" class="teamImg" :src="team_img" fit="fill" >
      </el-image>
      <el-image v-else class="teamImg" :src="team_img" fit="fill" >
      </el-image>
      <div style="float: left; padding: 10px" v-if="changing === 0">
        <h2 class="teamName">
          {{ team_name }}
        </h2>
        <p class="mainText">
          {{ team_introduction }}
        </p>
      </div>

      <div style="float: left; padding: 10px" v-if="changing === 1">
        <el-input type="text" v-model="c_teamName"/>
        <el-input type="textarea" v-model="c_teamIntroduction" style="margin-top: 10px"/>
      </div>



      <div style="float: right; margin: 50px 100px 20px 20px;">

        <div>
          <el-button v-if="userType === 0" type="danger" @click="dropTeam">
            解散团队
          </el-button>

          <el-button v-else-if="userType === 1" type="danger" @click="leaveTeam">
            离开团队
          </el-button>

          <el-button v-else-if="userType === 2" type="info" disabled="true">
            待审核
          </el-button>

          <el-button v-else-if="userType === 3" type="success" @click="accept">
            同意邀请
          </el-button>

          <el-button v-else-if="userType === 4" type="success" @click="apply">
            申请加入
          </el-button>

          <el-button v-else type="info" disabled="true">
            你究竟是谁？？
          </el-button>
        </div>

        <el-button v-if="userType === 0"
                   @click="invite"
                   type="primary"
                   style="margin-top: 10px">
          邀请新成员
        </el-button>
      </div>

      <div>
        <el-button v-if="userType === 0 && changing === 0"
                   @click="change"
                   style="
                 position: relative;
                 top: 130px;
                 left: 0;
                 ">
          修改
        </el-button>
        <el-button v-if="userType === 0 && changing === 1"
                   @click="endChange"
                   style="
                 position: relative;
                 top: 130px;
                 left: 0;">
          完成
        </el-button>
      </div>


    </div>

    <div style="margin-top: 10px;
                position: relative;
                top:180px;
                padding: 20px ">
      <el-row v-for="mem in memList" :key="mem.id" class="block">
        <div @click="goUser"
             style="
             float: right;
             width: 800px">
          <el-avatar src="circleUrl" style="margin: 10px"/>
          <span style="margin: auto 0">
            {{mem.nickName}}
          </span>
        </div>
        <div v-if="userType === 0"
             style="
              position: absolute;
              right: 15px;
              float: right;">
          <el-button  type="danger" style="margin: 5px" @click="removeMem">
            移除成员
          </el-button>
          <el-button style="margin: 5px" @click="transPri">
            转让权限
          </el-button>
        </div>

      </el-row>
    </div>

  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data(){
    return {
      changing : 0,
      userType: 0,
      teamId: '',
      team_img:"../../assets/logo.png",
      team_name: "软工",
      team_introduction: "for test",
      c_teamName: '',
      c_teamIntroduction: '',
      memList: [
        {
          id: "1",
          nickName: "小王"
        },
        {
          id: "2",
          nickName: "小李"
        }
      ]
    }
  },

  methods: {
    change: function (){
      this.changing = 1;
    },

    endChange: function (){
      this.changing = 0;
      this.$axios.post("/api/team/modify/name",
          {
            "teamId" : this.teamId,
            "newName": this.c_teamName
          }).then((res)=>{
        if (res.status === 200){
          if (res.data.code === 0) ElMessage("修改团队名称成功！");
          else if (res.data.code === 1) ElMessage("团队不存在");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })

      this.$axios.post("/api/team/modify/name",
          {
            "teamId" : this.teamId,
            "newIntro": this.c_teamIntroduction
          }).then((res)=>{
        if (res.status === 200){
          if (res.data.code === 0) ElMessage("修改团队简介成功！");
          else if (res.data.code === 1) ElMessage("团队不存在");
          else ElMessage("系统错误！！");
        }else console.log("return status != 200!!");
      }).catch((err)=>{
        console.log(err);
      })
    },

    changeImg: function (){

    },

    invite: function (){
      this.$router.push({name: 'teamInvite', params: {key: ' '}});
    },

    dropTeam: function (){

    },

    leaveTeam: function (){

    },

    accept: function (){

    },

    apply: function (){

    },

    goUser: function (){

    },

    removeMem: function (){

    },

    transPri: function (){

    },

    checkUserType: function (){

    }
  },
  created() {

  }
}

</script>

<style scoped>
.information {

}

.teamImg {
  float: left;
  margin: 25px 25px 25px 50px;
  height: 100px;
  width: 100px;
}
.block {
  margin:0 auto;
  padding: 10px;
  width: 950px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>