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
      <ul class="fileList">
        <li class="file">
          <div class="elem">金刚石需求文档</div>
          <div class="elem">赵老板</div>
          <div class="elem">2022-05-01 by 赵老板</div>
          <div class="elem">21K</div>
        </li>
        <li class="file">
          <div class="elem">金刚石产品计划书</div>
          <div class="elem">赵老板</div>
          <div class="elem">2022-05-02 by 赵老板</div>
          <div class="elem">29K</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Template from "@/views/Template/Template";
export default {
  name: "Space",
  inject: ['reload'],
  data(){
    return {}
  },
  methods: {
    delData(){
    //在axios成功的回调里面
      this.reload();
    }
  },
  components: {Template}
}
</script>

<style scoped>
  .globalOperate {
    margin-left:320px;
    background-color:whitesmoke;
    height:50px;
  }
  .elem {
    margin-left: 15px;
    line-height: 50px;
    float: left;
    width: 23%;
    height: 50px;
    display: flex;
  }
  .fileSystem {
    margin-left:320px;
  }

</style>