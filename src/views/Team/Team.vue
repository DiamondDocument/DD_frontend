<template>
  <div>

    <div class="information"
         style="height:200px;
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
      <el-button type="success" style="float: right; margin: 50px 100px 20px 20px;">
        加入团队
      </el-button>

      <div style="
        position: absolute;
        bottom: 20px;
        left: 20px"
      >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>part1</el-breadcrumb-item>
            <el-breadcrumb-item>part2</el-breadcrumb-item>
            <el-breadcrumb-item>part3</el-breadcrumb-item>
            <el-breadcrumb-item>part4</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
    </div>

    <div style="margin-top: 10px; padding: 20px">
      <el-row v-for="mem in memList" :key="mem.id" class="block">
        <el-avatar src="circleUrl" style="margin: 10px"/>
        <span style="margin: auto 0">
              {{mem.nickName}}
          </span>

      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
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
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>