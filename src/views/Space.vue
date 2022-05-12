<template>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]"></el-menu>
  <div class="container">
    <div class="globalOperate">
      <div class="elem">| 文件名</div>
      <div class="elem">| 创建者</div>
      <div class="elem">| 修改日期</div>
      <div class="elem">| 大小</div>
    </div>
    <div class="fileSystem">
<!--      当前列表为成品示例，实际应根据GET请求 + for获取列表-->
      <div class="fileList">
        <div class="file">
          <div class="elem">金刚石需求文档</div>
          <div class="elem">赵老板</div>
          <div class="elemAlt">2022-05-01 by 赵老板</div>
          <div class="elemSize">21K</div>
        </div>
          <el-image class="line" :src="require('@/assets/line.png')"></el-image>
        <div class="file">
          <div class="elem">金刚石产品计划书</div>
          <div class="elem">赵老板</div>
          <div class="elemAlt">2022-05-02 by 赵老板</div>
          <div class="elemSize">29K</div>
        </div>
          <el-image class="line" :src="require('@/assets/line.png')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import Template from "@/views/Template/Template";
export default {
  name: "Space",
  components: {Template}
}
</script>

<style scoped>
  .globalOperate {
    margin-left:20%;
    background-color:whitesmoke;
    height:50px;
  }
  .elem {
    margin-left: 2%;
    margin-right: 13%;
    line-height: 50px;
    float: left;
    width: 10%;
    height: 50px;
    display: flex;
    cursor: pointer;
  }
  .elemAlt {
    margin-left: 2%;
    line-height: 50px;
    float: left;
    width: 23%;
    height: 50px;
    display: flex;
    cursor: pointer;
  }
  .elemSize {
    margin-left: 2%;
    line-height: 50px;
    float: left;
    width: 4%;
    height: 50px;
    display: flex;
  }
  .fileSystem {
    margin-left:20%;
  }
  .line {
    height:1px;
    width: 95%;
    margin-bottom: 4px;
  }

</style>