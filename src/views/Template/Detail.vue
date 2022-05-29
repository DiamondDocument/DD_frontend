<template>

  <div class="common-layout">
    <el-container>
      <el-aside style="height: 100vh; width: 900px">
        <img src="../../assets/logo.png" style=" width: 500px; height:500px; padding: 100px 100px; align-items: center ">
      </el-aside>
      <el-container>
        <el-header style="padding: 100px 100px; height: 300px; text-align: center">
          <p>{{title}}模板标题</p>
        </el-header>
        <el-main style="padding: 0 250px 0 0">
          <p>{{author}}作者</p>
          <p>{{statement}}简介</p>
          <el-button text class="button" style="float: right" >立即使用</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>
export default {
  name: "Detail.vue",

  data() {
    return {
      title: '',
      author: '',
      statement: '',

    }
  }
}
</script>

<style scoped>

</style>