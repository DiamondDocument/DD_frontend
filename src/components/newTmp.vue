<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <div style="height: 30px"></div>
            <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建文件夹</header>
            <div style="margin-left: 40px;margin-right: 50px;">
              <el-form  label-width="200px">
                <el-form-item label="模板名称">
                  <el-input v-model="nameInput" placeholder="例:请假条通用模板" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
                </el-form-item>
                <el-form-item label="模板介绍">
                  <el-input v-model="introInput" placeholder="例:翘课必备,童叟无欺" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" style="bottom: 30px; left: 100px; position: absolute" @click="commit"><span>确定</span></el-button>
              <el-button type="primary" style="bottom: 30px; right: 100px; position: absolute" @click="hide"><span>取消</span></el-button>
            </div>
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
    name: "newTmp",
    props:["fileId"],
    setup(){
      let nameInput = ref('');
      let introInput = ref('');
      return {
        nameInput,
        introInput,
      }
    },
    data() {
      return {
        radio: Number,
        visible: false,
      }
    },
    methods: {
      commit () {
        this.$axios.post("/template/create", {
          "docId": this.fileId,
          "name": this.nameInput,
          "intro": this.introInput,
        }).then((response)=>{
          if(response.status === 200){
            if (response.data.code === 0) {
              ElMessage('创建成功')
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
      change: function(val){
        this.authority=val
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
      height: 400px;
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
