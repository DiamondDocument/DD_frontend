<template>
  <div>

    <div class="information"
         style="height:180px;
                background: #ebebeb;
                position: relative"
    >
      <el-image class="teamImg" :src="team_img" fit="fill" >
      </el-image>
      <div style="float: left; padding: 10px">
        <h2 class="teamName">
          {{ team_name }}
        </h2>
        <p class="mainText">
          {{ team_introduction }}
        </p>
      </div>

      <div style="float: right; margin: 50px 100px 20px 20px;">

        <div>
          <el-button v-if="userType === 0" type="danger">
            解散团队
          </el-button>

          <el-button v-else-if="userType === 1" type="danger">
            离开团队
          </el-button>

          <el-button v-else-if="userType === 2" type="info" disabled="true">
            待审核
          </el-button>

          <el-button v-else-if="userType === 3" type="success">
            同意邀请
          </el-button>

          <el-button v-else-if="userType === 4" type="success">
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


    </div>

    <div style="margin-top: 10px;
                position: relative;
                padding: 20px ">
      <el-row v-for="mem in memList" :key="mem.id" class="block">

          <el-avatar src="circleUrl" style="margin: 10px"/>
          <span style="margin: auto 0">
              {{mem.nickName}}
          </span>

        <div v-if="userType === 1"
             style="
              position: absolute;
              right: 15px;
              float: right;">
          <el-button  type="danger" style="margin: 5px">
            移除成员
          </el-button>
          <el-button style="margin: 5px">
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
      userType: 0,
      team_img:"../../assets/logo.png",
      team_name: "软工",
      team_introduction: "for test",
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
    invite: function (){
      this.$router.push({name: 'userInvite', params: {userId: ' '}});
    },

    //欠缺接口
    checkSeer: function (){

    }
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