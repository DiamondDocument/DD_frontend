<template>
  <div style="margin-top: 10px; padding: 20px">
    <el-row v-for="team in teamList" :key="team.id" class="block">
      <el-avatar src="circleUrl" style="margin: 10px"/>
      <div style="">
        <h3 >
              {{team.name}}
        </h3>
        <p >
              {{team.introduction}}
        </p>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "List",
  data(){
    return {
      teamList: [
        {
          id: "1",
          name: "CTS",
          introduction: "CTS 很简单的啦 java助教说话又好听 软工是不可能软工的"
        },
        {
          id: "2",
          name: "软工",
          introduction: "软工密麻麻石蜡！！！"
        }
      ]
    }
  }
}
</script>

<style scoped>
.block {
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 5px;
}
</style>