
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <div style="height: 30px"></div>
            <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建文件夹</header>
            <div style="margin-left: 40px;margin-right: 50px;">
              <el-form  label-width="100px">
                <el-form-item label="文件夹名称">
                  <el-input v-model="input" placeholder="文件名" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
                </el-form-item>
                <el-form-item label="设置权限">
                  <el-radio-group v-model="radio"  @change="change" style="display:table-cell">
                    <el-radio label="2"  style="">所有人可查看</el-radio>
                    <el-radio label="3"  style="">所有人可评论</el-radio>
                    <el-radio label="4"  style="">所有人可编辑</el-radio>
                  </el-radio-group>
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
  name: "newFolder",
  props:["fatherId","teamId"],
  setup(){
    let input = ref('');
    return {
      input
    }
  },
  data() {
    return {
      radio: Number,
      visible: false,
      authority: 4,
    }
  },
  methods: {
    commit () {
      let files = document.getElementById('keyfile').value;

      console.log(this.input, this.$store.state.loginUser.userId, this.fatherId, files)

      let form = new FormData();
      form.append("type", '2')
      form.append("name", this.input)
      form.append("creatorId", this.$store.state.loginUser.userId)
      if (this.fatherId!=null)
        form.append("parentId", this.fatherId)
      if(this.teamId!=null)
        form.append("teamId", this.teamId)
      form.append("authority", this.authority)
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