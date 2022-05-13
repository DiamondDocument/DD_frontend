<template>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-button type="primary" style="margin-left: 20px">全部已读</el-button>
    <span style="margin-left: 20px">未读数量：{{messageNum}}</span>
  </el-menu>
  <el-card v-for="i in messageNum" class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{messages[i-1].title}}</span>
        <el-button class="button" type="text">详情</el-button>
        <el-button class="button" type="text">标记已读</el-button>
      </div>
    </template>
    <div class="text item">{{messages[i-1].abstract}}</div>
  </el-card>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageNum: 3,
      messages: [
        {
          title: '团队邀请',
          abstract: '赵老板 邀请您加入 DiamondDocument',
        },
        {
          title: '文档被评论',
          abstract: '赵老板 评论了您的文档 真夏の夜の淫梦',
        },
        {
          title: '协作邀请',
          abstract: '赵老板 邀请您协作 会员制餐厅',
        }
      ]
    }
  }
}
</script>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 15px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    margin-left: 20px;
    margin-top: 20px;
    width: 480px;
    float: left;
  }
</style>