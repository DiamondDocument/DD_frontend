
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <header style="line-height: 30px;text-align: center; font-weight: bold">请从以下方式中选择一个创建</header>
            <p class="text">上传本地文档: </p>
            <input type="file" id="keyfile" multiple="multiple" @change="select($event)" style="margin-left: 130px">
            <p class="text">新建空白文档： </p>
            <el-input v-model="input" placeholder="文件名" style="width: 100px !important;margin-left: 150px"></el-input>
            <p class="text">从模板创建： </p>
            <el-button @click="toTemplate" style="margin-left: 150px">选择模板</el-button>
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

export default {
  name: "newFile",
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
    toTemplate() {
      this.hide()
      this.$router.push({name: "recommendTemplate"})
    },
    commit () {
      let files = document.getElementById('keyfile').value;
      //选择了从本地上传，上传操作已经在select完成
      if (files!=null) {
        this.hide()
      }
      //选择了新建空白文档
      if (this.input !== '') {
        this.$axios.post("file", this.input).then((response)=>{
          if (response.status===1){
            console.log('ok')
          }
          else {
            console.log('failed')
          }
        }).catch((err)=>{
          console.log('err!!!')
        });
        this.hide()
      }
      //不管从模板创建，因为跳到了模板页
      else {
        console.log('err!!!!!')
      }

    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
    select(e){
      let getFile =document.getElementById("files");
      //获取到文件以后就会返回一个对象，通过这个对象即可获取文件
      console.log(e.currentTarget.files);//所有文件，返回的是一个数组
      console.log(e.currentTarget.files[0].name)//文件名
      let form = new FormData();
      form.append("file",e.currentTarget.files[0]);
      this.axios.post("file",form).then((response)=>{
        if(response.status === 200){
          console.log(response.data);
        }else{
          console.log('other status')
        }
      }).catch((err)=>{
        console.log('err!!!')
      });
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