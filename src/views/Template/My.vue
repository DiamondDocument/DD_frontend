<template>
  <el-row>
    <el-col
        v-for="(temps, i) in templates"
        :span="6.5"
        :offset="i > 0 ? 0.5 : 0"
    >
      <el-card class="box-card">
        <img
            src="../../assets/logo.png"
            class="image"
            style="position: center"
        />
        <div style="padding: 14px; margin: 0;">
<!--          <p>{{temps.title}}</p>-->
          <div class="bottom">
<!--            <p>作者：{{temps.author}}</p>-->
            <el-button text class="button">立即使用</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "MyTemplate.vue",

  data() {
    return {
      userId: '',
      templates: [

      ]
    }
  },

  created() {
    this.userId = this.$store.state.tableId;
    this.$axios.get("/template/list/my", {
      params: {
        userId: this.userId,
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          this.templates = response.data.temps;
        } else ElMessage("模板信息获取错误");
      } else console.log("请求返回status不为200")
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style>

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100px;
  display: block;
}

.box-card {
  margin-left: 0;
  margin-top: 20px;
  width: 400px;
  float: left;
}
</style>