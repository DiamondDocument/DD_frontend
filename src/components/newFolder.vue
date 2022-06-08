
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">文件夹名： </p>
            <el-input v-model="input" placeholder="文件夹名字" style="width: 100px !important;margin-left: 150px"></el-input>
            <el-button type="primary" style="bottom: 10px; left: 80px; position: absolute" @click="commit"><span>确定</span></el-button>
            <el-button type="primary" style="bottom: 10px; right: 80px; position: absolute" @click="hide"><span>取消</span></el-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import {ref} from "vue";
import {ElMessage} from "element-plus";
export default {
  name: "newFolder",
  props:["fatherId"],
  setup(){
    let input = ref('');
    return {
      input
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    commit () {
      let files = document.getElementById('keyfile').value;

      console.log(this.input, this.$store.state.loginUser.userId, this.fatherId, files)
      //选择了新建文件夹
      let form = new FormData();
      form.append("type", "2")
      form.append("name", this.input)
      form.append("creatorId", this.$store.state.loginUser.userId)
      form.append("parentId", this.fatherId)
      this.$axios.post("/file/create", form).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('创建成功')
          } else if(response.data.code===1){
            ElMessage('文件夹重名，已修改')
          }else if(response.data.code===2){
            ElMessage('您没有权限')
          }else if(response.data.code===-1){
            ElMessage('创建失败')
          }else{
            ElMessage('其他错误')
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.hide()
    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
  },
}
</script>

<style scoped lang="scss">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 996;
  background-color: #ebebeb;
  &.confirm-fade-enter-active {
    animation: confirm-fadein .3s;
    .confirm-content {
      animation: confirm-zoom-in .3s;
    }
  }
  &.confirm-fade-leave-active {
    animation: confirm-fadeout .3s;
    .confirm-content {
      animation: confirm-zoom-out .3s;
    }
  }
}
.confirm-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 997;
  .confirm-content {
    width: 400px;
    height: 200px;
    border-radius: 13px;
    position: relative;
    background: #ffffff;
    .text {
      padding: 25px 20px;
      line-height: 20px;
      text-align: center;
      font-size: 15px;
      color: dimgrey;
    }
  }
}
@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-fadeout {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>