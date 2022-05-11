<template>
  <div style="margin-top: 10px; padding: 20px">
    <el-row v-for="mem in memList" :key="mem.id" class="block">
      <el-avatar src="circleUrl" style="margin: 10px"/>
      <span style="margin: auto 0">
              {{mem.nickName}}
          </span>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "List",
  data(){
    return {
      memList: [
        {
          id: "1",
          nickName: "小王"
        },
        {
          id: "2",
          nickName: "小李"
        }
      ],
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