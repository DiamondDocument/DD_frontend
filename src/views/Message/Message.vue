<template>
  <p>{{$route.params.tableId}}giao</p>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-button type="primary" style="margin-left: 20px" @click="allRead">全部已读</el-button>
    <span style="margin-left: 20px">未读数量：{{messageNotRead}}</span>
  </el-menu>
  <el-card v-for="i in messageNum" class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{messages[i-1].title}}</span>
        <el-button type="text" @click="showConfirm(messages[i-1].type, messages[i-1].detail)">详情</el-button>
        <el-button type="text" v-if="messages[i-1].read===false" @click="read(i-1)">标记已读</el-button>
        <el-tag type="success" v-else style="width: 100px; height: 30px">已读</el-tag>
      </div>
    </template>
    <div class="text item">{{messages[i-1].abstract}}</div>
  </el-card>
  <file-comment ref="confirmTexts" @confirm="confirm"></file-comment>
</template>

<script>
import {ref} from "vue"
import fileComment from "@/components/fileComment";
import joinRequest from "@/components/joinRequest";
import requestResult from "@/components/requestResult";
import JoinRequest from "@/components/joinRequest";
export default {
  name: "Message",
  components: {
    JoinRequest,
    fileComment,
  },
  setup () {
    // 拿到confirm的dom
    const confirmTexts = ref()
    // 唤起confirm
    function showConfirm (type, s) {
      confirmTexts.value.show(s)
    }
    // 点击确认按钮后的事件处理
    function confirm () {
      confirmTexts.value.hide()
    }
    return {
      confirmTexts: confirmTexts,
      showConfirm,
      confirm
    }
  },
  data() {
    return {
      detail: '',
      messageNum: 4,
      messageNotRead: 4,
      messages: [
        {
          type: 1,
          title: '团队邀请',
          abstract: '赵老板 邀请您加入 DiamondDocument',
          read: false
        },
        {
          type: 0,
          title: '文档被评论',
          abstract: '赵老板 评论了您的文档 真夏の夜の淫梦',
          detail: '赵老板在“真夏の夜の淫梦”里评论：嘤哼哼啊啊啊啊',
          read: false
        },
        {
          type: 2,
          title: '收到加入团队的申请',
          abstract: '赵老板 申请加入您的团队 Lords Of The LockerRoom',
          detail: '赵老板 申请加入您的团队 Lords Of The LockerRoom',
          read: false
        },
        {
          type: 3,
          title: '申请得到批复',
          abstract: '您的申请 加入A-SOUL 遭到拒绝',
          detail: '您的申请 加入A-SOUL 遭到拒绝',
          read: false
        },
      ]
    }
  },
  methods: {
    read(i) {
      this.messages[i].read=true;
      this.messageNotRead--;
    },
    allRead() {
      this.messageNotRead=0;
      let i = 0;
      while (i < this.messageNum){
        this.messages[i].read=true;
        i++;
      }
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