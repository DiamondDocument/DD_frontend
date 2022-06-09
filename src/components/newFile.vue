
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <div style="height: 30px"></div>
            <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建新文档</header>
            <div style="margin-left: 40px;margin-right: 50px;">
              <el-form  label-width="100px">
                <el-form-item label="文档名">
                  <el-input v-model="input" placeholder="文件名" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
                </el-form-item>
                <el-form-item label="导入本地">
                  <input type="file" id="keyfile" multiple="multiple" @change="select($event)" style="margin-left: 20px">
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
  name: "newFile",
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
      file: document,
      authority: 4,
    }
  },
  methods: {
    commit () {
      console.log(this.teamId)
      let form=new FormData()
      form.append("type", '1')
      form.append("name", this.input)
      form.append("creatorId", this.$store.state.loginUser.userId)
      form.append("authority", this.authority)
      if (this.fatherId!=null)
        form.append("parentId", this.fatherId)
      if(this.teamId!=null)
        form.append("teamId", this.teamId)
      form.append("file", this.file)
      this.$axios.post("/file/create", form).then((response)=>{
        if(response.status === 200){
          if (response.data.code === 0) {
            ElMessage('创建成功')
          } else if(response.data.code===1){
            ElMessage('文件重名，已修改')
          }else if(response.data.code===2){
            ElMessage('您没有权限')
          }else if(response.data.code===-1){
            ElMessage('创建失败')
          }else{
            console.log(response.data)
          }
        }else{
          ElMessage({ message: "status = " + response.status, type: 'warning'});
        }
      }).catch((err) => {
        console.log(err);
      })
      this.hide()
      this.$emit('end')
    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
    //当上面的input得到文件后，该函数被调用
    select(e){
      console.log(e.currentTarget.files);//所有文件，返回的是一个数组
      console.log(e.currentTarget.files[0].name)//文件名
      let form = new FormData();
      form.append("file",e.currentTarget.files[0]);
      this.file=e.currentTarget.files[0]
      this.axios.post("file",form).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
        }else{
          ElMessage('发生错误')
        }
      }).catch((err)=>{
        console.log(err)
      })
      // }
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