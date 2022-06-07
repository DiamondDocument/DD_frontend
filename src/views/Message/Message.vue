<template>
  <el-menu default-active="'/' +this.$route.path.split('/')[1]">
    <el-button type="primary" style="margin-left: 20px" @click="allRead">全部已读</el-button>
    <span style="margin-left: 20px">未读数量：{{messageNotRead}}</span>
  </el-menu>
  <el-card v-for="i in messages.length" class="box-card" >
    <template #header>
      <div class="card-header">
        <span>{{messages[i-1].title}}</span>
<!--        仅申请和邀请有可能打开详情，即跳转到对应的团队详情页和个人信息页，另外还有文档被评论-->
        <el-button type="text" v-if="messages[i-1].msgType===2 || messages[i-1].msgType===4 || messages[i-1].msgType===6"
                   @click="showConfirm(messages[i-1].msgType, messages[i-1].content)">详情</el-button>
        <el-button type="text" v-if="messages[i-1].isRead===false" @click="read(i-1)">标记已读</el-button>
        <el-tag type="success" v-else style="width: 100px; height: 30px">已读</el-tag>
      </div>
    </template>
    <div class="text item">{{messages[i-1].abstract}}</div>
  </el-card>
  <file-comment ref="fileComment" @toFile="toFile"></file-comment>
  <join-request ref="joinRequest" @agree="agree" @refuse="refuse"></join-request>
  <request-result ref="requestResult"></request-result>
</template>

<script>
import {ref} from "vue"
import fileComment from "@/components/fileComment";
import requestResult from "@/components/requestResult";
import joinRequest from "@/components/joinRequest";
import {ElMessage} from "element-plus";
export default {
  name: "Message",
  components: {
    joinRequest,
    fileComment,
    requestResult,
  },
  setup () {
    const fileComment = ref()
    const joinRequest = ref()
    const requestResult = ref()
    function showConfirm (type, s) {
      switch (type) {
        case 2:
          ElMessage('跳到个人信息页')
          break;
        case 4:
          ElMessage('跳转到团队详情页')
          break;
        case 6:
          fileComment.value.show(s)
          break;
        case 7:
          ElMessage('跳到文档页')
          break;
        default:
          ElMessage('未知邮件类型！！！！')
          break;
      }
    }
    // 事件处理
    function toFile () {
      ElMessage('跳转到该文档')
      fileComment.value.hide()
    }
    function agree() {
      confirm('你居然同意了')
      joinRequest.value.hide()
    }
    function refuse() {
      confirm('那必须拒绝')
      joinRequest.value.hide()
    }
    return {
      fileComment: fileComment,
      joinRequest: joinRequest,
      requestResult: requestResult,
      showConfirm,
      toFile,
      agree,
      refuse,
    }
  },
  mounted() {
    this.getMessage()
  },
  data() {
    return {
      messageNum: 0,
      messageNotRead: 0,
      messages: [
        {
          msgId: 0,
          msgType: 1,                  //1=系统通知
          content: '系统通知测试内容',
          title: '',
          isRead: false,
        },
        {
          msgId:1,
          msgType: 2,                 //2=申请
          senderName: '赵老板',
          teamName: '下北泽演员团队',
          title: '',
          isRead: false
        },
        {
          msgId:2,
          msgType: 3,                 //3=申请处理
          senderName: '赵老板',
          teamName: 'ACCEED电影制作团队',
          title: '',
          isAgree: false,
          isRead: false,
        },
        {
          msgId:3,
          msgType: 4,                 //4=邀请
          senderName: '赵老板',
          teamName: '会员制餐厅服务团队',
          title: '',
          isRead: false
        },
        {
          msgId: 4,
          msgType: 5,                 //5=邀请处理
          senderName: '赵老板',
          teamName: 'PornHub中国营销团队',
          title: '',
          isAgree: true,
          isRead: false,
        },
        {
          msgId:5,
          msgType: 6,                 //6=评论
          senderName: '赵老板',
          msgDocName: '测试文档',
          title: '',
          content: '劲爆！',
          isRead: false
        },
        {
          msgId:6,
          msgType: 7,                 //7=艾特
          senderName: '赵老板',
          msgDocName: '王爷本篇',
          title: '',
          isRead: false
        }
      ]
    }
  },
  methods: {
    //获取消息列表
    getMessage() {
      console.log("getmsg")
      this.$axios.get('/message/list', {
        params: {
          userId: this.$store.state.userId,
        }
      }).then((response) => {
        if(response.status===0) {
          console.log("in code===0")
          this.messages.clear()
          this.messages = response.data.msg
          this.messageNum = this.messages.length

          //获取未读数量，根据msgType生成格式化摘要信息
          for (let i = 0; i < this.messageNum; i++) {
            let msg = this.messages[i]
            if (!msg.isRead)
              this.messageNotRead++;
            switch (msg.msgType) {
              case 1:
                msg.title = '系统通知您' + msg.content
                break;
              case 2:
                msg.title = msg.senderName + '申请加入' + '团队：' + msg.teamName
                break;
              case 3:
                if (msg.isAgree) {
                  msg.title = msg.senderName + '同意你加入团队：' + msg.teamName
                }else{
                  msg.title = msg.senderName + '拒绝你加入团队：' + msg.teamName
                }
                break;
              case 4:
                msg.title = msg.senderName + '邀请你加入团队：' + msg.teamName
                break;
              case 5:
                if (msg.isAgree) {
                  msg.title = msg.senderName + '同意加入你的团队：' + msg.teamName
                }else{
                  msg.title = msg.senderName + '拒绝加入你的团队：' + msg.teamName
                }
                break;
              case 6:
                msg.title = msg.senderName + '评论了你的文档：' + msg.docName
                break;
              default:
                msg.title = msg.senderName + '在文档：' + msg.docName + ' 中提到了你'
                break;
            }
          }
        }
        else if (response.status===-1){
          ElMessage('获取列表失败')
        }
        else{
          ElMessage('其他错误')
        }
      }).catch((err) => {
        ElMessage(err)
      })
    },
    read(i) {
      this.messages[i].isRead=true;
      this.$axios.post("/api/message/mark",
          {
            "msgId": this.messages[i].msgId
          }
      ).then((response)=>{
        if(response.status === 0){
          console.log(response.data);
        }else{
          console.log('其他错误')
        }
      }).catch((err)=>{
        console.log(err)
      });
      this.messageNotRead--;
    },
    allRead() {
      let i = 0;
      while (i < this.messageNum){
        if (this.messages[i].read) {
          i++;
          continue
        }
        this.read(i)
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