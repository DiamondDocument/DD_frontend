<template>
  <el-row>
    <el-col
        v-for="(o, index) in templateNum"
        :key="o"
        :span="6"
        :offset="index > 0 ? 0.5 : 0"
    >
      <el-card class="box-card">
        <img
            src="../../assets/logo.png"
            class="image"
            style="position: center"
        />
        <div style="padding: 14px; margin: 0;">
          <p>{{templates[index].title}}</p>
          <div class="bottom">
            <p>作者：{{templates[index].author}}</p>
            <el-button text class="button">立即使用</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MyTemplate.vue",

  data() {
    return {
      templateNum: 5,
      templates: [
        {
          title: '金刚石模板1',
          author: '我',
          img: "./assets/logo.png"
        },
        {
          title: '金刚石模板2',
          author: '我',
          img: "./assets/logo.png"
        },
        {
          title: '金刚石模板3',
          author: '我',
          img: "./assets/logo.png"
        },
        {
          title: '金刚石模板4',
          author: '我',
          img: "./assets/logo.png"
        },
        {
          title: '金刚石模板5',
          author: '我',
          img: "./assets/logo.png"
        },
      ]
    }
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